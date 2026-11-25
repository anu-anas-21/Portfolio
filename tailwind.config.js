/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['General Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Geist', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#07060d', // page background
          800: '#0b0916', // alternating section
          700: '#110e1d', // card surface
          600: '#1a1630', // raised surface / border
        },
        brand: {
          DEFAULT: '#8b5cf6', // violet-500
          light: '#a855f7', // purple-500
          deep: '#6366f1', // indigo-500
          glow: '#c4b5fd', // violet-300
        },
        gold: {
          DEFAULT: '#facc15',
          deep: '#f59e0b',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        float: 'float 3.2s ease-in-out infinite',
        'light-drift': 'light-drift 14s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'light-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.45' },
          '50%': { transform: 'translate3d(4%, -3%, 0) scale(1.12)', opacity: '0.7' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(139, 92, 246, 0.5)',
        'glow-gold': '0 0 40px -8px rgba(250, 204, 21, 0.45)',
      },
    },
  },
  plugins: [],
}
