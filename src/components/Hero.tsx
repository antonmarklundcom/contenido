import HeroVideoCycle from './HeroVideoCycle';
import Navbar from './Navbar';
import { wa } from '../site';

/**
 * SECCIÓN 1 — HERO. Full-bleed, video de fondo, texto abajo.
 * mb-[-25px] deja que la sección crema de abajo lo pise por 25px:
 * ese es uno de los solapes de borde que exige el design system.
 *
 * Sin animación de entrada en el texto: retrasa el LCP y en 3G se ve lento.
 */
export default function Hero() {
  return (
    <section id="top" className="relative h-screen h-[100svh] overflow-hidden mb-[-25px]">
      <HeroVideoCycle />

      {/* Doble capa: velo parejo + degradado hacia abajo, para que el texto
          inferior tenga contraste sobre cualquier frame del reel. */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 scrim" />

      <Navbar />

      <div className="relative z-10 h-full flex flex-col justify-end items-center pb-24 md:pb-16 px-6">
        <p className="eyebrow text-white/80 mb-5">Asunción · Gran Asunción</p>

        <h1 className="text-center text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-normal text-white leading-[1.1] tracking-tight">
          <span className="block">Mostrá tu negocio</span>
          <span className="block">
            <em className="not-italic" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
              como se merece
            </em>
          </span>
        </h1>

        <p className="mt-6 text-center text-white/85 text-[17px] md:text-base font-medium max-w-[460px]">
          Video y contenido para inmobiliarias, concesionarias, clínicas y comercios de Asunción y el Gran Asunción.
        </p>

        <div className="mt-8 bg-black/25 backdrop-blur-md rounded-md2 flex items-center pl-6 pr-1 py-1 gap-4">
          <span className="hidden sm:inline text-white text-sm font-medium">
            Sin producciones eternas. Sin presupuestos inflados.
          </span>
          <span className="sm:hidden text-white text-sm font-medium">Sin producciones eternas.</span>
          <a
            href={wa('hero')}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-loc="hero"
            className="shrink-0 bg-white text-black text-sm font-medium px-5 py-3.5 rounded-md2 hover:bg-white/90 transition-colors duration-200 ease-hover"
          >
            Escribinos
          </a>
        </div>
      </div>
    </section>
  );
}
