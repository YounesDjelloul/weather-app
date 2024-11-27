export interface Favorite { id: number, lat: number, lon: number }

export interface SearchResult {
    id: number
    lat: number
    lon: number
    location_name: string
    location_country: string
}

export interface DetailedLocationWeather {
    id: number
    location_name: string
    location_country: string
    weather_condition: string
    temperature: number
    time: string
    datetime: string
    coord: {
        lon: number
        lat: number
    },
    weather_icon_url: string
    hourly_forecast?: {
        time: string
        temperature: number
        weather_condition: string
    }
    weekly_forecast?: {
        date: string
        temperature_min: number
        temperature_max: number
        weather_condition: string
    }
}

export interface WeatherApiResponse {
    coord: {
        lon: number
        lat: number
    }
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
        gust?: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type?: number
        id?: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}
