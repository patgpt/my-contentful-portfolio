import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'


export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {

      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
        display: ['var(--font-display)'],
      },
    },
  },
  plugins: [typography],
  daisyui: {
    themes: ["light", "dark"],
  },
} satisfies Config
