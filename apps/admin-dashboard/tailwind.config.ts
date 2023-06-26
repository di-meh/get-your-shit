import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
    // require('@formkit/themes/tailwindcss')
  ],
  content: [
    // './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs'
  ],
  daisyui: {
    themes: ['forest', 'lemonade']
  }
}
