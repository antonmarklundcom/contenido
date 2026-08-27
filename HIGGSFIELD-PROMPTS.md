# Higgsfield — prompts para contenido.com.py

Todos los prompts de acá son **autónomos**: se copian y se pegan tal cual en la
UI de Higgsfield. No llevan `<<<element_id>>>` ni ningún marcador — esa sintaxis
solo se resuelve cuando la generación sale por MCP, y pegada a mano termina
escrita dentro de la imagen.

Por eso cada prompt repite paleta, luz, lente y ambiente: la consistencia entre
las 8 piezas vive en las palabras, no en un elemento de referencia compartido.

**Regla que no se rompe:** estas piezas son ilustrativas, tipo stock. Nunca se
etiquetan como el trabajo de un cliente concreto, nunca llevan el nombre de una
empresa real, y ninguna cara generada se usa como testimonio. Para una agencia
de contenido esto es más delicado que para cualquier otro rubro: lo que se
muestra en el carrusel se lee como portfolio. Por eso el carrusel dice
"Piezas producidas por nosotros" y no "Clientes".

---

## Qué hay que generar

Ocho archivos. Seis son el carrusel del hero, uno es el fondo y uno es la
imagen para compartir.

| Tanda | Piezas | Qué desbloquea |
|---|---|---|
| **1 — mínima** | R1–R3 + BG + OG | El hero deja de ser genérico y el link se comparte bien. Con tres reels el carrusel ya gira: los otros tres repiten hasta que existan. |
| **2** | R4–R6 | Los seis servicios tienen su pieza propia. |

`src/media.ts` ya apunta a placeholders que funcionan, así que el sitio se ve
terminado desde hoy.

---

## Ajustes de generación

| | Valor |
|---|---|
| Modelo video | **Seedance 1.0 Pro** (movimiento estable, buen costo). Kling 2.5 si querés más detalle de textura en el UGC. |
| Modelo imagen (BG y OG) | **Nano Banana Pro** o **Seedream v5 Pro**, 1920px |
| Duración clips | 6–8 s, en loop |
| Audio | **Sin audio.** Los `<video>` van `muted`; el audio es peso muerto. |
| Aspecto | **9:16 vertical** los seis reels · 16:9 el fondo · 1.91:1 el OG |

**Sobre el 9:16:** las tarjetas del carrusel son verticales. No es un capricho
de diseño — es el formato en que el cliente va a publicar lo que le
produzcamos. Un reel horizontal ahí adentro vende el formato equivocado y
además se recorta feo con `object-cover`.

**Sobre el fondo (BG):** va detrás del H1 con tres capas de degradado encima.
La de arriba es `rgba(6,10,16,.62)`, así que el texto blanco aguanta — pero
**el tercio superior de la imagen tiene que ser oscuro igual**. Nada de cielo
quemado ni de sol en el encuadre: ahí van el titular y los links del header.

**Consejo de consistencia:** generá primero el **frame inicial** como imagen
(mismo prompt, sin la línea de cámara) y recién después usá image-to-video. Da
mucho más control sobre paleta y encuadre que ir directo a texto→video.

**Movimiento:** las tarjetas se ven chicas y en perspectiva. Pedí un movimiento
de cámara **lento y continuo**, sin cortes internos: un corte interno dentro de
una tarjeta de 200px de alto se lee como un glitch, no como edición.

### Bloque negativo (pegar al final de TODOS los prompts)

```
--no text, watermark, logo, brand names, signage, subtitles, captions, UI overlays, distorted hands, extra fingers, warped faces, plastic skin, oversaturated colors, teal and orange grading, blue color cast, HDR halos, fisheye distortion, cluttered frame, stock-photo grins, harsh direct flash, motion blur smear, duplicated limbs, jump cuts
```

---

# TANDA 1 — CARRUSEL DEL HERO (9:16 vertical)

Un reel por servicio, en el mismo orden que `SERVICIOS` en `src/servicios.ts`.

### R1 · `reel-01-produccion.mp4` — Contenido estratégico

```
Vertical 9:16 cinematic product film. A South American clothing brand studio in Asunción, Paraguay: warm terracotta and off-white walls, a rail of linen garments, tropical daylight filtered through slatted wooden blinds. A stylist's hands adjust a shirt on a mannequin. Shallow depth of field, 50mm lens, natural window light with soft falloff, muted warm palette with deep shadows, gentle film grain. Camera slowly pushes in, one continuous move, no cuts. 7 seconds.
```

### R2 · `reel-02-redes.mp4` — Gestión de redes sociales

```
Vertical 9:16 cinematic food film. A modern Paraguayan café counter at golden hour: espresso being poured, steam rising, chipa and pastries on a dark stone counter, terracotta and cream tones, potted tropical plants blurred in the background. Warm low-angle sunlight raking across the surface. 35mm lens, shallow depth of field, muted natural grade, subtle grain. Camera slowly slides sideways past the counter, one continuous move, no cuts. 7 seconds.
```

### R3 · `reel-03-ugc.mp4` — Contenido UGC

```
Vertical 9:16 handheld UGC-style clip. A young Latin American woman's hands unboxing a plain cream-coloured cosmetic jar in a sunlit apartment in Asunción, seen from her point of view. Unbranded packaging, no text on the label. Natural window light, warm domestic palette, slightly imperfect handheld framing, authentic and unpolished, 28mm lens look. Camera drifts gently with the hands, one continuous move, no cuts. 6 seconds.
```

