/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
        'min-800': { 'max': '799px' }
      }
    },
  },
  plugins: [],
};
