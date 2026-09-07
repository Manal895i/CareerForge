/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        brand: {
          DEFAULT: '#0D9488',
          light:   '#14B8A6',
          dark:    '#0F766E',
          glow:    'rgba(13,148,136,0.25)',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          card:    '#FFFFFF',
          dark:    '#0F172A',
          'dark-card': '#1E293B',
        },
        slate: {
          950: '#020617',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card':       '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.10)',
        'teal':       '0 8px 25px rgba(13,148,136,0.25)',
        'teal-lg':    '0 15px 40px rgba(13,148,136,0.30)',
      },
      backgroundImage: {
        'brand-gradient':  'linear-gradient(135deg,#0D9488,#06B6D4)',
        'brand-gradient-r':'linear-gradient(135deg,#06B6D4,#0D9488)',
        'hero-gradient':   'linear-gradient(135deg,#0D9488 0%,#0891B2 50%,#0284C7 100%)',
        'orange-gradient': 'linear-gradient(135deg,#F97316,#EF4444)',
        'mesh-light':      'radial-gradient(at 80% 20%,rgba(13,148,136,.05) 0,transparent 50%),radial-gradient(at 20% 80%,rgba(6,182,212,.04) 0,transparent 50%)',
      },
      animation: {
        'count-up':       'countUp 1s ease-out forwards',
        'fade-in-up':     'fadeInUp 0.5s ease-out forwards',
        'progress-fill':  'progressFill 1s ease-out forwards',
        'pulse-soft':     'pulseSoft 2s ease-in-out infinite',
        'shimmer':        'shimmer 1.5s infinite',
        'confetti-burst': 'confettiBurst 0.6s ease-out forwards',
        'spin-slow':      'spin 3s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progressFill: {
          '0%':   { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '.7' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        confettiBurst: {
          '0%':   { transform: 'scale(1)', opacity: '1' },
          '50%':  { transform: 'scale(1.3)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
