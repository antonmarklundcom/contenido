/**
 * Las preguntas de la sección Preguntas.
 *
 * Vive en su propio módulo, y no dentro del componente, porque lo consumen
 * dos cosas: el acordeón que se renderiza en el cliente y el JSON-LD de
 * `FAQPage` que `vite.config.ts` inyecta en el HTML **en tiempo de build**.
 *
 * Esa es la razón de fondo: si el schema se escribiera a mano en index.html,
 * el día que se edite una respuesta acá el texto y el marcado se separan sin
 * que nadie lo note, y Google indexa una respuesta que el sitio ya no da.
 *
 * Ninguna respuesta promete un precio, un plazo ni un resultado. Las dos
 * primeras son las que más frenan una consulta por WhatsApp en Paraguay:
 * cuánto sale y de quién queda el material.
 */
export type Pregunta = { q: string; a: string };

export const PREGUNTAS: Pregunta[] = [
  {
    q: '¿Trabajan por proyecto o por mes?',
    a: 'Las dos formas. Una producción puntual se cotiza por proyecto. Redes, UGC y pauta funcionan mucho mejor con un acuerdo mensual, porque lo que da resultado es la constancia, no la pieza suelta.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende del alcance: cuántas piezas, cuántas jornadas de filmación y si hay pauta o creadores de por medio. Por eso no hay lista de precios pública. Contanos qué necesitás y te pasamos un presupuesto sin costo.',
  },
  {
    q: '¿El material queda a mi nombre?',
    a: 'Sí. Las piezas finales y los archivos originales son de tu marca. Cuando hay creadores o influencers, los derechos de uso quedan por escrito antes de que salga la primera publicación: por cuánto tiempo, en qué canales y para qué campañas.',
  },
  {
    q: '¿Filman fuera de Asunción?',
    a: 'La base es Asunción y el Gran Asunción, y ahí trabajamos sin recargo. Al interior vamos coordinando la fecha y los viáticos con anticipación.',
  },
  {
    q: '¿Cómo usan la inteligencia artificial?',
    a: 'Como herramienta, no como reemplazo. Acelera guiones, variantes de copy, imágenes, video y locución. Todo pasa después por el tono de la marca, por SEO y por revisión de una persona antes de publicarse. Si un contenido es generado con IA y corresponde aclararlo, se aclara.',
  },
  {
    q: '¿Tengo que estar en la grabación?',
    a: 'En la primera conviene que estés: es donde se define el tono. Después trabajamos con un guion aprobado y coordinamos todo por WhatsApp.',
  },
];
