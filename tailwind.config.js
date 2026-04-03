/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Stitch "The Curated Hearth" 디자인 시스템
        stitch: {
          primary:       '#9d3e00',
          'primary-lit': '#ff7a32',
          surface:       '#f7f6f3',
          'surface-low': '#f1f1ee',
          'surface-hi':  '#ffffff',
          'surface-dim': '#d4d5d1',
          secondary:     '#7b5400',
          'secondary-lit':'#ffc96f',
          text:          '#2e2f2d',
          'text-muted':  '#5b5c5a',
          outline:       '#767775',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        sans:  ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slot-spin': 'slotSpin 0.1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
      },
      keyframes: {
        slotSpin: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-4px)', opacity: '0.5' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
