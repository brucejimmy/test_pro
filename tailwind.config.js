/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4757',
          light: '#FF6B81',
          dark: '#E8414A',
        },
        gold: '#FFD700',
        bg_main: '#F8F9FA',
        text_primary: '#1A1A2E',
        text_secondary: '#6C757D',
      },
    },
  },
  plugins: [],
};
