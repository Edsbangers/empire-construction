import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#1B263B',
          50: '#E8EBF0',
          100: '#D1D6E1',
          200: '#A3ADC3',
          300: '#7584A5',
          400: '#475B87',
          500: '#1B263B',
          600: '#161F31',
          700: '#111827',
          800: '#0C111D',
          900: '#070A13',
        },
        'gold': {
          DEFAULT: '#E09F3E',
          50: '#FCF5E9',
          100: '#F9EBD3',
          200: '#F3D7A7',
          300: '#EDC37B',
          400: '#E7AF4F',
          500: '#E09F3E',
          600: '#C7882A',
          700: '#9A6A21',
          800: '#6D4B17',
          900: '#402C0E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
