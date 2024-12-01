import {setActivePinia, createPinia} from 'pinia'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {useWeather} from '~/stores/weather'
import {useFavorites} from '~/stores/favorites'

vi.mock('#app', () => ({
    useNuxtApp: () => ({
        $axios: vi.fn(),
    })
}))

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