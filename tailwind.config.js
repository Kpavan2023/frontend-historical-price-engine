/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,vue}", // Includes app/page.vue and app/globals.css
    "./pages/**/*.{js,ts,jsx,tsx,vue}",
    "./components/**/*.{js,ts,jsx,tsx,vue}",
    "./app/globals.css", // Explicitly include
    "./hooks/**/*.{js,ts,jsx,tsx}",  
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        glow: '0 0 15px rgba(79, 70, 229, 0.5)',
      },
      colors: {
        primary: { DEFAULT: '#4F46E5', dark: '#A5B4FC' },
        secondary: { DEFAULT: '#A855F7', dark: '#C084FC' },
        accent: { DEFAULT: '#EC4899', dark: '#F472B6' },
      },
    },
  },
  plugins: [],
}