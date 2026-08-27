# contenido.com.py

Landing de una página para **Contenido.com.py** — agencia paraguaya de
contenido: estrategia, producción creativa y distribución para marcas.

React + Vite + TypeScript + Tailwind. Sin librerías de UI ni de animación.

```bash
npm install
npm run dev       # desarrollo
npm run build     # typecheck + build a dist/
npm run preview   # servir dist/
```

---

## Los tres archivos que vas a editar

Todo lo que cambia entre versiones está centralizado. No hay que buscar valores
por los componentes.

| Archivo | Qué controla |
|---|---|
| **`src/site.ts`** | Número de WhatsApp, teléfono, RUC, horarios, redes, ciudades, navegación |
| **`src/servicios.ts`** | Los seis servicios: nombre, titular, detalle y entregables |
| **`src/media.ts`** | Todas las URLs de video e imagen |

El número de WhatsApp existe en **un solo lugar** (`WA_NUMBER`). Cambiarlo es
editar una línea.

Agregar o sacar un servicio es editar el array de `servicios.ts`: la sección
Servicios se rearma sola. Si el servicio nuevo también lleva reel, se agrega la
entrada correspondiente en `HERO_REELS`.

---

## Estado de los medios

`src/media.ts` apunta hoy a **placeholders funcionales** de un CDN público, para
que el sitio se vea terminado mientras generás. Ninguno es contenido paraguayo
ni definitivo.

Los 8 prompts para generarlos están en **`HIGGSFIELD-PROMPTS.md`**, con el
manifiesto de nombres de archivo y los comandos de compresión.

Flujo: generar → comprimir con ffmpeg → guardar en `public/media/` con el nombre
del manifiesto → cambiar el valor en `media.ts` a `/media/<archivo>` → poner
`USING_PLACEHOLDERS = false`.

---

## Estructura de la página

| # | Sección | Fondo | Patrón |
|---|---|---|---|
| 01 | Hero + carrusel de reels | `night` | Pantalla completa, carrusel 3D vertical |
| 02 | Problema | `bone` | Titular a la izquierda + tres líneas numeradas |
| 03 | Servicios | `sand` | Seis filas numeradas |
| 04 | Cómo trabajamos | `bone` | Tres pasos, riel numerado |
| 05 | Ideal si / Todavía no | `sand` | Dos columnas espejadas |
| 06 | Preguntas | `bone` | `<details>` nativo |
| 07 | Contacto | `ink` | Cierre oscuro + formulario |
| 08 | Footer | `ink` | — |

Los fondos alternan `bone → sand → bone`; el hero y el cierre son los dos
bloques oscuros, así la página abre y cierra en oscuro con todo lo claro en el
medio.

### Diseño

Track **ACID EDITORIAL**, tokens resueltos en `tailwind.config.js`:

```
bone   #F7F5F2   fondo claro principal
sand   #EBE7DF   fondo claro alterno
ink    #14150F   texto sobre claro / fondo de secciones oscuras
night  #0E1723   fondo del hero
ink-muted   #63645B   cuerpo apagado — 5,59:1 sobre bone, 4,94:1 sobre sand
acid        #C8F04A   lima — sobre fondo OSCURO y como relleno de botones
acid-deep   #5A7014   lima profundo — texto chico sobre claro (5,07:1)
```

Dos profundidades del **mismo** acento: `#C8F04A` sobre `bone` da 1,2:1 y es
ilegible, por eso el texto chico usa `acid-deep`. El lima nunca es color de
texto sobre fondo claro.

Tipografía: **Instrument Sans** para todo el texto, **JetBrains Mono**
únicamente para las etiquetas en mayúscula (clase `.label`). Dos familias, cero
excepciones.

### El carrusel del hero

`src/components/CarruselReels.tsx`. Las tarjetas se posicionan por `transform`
imperativo dentro de un loop de `requestAnimationFrame`, no por clases: la
posición es continua — una tarjeta está a 1,37 de distancia mientras se
desliza — y eso no se puede expresar en utilidades de Tailwind.

Tres decisiones que existen por el tráfico real (Android con datos prepagos de
Tigo/Personal/Claro):

- Solo el clip activo y sus dos vecinos reciben `src`. El resto es póster.
- Solo el activo reproduce; los demás quedan pausados.
- Con ahorro de datos (`saveData`, 2g) o `prefers-reduced-motion` **no se
  descarga ni un MP4**: el carrusel queda como galería de pósters, navegable
  con las flechas, los puntos y el teclado.

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
`cross_site_click`.

