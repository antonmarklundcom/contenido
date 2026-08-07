/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // WARM CRAFT track — resolved tokens. Do not introduce colours outside this block.
        base: '#F6E4CF', // section background (cream)
        ink: '#321C04', // primary text / dark buttons
        'ink-muted': '#6B4A24', // muted body on cream — 6.3:1, passes AA
        cream: '#FFF9F2', // light surface (icon circles, cards)
        muted: '#D9C4AA', // dividers, secondary button bg
        'muted-hover': '#CEBA9E',
        'ink-hover': '#1F1003',
        // UN solo acento (ocre), en dos profundidades del mismo tono:
        //   accent      → sobre fondo OSCURO y usos decorativos. 4.27:1 sobre ink.
        //   accent-deep → texto chico sobre crema. 4.75:1, pasa AA.
        // #B4762C sobre crema da 3.04:1 y NO pasa: nunca usarlo para texto ahí.
        accent: '#B4762C',
        'accent-deep': '#8A5A1E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ["'Instrument Serif'", 'Georgia', 'serif'],
      },
      borderRadius: {
        sm2: '6px',
        md2: '14px',
        lg2: '28px',
      },
      boxShadow: {
        'depth-1': '0 1px 2px rgb(0 0 0/.04), 0 4px 12px rgb(0 0 0/.06)',
        'depth-2': '0 2px 4px rgb(0 0 0/.06), 0 16px 40px rgb(0 0 0/.10)',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-out',
      },
      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
        hover: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
