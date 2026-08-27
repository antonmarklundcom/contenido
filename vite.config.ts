import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { PREGUNTAS } from './src/preguntas';
import { SERVICIOS } from './src/servicios';
import { SITE_NAME } from './src/site';

const URL_SITIO = 'https://contenido.com.py';

/**
 * Inyecta el JSON-LD derivado de los datos del sitio, en tiempo de build.
 *
 * El `ProfessionalService` sigue escrito a mano en index.html porque son datos
 * del negocio que no viven en ningún array. Estos dos, en cambio, son copias
 * exactas de contenido que ya existe en la página:
 *
 *   FAQPage  ← src/preguntas.ts
 *   Service  ← src/servicios.ts
 *
 * Escribirlos a mano garantiza que se desincronicen: alguien edita una
 * respuesta en el acordeón, el schema queda con la vieja, y Google muestra en
 * el resultado enriquecido una respuesta que el sitio ya no da. Marcar como
 * FAQ un texto que no está en la página es además motivo de penalización.
 *
 * Generándolo del mismo array, eso no puede pasar.
 */
function schemaDerivado() {
  return {
    name: 'schema-derivado',
    transformIndexHtml(html: string) {
      const faq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: PREGUNTAS.map((p) => ({
          '@type': 'Question',
          name: p.q,
          acceptedAnswer: { '@type': 'Answer', text: p.a },
        })),
      };

      const servicios = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Servicios de ${SITE_NAME}`,
        itemListElement: SERVICIOS.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Service',
            name: s.nombre,
            description: s.detalle,
            serviceType: s.nombre,
            areaServed: { '@type': 'Country', name: 'Paraguay' },
            provider: { '@type': 'ProfessionalService', name: SITE_NAME, url: URL_SITIO },
          },
        })),
      };

      const bloques = [faq, servicios]
        .map((o) => `    <script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n    </script>`)
        .join('\n');

      return html.replace('</head>', `${bloques}\n  </head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), schemaDerivado()],
  build: {
    // Hostinger static hosting: plain relative asset paths, no SSR.
    assetsInlineLimit: 2048,
  },
});
