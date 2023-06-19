// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@formkit/nuxt',
    '@pinia/nuxt',
    '@nuxthq/ui',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt'
  ],
  pinia: {
    autoImports: ['defineStore']
  },
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
  }
})
