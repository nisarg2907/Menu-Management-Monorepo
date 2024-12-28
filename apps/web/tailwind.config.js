/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Sans Jakarta', 'sans-serif'], 
      },
      colors: {
        gray: {
          900: '#1a1d27',
        },
      },
    },
  },
  plugins: [],
};
