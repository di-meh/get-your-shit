// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@formkit/nuxt',
    '@pinia/nuxt',
    '@nuxthq/ui',
    '@nuxtjs/eslint-module'
  ],
  devtools: {
    enabled: true
  },
  runtimeConfig: {

  }
})
