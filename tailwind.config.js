/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary/10': '#EBF5FF',
        'primary/90': '#1D4ED8',
        secondary: '#10B981',
        'secondary/10': '#ECFDF5',
        'secondary/90': '#059669',
        accent: '#8B5CF6',
        'accent/10': '#F5F3FF',
        'accent/90': '#6D28D9',
        gray: {
          750: '#2D3748',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
