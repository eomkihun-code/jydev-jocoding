/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // UI Pro Max 추천: Food / Warm Red 팔레트
        'primary':                  '#DC2626',
        'on-primary':               '#ffffff',
        'primary-container':        '#fee2e2',
        'on-primary-container':     '#450a0a',
        'surface':                  '#fef2f2',
        'on-background':            '#1c0a0a',
        'surface-container':        '#fce4e4',
        'surface-container-low':    '#fef2f2',
        'surface-container-lowest': '#ffffff',
        'on-surface':               '#1c0a0a',
        'on-surface-variant':       '#6b2020',
        'outline':                  '#9b4040',
        'outline-variant':          '#fca5a5',
        'tertiary':                 '#b45309',
        'tertiary-container':       '#fef3c7',
        // 기존 brand 호환
        brand: {
          50:  '#fef2f2', 100: '#fee2e2', 200: '#fecaca',
          300: '#fca5a5', 400: '#f87171', 500: '#DC2626',
          600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d',
        },
      },
      fontFamily: {
        headline: ['"Playfair Display SC"', 'Georgia', 'serif'],
        body:     ['"Karla"', 'system-ui', 'sans-serif'],
        label:    ['"Karla"', 'system-ui', 'sans-serif'],
        serif:    ['"Playfair Display SC"', 'Georgia', 'serif'],
        sans:     ['"Karla"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slot-spin': 'slotSpin 0.1s ease-in-out infinite',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'slide-up':  'slideUp 0.4s ease forwards',
      },
      keyframes: {
        slotSpin: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%':      { transform: 'translateY(-4px)', opacity: '0.5' },
        },
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
