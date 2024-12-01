import {defineStore} from "pinia";
import type {
    DetailedLocationWeather,
    Favorite,
    SearchResult,
    DailyForecast,
    HourlyForecast
} from "~/types/weather";
import {useErrorHandler} from "~/stores/errorHandler";
import {useFavorites} from '~/stores/favorites'
import {ref, watch} from 'vue'
import {formatDateWithTimezone, getLocalTime, isDaytime} from "~/utils/weather-date-time";
import {getBackgroundImage} from "~/utils/weather-background-mapper";

export const useWeather = defineStore('weather', () => {
    let {$axios} = useNuxtApp()
    const api = $axios()

    const favorites = useFavorites()
    const errorHandler = useErrorHandler();
    const isRefreshing = ref(false);

    const suggestions: Ref<SearchResult[]> = ref([]);
    const locationsWeatherData: Ref<DetailedLocationWeather[]> = ref([]);
    const isSuggestionsLoading: Ref<boolean> = ref(false);

    const fetchSuggestions = async (query: string) => {
        if (!query || query.length < 2) {
            suggestions.value = [];
            return;
        }

        try {
            isSuggestionsLoading.value = true
            const {data} = await api.get(`/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5`);

            suggestions.value = data.map((location: any) => ({
                id: location.id,
                location_name: location.name,
                location_country: location.country,
                lat: location.lat,
                lon: location.lon,
            }));
        } catch (e) {
            console.error(e);
            suggestions.value = [];
        } finally {
            isSuggestionsLoading.value = false;
        }
    };

    const fetchWeatherDetails = async () => {
        const locations: Favorite[] = favorites.favorites

        if (!locations.length) {
            locationsWeatherData.value = [];
            return;
        }

        try {
            const weatherPromises = locations.map(async (location: Favorite): Promise<DetailedLocationWeather> => {
                const {lat, lon, isCurrent} = location;
                return getWeatherDataByCords(lat, lon, isCurrent);
            });

            locationsWeatherData.value = await Promise.all(weatherPromises);
        } catch (error) {
            locationsWeatherData.value = [];
        }
    }

    const getWeatherDataByCords = async (lat: number, lon: number, isCurrentLocation?: boolean): Promise<DetailedLocationWeather> => {
        const cachedData = locationsWeatherData.value.find(
            (data: any) => data.id === `${lat}-${lon}`
        );

        if (cachedData) {
            return cachedData;
        }

        try {
            const {data} = await
                api.get(`/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`);

            const hourlyForecast: HourlyForecast[] = data.list.map((item: any) => ({
                time: item.dt_txt.split(" ")[1].substring(0, 5),
                temperature: item.main.temp.toFixed(0),
                weather_condition: item.weather[0]?.description || "No description",
                weather_icon_url: `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`,
            }));

            const dailyForecast = data.list.reduce((acc: any, item: any) => {
                const date = new Date(item.dt_txt.split(" ")[0]).toLocaleDateString("en-US", {
                    weekday: "long",
                });

                if (!acc[date]) {
                    acc[date] = {
                        day: date,
                        temperatures: [item.main.temp],
                        weather_condition: item.weather[0]?.description || "No description",
                        weather_icon_url: `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`,
                    };
                } else {
                    acc[date].temperatures.push(item.main.temp);
                }

                return acc;
            }, {});

            const dailyForecastArray: DailyForecast[] = Object.values(dailyForecast).map((day: any) => ({
                ...day,
                temperature: (
                    day.temperatures.reduce((sum: number, temp: number) => sum + temp, 0) /
                    day.temperatures.length
                ).toFixed(0),
            }));

            const lastUpdatedTime = new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }).replace(/:\d{2}/, ":00");

            return {
                id: `${lat}-${lon}`,
                location_name: data.city.name,
                location_country: data.city.country,
                weather_condition: data.list[0]?.weather[0]?.description || "No description",
                temperature: data.list[0]?.main?.temp.toFixed(0),
                time: getLocalTime(data.city.timezone),
                datetime: formatDateWithTimezone(data.city.timezone),
                coord: {
                    lon,
                    lat,
                },
                weather_icon_url: `https://openweathermap.org/img/wn/${data.list[0]?.weather[0]?.icon}@2x.png`,
                hourly_forecast: hourlyForecast.slice(0, 5),
                daily_forecast: dailyForecastArray,
                overview_location_name: isCurrentLocation ? 'My Location' : data.city.name,
                overview_time: isCurrentLocation ? data.city.name : getLocalTime(data.city.timezone),
                last_updated: lastUpdatedTime,
                isCurrentLocation: isCurrentLocation || false,
                background_image_url: getBackgroundImage(data.list[0]?.weather[0]?.description, isDaytime(data.city.timezone))
            };
        } catch (error) {
            errorHandler.handleError(error, {
                customMessage: 'Failed to fetch data',
                type: 'error'
            })
            throw error;
        }
    }

    const refreshLocationData = async (cityDetails: DetailedLocationWeather) => {
        isRefreshing.value = true
        const {id, isCurrentLocation, coord: {lat, lon}} = cityDetails;

        locationsWeatherData.value = locationsWeatherData.value.filter(
            (location) => location.id !== id
        );

        locationsWeatherData.value.push(await getWeatherDataByCords(lat, lon, isCurrentLocation));
        setTimeout(() => isRefreshing.value = false, 250)
    }

    watch(() => [...favorites.favorites], async () => {
        await fetchWeatherDetails();
    }, {immediate: true});

    return {
        suggestions,
        locationsWeatherData,
        isSuggestionsLoading,
        isRefreshing,
        fetchSuggestions,
        fetchWeatherDetails,
        getWeatherDataByCords,
        formatDateWithTimezone,
        getLocalTime,
        refreshLocationData
    }
})