import {defineStore} from "pinia";
import type {
    DetailedLocationWeather,
    Favorite,
    SearchResult,
    DailyForecast,
    HourlyForecast
} from "~/types/weather";

const apiKey = 'e029cd0b391dd1ff63d7c931f3be71dd';

export const useWeather = defineStore('weather', () => {
    const favorites = useFavorites()
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
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`
            );

            const data = await response.json();
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

    function getLocalTime(dt: number, timezone: number): string {
        const localTime = new Date((dt + timezone) * 1000);
        return localTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    }

    function formatDateWithTimezone(dt: number, timezone: number): string {
        const date = new Date((dt + timezone) * 1000);
        return date.toLocaleString('en-US', {weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'});
    }

    const fetchWeatherDetails = async () => {
        const locations: Favorite[] = favorites.favorites

        if (!locations.length) {
            locationsWeatherData.value = [];
            return;
        }

        try {
            const weatherPromises = locations.map(async (location: Favorite): Promise<DetailedLocationWeather> => {
                const {lat, lon} = location;
                return getWeatherDataByCords(lat, lon);
            });

            locationsWeatherData.value = await Promise.all(weatherPromises);
        } catch (error) {
            console.error(error);
            locationsWeatherData.value = [];
        }
    }

    async function getWeatherDataByCords(lat: number, lon: number): Promise<DetailedLocationWeather> {
        const cachedData = locationsWeatherData.value.find(
            (data: any) => data.id === `${lat}-${lon}`
        );

        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            );

            const data = await response.json();

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
                        temperatures: [item.main.temp], // Collect all temperatures
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

            const weatherData: DetailedLocationWeather = {
                id: `${lat}-${lon}`,
                location_name: data.city.name,
                location_country: data.city.country,
                weather_condition: data.list[0]?.weather[0]?.description || "No description",
                temperature: data.list[0]?.main?.temp.toFixed(0),
                time: getLocalTime(data.list[0]?.dt, data.city.timezone),
                datetime: formatDateWithTimezone(data.list[0]?.dt, data.city.timezone),
                coord: {
                    lon,
                    lat,
                },
                weather_icon_url: `https://openweathermap.org/img/wn/${data.list[0]?.weather[0]?.icon}@2x.png`,
                hourly_forecast: hourlyForecast.slice(0, 5),
                daily_forecast: dailyForecastArray,
            };

            locationsWeatherData.value.push(weatherData);

            return weatherData;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw error;
        }
    }

    watch(() => [...favorites.favorites], async () => {
        await fetchWeatherDetails();
    }, {immediate: true});

    return {
        suggestions,
        locationsWeatherData,
        isSuggestionsLoading,
        fetchSuggestions,
        fetchWeatherDetails,
        getWeatherDataByCords
    }
})