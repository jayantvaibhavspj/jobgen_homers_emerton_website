/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#17110d',
          50: '#2a221c',
          100: '#221b16',
          200: '#1c1511',
          light: '#2d221a',
        },
        cream: {
          DEFAULT: '#fbf6f0',
          50: '#ffffff',
          100: '#fdfbf7',
          200: '#f5ebe0',
          dark: '#ebdccd',
        },
        orange: {
          burnt: '#e8700a',
          glow: '#ff8a1f',
        },
        chilli: {
          DEFAULT: '#c7341c',
          deep: '#a52610',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Kaushan Script"', 'cursive'],
      },
      borderRadius: {
        'card': '20px',
      },
      boxShadow: {
        'warm-sm': '0 4px 20px -2px rgba(23, 17, 13, 0.08)',
        'warm': '0 10px 30px -4px rgba(23, 17, 13, 0.12), 0 4px 12px -2px rgba(232, 112, 10, 0.08)',
        'warm-lg': '0 20px 40px -6px rgba(23, 17, 13, 0.25), 0 8px 24px -4px rgba(232, 112, 10, 0.15)',
        'glow-orange': '0 0 30px rgba(232, 112, 10, 0.35)',
        'glow-chilli': '0 0 30px rgba(199, 52, 28, 0.35)',
      },
    },
  },
  plugins: [],
}
