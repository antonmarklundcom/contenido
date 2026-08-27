import { useCallback, useEffect, useRef, useState } from 'react';
import { HERO_REELS } from '../media';

/** `navigator.connection` no está en lib.dom todavía. */
type ConexionLenta = Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };

function ahorroDeDatos() {
  if (typeof navigator === 'undefined') return false;
  const c = (navigator as ConexionLenta).connection;
  if (!c) return false;
  // saveData explícito, o una red que no va a sostener video igual.
  return c.saveData === true || c.effectiveType === 'slow-2g' || c.effectiveType === '2g';
}

const N = HERO_REELS.length;
/** Cada cuánto avanza solo, en ms. */
const AVANCE = 4200;

/**
 * Carrusel 3D de reels verticales. Es lo primero que ve el visitante y lo
 * único que prueba, sin decir una palabra, que sabemos filmar.
 *
 * Las tarjetas se posicionan por transform imperativo en un loop de rAF, no
 * por clases: la posición es continua (la tarjeta está a 1,37 de distancia
 * mientras se desliza), y eso no se puede expresar en utilidades.
 *
 * Reglas de datos — el tráfico real es Android con prepago de Tigo/Personal/Claro:
 *   · Solo el clip activo y sus dos vecinos reciben `src`. El resto es póster.
 *   · Solo el activo reproduce; los demás quedan pausados en su primer frame.
 *   · Con ahorro de datos o `prefers-reduced-motion` NO se descarga ni un MP4:
 *     el carrusel queda como una galería de pósters, navegable igual.
 */
