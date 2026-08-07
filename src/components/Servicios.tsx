import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { SERVICIO_MEDIA } from '../media';
import { wa } from '../site';

type Servicio = {
  key: keyof typeof SERVICIO_MEDIA;
  titulo: string;
  texto: string;
  /** Enlace externo opcional (el cruce con sitiosweb.com.py). */
  link?: { href: string; label: string };
};

const SERVICIOS: Servicio[] = [
  {
    key: 'redes',
    titulo: 'Video para redes',
    texto:
      'Reels y videos verticales pensados para Instagram, Facebook y TikTok. Grabamos, editamos, subtitulamos y te los pasamos listos para publicar — sin que tengas que tocar nada.',
  },
  {
    key: 'recorridos',
    titulo: 'Recorridos y showroom',
    texto:
      'Para inmobiliarias y concesionarias: recorridos de propiedades y fichas de vehículo en video. El cliente ve la casa o el auto antes de moverse, y llegás a la visita con la mitad del trabajo hecho.',
  },
  {
    key: 'salud',
    titulo: 'Clínicas y consultorios',
    texto:
      'Presentación del consultorio, del equipo y de los tratamientos, con el tono sobrio que la salud necesita. Sin promesas de resultados y sin nada que comprometa la habilitación profesional.',
  },
  {
    key: 'web',
    titulo: 'Y el sitio donde todo eso vive',
    texto:
      'El contenido rinde el doble cuando cae en una web que convierte. Los sitios los hacemos en sitiosweb.com.py: rápidos, en el celular primero y con WhatsApp como botón principal.',
    link: { href: 'https://sitiosweb.com.py', label: 'Ver sitiosweb.com.py' },
  },
];

const AUTO_MS = 6000;

/**
 * SECCIÓN 3 — SERVICIOS. Patrón P1 (split asimétrico 5/7).
 * Izquierda: titular + lista de servicios que funciona como control del slider.
 * Derecha: panel de video que hace fundido al servicio activo.
 *
 * Avanza solo cada 6s. Se detiene con hover, con foco de teclado y con
 * prefers-reduced-motion.
 */
export default function Servicios() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [enVista, setEnVista] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // El slider no corre ni descarga video hasta que el panel entra en pantalla.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setEnVista(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reduced || !enVista) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SERVICIOS.length), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, enVista]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && enVista) {
        if (!video.src) video.src = SERVICIO_MEDIA[SERVICIOS[i].key].src;
        if (!reduced) void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [active, enVista, reduced]);

  return (
    <section id="servicios" className="bg-cream py-20 md:py-32 px-6">
      <div
        className="max-w-6xl mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[5fr_7fr] lg:items-start"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* --- Columna de texto --- */}
        <div className="lg:sticky lg:top-24">
          <p className="eyebrow text-accent-deep mb-5">Servicios</p>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] tracking-tight font-normal text-ink">
            Todo lo que tu negocio{' '}
            <em className="not-italic" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
              necesita mostrar
            </em>
          </h2>

          <p className="mt-6 text-ink-muted text-[17px] leading-relaxed">
            Trabajamos con negocios que ya funcionan y que necesitan que se note. Elegís lo que precisás, lo grabamos y
            lo entregamos editado.
          </p>

          <ul className="mt-10 flex flex-col">
            {SERVICIOS.map((servicio, i) => {
              const isActive = i === active;
              return (
                <li key={servicio.key} className="border-t border-ink/10 last:border-b">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className="w-full text-left py-5 flex items-baseline gap-4 group"
                  >
                    <span
                      className={`text-xs font-semibold tabular-nums transition-colors duration-200 ease-hover ${
                        isActive ? 'text-accent-deep' : 'text-ink/70'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`text-lg font-medium transition-colors duration-200 ease-hover ${
                        isActive ? 'text-ink' : 'text-ink/70 group-hover:text-ink'
                      }`}
                    >
                      {servicio.titulo}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-entrance ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pl-8 text-ink-muted text-[15px] leading-relaxed">
                        {servicio.texto}
                        {servicio.link && (
                          <>
                            {' '}
                            <a
                              href={servicio.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-ev="cross_site_click"
                              data-ev-loc="servicios"
                              className="inline-flex items-center gap-1 text-ink font-medium underline decoration-muted underline-offset-4 hover:decoration-accent transition-colors duration-200 ease-hover"
                            >
                              {servicio.link.label}
                              <ArrowUpRight size={14} />
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Barra de avance: solo en el activo y solo si el auto-avance corre. */}
                  <div className="h-[2px] -mt-[2px] bg-transparent overflow-hidden">
                    <div
                      key={`${i}-${active}-${paused}-${enVista}`}
                      className="h-full bg-accent"
                      style={
                        isActive && !paused && !reduced && enVista
                          ? { animation: `slider-progress ${AUTO_MS}ms linear forwards` }
                          : { width: isActive ? '100%' : '0%' }
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <a
            href={wa('servicios')}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-loc="servicios"
            className="mt-10 inline-flex items-center gap-2 bg-ink text-cream text-xs uppercase tracking-wide font-medium px-6 py-4 rounded-full hover:bg-ink-hover hover:-translate-y-1 hover:shadow-depth-2 transition-all duration-200 ease-hover"
          >
            Pedí tu presupuesto
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* --- Panel visual --- */}
        <Reveal className="lg:pt-2">
          <div ref={panelRef} className="relative aspect-[4/3] rounded-lg2 overflow-hidden bg-ink shadow-depth-2 grain">
            {SERVICIOS.map((servicio, i) => {
              const media = SERVICIO_MEDIA[servicio.key];
              return (
                <video
                  key={servicio.key}
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  // src se asigna al entrar en vista, no en el render.
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={media.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-entrance ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              );
            })}

            <div className="absolute inset-0 scrim" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-white text-lg md:text-xl font-medium">{SERVICIOS[active].titulo}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes slider-progress { from { width: 0% } to { width: 100% } }
      `}</style>
    </section>
  );
}
