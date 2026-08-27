/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ACID EDITORIAL track — tokens resueltos. No introducir colores fuera de este bloque.
        bone: '#F7F5F2', // fondo claro principal
        sand: '#EBE7DF', // fondo claro alterno (secciones pares)
        ink: '#14150F', // texto sobre claro / fondo de secciones oscuras
        'ink-muted': '#63645B', // cuerpo apagado — 5.59:1 sobre bone, 4.94:1 sobre sand
        night: '#0E1723', // fondo del hero (azul casi negro, para el degradado)
        // UN solo acento (lima ácido) en dos profundidades del mismo tono:
        //   acid      → sobre fondo OSCURO y como color de relleno de botones. 14:1 sobre ink.
        //   acid-deep → texto chico y marcas sobre bone. 5.07:1, pasa AA.
        // #C8F04A sobre bone da 1,2:1 y NO pasa: nunca usarlo para texto ahí.
        acid: '#C8F04A',
        'acid-deep': '#5A7014',
      },
      fontFamily: {
        sans: ["'Instrument Sans'", 'Helvetica', 'Arial', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        md2: '14px',
        lg2: '22px',
        xl2: '26px',
      },
      letterSpacing: {
        display: '-0.055em',
        head: '-0.045em',
      },
      boxShadow: {
        card: '0 26px 64px rgb(0 0 0 / 0.42), inset 0 0 0 1px rgb(255 255 255 / 0.08)',
        cta: '0 12px 32px rgb(6 10 16 / 0.35)',
        pop: '0 20px 60px rgb(20 21 15 / 0.18)',
      },
      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.22, 0.7, 0.2, 1)',
        hover: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
