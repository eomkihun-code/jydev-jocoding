/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Stitch "The Curated Hearth" 디자인 시스템 (dinnerRecommand)
        'primary':                  '#F26B1D',
        'on-primary':               '#ffffff',
        'primary-container':        '#fff0ea',
        'on-primary-container':     '#411500',
        'surface':                  '#f7f6f3',
        'on-background':            '#2e2f2d',
        'surface-container':        '#e8e8e5',
        'surface-container-low':    '#f1f1ee',
        'surface-container-lowest': '#ffffff',
        'on-surface':               '#2e2f2d',
        'on-surface-variant':       '#5b5c5a',
        'outline':                  '#767775',
        'outline-variant':          '#adadab',
        'tertiary':                 '#705900',
        'tertiary-container':       '#fdd34d',
        // 기존 brand (하위 호환)
        brand: {
          50:  '#fff7ed', 100: '#ffedd5', 200: '#fed7aa',
          300: '#fdba74', 400: '#fb923c', 500: '#F26B1D',
          600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12',
        },
        // stitch 별칭
        stitch: {
          primary:         '#F26B1D',
          'primary-lit':   '#ff7a32',
          surface:         '#f7f6f3',
          'surface-low':   '#f1f1ee',
          'surface-hi':    '#ffffff',
          'surface-dim':   '#e8e8e5',
          text:            '#2e2f2d',
          'text-muted':    '#5b5c5a',
          outline:         '#767775',
        },
      },
      fontFamily: {
        headline: ['"Noto Serif"', 'Georgia', 'serif'],
        body:     ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        label:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif:    ['"Noto Serif"', 'Georgia', 'serif'],
        sans:     ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
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