Cada fila de Servicios tiene su propio link de WhatsApp con contexto
(`servicio-ugc`, `servicio-pauta`, …), así en el CRM se ve **por qué servicio**
escribieron sin tener que preguntarlo.

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
- El hero completo —titular, CTAs, carrusel y controles— entra arriba del
  pliegue desde 390×844 para arriba
- Un solo `<h1>`, `lang="es-PY"`, JSON-LD `ProfessionalService` con los seis
  servicios, canonical, OG
- Voseo en todos los CTA — cero formas de "tú", cero inglés en la UI
- **Todo el texto pasa contraste AA contra su fondo real** (auditado elemento
  por elemento sobre el DOM renderizado)
- `prefers-reduced-motion`: carrusel pausado, ningún video reproduciendo, todo
  el contenido visible
- Ahorro de datos: **cero MP4 descargados**, aviso visible en el carrusel
- Carrusel navegable por teclado (← →); las tarjetas del fondo quedan fuera del
  tabulado y del árbol de accesibilidad
- Menú móvil cierra con Escape
- Áreas táctiles ≥44px (los puntos del carrusel son de 26px, sobre el mínimo de
  24px de WCAG 2.2; un link en línea dentro de prosa está exento por 2.5.8)
- Cero errores de JS · `npm audit`: 0 vulnerabilidades

### Presupuesto de página

Bundle: **57 KB gzip JS + 5,4 KB gzip CSS**. El peso real lo van a definir los
videos: comprimidos a ≤1,5 MB cada uno como indica `HIGGSFIELD-PROMPTS.md`.

---

## Pendiente antes de lanzar

Nada de esto está inventado en el sitio — las filas se ocultan solas mientras
falten los datos.

- [ ] **Confirmar el número de WhatsApp.** Hoy usa el stage-1 `+595 995 628 862`
- [ ] **RUC** — `TRUST.ruc` está vacío; la fila no se muestra hasta cargarlo
- [ ] **Horarios reales** — `HORARIO` tiene un valor asumido
- [ ] **Instagram y Facebook** — `SOCIAL`. Para una agencia de contenido son la
      prueba de trabajo más directa que hay: sin ellos falta el respaldo obvio
- [ ] **Clientes reales** — `CLIENTES` está vacío a propósito. El muro de logos
      aparece solo cuando haya permiso por escrito
- [ ] **Reseñas y casos** — no hay sección de testimonios ni métricas de
      campaña. No se inventan: cuando haya resultados que se puedan mostrar
      con permiso del cliente, se agregan
- [ ] Generar los 8 medios (`HIGGSFIELD-PROMPTS.md`)
- [ ] Imagen OG (prompt OG) → `public/og-contenido.jpg`
- [ ] Variables `VENDERCRM_*` en Hostinger
- [ ] Verificación de Search Console por **registro TXT de DNS** (sobrevive redeploys)
- [ ] Perfil de Negocio de Google + WhatsApp Business con horarios

### Supuestos tomados

- **Los seis servicios se toman del sitio en producción** y se reescribieron en
  voseo paraguayo. Ningún precio, plazo ni resultado se publica: la respuesta de
  "¿cuánto cuesta?" explica por qué no hay lista pública en vez de inventar una.
- **El carrusel del hero se titula "Piezas producidas por nosotros"**, no
  "Clientes" ni "Casos". Mientras los reels sean generados, decir otra cosa
  sería atribuir trabajo que no existe.
- **Nada del sitio viejo se migró como prueba social.** Los nombres de
  portfolio, perfiles de influencers, testimonios, porcentajes de campaña y
  precios en USD que hay hoy en producción tienen forma de plantilla; no se
  trajeron.
- **La sección "Todavía no, si…" cruza a sitiosweb.com.py** para quien necesita
  el sitio antes que el contenido.
- **La barra fija de móvil aparece recién al salir del hero.** Dentro del hero
  el CTA "Empezar" ya está a la vista y la barra taparía el carrusel, que es
  justamente lo que hay que mirar. No lleva precio: no hay lista pública.
- **El banner de cookies aparece al bajar del hero**, no en el primer pixel. El
  sitio no carga scripts de terceros ni escribe cookies no esenciales. Si entra
  GA4, el disparo debe quedar condicionado a la respuesta guardada, no al
  render del banner.
