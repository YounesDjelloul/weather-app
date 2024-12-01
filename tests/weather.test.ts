import {setActivePinia, createPinia} from 'pinia'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {useWeather} from '~/stores/weather'
import {useFavorites} from '~/stores/favorites'

global.fetch = vi.fn()

describe('Weather Store', () => {
    let weatherStore: ReturnType<typeof useWeather>;
    let favoritesStore: ReturnType<typeof useFavorites>;

    beforeEach(() => {
        setActivePinia(createPinia())

        weatherStore = useWeather()
        favoritesStore = useFavorites()
    });

    describe('Suggestions Functionality', () => {
        it('should clear suggestions for short queries', async () => {
            await weatherStore.fetchSuggestions('a')

            expect(weatherStore.suggestions).toHaveLength(0)
        })

        it('should fetch and transform location suggestions', async () => {
            const mockResponse = [
                {
                    id: 1,
                    name: 'New York',
                    country: 'US',
                    lat: 40.7128,
                    lon: -74.0060
                }
            ]

            global.fetch = vi.fn().mockResolvedValue({
                json: () => Promise.resolve(mockResponse)
            })

            await weatherStore.fetchSuggestions('New York')

            expect(weatherStore.suggestions).toHaveLength(1)
            expect(weatherStore.suggestions[0]).toEqual({
                id: 1,
                location_name: 'New York',
                location_country: 'US',
                lat: 40.7128,
                lon: -74.0060
            })
        })

        it('should handle suggestion fetch errors', async () => {
            global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

            await weatherStore.fetchSuggestions('London')

            expect(weatherStore.suggestions).toHaveLength(0)
        })
    })

    describe('Weather Details Fetching', () => {
        it('should clear weather data when no favorites exist', async () => {
            await weatherStore.fetchWeatherDetails()

            expect(weatherStore.locationsWeatherData).toHaveLength(0)
        })

        it('should fetch weather details for favorite locations', async () => {
            favoritesStore.saveFavoriteLocation({
                id: 1,
                lat: 40.7128,
                lon: -74.0060,
            })

            // Mock the weather API response
            global.fetch = vi.fn().mockResolvedValue({
                json: () => Promise.resolve({
                    city: {
                        name: 'New York',
                        country: 'US',
                        timezone: 0
                    },
                    list: [
                        {
                            dt_txt: '2023-01-01 12:00:00',
                            main: {temp: 20},
                            weather: [{description: 'Cloudy', icon: '04d'}]
                        }
                    ]
                })
            })

            await weatherStore.fetchWeatherDetails()

            expect(weatherStore.locationsWeatherData).toHaveLength(1)
            expect(weatherStore.locationsWeatherData[0]).toHaveProperty('location_name', 'New York')
        })
    })

    describe('Time and Date Formatting', () => {
        it('should correctly format local time', () => {
            const localTime = weatherStore.getLocalTime(3600)
            expect(localTime).toMatch(/\d{2}:\d{2}/)
        })

        it('should correctly format date with timezone', () => {
            const formattedDate = (weatherStore as any).formatDateWithTimezone(3600)

            expect(formattedDate).toBeTruthy()

            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const dateParts = formattedDate.split(',')

            const receivedDay = dateParts[0]
            const receivedMonth = dateParts[1].trim().split(' ')[0]
            const receivedYear = dateParts[2].trim()

            expect(weekdays).toContain(receivedDay)
            expect(months).toContain(receivedMonth)
            expect(parseInt(receivedYear)).toBeGreaterThan(2000)
        })
    })
})