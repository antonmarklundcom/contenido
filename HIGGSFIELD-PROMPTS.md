# Higgsfield — prompts para contenido.com.py

Todos los prompts de acá son **autónomos**: se copian y se pegan tal cual en la
UI de Higgsfield. No llevan `<<<element_id>>>` ni ningún marcador — esa sintaxis
solo se resuelve cuando la generación sale por MCP, y pegada a mano termina
escrita dentro de la imagen.

Por eso cada prompt repite paleta, luz, lente y ambiente: la consistencia entre
las 14 piezas vive en las palabras, no en un elemento de referencia compartido.

**Regla que no se rompe:** estas piezas son ilustrativas, tipo stock. Nunca se
etiquetan como el trabajo de un cliente concreto, nunca llevan el nombre de una
empresa real, y ninguna cara generada se usa como testimonio. En Paraguay eso se
verifica.

---

## Set mínimo vs. set completo

`src/media.ts` ya apunta a placeholders que funcionan, así que el sitio se ve
terminado desde hoy. Podés generar por tandas:

| Tanda | Piezas | Qué desbloquea |
|---|---|---|
| **1 — mínima** | H1–H4 + BG + OG | El hero deja de ser genérico y el link se comparte bien. Es el 80% del impacto. |
| **2** | T1–T4 | La sección Trabajos pasa a ser tuya. |
| **3** | S1–S4 | El slider de Servicios queda propio. |

Si el presupuesto aprieta: hacé la tanda 1, y en `media.ts` apuntá los slots de
Servicios a los clips de Trabajos (T1→recorridos, T3→salud, T4→redes). Solo el
slot `web` queda sin equivalente.

---

## Ajustes de generación

| | Valor |
|---|---|
| Modelo video | **Seedance 1.0 Pro** (movimiento estable, buen costo). Kling 2.5 si querés más detalle en el orbital del auto. |
| Modelo imagen (BG) | **Nano Banana Pro** o **Seedream v5 Pro**, 1920px |
| Duración clips | Hero 6–8 s · Servicios 6–8 s · Trabajos 6–10 s |
| Audio | **Sin audio.** Los `<video>` van `muted`; el audio es peso muerto. |
| Aspecto | 16:9 hero y trabajos · **1:1 servicios** · 21:9 fondo · 1.91:1 OG |

**Sobre el 1:1 de Servicios:** el panel del slider es 4:3 con `object-cover`.
Desde 1:1 recorta ~11% arriba y abajo; desde 16:9 recortaría los costados y se
pierde el encuadre. Generá 1:1 y **mantené la acción centrada**. Si tu modelo no
ofrece 1:1, usá 4:3 directo.

**Consejo de consistencia:** generá primero el **frame inicial** como imagen
(mismo prompt, sin la línea de cámara) y recién después usá image-to-video. Da
mucho más control sobre paleta y encuadre que ir directo a texto→video.

**Movimiento:** los clips del hero se encadenan con un fundido de 900 ms. Pedí
siempre un movimiento de cámara **lento y continuo**, sin cortes internos y sin
arranque/frenada bruscos — así el fundido no se nota.

### Bloque negativo (pegar al final de TODOS los prompts)

```
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

---

# TANDA 1 — HERO (16:9)

Cuatro clips que se encadenan como showreel. Van detrás del H1, con un velo
oscuro encima: **buscá contraste medio-bajo y nada de blancos quemados**, o el
texto blanco se pierde.

### H1 · `reel-01-inmobiliaria.mp4`

```
Slow continuous dolly push forward through a bright contemporary apartment living room in Asunción, Paraguay. Sheer linen curtains diffusing late afternoon sun, warm cream walls, dark walnut furniture, a few tropical plants. Warm documentary cinematography, natural available light, golden-hour warmth, muted palette of cream, deep warm brown and soft ochre, 35mm lens, shallow depth of field, gentle 35mm film grain, calm and premium, no people. Camera moves slowly and continuously at a steady pace, no cuts, no acceleration.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### H2 · `reel-02-concesionaria.mp4`

```
Slow continuous orbit around the front quarter panel of a clean modern SUV inside a warm-lit showroom in Asunción, Paraguay. Soft reflections travelling across the paint, polished concrete floor, warm tungsten pools of light. Warm documentary cinematography, natural available light mixed with warm practicals, muted palette of cream, deep warm brown and soft ochre, 50mm lens, shallow depth of field, gentle 35mm film grain, calm and premium, no people, no visible badges or brand marks. Camera arcs slowly and continuously, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### H3 · `reel-03-clinica.mp4`

```
Slow continuous dolly along a calm modern medical clinic corridor in Asunción, Paraguay, ending on an open consulting room doorway. Soft daylight through frosted glass, warm oak accents, cream walls, immaculate and quiet. Warm documentary cinematography, natural available light, muted palette of cream, deep warm brown and soft ochre, 35mm lens, shallow depth of field, gentle 35mm film grain, calm, sober and premium, no people, no medical branding. Camera glides slowly and continuously, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### H4 · `reel-04-local.mp4`

