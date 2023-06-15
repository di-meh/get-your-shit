import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  plugins: [require('daisyui')],
  content: [
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs'
  ],
  daisyui: {
    themes: ['forest']
  }
}