---

# TANDA 2 — CARRUSEL DEL HERO (9:16 vertical)

### R4 · `reel-04-influencers.mp4` — Marketing con influencers

```
Vertical 9:16 cinematic lifestyle film. A South American content creator in her twenties filming herself with a phone on a small tripod, in a sunlit Asunción living room with tropical plants and warm wooden furniture. She is mid-gesture, relaxed and natural, seen slightly from the side so the face is partly turned away. Warm afternoon light, muted terracotta and cream palette, 50mm lens, shallow depth of field, subtle grain. Camera slowly arcs around her, one continuous move, no cuts. 7 seconds.
```

### R5 · `reel-05-ia.mp4` — Contenido con IA

```
Vertical 9:16 abstract cinematic clip. Macro shot of light refracting through a prism onto a warm off-white paper surface, throwing soft acid-lime and amber bands that slowly reorganise into a clean geometric pattern. Studio darkness around the edges, single controlled light source, deep shadows, high-end still-life aesthetic, 100mm macro lens, fine film grain. Camera pushes in very slowly, one continuous move, no cuts. 7 seconds.
```

### R6 · `reel-06-pauta.mp4` — Publicidad paga

```
Vertical 9:16 cinematic product film. A pair of unbranded leather sneakers rotating slowly on a matte terracotta pedestal in a dark studio. Single soft key light from the upper left, deep falloff into black, one subtle acid-lime rim light on the far edge. Product photography aesthetic, 85mm lens, shallow depth of field, fine grain. Camera orbits slowly around the pedestal, one continuous move, no cuts. 7 seconds.
```

---

# FONDO Y OG

### BG · `hero-fondo-asuncion.webp` — imagen 16:9, 1920px

Va detrás del titular. **Tercio superior oscuro, sin excepción.**

```
Wide cinematic photograph of Asunción, Paraguay at blue hour, seen from a rooftop: low skyline, warm window lights scattered across dark buildings, the Paraguay river faintly visible, deep navy and charcoal sky occupying the whole upper third with no bright sky, no sun in frame. Muted palette, warm amber points of light against cold dark tones, subtle atmospheric haze, 35mm lens, fine film grain, low-contrast highlights, nothing blown out.
```

### OG · `og-contenido.jpg` — imagen 1.91:1, 1200×630

Es lo que se ve cuando alguien pega el link en WhatsApp. **Los bordes se
recortan según el cliente: dejá el centro despejado.**

```
Wide editorial photograph, 1.91:1, of a small creative production crew filming a product on a table in a warm sunlit studio in Asunción: a camera on a tripod, a bounce card, terracotta and cream tones, tropical daylight through slatted blinds. Faces turned away or out of frame. Cinematic muted grade, 35mm lens, shallow depth of field, generous negative space in the centre of the frame, fine film grain.
```

---

## Manifiesto — dónde va cada archivo

Todos van a `public/media/` con el nombre exacto. Después se cambia el valor en
`src/media.ts` a `/media/<archivo>` y se pone `USING_PLACEHOLDERS = false`.

| Archivo | Constante en `media.ts` | Aspecto |
|---|---|---|
| `reel-01-produccion.mp4` | `HERO_REELS[0].src` | 9:16 |
| `reel-02-redes.mp4` | `HERO_REELS[1].src` | 9:16 |
| `reel-03-ugc.mp4` | `HERO_REELS[2].src` | 9:16 |
| `reel-04-influencers.mp4` | `HERO_REELS[3].src` | 9:16 |
| `reel-05-ia.mp4` | `HERO_REELS[4].src` | 9:16 |
| `reel-06-pauta.mp4` | `HERO_REELS[5].src` | 9:16 |
| `hero-fondo-asuncion.webp` | `HERO_BG.src` | 16:9 |
| `og-contenido.jpg` | `public/og-contenido.jpg` (no pasa por `media.ts`) | 1.91:1 |

### Pósters — obligatorios, uno por reel

Cada reel necesita su `poster`, y **se extrae del MP4 ya comprimido**, no de la
imagen de referencia que le diste a Seedance. El frame 1 que renderiza el
modelo nunca es idéntico a la referencia, y esa diferencia se ve como un salto
justo cuando arranca el video.

```bash
for f in reel-*.mp4; do
  ffmpeg -i "$f" -vframes 1 -q:v 2 /tmp/f.png
  cwebp -q 80 /tmp/f.png -o "${f%.mp4}.webp"
done
```

Después, en `media.ts`, cada `poster` apunta a `/media/reel-0X-....webp`.

Los pósters no son opcionales: con el ahorro de datos activado — muy común en
prepago paraguayo — **son lo único que se descarga**, y el carrusel entero se
ve solo con ellos.

## Antes de subirlos: comprimir

Cada reel tiene que quedar en **≤1,5 MB** y cada póster en **≤60 KB** (los seis
pósters se cargan en el primer render).

```bash
# Video: 9:16, 1080 de alto, sin audio
ffmpeg -i entrada.mp4 -vf "scale=-2:1080" -c:v libx264 -crf 26 -preset slow \
       -movflags +faststart -an salida.mp4

# Fondo del hero
cwebp -q 82 -resize 1920 0 fondo.png -o hero-fondo-asuncion.webp

# OG (JPG, no WebP: algunos clientes de mensajería todavía no lo previsualizan)
ffmpeg -i og.png -vf "scale=1200:630" -q:v 3 og-contenido.jpg
```
