# public/media/

Acá van los archivos generados en Higgsfield, con **exactamente** los nombres
del manifiesto de `HIGGSFIELD-PROMPTS.md`.

Vite copia `public/` tal cual a `dist/`, así que un archivo guardado como
`public/media/reel-01-inmobiliaria.mp4` queda servido en
`/media/reel-01-inmobiliaria.mp4`. Eso es lo que va en `src/media.ts`.

## Qué va acá

```
reel-01-inmobiliaria.mp4        + reel-01-inmobiliaria.webp   (poster)
reel-02-concesionaria.mp4       + reel-02-concesionaria.webp
reel-03-clinica.mp4             + reel-03-clinica.webp
reel-04-local.mp4               + reel-04-local.webp
trabajo-recorrido-propiedad.mp4
trabajo-ficha-vehiculo.mp4
trabajo-presentacion-clinica.mp4
trabajo-local-producto.mp4
servicio-video-redes.mp4
servicio-recorrido-propiedad.mp4
servicio-clinica.mp4
servicio-sitio-web.mp4
fondo-trabajos-asuncion.webp
```

Los `.webp` de los reels son los **frames iniciales** que usaste como
referencia en Seedance, exportados. No hay que generarlos aparte.

`og-contenido.jpg` NO va acá — va en `public/` a secas, porque `index.html`
apunta a la raíz del dominio.

## Presupuesto

| Archivo | Objetivo |
|---|---|
| `reel-01-*.mp4` (el primero del hero) | ≤900 KB — define el LCP |
| Resto de los `.mp4` | ≤1,5 MB |
| Posters `.webp` | ≤80 KB |
| `fondo-trabajos-asuncion.webp` | ≤150 KB |
| `og-contenido.jpg` | ≤200 KB |

Comandos de compresión en `HIGGSFIELD-PROMPTS.md`.

## No subir archivos crudos

Un MP4 tal cual sale de Higgsfield pesa 8–25 MB. Doce de esos son ~200 MB en
el repo y un sitio inusable en datos móviles. Comprimí SIEMPRE antes de commitear.
