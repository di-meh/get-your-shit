// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@formkit/nuxt',
    '@pinia/nuxt',
    '@nuxthq/ui',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    'nuxt-mapbox',
  ],
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      gatewayUrl: process.env.NUXT_PUBLIC_GATEWAY_URL,
      mapboxAccessToken: process.env.NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    },
  },
  eslint: {
    lintOnStart: false,
  },
  colorMode: {
    dataValue: 'theme',
  },
  vite: {
    server: {
      hmr: {
        port: 24679,
      },
    },
  },
  ssr: false,
  mapbox: {
    accessToken: process.env.NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  },
})
