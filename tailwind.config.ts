import type { Config } from 'tailwindcss';

/**
 * VANTA EDITIONS design tokens.
 *
 * Gold is deliberately scarce: edition numbers, the active nav item and
 * focus rings only. Everything else is black, charcoal, white and silver.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        charcoal: {
          DEFAULT: '#141414',
          raised: '#161616',
        },
        hairline: '#222222',
        silver: '#888888',
        gold: '#C9A84C',
      },
      fontFamily: {
        sans: ['var(--font-jost)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-bodoni)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // Uppercase UI labels: small, widely tracked.
        label: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.28em' }],
        // Wall-label body copy.
        caption: ['0.8125rem', { lineHeight: '1.35rem', letterSpacing: '0.01em' }],
      },
      letterSpacing: {
        label: '0.28em',
        wordmark: '0.46em',
        display: '-0.02em',
      },
      maxWidth: {
        gallery: '84rem',
        measure: '34rem',
      },
      transitionTimingFunction: {
        // Slow-out curves: things settle, they never bounce.
        gallery: 'cubic-bezier(0.22, 1, 0.36, 1)',
        weighty: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        900: '900ms',
        1200: '1200ms',
      },
      keyframes: {
        // The hero's one orchestrated moment: the gallery light dims up.
        'light-on': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translate3d(0, 1.25rem, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'light-on': 'light-on 2.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both',
        rise: 'rise 1.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'spin-slow': 'spin 1.1s linear infinite',
      },
      zIndex: {
        nav: '40',
        float: '45',
        overlay: '60',
      },
    },
  },
  plugins: [],
};

export default config;
