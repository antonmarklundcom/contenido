import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import Reveal from './Reveal';
import VideoEnVista from './VideoEnVista';
import { TRABAJOS_BG, TRABAJO_MEDIA } from '../media';
import { CLIENTES, wa } from '../site';

type Trabajo = {
  key: keyof typeof TRABAJO_MEDIA;
  titulo: string;
  rubro: string;
  descripcion: string;
};

/**
 * Las piezas se describen por TIPO, no por cliente. No hay nombres de
 * empresas, ni resultados, ni "caso de éxito": nada de eso se inventa.
 * Cuando haya permiso por escrito de un cliente real, se agrega el nombre
 * acá y en CLIENTES (site.ts).
 */
const TRABAJOS: Trabajo[] = [
  {
    key: 'inmobiliaria',
    rubro: 'Inmobiliaria',
    titulo: 'Recorrido de propiedad',
    descripcion:
      'Un recorrido continuo de la casa o el departamento, con los ambientes en el orden en que se visitan. El interesado ya sabe si le sirve antes de coordinar la visita, y llegás a mostrar con la mitad del trabajo hecho.',
  },
  {
    key: 'autos',
    rubro: 'Concesionaria',
    titulo: 'Ficha de vehículo en video',
    descripcion:
      'Exterior, interior, motor y detalles en una pieza corta y repetible para cada unidad del stock. Se publica en Instagram y se manda por WhatsApp sin editar nada de nuevo.',
  },
  {
    key: 'clinica',
    rubro: 'Salud',
    titulo: 'Presentación de clínica',
    descripcion:
      'El consultorio, el equipamiento y el equipo, filmados con el tono sobrio que corresponde. Sin promesas de resultados y sin nada que comprometa la habilitación profesional.',
  },
  {
    key: 'local',
    rubro: 'Comercio y gastronomía',
    titulo: 'Reel de local y producto',
    descripcion:
      'El local lleno, el plato saliendo, el producto en la mano. Piezas cortas para sostener la cuenta durante el mes sin volver a producir cada semana.',
  },
];

/**
 * SECCIÓN 5 — TRABAJOS. Patrón P7 (columna izquierda sticky + tarjetas que
 * scrollean). Fondo fijo solo en desktop: bg-fixed en móvil se traba.
 */
export default function Trabajos() {
  const [activo, setActivo] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = cardRefs.current.indexOf(entry.target as HTMLElement);
          if (i !== -1) setActivo(i);
        });
      },
      { threshold: 0.6 }
    );

    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const irA = (i: number) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="trabajos" className="relative isolate overflow-hidden px-5 md:px-10 lg:px-16 py-20 md:py-32 lg:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center lg:bg-fixed"
        style={{ backgroundImage: `url(${TRABAJOS_BG.src})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/80" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 grain" />

      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[400px_1fr] xl:grid-cols-[460px_1fr] lg:gap-24 xl:gap-32">
        {/* --- Columna sticky --- */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-32">
          <div>
            <p className="eyebrow text-accent mb-5">Trabajos</p>
            <h2 className="text-white text-2xl sm:text-3xl lg:text-[46px] leading-[1.2] font-normal tracking-tight">
              Así se ve una pieza{' '}
              <em className="not-italic" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
                terminada
              </em>
            </h2>
          </div>

          <nav className="hidden lg:flex flex-col gap-2 my-10" aria-label="Tipos de trabajo">
            {TRABAJOS.map((trabajo, i) => (
              <button
                key={trabajo.key}
                type="button"
                onClick={() => irA(i)}
                className={`text-left text-sm font-medium px-5 py-3.5 rounded-md2 bg-black/20 backdrop-blur-sm transition-colors duration-200 ease-hover ${
                  i === activo ? 'text-white' : 'text-white/60 hover:text-white/85'
                }`}
              >
                {trabajo.titulo}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <p className="text-white/75 text-sm font-medium max-w-[320px]">
              Contanos qué necesitás mostrar. Te decimos qué se puede grabar y cuánto sale, sin vueltas.
            </p>
            <a
              href={wa('trabajos')}
              target="_blank"
              rel="noopener noreferrer"
              data-ev="whatsapp_click"
              data-ev-loc="trabajos"
              className="mt-5 inline-block bg-white text-black text-sm font-medium px-5 py-3.5 rounded-md2 hover:bg-white/90 transition-colors duration-200 ease-hover"
            >
              Escribinos
            </a>
          </div>
        </div>

        {/* --- Tarjetas --- */}
        <div className="flex flex-col gap-6 md:gap-10 mt-12 lg:mt-0 lg:py-32">
          {TRABAJOS.map((trabajo, i) => (
            <Reveal key={trabajo.key} from="right">
              <article
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="bg-black/25 backdrop-blur-sm rounded-lg2 p-6 md:p-10 border border-white/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <Logo size={40} fill="rgba(255,255,255,0.8)" />
                  <span className="eyebrow text-white/65">{trabajo.rubro}</span>
                </div>

                <h3 className="mt-6 text-white text-xl md:text-2xl font-medium">{trabajo.titulo}</h3>

                <div className="mt-6 aspect-video rounded-md2 overflow-hidden bg-black/30">
                  <VideoEnVista
                    src={TRABAJO_MEDIA[trabajo.key].src}
                    label={`${trabajo.titulo} — ${trabajo.rubro}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="mt-6 text-white/75 font-medium text-[15px] md:text-base leading-relaxed">
                  {trabajo.descripcion}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Muro de clientes: aparece solo cuando haya clientes reales cargados. */}
      {CLIENTES.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16 flex flex-wrap items-center justify-center gap-10">
          {CLIENTES.map((cliente) => (
            <img key={cliente.nombre} src={cliente.logo} alt={cliente.nombre} className="h-8 w-auto opacity-70" />
          ))}
        </div>
      )}
    </section>
  );
}
