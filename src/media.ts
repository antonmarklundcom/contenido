/**
 * ============================================================================
 *  MEDIA — EL ÚNICO ARCHIVO QUE TOCÁS DESPUÉS DE GENERAR EN HIGGSFIELD
 * ============================================================================
 *
 * Todas las URLs de video e imagen del sitio están acá. Cuando bajes los
 * archivos de Higgsfield:
 *
 *   1. Guardalos en  public/media/  con EXACTAMENTE el nombre de `file`.
 *   2. Cambiá el valor de `src` por  '/media/<file>'.
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
 * HERO — fondo. Imagen fija detrás del titular, con el degradado encima.
 * Slot: hero-bleed · 16:9 · 1920px · WebP ≤180 KB
 *
 * Es imagen y no video a propósito: el video del hero está en las tarjetas del
 * carrusel, y dos capas de video compitiendo por el ancho de banda en un
 * Android prepago es exactamente lo que hace que el hero llegue en negro.
 * ------------------------------------------------------------------------- */
export const HERO_BG = {
  src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_082449_46df5cc4-ad98-4541-9236-a2659c1478a4.png&w=1920&q=85',
  file: 'hero-fondo-asuncion.webp',
  alt: '',
};

/* ---------------------------------------------------------------------------
 * HERO — carrusel de reels. Un clip por servicio, en el mismo orden que
 * SERVICIOS en `servicios.ts`.
 * Slot: card-motif · 9:16 vertical · sin audio · 6–8s · loop · ≤1,5 MB
 *
 * Vertical porque es el formato en que el cliente va a publicar lo que le
 * produzcamos. Un reel horizontal en el carrusel vende el formato equivocado.
 *
 * `poster` se EXTRAE del MP4 ya comprimido, no es la imagen de referencia que
 * le diste a Seedance:
 *
 *     ffmpeg -i reel-01-produccion.mp4 -vframes 1 -q:v 2 f.png
 *     cwebp -q 80 f.png -o reel-01-produccion.webp
 *
 * El frame 1 que Seedance renderiza nunca es idéntico a la referencia, y esa
 * diferencia se ve como un salto en el momento exacto en que arranca el video.
 * Sacándolo del MP4 final, el corte del poster al video es invisible.
 *
 * Hace tres cosas:
 *   1. El carrusel se ve al instante, antes de que baje un byte de video.
 *   2. Es el fallback cuando el navegador bloquea el autoplay.
 *   3. Es lo ÚNICO que se carga con el ahorro de datos activado — muy común
 *      en prepago paraguayo.
 *
 * Que cada poster pese ≤60 KB: en el primer render se cargan los seis.
 * ------------------------------------------------------------------------- */
export type Reel = {
  /** Mismo id que el servicio en `servicios.ts`. */
  id: string;
  /** Etiqueta monoespaciada arriba del nombre, en el pie del carrusel. */
  tag: string;
  /** Nombre visible de la pieza. */
  nombre: string;
  src: string;
  poster: string;
  file: string;
};

export const HERO_REELS: Reel[] = [
  {
    id: 'produccion',
    tag: 'Reel 01 / Producción',
    nombre: 'Marca de indumentaria',
    src: `${CDN}/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4`,
    poster: '',
    file: 'reel-01-produccion.mp4',
  },
  {
    id: 'redes',
    tag: 'Reel 02 / Redes',
    nombre: 'Gastronomía',
    src: `${CDN}/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4`,
    poster: '',
    file: 'reel-02-redes.mp4',
  },
  {
    id: 'ugc',
    tag: 'Reel 03 / UGC',
    nombre: 'Producto en mano',
    src: `${CDN}/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4`,
    poster: '',
    file: 'reel-03-ugc.mp4',
  },
  {
    id: 'influencers',
    tag: 'Reel 04 / Influencers',
    nombre: 'Colaboración de marca',
    src: `${CDN}/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4`,
    poster: '',
    file: 'reel-04-influencers.mp4',
  },
  {
    id: 'ia',
    tag: 'Reel 05 / IA',
    nombre: 'Pieza generada y dirigida',
    src: `${CDN}/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4`,
    poster: '',
    file: 'reel-05-ia.mp4',
  },
  {
    id: 'pauta',
    tag: 'Reel 06 / Pauta',
    nombre: 'Creatividad para campaña',
    src: `${CDN}/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4`,
    poster: '',
    file: 'reel-06-pauta.mp4',
  },
];
