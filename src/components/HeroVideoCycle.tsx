import { useEffect, useRef, useState } from 'react';
import { HERO_CLIPS } from '../media';

/**
 * Showreel del hero. Encadena los clips de HERO_CLIPS con un fundido de 900ms:
 * cada clip avanza al terminar, no por temporizador, así nunca corta a mitad
 * de un movimiento de cámara.
 *
 * Solo el clip activo reproduce; los demás quedan pausados en su primer frame.
 * Con prefers-reduced-motion se queda fijo en el primer clip, sin ciclar.
 */
export default function HeroVideoCycle() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    refs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        // play() rechaza si el navegador bloquea la reproducción; el fondo
        // simplemente queda en el primer frame, que sigue siendo válido.
        void video.play().catch(() => undefined);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [index]);

  const next = () => {
    if (reduced) return;
    setIndex((i) => (i + 1) % HERO_CLIPS.length);
  };

  return (
    <div className="absolute inset-0 bg-ink">
      {HERO_CLIPS.map((clip, i) => (
        <video
          key={clip.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={clip.src}
          muted
          loop={HERO_CLIPS.length === 1}
          playsInline
          // Solo el clip actual y el siguiente se descargan. Cargar los cuatro
          // de entrada cuesta megas que el visitante paga.
          preload={i === index || i === (index + 1) % HERO_CLIPS.length ? 'auto' : 'none'}
          onEnded={next}
          onError={next}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[900ms] ease-entrance ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
