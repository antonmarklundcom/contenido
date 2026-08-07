/**
 * ============================================================================
 *  MEDIA — EL ÚNICO ARCHIVO QUE TOCÁS DESPUÉS DE GENERAR EN HIGGSFIELD
 * ============================================================================
 *
 * Todas las URLs de video e imagen del sitio están acá. Cuando bajes los
 * archivos de Higgsfield:
 *
 *   1. Guardalos en  public/media/  con EXACTAMENTE el nombre de `file`.
 *   2. Cambiá el valor de la constante por  '/media/<file>'.
 *
 * Los valores actuales son PLACEHOLDERS que funcionan (CDN público) para que
 * el sitio se vea terminado mientras generás. Ninguno es contenido paraguayo
 * ni definitivo — todos se reemplazan.
 *
 * Los prompts que producen cada archivo están en HIGGSFIELD-PROMPTS.md,
 * numerados igual que acá.
 */

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P';

/** true mientras se usen los placeholders. Ponelo en false al terminar el swap. */
export const USING_PLACEHOLDERS = true;

/* ---------------------------------------------------------------------------
 * SECCIÓN 1 — HERO. Showreel: 4 clips que se encadenan con fundido.
 * Slot: hero-bleed · 16:9 · sin audio · 5–8s cada uno
 * ------------------------------------------------------------------------- */
export const HERO_CLIPS: { src: string; file: string }[] = [
  { src: `${CDN}/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4`, file: 'reel-01-inmobiliaria.mp4' },
  { src: `${CDN}/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4`, file: 'reel-02-concesionaria.mp4' },
  { src: `${CDN}/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4`, file: 'reel-03-clinica.mp4' },
  { src: `${CDN}/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4`, file: 'reel-04-local.mp4' },
];

/* ---------------------------------------------------------------------------
 * SECCIÓN 3 — SERVICIOS. Visual del slider, uno por servicio.
 * Slot: card-motif · 4:3 · 1024px · imagen fija
 * ------------------------------------------------------------------------- */
export const SERVICIO_MEDIA: Record<string, { src: string; file: string; alt: string }> = {
  redes: {
    src: `${CDN}/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4`,
    file: 'servicio-video-redes.mp4',
    alt: 'Grabación de un reel vertical para redes sociales en un local de Asunción',
  },
  recorridos: {
    src: `${CDN}/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4`,
    file: 'servicio-recorrido-propiedad.mp4',
    alt: 'Recorrido filmado de una propiedad en venta en Asunción',
  },
  salud: {
    src: `${CDN}/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4`,
    file: 'servicio-clinica.mp4',
    alt: 'Grabación de la sala de espera de una clínica en Asunción',
  },
  web: {
    src: `${CDN}/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4`,
    file: 'servicio-sitio-web.mp4',
    alt: 'Sitio web de un negocio paraguayo abierto en un celular',
  },
};

/* ---------------------------------------------------------------------------
 * SECCIÓN 5 — TRABAJOS. Un video por tipo de pieza.
 * Slot: card-motif · 16:9 · 6–10s
 * ------------------------------------------------------------------------- */
export const TRABAJO_MEDIA: Record<string, { src: string; file: string }> = {
  inmobiliaria: {
    src: `${CDN}/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4`,
    file: 'trabajo-recorrido-propiedad.mp4',
  },
  autos: {
    src: `${CDN}/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4`,
    file: 'trabajo-ficha-vehiculo.mp4',
  },
  clinica: {
    src: `${CDN}/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4`,
    file: 'trabajo-presentacion-clinica.mp4',
  },
  local: {
    src: `${CDN}/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4`,
    file: 'trabajo-local-producto.mp4',
  },
};

/* ---------------------------------------------------------------------------
 * SECCIÓN 5 — Fondo fijo detrás de las tarjetas de trabajos.
 * Slot: section-break · 21:9 · 1920px
 * ------------------------------------------------------------------------- */
export const TRABAJOS_BG = {
  src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_082449_46df5cc4-ad98-4541-9236-a2659c1478a4.png&w=1920&q=85',
  file: 'fondo-trabajos-asuncion.webp',
  alt: 'Vista nocturna de Asunción desde un edificio',
};