```
Slow continuous push toward a warm café counter in Asunción, Paraguay, steam rising from a freshly served plate, terracotta and wood surfaces, hanging plants blurred in the background. Warm documentary cinematography, natural available light from a window, golden-hour warmth, muted palette of cream, deep warm brown and soft ochre, 50mm lens, very shallow depth of field, gentle 35mm film grain, appetising and calm, hands may appear but no faces. Camera moves slowly and continuously, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### BG · `fondo-trabajos-asuncion.webp` — imagen 21:9, 1920px

Va detrás de las tarjetas de Trabajos con un velo `#321C04` al 80% encima.
**Tiene que ser oscura de origen**, si no el velo la aplana.

```
Wide cinematic aerial view of Asunción, Paraguay at dusk, low warm city lights beginning to glow, the Paraguay river catching the last light, silhouetted low-rise skyline, heavy atmospheric haze. Dark moody exposure, deep shadows, muted palette of deep warm brown, cream highlights and soft ochre, anamorphic 24mm look, subtle 35mm film grain, calm and premium, no people, no signage. Underexposed by one stop, rich blacks, no blown highlights.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, oversaturated colors, teal and orange grading, blue color cast, HDR halos, neon, fisheye distortion, cluttered frame, harsh direct flash
```

### OG · `og-contenido.jpg` — imagen 1.91:1, 1200×630

La miniatura que sale cuando alguien comparte el link por WhatsApp — que en
Paraguay es **el** canal donde se comparte. Es la única pieza donde el encuadre
tiene que funcionar a 300px de ancho en un chat.

**Sin texto en la imagen.** El título y la descripción los pone WhatsApp desde
las meta tags; texto quemado dentro se duplica y se ve amateur.

```
Cinematic still of a professional video camera on a tripod, seen from behind and slightly to the side, framing a bright modern living room out of focus beyond it. Interior of a contemporary house in Asunción, Paraguay, warm late afternoon light through large windows. Warm documentary cinematography, natural available light, muted palette of cream, deep warm brown and soft ochre, 35mm lens, shallow depth of field with the camera body sharp and the room softly blurred, gentle 35mm film grain, calm and premium, no people. Composition weighted to the left third, generous clean negative space on the right.
--no text, watermark, logo, brand names, signage, subtitles, captions, letters, numbers, UI overlays, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, harsh direct flash
```

Guardar como `public/og-contenido.jpg`, calidad 82, objetivo ≤200 KB.
`index.html` ya apunta a `https://contenido.com.py/og-contenido.jpg`.

---

# TANDA 2 — TRABAJOS (16:9)

Estos van dentro de tarjetas oscuras, chicos (≈600px de ancho). Encuadres
**cerrados y legibles**: un plano general con mucho detalle no se lee a ese
tamaño.

### T1 · `trabajo-recorrido-propiedad.mp4`

```
Smooth gimbal walk-through passing from a hallway into a sunlit bedroom of a contemporary Paraguayan house, doorway framing the reveal. Warm documentary cinematography, natural available light, muted palette of cream, deep warm brown and soft ochre, 24mm lens, medium depth of field, gentle 35mm film grain, calm and premium, no people. Steady continuous forward motion, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### T2 · `trabajo-ficha-vehiculo.mp4`

```
Slow tracking detail pass along the side body line of a clean modern sedan, reflections sliding across the paint, ending on the wheel arch. Warm-lit indoor showroom in Asunción, Paraguay, polished concrete, warm practical lighting. Warm documentary cinematography, muted palette of cream, deep warm brown and soft ochre, 85mm lens, very shallow depth of field, gentle 35mm film grain, premium and controlled, no people, no badges or brand marks. Slow continuous lateral tracking, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### T3 · `trabajo-presentacion-clinica.mp4`

```
Slow lateral tracking shot across a modern dental or medical treatment room in Asunción, Paraguay, clean equipment, soft daylight from a side window, warm oak cabinetry against cream walls. Warm documentary cinematography, natural available light, muted palette of cream, deep warm brown and soft ochre, 35mm lens, shallow depth of field, gentle 35mm film grain, sober, clinical and reassuring, no people, no branding. Slow continuous lateral movement, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### T4 · `trabajo-local-producto.mp4`

```
Slow overhead descent onto a beautifully plated dish being set down on a rustic wooden table, warm side light, terracotta crockery, a hand withdrawing from frame. Interior of a warm Paraguayan restaurant. Warm documentary cinematography, natural available light, muted palette of cream, deep warm brown and soft ochre, 50mm lens, very shallow depth of field, gentle 35mm film grain, appetising and premium, hands only, no faces. Slow continuous vertical descent, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

---

# TANDA 3 — SERVICIOS (1:1)

Van en el panel del slider, más grandes que las tarjetas. Acá **sí conviene que
haya personas trabajando** — ilustra el servicio y convierte mejor. Caras
permitidas, nombres y cargos nunca.

