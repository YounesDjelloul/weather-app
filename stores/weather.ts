import {defineStore} from "pinia";
import type {LocationWeather, Location, WeatherApiResponse} from "~/types/weather";
const apiKey = 'e029cd0b391dd1ff63d7c931f3be71dd';

export const useWeather = defineStore('weather', () => {
  let {$axios} = useNuxtApp()
  const api = $axios()

  const suggestions = ref([]);
  const locationsWeatherData: Ref<LocationWeather[]> = ref([]);

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      suggestions.value = [];
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching suggestions: ${response.statusText}`);
      }

      const data = await response.json();
      suggestions.value = data.map((location: any) => ({
        name: location.name,
        country: location.country,
        state: location.state || '',
        lat: location.lat,
        lon: location.lon,
      }));
    } finally {
      suggestions.value = [];
      console.log('hey')
    }
  };

  const fetchWeatherDetails = async (locations: Location[]) => {
    if (!locations.length) {
      locationsWeatherData.value = [];
      return;
    }

    try {
      const weatherPromises = locations.map(async (location: Location) => {
        const {lat, lon, name} = location;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Error fetching weather for ${name}: ${response.statusText}`);
        }

        const data: WeatherApiResponse = await response.json();
        console.log(data)
        return {
          id: data.id,
          location_name: name,
          weather_condition: data.weather[0]?.description || 'No description',
          temperature: Math.round(data.main?.temp),
          time: new Date(data.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          coord: {
            lon: Math.trunc(data.coord.lon),
            lat: Math.trunc(data.coord.lat)
          },
          weather_icon_url: `https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`
        };
      });
      locationsWeatherData.value = await Promise.all(weatherPromises);
    } catch (error) {
      console.error(error);
      locationsWeatherData.value = [];
    }
  };

  return {
    suggestions,
    locationsWeatherData,
    fetchSuggestions,
    fetchWeatherDetails
  }
})