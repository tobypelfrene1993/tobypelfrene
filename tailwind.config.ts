import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#122033',
        panel: '#334155',
        line: 'rgba(226, 232, 240, 0.18)',
        accent: '#7dd3fc',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 56px rgba(125, 211, 252, 0.14)',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.42' },
          '50%': { opacity: '0.75' },
        },
      },
      animation: {
        reveal: 'reveal 700ms ease-out both',
        pulseSoft: 'pulseSoft 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
