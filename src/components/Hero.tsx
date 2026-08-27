import CarruselReels from './CarruselReels';
import { HERO_BG } from '../media';
import { wa } from '../site';

/**
 * SECCIÓN 01 — HERO. Pantalla completa, fondo oscuro, carrusel abajo.
 *
 * El `-mt-[66px]` mete el header adentro del hero: la barra flota sobre la
 * imagen y recién se vuelve sólida al salir de acá.
 *
 * Tres capas de degradado sobre el fondo, no una: la de arriba protege el
 * titular, la del medio abre el centro para que se vea la imagen y la de abajo
 * cierra en #0E1723 exacto para que el corte con la sección siguiente no se vea.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative z-[1] grid grid-rows-[auto_minmax(0,1fr)] min-h-[100svh] -mt-[66px] px-4 sm:px-6 lg:px-8 pt-[clamp(76px,10svh,124px)] overflow-hidden isolate bg-night"
    >
      <img
        src={HERO_BG.src}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 -z-[3] w-full h-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[2]"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 34%, rgba(6,10,16,.10) 0%, rgba(6,10,16,.42) 48%, rgba(6,10,16,.78) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,10,16,.62) 0%, rgba(6,10,16,.18) 26%, rgba(6,10,16,.22) 54%, rgba(6,10,16,.72) 88%, #0E1723 100%)',
        }}
      />

      <div className="relative z-[5] grid justify-items-center w-full max-w-[940px] mx-auto text-bone text-center">
        <p className="label flex items-center gap-2.5 m-0 mb-[clamp(14px,2.2svh,22px)] text-bone/70 text-[0.58rem] sm:text-[0.68rem] !max-w-none">
          <span aria-hidden="true" className="inline-block w-[22px] h-px bg-acid" />
          Agencia de contenido · Paraguay
        </p>

        <h1 className="m-0 max-w-[19ch] font-medium tracking-display leading-[0.9] text-[clamp(2.45rem,min(6.2vw,7.9svh),4.7rem)]">
          Contenido que la gente mira
          <span className="block text-bone/55">y marcas que la gente elige</span>
        </h1>

        <p className="max-w-[38ch] mt-[clamp(16px,2.6svh,26px)] text-bone/80 text-[clamp(.98rem,2.2vw,1.12rem)] leading-relaxed">
          Estrategia, producción y distribución. De la idea al reel publicado, y a la campaña que lo empuja.
        </p>

        <div className="flex flex-wrap justify-center gap-2.5 mt-[clamp(18px,3svh,30px)]">
          <a
            href="#servicios"
            className="inline-flex items-center justify-center min-h-[52px] px-6 rounded-full border border-bone/35 bg-bone/10 text-bone label text-[0.7rem] backdrop-blur-sm whitespace-nowrap hover:bg-bone/20 transition-colors duration-200 ease-hover"
          >
            Ver servicios
          </a>
          <a
            href={wa('hero')}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-loc="hero"
            className="inline-flex items-center justify-center gap-3.5 min-h-[52px] pl-6 pr-4 rounded-full bg-acid text-ink label text-[0.7rem] shadow-cta whitespace-nowrap hover:brightness-95 transition-[filter] duration-200 ease-hover"
          >
            Empezar
            <span aria-hidden="true" className="grid place-items-center w-[30px] h-[30px] -my-1 rounded-full bg-ink text-bone">
              ↗
            </span>
          </a>
        </div>
      </div>

      <CarruselReels />
    </section>
  );
}