export default function CarruselReels() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [estatico] = useState(() => ahorroDeDatos());

  // Posición continua (pos) persiguiendo un entero (target). Fuera de estado:
  // cambia 60 veces por segundo y no debe provocar renders.
  const pos = useRef(0);
  const target = useRef(0);
  const ultimoAvance = useRef(0);
  const ultimoFrame = useRef(0);
  const encima = useRef(false);
  const arrastreX = useRef<number | null>(null);
  const reducido = useRef(false);

  /** Coloca las tarjetas según `pos.current`. */
  const acomodar = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const sw = stage.clientWidth;
    const sh = stage.clientHeight;
    if (!sw || !sh) return;

    const angosto = sw < 700;
    let alto = Math.max(180, sh - 6);
    let ancho = (alto * 9) / 16;
    const anchoMax = angosto ? sw * 0.54 : Math.min(230, sw * 0.19);
    if (ancho > anchoMax) {
      ancho = anchoMax;
      alto = (ancho * 16) / 9;
    }

    const paso = ancho * (angosto ? 0.68 : 0.92);
    const profundidad = angosto ? 78 : 140;
    const giro = angosto ? -11 : -16;
    const mitad = N / 2;

    const tarjetas = stage.querySelectorAll<HTMLElement>('[data-card]');
    tarjetas.forEach((card, i) => {
      // Distancia con envoltura: la tarjeta 0 puede estar a la derecha de la 5.
      let offset = i - pos.current;
      offset = (((offset % N) + N + mitad) % N) - mitad;
      const d = Math.abs(offset);

      card.style.width = `${ancho}px`;
      card.style.height = `${alto}px`;
      card.style.transform = `translateX(calc(-50% + ${(offset * paso).toFixed(2)}px)) translateZ(${(-d * profundidad).toFixed(1)}px) rotateY(${(offset * giro).toFixed(2)}deg) scale(${Math.max(0.55, 1 - d * 0.045).toFixed(3)})`;
      card.style.zIndex = String(100 - Math.round(d * 10));
      card.style.opacity = String(Math.max(0, 1 - Math.max(0, d - 1.7) * 0.85).toFixed(3));
      card.style.pointerEvents = d > 2.4 ? 'none' : 'auto';
      // Las tarjetas del fondo salen del árbol de accesibilidad y del tabulado:
      // seis destinos de tab para el mismo carrusel es ruido para un lector.
      card.setAttribute('aria-hidden', d > 1.6 ? 'true' : 'false');
      card.tabIndex = d > 1.6 ? -1 : 0;
    });
  }, []);

  const irA = useCallback((i: number) => {
    const actual = ((Math.round(target.current) % N) + N) % N;
    let delta = i - actual;
    // Siempre por el camino corto: del 5 al 0 se va hacia adelante, no seis atrás.
    if (delta > N / 2) delta -= N;
    if (delta < -N / 2) delta += N;
    target.current = Math.round(target.current) + delta;
    ultimoAvance.current = performance.now();
  }, []);

  const mover = useCallback((paso: number) => {
    target.current = Math.round(target.current) + paso;
    ultimoAvance.current = performance.now();
  }, []);

  useEffect(() => {
    reducido.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducido.current) setPausado(true);

    let frame = 0;
    const tick = (t: number) => {
      frame = requestAnimationFrame(tick);
      if (!ultimoFrame.current) {
        ultimoFrame.current = t;
        ultimoAvance.current = t;
        return;
      }
      const dt = Math.min(64, t - ultimoFrame.current);
      ultimoFrame.current = t;

      const corriendo = !pausado && !encima.current && !reducido.current;
      if (corriendo && t - ultimoAvance.current > AVANCE) {
        ultimoAvance.current = t;
        target.current += 1;
      }

      const diff = target.current - pos.current;
      if (Math.abs(diff) > 0.0005) {
        pos.current += diff * Math.min(1, dt / 260);
        acomodar();
        const nuevo = ((Math.round(pos.current) % N) + N) % N;
        setActivo((prev) => (prev === nuevo ? prev : nuevo));
      }
    };

    acomodar();
    frame = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => acomodar());
    if (stageRef.current) ro.observe(stageRef.current);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [acomodar, pausado]);

  /** Carga y reproducción: solo el activo suena de fondo, los vecinos precargan. */
  useEffect(() => {
    if (estatico) return;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      const d = Math.min((i - activo + N) % N, (activo - i + N) % N);
      if (d <= 1 && !video.src) video.src = HERO_REELS[i].src;
      if (i === activo && !reducido.current) {
        // play() rechaza si el navegador bloquea la reproducción: queda el
        // póster, que sigue siendo una tarjeta válida.
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activo, estatico]);

  const reel = HERO_REELS[activo];

  return (
    <div
      id="reels"
      ref={rootRef}
      tabIndex={0}
      aria-roledescription="carrusel"
      aria-label="Reels producidos por Contenido. Usá las flechas izquierda y derecha para navegar."
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          mover(-1);
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          mover(1);
        }
      }}
      onPointerEnter={() => {
        encima.current = true;
      }}
      onPointerLeave={() => {
        encima.current = false;
      }}
      onPointerDown={(e) => {
        arrastreX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (arrastreX.current == null) return;
        const dx = e.clientX - arrastreX.current;
        arrastreX.current = null;
        if (Math.abs(dx) > 40) mover(dx < 0 ? 1 : -1);
      }}
      className="relative z-[4] grid grid-rows-[auto_minmax(0,1fr)_auto] gap-2 sm:gap-4 w-full max-w-[1180px] min-h-0 mx-auto mt-[clamp(16px,3svh,44px)] pb-[clamp(12px,2.6svh,26px)] outline-offset-8"
    >
      <p className="label text-[0.52rem] sm:text-[0.6rem] text-bone/60 flex flex-wrap justify-center gap-1.5 !max-w-none m-0">
        Piezas producidas por nosotros
        {estatico && <span className="text-bone/55">— modo ahorro de datos</span>}
      </p>

      <div
        ref={stageRef}
        className="relative min-h-[150px] h-full"
        style={{ perspective: '1600px', perspectiveOrigin: '50% 42%', transformStyle: 'preserve-3d' }}
      >
        {HERO_REELS.map((r, i) => (
          <button
            key={r.id}
            type="button"
            data-card
            onClick={() => irA(i)}
            aria-label={`${r.tag} — ${r.nombre}`}
            className="absolute left-1/2 bottom-0 block p-0 overflow-hidden rounded-[22px] border border-white/40 bg-night shadow-card cursor-pointer will-change-transform [backface-visibility:hidden]"
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              poster={r.poster || undefined}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="flex flex-wrap items-baseline gap-2.5 m-0 min-h-[24px] text-bone !max-w-none">
          <span className="label text-[0.56rem] text-bone/50">{reel.tag}</span>
          <strong className="text-base sm:text-lg font-medium tracking-head">{reel.nombre}</strong>
        </p>

        <div className="flex items-center gap-2">
          <div role="tablist" aria-label="Elegir reel" className="flex items-center gap-1.5 mr-1">
            {HERO_REELS.map((r, i) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={i === activo}
                aria-label={r.nombre}
                onClick={() => irA(i)}
                className="w-[26px] h-[26px] p-0 border-0 bg-transparent cursor-pointer grid place-items-center"
              >
                <span
                  aria-hidden="true"
                  className={`block h-[3px] rounded-full transition-all duration-300 ease-hover ${
                    i === activo ? 'w-[22px] bg-acid' : 'w-2.5 bg-bone/35'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => mover(-1)}
            aria-label="Reel anterior"
            className="min-w-[44px] h-11 rounded-full border border-bone/25 bg-night/35 text-bone/85 backdrop-blur-sm text-sm"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => mover(1)}
            aria-label="Reel siguiente"
            className="min-w-[44px] h-11 rounded-full border border-bone/25 bg-night/35 text-bone/85 backdrop-blur-sm text-sm"
          >
            →
          </button>
          <button
            type="button"
            onClick={() => setPausado((v) => !v)}
            aria-pressed={pausado}
            aria-label={pausado ? 'Reanudar carrusel' : 'Pausar carrusel'}
            className="label text-[0.56rem] min-w-[44px] h-11 px-3 rounded-full border border-bone/25 bg-night/35 text-bone/85 backdrop-blur-sm"
          >
            {pausado ? 'Play' : 'Pausa'}
          </button>
        </div>
      </div>
    </div>
  );
}
