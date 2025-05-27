/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // Soft green shadows for different depths
        'green-sm': '0 1px 3px 0 rgba(34, 197, 94, 0.3)',
        'green-md': '0 4px 6px -1px rgba(34, 197, 94, 0.4), 0 2px 4px -2px rgba(34, 197, 94, 0.3)',
        'green-lg': '0 10px 15px -3px rgba(34, 197, 94, 0.5), 0 4px 6px -4px rgba(34, 197, 94, 0.4)',
        'green-xl': '0 20px 25px -5px rgba(34, 197, 94, 0.6), 0 10px 10px -5px rgba(34, 197, 94, 0.5)',
        green: '0 4px 8px 0 rgba(34, 197, 94, 0.4)',
      },
      colors: {
        greenShadow: 'rgba(34, 197, 94, 0.4)',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-5px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      
    },
  },
  plugins: [],
};
