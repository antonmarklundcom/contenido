/**
 * Los seis servicios de Contenido, en el orden en que se venden.
 *
 * Este array es la fuente única: alimenta las filas numeradas de la sección
 * Servicios y las etiquetas del carrusel del hero. Agregar o sacar un servicio
 * es editar acá, no tocar componentes.
 *
 * `id` se usa como clave de medios en `media.ts` y como sufijo del contexto de
 * WhatsApp (`servicio-ugc`), así se ve en el CRM por qué servicio escribieron.
 */
export type Servicio = {
  id: string;
  /** Numeral visible. Cadena, no índice: si se reordena, se reordena a mano. */
  n: string;
  nombre: string;
  /** Titular corto de la fila. Máximo ~14 caracteres por línea. */
  titulo: string;
  /** Qué incluye. Un párrafo, sin viñetas: la fila ya es una lista. */
  detalle: string;
  /** Entregables concretos. 3 o 4, en minúscula, sin punto final. */
  entrega: string[];
};

export const SERVICIOS: Servicio[] = [
  {
    id: 'produccion',
    n: '01',
    nombre: 'Contenido estratégico',
    titulo: 'Producción con estrategia',
    detalle:
      'Antes de encender la cámara definimos qué tiene que decir la marca y a quién. Después filmamos, fotografiamos y editamos: piezas que sirven igual en la web, en redes, en el newsletter y en la pauta.',
    entrega: ['estrategia y guion', 'filmación y foto', 'edición cinematográfica', 'plan editorial'],
  },
  {
    id: 'redes',
    n: '02',
    nombre: 'Gestión de redes sociales',
    titulo: 'Redes que no se apagan',
    detalle:
      'Nos hacemos cargo del calendario completo: qué se publica, cuándo y con qué copy. Diseñamos, publicamos, respondemos los mensajes y al cierre del mes mostramos qué funcionó y qué se cambia.',
    entrega: ['calendario mensual', 'diseño y copywriting', 'community management', 'reporte de resultados'],
  },
  {
    id: 'ugc',
    n: '03',
    nombre: 'Contenido UGC',
    titulo: 'Contenido que no parece publicidad',
    detalle:
      'Creadores reales mostrando el producto como lo mostraría un cliente. Elegimos el casting, escribimos el guion, dirigimos la grabación y entregamos foto y video listos para publicar o para pautar.',
    entrega: ['casting de creadores', 'guion y dirección', 'filmación y edición', 'piezas listas para pautar'],
  },
  {
    id: 'influencers',
    n: '04',
    nombre: 'Marketing con influencers',
    titulo: 'Campañas con influencers',
    detalle:
      'Seleccionamos los perfiles que le hablan a tu público, negociamos, armamos el brief y coordinamos las entregas. Contratos y derechos de uso por escrito antes de que salga la primera publicación.',
    entrega: ['selección y negociación', 'briefs creativos', 'contratos y derechos de uso', 'reporte de campaña'],
  },
  {
    id: 'ia',
    n: '05',
    nombre: 'Contenido con IA',
    titulo: 'IA con criterio humano',
    detalle:
      'Usamos IA para acelerar guiones, descripciones de producto, variantes de copy, imágenes, video y locución. Nada sale sin pasar por el tono de la marca, por SEO y por revisión de una persona.',
    entrega: ['copys y descripciones', 'imagen y video', 'locuciones', 'revisión humana y SEO'],
  },
  {
    id: 'pauta',
    n: '06',
    nombre: 'Publicidad paga',
    titulo: 'Pauta que se mide',
    detalle:
      'Auditamos lo que ya está corriendo, definimos la estrategia y producimos las creatividades. Configuramos en Meta, Google, TikTok y YouTube, y optimizamos con los números a la vista.',
    entrega: ['auditoría de campañas', 'creatividades y copys', 'segmentación y setup', 'optimización continua'],
  },
];
