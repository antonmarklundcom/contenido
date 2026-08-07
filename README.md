# contenido.com.py

Landing de una página para **Contenido.com.py** — producción de video y contenido
para negocios de Asunción y el Gran Asunción (inmobiliarias, concesionarias,
clínicas, comercios).

React + Vite + TypeScript + Tailwind + lucide-react. Sin otras librerías de UI.

```bash
npm install
npm run dev       # desarrollo
npm run build     # typecheck + build a dist/
npm run preview   # servir dist/
```

---

## Los dos archivos que vas a editar

Todo lo que cambia entre versiones está centralizado. No hay que buscar valores
por los componentes.

| Archivo | Qué controla |
|---|---|
| **`src/site.ts`** | Número de WhatsApp, teléfono, RUC, horarios, redes, clientes, ciudades |
| **`src/media.ts`** | Todas las URLs de video e imagen |

El número de WhatsApp existe en **un solo lugar** (`WA_NUMBER`). Cambiarlo es
editar una línea.

---

## Estado de los medios

`src/media.ts` apunta hoy a **placeholders funcionales** de un CDN público, para
que el sitio se vea terminado mientras generás. Ninguno es contenido paraguayo
ni definitivo.

Los 13 prompts para generarlos están en **`HIGGSFIELD-PROMPTS.md`**, con el
manifiesto de nombres de archivo y los comandos de compresión.

Flujo: generar → comprimir con ffmpeg → guardar en `public/media/` con el nombre
del manifiesto → cambiar el valor en `media.ts` a `/media/<archivo>` → poner
`USING_PLACEHOLDERS = false`.

---

## Estructura de la página

Cada sección tiene asignado un patrón de layout. La regla dura: **nunca dos
patrones iguales seguidos.**

| # | Sección | Patrón |
|---|---|---|
| 01 | Hero — showreel de 4 clips encadenados | full-bleed + solape de 25px |
| 02 | Nosotros | P4 dos columnas editoriales + P2 bloque desplazado |
| 03 | Servicios — slider auto-avanzable | P1 split asimétrico 5/7 |
| 04 | Franja de confianza | P8 cinta full-bleed |
| 05 | Trabajos — columna sticky + tarjetas | P7 sticky-side scroll |
| 06 | Proceso | P5 riel numerado |
| 07 | Declaración | P9 statement sobredimensionado |
| 08 | Contacto | P1 espejado 5/7 |
| 09 | Footer | — |

Verificado: ≥1 full-bleed · ≥1 solape de borde · exactamente 1 statement
sobredimensionado · 4 variantes de tarjeta, ninguna más de 4 veces.

### Diseño

Track **WARM CRAFT**, tokens resueltos en `tailwind.config.js`:

```
base   #F6E4CF   crema (fondo de sección)
ink    #321C04   marrón oscuro (texto, botones)
cream  #FFF9F2   superficie clara
muted  #D9C4AA   divisores, botón secundario
accent      #B4762C   ocre — sobre fondo OSCURO y usos decorativos
accent-deep #8A5A1E   ocre profundo — texto chico sobre crema (4.75:1)
```

Dos tonos del **mismo** acento: `#B4762C` sobre crema da 3,04:1 y no pasa AA,
por eso el texto chico usa `accent-deep`. Verde `#25D366` solo dentro de
elementos de WhatsApp, nunca como color de diseño.

Tipografía: Inter (texto y display) + Instrument Serif itálica (solo la palabra
destacada de cada titular).

---

## Formulario → VenderCRM

`public/enviar.php` es el handler. El navegador postea ahí, **nunca directo al
CRM**: la API key no puede vivir en el bundle.

Configurar en Hostinger (hPanel → Avanzado → Variables de entorno):

```
VENDERCRM_URL      https://<dominio-crm>/api/v1/leads
VENDERCRM_API_KEY  <clave del tenant>
```

Sin esas variables el handler sigue funcionando y guarda cada lead en
`leads.log` (ignorado por git, bloqueado en `robots.txt`). Ninguna consulta se
pierde. El flujo de WhatsApp funciona igual — es la conversión principal.

---

## Analítica

Cero scripts de terceros. Cada CTA lleva `data-ev` + `data-ev-loc` y un shim de
~350 bytes en `index.html` empuja a `dataLayer`. El día que entre GA4, GTM o
Plausible, todos los nombres de evento históricos ya coinciden: es un pegado,
no un re-etiquetado.

