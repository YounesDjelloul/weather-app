import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from "vite";
import path from "node:path";

export default defineConfig({
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./', import.meta.url)),
            '#app': path.resolve(__dirname, './node_modules/nuxt/dist/app')
        }
    }
})