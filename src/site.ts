/**
 * Constantes del negocio. TODO lo que cambia entre versiones vive acá.
 *
 * Regla dura: el número de WhatsApp existe en UN solo lugar. Cambiarlo es
 * editar una línea, no buscar por todo el proyecto.
 */

/** Número stage-1 compartido. Confirmar antes de lanzar. */
export const WA_NUMBER = '595995628862';
export const PHONE_DISPLAY = '+595 995 628 862';
export const PHONE_TEL = '+595995628862';

export const SITE_NAME = 'Contenido.com.py';
export const SITE_DOMAIN = 'contenido.com.py';

/**
 * Link de WhatsApp con mensaje pre-cargado. El mensaje identifica sitio Y
 * sección: con un número compartido entre varios sitios, esto es la única
 * atribución que existe.
 */
export function wa(context: string): string {
  const text = `Hola, vengo de ${SITE_DOMAIN} (${context}) - quiero consultar por `;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Datos de confianza. Los que están vacíos NO se renderizan — la fila
 * desaparece. Nunca inventar RUC, años, cantidad de trabajos ni garantías.
 */
export const TRUST = {
  /** Completar con el RUC real. Vacío = la franja no muestra la fila. */
  ruc: '',
  /** Completar si hay facturación legal habilitada. */
  facturaLegal: true,
  cobertura: 'Asunción y Gran Asunción',
  presupuesto: 'Presupuesto sin costo',
  respuesta: 'Respondemos por WhatsApp',
};

export const HORARIO = 'Lunes a viernes · 8:00 a 18:00';

/**
 * Redes. Vacío = el link no se renderiza. En Paraguay Facebook e Instagram
 * pesan más que en otros mercados: completarlos antes de lanzar.
 */
export const SOCIAL = {
  instagram: '',
  facebook: '',
};

/**
 * Clientes reales. Se deja VACÍO a propósito: un muro de logos inventado es
 * exactamente el tipo de cosa que en Paraguay se verifica. Cuando haya
 * permisos por escrito, cargar acá y el bloque aparece solo.
 */
export const CLIENTES: { nombre: string; logo: string }[] = [];

export const CIUDADES = [
  'Asunción',
  'Luque',
  'San Lorenzo',
  'Fernando de la Mora',
  'Lambaré',
  'Capiatá',
  'Mariano Roque Alonso',
];
