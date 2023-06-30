// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@formkit/nuxt',
    '@pinia/nuxt',
    '@nuxthq/ui',
    '@vueuse/nuxt'
  ],
  devtools: {
    enabled: true
  },
  runtimeConfig: {
    public: {
      gatewayUrl: process.env.NUXT_PUBLIC_GATEWAY_URL
    }
  },
  colorMode: {
    dataValue: 'theme'
  },
  vite: {
    server: {
      hmr: {
        port: 24679
      }
    }
  },
  ssr: false
})
