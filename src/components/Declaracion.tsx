import { ArrowUpRight } from 'lucide-react';
import { wa } from '../site';

/**
 * SECCIÓN 7 — DECLARACIÓN. Patrón P9 (statement sobredimensionado).
 * Es el único momento "caro" de la página: uno por página, nunca dos.
 */
export default function Declaracion() {
  return (
    <section className="relative bg-ink grain overflow-hidden py-24 md:py-40 px-6">
      <div className="relative z-10 max-w-5xl mx-auto md:ml-[max(1.5rem,8vw)]">
        <p className="text-cream text-4xl sm:text-6xl lg:text-[88px] leading-[0.98] tracking-tight font-normal max-w-none">
          Tu competencia ya está{' '}
          <em className="not-italic" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
            publicando
          </em>
          .
        </p>

        <p className="mt-8 text-cream/70 text-[17px] font-medium">
          Se emparejan en una semana de grabación. Escribinos y arrancamos.
        </p>

        <a
          href={wa('declaracion')}
          target="_blank"
          rel="noopener noreferrer"
          data-ev="whatsapp_click"
          data-ev-loc="declaracion"
          className="mt-8 inline-flex items-center gap-2 bg-cream text-ink text-xs uppercase tracking-wide font-medium px-7 py-4 rounded-full hover:bg-white hover:-translate-y-1 hover:shadow-depth-2 transition-all duration-200 ease-hover"
        >
          Pedí tu presupuesto
          <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
