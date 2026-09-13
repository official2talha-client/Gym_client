/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#150E0B',
          card: '#211714',
          cardhi: '#2A1D18',
        },
        accent: {
          DEFAULT: '#F56A1F',
          light: '#F97316',
          dark: '#C2510C',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#B8ADA6',
        },
      },
      fontFamily: {
        display: ['"Anton"', 'Impact', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        chevronBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        chevronBounce: 'chevronBounce 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
