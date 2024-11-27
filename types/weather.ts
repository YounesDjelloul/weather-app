export interface Location {
    lat: number
    lon: number
    name: string
}

export interface LocationWeather {
    id: number
    location_name: string
    weather_condition: string
    temperature: number
    time: string
    coord: {
        lon: number
        lat: number
    },
    weather_icon_url: string
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
