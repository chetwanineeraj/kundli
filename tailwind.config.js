/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          gold: '#d97706',
          darkgold: '#b45309',
          amber: '#f59e0b',
          maroon: '#881337',
          saffron: '#ea580c',
          parchment: '#fef3c7',
          darkbg: '#0f172a',
          carddark: '#1e293b'
        }
      },
      fontFamily: {
        sanskrit: ['Georgia', 'Cambria', 'serif']
      }
    },
  },
  plugins: [],
}
