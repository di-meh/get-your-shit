export default defineNuxtConfig({
    modules: ['@vite-pwa/nuxt'],
    pwa: {
        manifest: {
            name: 'Get Your Shit',
            short_name: 'GYS',
            description: 'Buy some dope shit online',
            lang: 'en',
        },
        meta: {
            name: 'Get Your Shit',
        },
        
        devOptions: {
            enabled: true,
        },
    }
  })