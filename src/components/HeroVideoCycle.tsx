import { useEffect, useMemo, useRef, useState } from 'react';
import { HERO_CLIPS } from '../media';

/** `navigator.connection` no está en lib.dom todavía. */
type ConexionLenta = Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };

function preferenciasDeAhorro() {
  if (typeof navigator === 'undefined') return false;
  const c = (navigator as ConexionLenta).connection;
  if (!c) return false;
  // saveData explícito, o una red que no va a sostener video igual.
  return c.saveData === true || c.effectiveType === 'slow-2g' || c.effectiveType === '2g';
}

/**
 * Showreel del hero. Encadena los clips de HERO_CLIPS con un fundido de 900ms:
 * cada clip avanza al TERMINAR, no por temporizador, así nunca corta a mitad
 * de un movimiento de cámara.
 *
 * Tres decisiones que existen por el tráfico real de este sitio — Android en
 * datos prepagos de Tigo/Personal/Claro:
 *
 *   · En móvil se usan solo los 2 primeros clips. Cuatro clips en un celular
 *     es el doble de megas para un showreel que se ve 8 segundos.
 *   · Con ahorro de datos activado (o red 2g) NO se descarga ningún video:
 *     queda el poster fijo. El sitio sigue viéndose bien.
 *   · Solo el clip actual y el siguiente se descargan.
 */
export default function HeroVideoCycle() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [ahorro] = useState(preferenciasDeAhorro);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  // Se decide una vez al montar: cambiar la cantidad de clips a mitad de
  // reproducción por un giro de pantalla se vería como un salto.
  const [esMovil] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 767px)').matches
  );
  const clips = useMemo(() => (esMovil ? HERO_CLIPS.slice(0, 2) : HERO_CLIPS), [esMovil]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const estatico = ahorro || reduced;

  useEffect(() => {
    if (estatico) return;
    refs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        // play() rechaza si el navegador bloquea la reproducción; queda el
        // poster, que sigue siendo un hero válido.
        void video.play().catch(() => undefined);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [index, estatico]);

  const next = () => {
    if (estatico) return;
    setIndex((i) => (i + 1) % clips.length);
  };

  const primerPoster = clips[0]?.poster;

  // Sin video: solo el poster. Ni un byte de MP4.
  if (estatico) {
    return (
      <div className="absolute inset-0 bg-ink">
        {primerPoster && (
          <img
            src={primerPoster}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-ink">
      {clips.map((clip, i) => (
        <video
          key={clip.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={clip.src}
          poster={clip.poster || undefined}
          muted
          loop={clips.length === 1}
          playsInline
          // Solo el clip actual y el siguiente se descargan.
          preload={i === index || i === (index + 1) % clips.length ? 'auto' : 'none'}
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
