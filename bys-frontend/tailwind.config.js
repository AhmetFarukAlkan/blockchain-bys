/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  safelist: [
    {
      pattern: /text-(red|green|blue|purple|amber|gray)-(100|200|300|400|500|600|700|800|900)/,
    },{
      pattern: /bg-(red|green|blue|purple|amber|gray)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0e369a'
      }
    },
  },
  plugins: [],
}
