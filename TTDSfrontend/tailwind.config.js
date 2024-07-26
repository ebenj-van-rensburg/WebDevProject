/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-wood': '#f5deb3',
        'dark-wood': '#654321',
      },
    },
  },
  darkMode: 'class', // Enable dark mode with class strategy
  plugins: [],
}