### S1 · `servicio-video-redes.mp4`

```
Over-the-shoulder shot of a young Paraguayan content creator holding a smartphone vertically, filming a product on a shop counter, small LED light just out of frame. Interior of a warm boutique in Asunción, Paraguay. Warm documentary cinematography, natural available light, muted palette of cream, deep warm brown and soft ochre, 35mm lens, shallow depth of field, gentle 35mm film grain, focused and unposed, natural expression, no eye contact with camera. Slow subtle handheld drift, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### S2 · `servicio-recorrido-propiedad.mp4`

```
A camera operator with a gimbal walking backwards through the open-plan living area of a modern Paraguayan house, filming the space ahead. Seen from behind and to the side. Warm documentary cinematography, natural available light through large windows, muted palette of cream, deep warm brown and soft ochre, 35mm lens, medium depth of field, gentle 35mm film grain, professional and calm, no faces toward camera. Slow continuous following motion, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### S3 · `servicio-clinica.mp4`

```
Calm wide shot of a modern clinic reception area in Asunción, Paraguay, a receptionist in neutral scrubs working quietly behind a warm oak counter, soft daylight from a tall window, cream walls, a single plant. Warm documentary cinematography, natural available light, muted palette of cream, deep warm brown and soft ochre, 35mm lens, shallow depth of field, gentle 35mm film grain, sober and reassuring, natural unposed expression, no eye contact with camera, no branding. Very slow push in, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

### S4 · `servicio-sitio-web.mp4`

```
Close overhead shot of a smartphone lying on a warm wooden desk showing a clean minimal website with large photography and a green chat button, a notebook and a cup of coffee beside it, a hand entering frame to scroll the screen. Warm documentary cinematography, natural window light from the left, muted palette of cream, deep warm brown and soft ochre, 50mm lens, shallow depth of field, gentle 35mm film grain, calm and premium, hands only, no faces. The on-screen content is abstract blocks and photographs, completely illegible, no readable words. Slow subtle push in, no cuts.
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, readable interface text, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

---

## Manifiesto — dónde va cada archivo

Guardá todo en `public/media/` con **exactamente** este nombre y después editá
solo `src/media.ts`. Los nombres ya son los definitivos: no hay que renombrar
nada a mano.

| # | Archivo | Slot | Ratio | Alt / etiqueta |
|---|---|---|---|---|
| H1 | `reel-01-inmobiliaria.mp4` | hero-bleed | 16:9 | — (decorativo, `aria-hidden`) |
| H2 | `reel-02-concesionaria.mp4` | hero-bleed | 16:9 | — |
| H3 | `reel-03-clinica.mp4` | hero-bleed | 16:9 | — |
| H4 | `reel-04-local.mp4` | hero-bleed | 16:9 | — |
| BG | `fondo-trabajos-asuncion.webp` | section-break | 21:9 | Vista de Asunción al atardecer |
| OG | `og-contenido.jpg` | og:image | 1.91:1 | — (miniatura al compartir) |
| T1 | `trabajo-recorrido-propiedad.mp4` | card-motif | 16:9 | Recorrido de propiedad — Inmobiliaria |
| T2 | `trabajo-ficha-vehiculo.mp4` | card-motif | 16:9 | Ficha de vehículo en video — Concesionaria |
| T3 | `trabajo-presentacion-clinica.mp4` | card-motif | 16:9 | Presentación de clínica — Salud |
| T4 | `trabajo-local-producto.mp4` | card-motif | 16:9 | Reel de local y producto — Comercio |
| S1 | `servicio-video-redes.mp4` | card-motif | 1:1 | Grabación de un reel vertical en un local de Asunción |
| S2 | `servicio-recorrido-propiedad.mp4` | card-motif | 1:1 | Recorrido filmado de una propiedad en Asunción |
| S3 | `servicio-clinica.mp4` | card-motif | 1:1 | Sala de espera de una clínica en Asunción |
| S4 | `servicio-sitio-web.mp4` | card-motif | 1:1 | Sitio web de un negocio paraguayo en un celular |

## Antes de subirlos: comprimir

Un MP4 crudo de Higgsfield pesa 8–25 MB. El presupuesto de la página es **≤500 KB
sin contar los videos**, y el hero tiene que arrancar rápido en datos móviles de
Tigo/Personal. Pasá cada clip por:

```bash
ffmpeg -i entrada.mp4 -an -vcodec libx264 -crf 30 -preset slow \
       -vf "scale=1280:-2,fps=24" -movflags +faststart salida.mp4
```

- `-an` saca el audio (los `<video>` van muted igual)
- `-crf 30` a 1280px es suficiente: se ve detrás de un velo oscuro
- `+faststart` deja el índice al principio → empieza a reproducir antes
- Objetivo: **≤1,5 MB por clip**. Si alguno pasa de 2,5 MB, subí el `crf` a 32.

Para el fondo: `cwebp -q 80 fondo.png -o fondo-trabajos-asuncion.webp`, objetivo
≤150 KB.
