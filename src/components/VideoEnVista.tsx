import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  label: string;
  className?: string;
};

/**
 * Video que SOLO carga y reproduce mientras está a la vista.
 *
 * Esto no es un detalle: casi todo el tráfico es Android con datos prepagos de
 * Tigo/Personal/Claro. Cuatro videos con autoPlay arrancando juntos se comen
 * los megas del visitante antes de que llegue a la sección.
 *
 * El src se asigna recién en la primera entrada al viewport, y se pausa al
 * salir. Con prefers-reduced-motion carga el primer frame y no reproduce.
 */
export default function VideoEnVista({ src, label, className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          if (!reduced) void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return <video ref={ref} muted loop playsInline preload="none" aria-label={label} className={className} />;
}
