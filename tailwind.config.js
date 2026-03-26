/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — rich purple
        espresso: {
          50:  '#f8f5ff',
          100: '#f0e5ff',
          200: '#e0cafe',
          300: '#c9a6ff',
          400: '#a860f5',
          500: '#8033CC', // Primary purple
          600: '#6b24a8',
          700: '#581a8a',
          800: '#461367',
          900: '#380f52',
          950: '#1f0533',
        },
        coffee: {
          50:  '#f5f3ff',
          100: '#ede8ff',
          200: '#ddd4ff',
          300: '#c9a6ff',
          400: '#a860f5',
          500: '#8033CC',
          600: '#6b24a8',
          700: '#581a8a',
          800: '#461367',
          900: '#380f52',
          950: '#1f0533',
        },
        cream: {
          50:  '#f5f3ff',
          100: '#ede8ff',
          200: '#ddd4ff',
          300: '#c9b5ff',
          400: '#b091ff',
          500: '#8033CC',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'coffee-grain': "url('/images/textures/coffee-grain.png')",
        'hero-gradient': 'linear-gradient(135deg, rgba(26,13,8,0.95) 0%, rgba(90,54,15,0.8) 100%)',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.8s ease forwards',
        'slide-right':'slideRight 0.5s ease forwards',
        'shimmer':    'shimmer 1.5s infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideRight:{ from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
