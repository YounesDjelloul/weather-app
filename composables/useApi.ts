import type {AxiosInstance, AxiosError} from "axios";
import axios from "axios";

const thirdPartyApiBaseUrls = {
    'weather': 'https://api.openweathermap.org',
    'backend': 'https://url.tobackend.com'
}

export function createApi(baseUrl: string) {
    const config = useRuntimeConfig();
    // Defaulting to a hard coded API KEY for demo purposes and your convenience
    // Otherwise, it should be an environment variable.
    const apiKey = config.public.weatherApiKey || 'e029cd0b391dd1ff63d7c931f3be71dd';

    const api: AxiosInstance = axios.create({
        baseURL: baseUrl,
    })

    api.interceptors.request.use((config) => {
        config.params = config.params || {};
        config.params.appid = apiKey;
        return config
    }, (error: AxiosError) => {
        return Promise.reject(error)
    })

    return api
}

export function useApi(baseUrlName?: 'weather') {
    // setting the needed baseUrl or defaulting to openweathermap.
    const baseUrl: string = baseUrlName ? thirdPartyApiBaseUrls[baseUrlName] : 'https://api.openweathermap.org'
    return createApi(baseUrl)
}