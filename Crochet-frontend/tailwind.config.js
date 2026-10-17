import scrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FBF9F4',
        ivory: '#F5F1E8',
        sand: '#E8DFD0',
        taupe: '#8B6F47',
        brown: '#6B5443',
        charcoal: '#2C2C2C',
        rose: '#D4A5A5',
        sage: '#A8B5A0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.3em',
      },
      fontSize: {
        'display': ['7rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      },
    },
  },
  
  plugins: [scrollbarHide],
}