Eventos activos: `whatsapp_click`, `call_click`, `form_submit`,
`cross_site_click`, `portfolio_open` — 15 puntos de captura en total.

Mientras tanto la atribución existe igual: **cada link de WhatsApp lleva mensaje
pre-cargado con el sitio y la sección** (`vengo de contenido.com.py (servicios)`),
así se sabe qué sección convirtió aunque el número esté compartido con otros
sitios.

---

## Deploy (Hostinger, estático + PHP)

```bash
npm run build
```

Subir el contenido de `dist/` a `public_html/`. `enviar.php`, `robots.txt`,
`sitemap.xml` y `favicon.svg` salen de `public/` y quedan en la raíz del build.

Es hosting estático con PHP disponible — no hace falta slot de Node ni base de
datos.

---

## QA verificado

Corrido con Chromium real sobre el build de producción:

- Sin scroll horizontal en 360 / 390 / 640 / 768 / 1024 / 1280 / 1440 / 1920
- Un solo `<h1>`, `lang="es-PY"`, JSON-LD `ProfessionalService`, canonical, OG
- Voseo en todos los CTA — cero formas de "tú", cero inglés en la UI
- Todo el texto pasa contraste AA contra su fondo real
- `prefers-reduced-motion`: cero transiciones activas, todo el contenido visible
- Áreas táctiles ≥48px (salvo un link en línea dentro de prosa, exento por WCAG 2.5.8)
- Cero errores de JS · `npm audit`: 0 vulnerabilidades
- Los 12 `<video>` cargan solo al entrar en pantalla — en el primer render solo
  se descargan el clip visible del hero y el siguiente

### Presupuesto de página

Bundle: **57 KB gzip JS + 5,4 KB gzip CSS**. El peso real lo van a definir los
videos: comprimidos a ≤1,5 MB cada uno como indica `HIGGSFIELD-PROMPTS.md`.

---

## Pendiente antes de lanzar

Nada de esto está inventado en el sitio — las filas se ocultan solas mientras
falten los datos.

- [ ] **Confirmar el número de WhatsApp.** Hoy usa el stage-1 `+595 995 628862`
- [ ] **RUC** — `TRUST.ruc` está vacío; la fila no se muestra hasta cargarlo
- [ ] **Horarios reales** — `HORARIO` tiene un valor asumido
- [ ] **Instagram y Facebook** — `SOCIAL`; en Paraguay pesan más que en otros mercados
- [ ] **Clientes reales** — `CLIENTES` está vacío a propósito. El muro de logos
      aparece solo cuando haya permiso por escrito
- [ ] **Reseñas** — no hay sección de testimonios. No se inventa una; cuando
      haya reseñas reales de Google, se agregan con nombre y barrio
- [ ] Generar los 13 medios (`HIGGSFIELD-PROMPTS.md`)
- [ ] Imagen OG real (1200×630) — `index.html` apunta a `/og-contenido.jpg`
- [ ] Variables `VENDERCRM_*` en Hostinger
- [ ] Verificación de Search Console por **registro TXT de DNS** (sobrevive redeploys)
- [ ] Perfil de Negocio de Google + WhatsApp Business con catálogo y horarios

### Supuestos tomados

- **Sección 2 vende servicios propios y cruza a sitiosweb.com.py.** El pedido
  ("los servicios que ofrecemos en sitiosweb.com.py") admitía dos lecturas: que
  contenido.com.py revenda los servicios web, o que la sección venda servicios y
  derive los sitios a la otra marca. Se implementó la segunda: los tres primeros
  servicios son de video y el cuarto —"Y el sitio donde todo eso vive"— enlaza a
  sitiosweb.com.py. Si querías la primera lectura, se cambia en el array
  `SERVICIOS` de `src/components/Servicios.tsx`.
- **Trabajos se describe por tipo de pieza, no por cliente.** Sin nombres, sin
  métricas, sin "caso de éxito". Cuando haya permisos, se agregan.
- **La burbuja de WhatsApp es solo desktop.** En móvil la barra fija inferior ya
  tiene WhatsApp como acción primaria; burbuja + barra + banner de cookies en
  390px tapaban el H1 y el CTA del hero.
- **El banner de cookies aparece al bajar del hero**, no en el primer pixel. El
  sitio no carga scripts de terceros ni escribe cookies no esenciales, así que
  es correcto y no pelea con la conversión. Si entra GA4, el disparo debe quedar
  condicionado a la respuesta guardada, no al render del banner.
