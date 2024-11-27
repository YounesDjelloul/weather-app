import type {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from "axios";
import axios from "axios";

const thirdPartyApiBaseUrls = {
    'weather': 'https://api.openweathermap.org',
}

export function createApi(baseUrl: string) {
    const api: AxiosInstance = axios.create({
        baseURL: baseUrl,
    })

    api.interceptors.request.use((config: InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>) => {
        return config
    }, (error: AxiosError) => {
        return Promise.reject(error)
    })

    return api
}

export function useApi(baseUrlName?: 'weather') {
    // setting the needed baseUrl or defaulting to localhost.
    const baseUrl: string = baseUrlName ? thirdPartyApiBaseUrls[baseUrlName] : 'https://api.openweathermap.org'
    return createApi(baseUrl)
}