/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom dark theme colors from existing design
        'dark-bg': '#111827',
        'dark-card': '#1f2937',
        'dark-border': '#374151',
        'dark-text': '#d1d5db',
        'dark-text-light': '#f9fafb',
        'input-yellow': '#fbbf24',
        'result-green': '#34d399',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
