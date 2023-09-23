/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts}'],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

