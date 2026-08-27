import Reveal from './Reveal';
import { PREGUNTAS } from '../preguntas';

/**
 * SECCIÓN 06 — Preguntas. `<details>` nativo: sin estado de React, sin
 * librería de acordeón, y funciona con el JS apagado.
 *
 * El contenido vive en `src/preguntas.ts` porque el JSON-LD de `FAQPage` se
 * arma con el mismo array en tiempo de build. Editar una respuesta acá
 * actualiza el schema solo.
 */

export default function Preguntas() {
  return (
    <section id="preguntas" className="bg-bone px-4 sm:px-6 lg:px-8 py-20 md:py-32 scroll-mt-[70px]">
      <div className="w-full max-w-[820px] mx-auto">
        <Reveal>
          <div className="mb-7 md:mb-11">
            <p className="label text-ink-muted m-0 mb-3.5 !max-w-none">Antes de escribirnos</p>
            <h2 className="m-0 font-medium tracking-display leading-[0.9] text-[clamp(2.3rem,6vw,4.6rem)]">
              Preguntas
            </h2>
          </div>
        </Reveal>

        {PREGUNTAS.map((item, i) => (
          <Reveal key={item.q} delay={Math.min(i, 3) * 50}>
            <details
              open={i === 0}
              className={`border-t border-ink/15 ${i === PREGUNTAS.length - 1 ? 'border-b' : ''}`}
            >
              <summary className="flex items-center justify-between gap-5 min-h-[64px] py-5 cursor-pointer font-medium tracking-tight text-[clamp(1.05rem,2.2vw,1.24rem)]">
                {item.q}
                <span
                  aria-hidden="true"
                  data-toggle
                  className="flex-none text-ink/50 text-[1.4em] leading-none transition-transform duration-200 ease-hover"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] -mt-1 mb-6 text-ink-muted leading-relaxed">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
