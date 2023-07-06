import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('daisyui'),
    // require('@formkit/themes/tailwindcss')
  ],
  content: [
    // './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs'
  ],
  daisyui: {
    themes: ['forest', 'lemonade'],
  },
}
