# public/media/

Acá van los archivos generados en Higgsfield, con **exactamente** los nombres
del manifiesto de `HIGGSFIELD-PROMPTS.md`.

Vite copia `public/` tal cual a `dist/`, así que un archivo guardado como
`public/media/reel-01-produccion.mp4` queda servido en
`/media/reel-01-produccion.mp4`. Eso es lo que va en `src/media.ts`.

## Qué va acá

```
reel-01-produccion.mp4     + reel-01-produccion.webp    (poster)
reel-02-redes.mp4          + reel-02-redes.webp
reel-03-ugc.mp4            + reel-03-ugc.webp
reel-04-influencers.mp4    + reel-04-influencers.webp
reel-05-ia.mp4             + reel-05-ia.webp
reel-06-pauta.mp4          + reel-06-pauta.webp
hero-fondo-asuncion.webp
```

Los `.webp` de los reels se **extraen del MP4 ya comprimido**, no son la
imagen de referencia que le diste a Seedance:

```bash
ffmpeg -i reel-01-produccion.mp4 -vframes 1 -q:v 2 f.png
cwebp -q 80 f.png -o reel-01-produccion.webp
rm f.png
```

El frame 1 que renderiza Seedance nunca es idéntico a la referencia, y esa
diferencia se ve como un salto justo cuando arranca el video. Sacándolo del
MP4 final, el paso del poster al video es invisible.

`og-contenido.jpg` NO va acá — va en `public/` a secas, porque `index.html`
apunta a la raíz del dominio.

## Presupuesto

| Archivo | Objetivo |
|---|---|
| Cada `reel-0X-*.mp4` | ≤1,5 MB |
| Posters `.webp` | ≤60 KB — **los seis se cargan en el primer render** |
| `hero-fondo-asuncion.webp` | ≤180 KB — define el LCP |
| `og-contenido.jpg` | ≤200 KB |

Los pósters son más chicos que en un carrusel común porque son seis y entran
todos juntos: seis por 80 KB son 480 KB antes de que se vea un solo video.

Comandos de compresión en `HIGGSFIELD-PROMPTS.md`.

## No subir archivos crudos

Un MP4 tal cual sale de Higgsfield pesa 8–25 MB. Seis de esos son ~100 MB en el
repo y un sitio inusable en datos móviles. Comprimí SIEMPRE antes de commitear.
