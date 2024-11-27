import {defineStore} from "pinia";
import type {LocationWeather, Location, WeatherApiResponse, DetailedLocationWeather} from "~/types/weather";

const apiKey = 'e029cd0b391dd1ff63d7c931f3be71dd';

export const useWeather = defineStore('weather', () => {
  const FAVORITES_KEY = 'favorite_locations';
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
    }
  };

  function getLocalTime(dt: number, timezone: number): string {
    const localTime = new Date((dt + timezone) * 1000);
    return localTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
  }

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
          time: getLocalTime(data.dt, data.timezone),
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

  async function getWeatherDataById(id: number): Promise<LocationWeather | undefined> {
    const cachedData = locationsWeatherData.value.find((data: any) => data.id === id);

    // if (cachedData) {
    //   return cachedData;
    // }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      // const {lat, lon} = data.coord;
      //
      // const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`);
      // const forecastData = await forecastResponse.json();
      //
      // const weeklyForecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`);
      // const weeklyData = await weeklyForecastResponse.json();

      const weatherData: DetailedLocationWeather = {
        id: data.id,
        location_name: data.name,
        location_country: data.sys.country,
        weather_condition: data.weather[0]?.description || 'No description',
        temperature: Math.round(data.main?.temp),
        time: new Date((data.dt + data.timezone) * 1000).toLocaleString(),
        coord: {
          lon: Math.trunc(data.coord.lon),
          lat: Math.trunc(data.coord.lat),
        },
        weather_icon_url: `https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`,
        // hourly_forecast: forecastData.hourly.map((hour: any) => ({
        //   time: new Date((hour.dt + data.timezone) * 1000).toLocaleTimeString('en-US', {
        //     hour: '2-digit',
        //     minute: '2-digit'
        //   }),
        //   temperature: Math.round(hour.temp),
        //   weather_condition: hour.weather[0]?.description || 'No description',
        // })),
        // weekly_forecast: weeklyData.daily.map((day: any) => ({
        //   date: new Date((day.dt + data.timezone) * 1000).toLocaleDateString('en-US', {weekday: 'long'}),
        //   temperature_min: Math.round(day.temp.min),
        //   temperature_max: Math.round(day.temp.max),
        //   weather_condition: day.weather[0]?.description || 'No description',
        // })),
      };

      // locationsWeatherData.value.push(weatherData);

      return weatherData;
    } catch (error) {
      throw error
    }
  }

  const getFavoriteLocations = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  }

  const saveFavoriteLocation = (coord: { id: number, lat: number, lon: number }) => {
    const favorites = getFavoriteLocations();

    console.log(favorites);
    console.log(coord);

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
    fetchSuggestions,
    fetchWeatherDetails,
    getWeatherDataById,
    getFavoriteLocations,
    saveFavoriteLocation,
    deleteFavoriteLocation,
    isLocationInFavorite
  }
})