export default defineNuxtConfig({
    modules: ['@vite-pwa/nuxt'],
    pwa: {
        manifest: {
            name: 'Get Your Shit',
            short_name: 'GYS',
            description: 'Buy some dope shit online',
            icons: [
                {
                    src: 'images/ubereats.png',
                    sizes: '360x360',
                    type: 'image/png',
                }
            ],
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