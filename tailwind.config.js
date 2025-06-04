/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc4ff',
          400: '#36a9ff',
          500: '#0f90ff',
          600: '#0071e6',
          700: '#0057b3',
          800: '#004999',
          900: '#003d80',
        },
        secondary: {
          50: '#f5f6f7',
          100: '#ebedef',
          200: '#d1d6dc',
          300: '#b7bfc9',
          400: '#8491a3',
          500: '#6b7a8f',
          600: '#556275',
          700: '#444e5f',
          800: '#3a424f',
          900: '#333944',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        display: ['Roboto', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333944',
            maxWidth: '65ch',
            h1: {
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontWeight: '600',
            },
            'article p': {
              fontFamily: 'Open Sans, system-ui, sans-serif',
              fontSize: '1.125rem',
              lineHeight: '1.75',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}