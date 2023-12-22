/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        darkGreen: '#4AA5A5',
        lightGreen: '#75C7C0',
        lightGray: '#F5F6F7',
        darkGray: '#706F6F',
      },
    },
  },
  plugins: [],
}

