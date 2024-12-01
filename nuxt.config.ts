// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: ['@nuxt/icon', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
    app: {
        baseURL: '/weather-app/',
        buildAssetsDir: '/_nuxt/',
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    },
    runtimeConfig: {
        public: {
            weatherApiKey: ''
        }
    }
})