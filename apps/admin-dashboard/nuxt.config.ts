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
    enabled: true
  },
  runtimeConfig: {
    public: {
      gatewayUrl: process.env.NUXT_PUBLIC_GATEWAY_URL
    }
  },
  eslint: {
    lintOnStart: false
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
  ssr: false,
  mapbox: {
    accessToken: 'pk.eyJ1Ijoibmlrb2xhcGFhYWEiLCJhIjoiY2t4NXc5azQ2MTk0ejJvcWtqbmx5ZTkxaiJ9.z9gcfqUSWayg-2cSjUkiag'
  }
})
