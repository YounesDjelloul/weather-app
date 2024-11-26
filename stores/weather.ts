import {defineStore} from "pinia";
import type {WeatherApiResponse, DetailedLocationWeather, Favorite, SearchResult} from "~/types/weather";

const apiKey = 'e029cd0b391dd1ff63d7c931f3be71dd';

export const useWeather = defineStore('weather', () => {
  const FAVORITES_KEY = 'favorite_locations';
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
      console.log(data);
      suggestions.value = data.map((location: any) => ({
        id: location.id,
        location_name: location.name,
        location_country: location.country,
        lat: location.lat,
        lon: location.lon,
      }));
    } catch(e) {
      console.error(e);
      suggestions.value = [];
    } finally {
      isSuggestionsLoading.value = false;
      console.log(suggestions.value);
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
    const locations: Favorite[] = getFavoriteLocations()

    if (!locations.length) {
      locationsWeatherData.value = [];
      return;
    }

    try {
      const weatherPromises = locations.map(async (location: Favorite): Promise<DetailedLocationWeather> => {
        const {lat, lon} = location;
        return getWeatherDataByCords(lat, lon)
      });
      locationsWeatherData.value = await Promise.all(weatherPromises);
    } catch (error) {
      console.error(error);
      locationsWeatherData.value = [];
    }
  };

  async function getWeatherDataByCords(lat: number, lon: number): Promise<DetailedLocationWeather> {
    const cachedData = locationsWeatherData.value.find((data: any) => data.coord.lat === lat && data.coord.lon === lon);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

      const data: WeatherApiResponse = await response.json();

      const weatherData: DetailedLocationWeather = {
        id: data.id,
        location_name: data.name,
        location_country: data.sys.country,
        weather_condition: data.weather[0]?.description || 'No description',
        temperature: Math.round(data.main?.temp),
        time: getLocalTime(data.dt, data.timezone),
        datetime: formatDateWithTimezone(data.dt, data.timezone),
        coord: {
          lon: Math.trunc(data.coord.lon),
          lat: Math.trunc(data.coord.lat),
        },
        weather_icon_url: `https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`,
      };

      locationsWeatherData.value.push(weatherData);

      return weatherData;
    } catch (error) {
      throw error
    }
  }

  const getFavoriteLocations = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  }

  const saveFavoriteLocation = (coord: Favorite) => {
    const favorites = getFavoriteLocations();

    if (!favorites.some((fav: any) => fav.id === coord.id)) {
      favorites.push(coord);

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  const deleteFavoriteLocation = (id: number) => {
    const favorites = getFavoriteLocations();
    const updatedFavorites = favorites.filter((fav: any) => fav.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  }

  const isLocationInFavorite = (id: number) => {
    const favorites = getFavoriteLocations();
    const favorite = favorites.filter((fav: any) => fav.id === id);

    return favorite.length > 0;
  }

  return {
    suggestions,
    locationsWeatherData,
    isSuggestionsLoading,
    fetchSuggestions,
    fetchWeatherDetails,
    getWeatherDataByCords,
    getFavoriteLocations,
    saveFavoriteLocation,
    deleteFavoriteLocation,
    isLocationInFavorite
  }
})