import Reveal from './Reveal';

/**
 * SECCIÓN 06 — Preguntas. `<details>` nativo: sin estado de React, sin
 * librería de acordeón, y funciona con el JS apagado.
 *
 * Ninguna respuesta promete un precio, un plazo ni un resultado. Las dos
 * primeras son las que más frenan una consulta por WhatsApp en Paraguay:
 * cuánto sale y de quién queda el material.
 */
const PREGUNTAS = [
  {
    q: '¿Trabajan por proyecto o por mes?',
    a: 'Las dos formas. Una producción puntual se cotiza por proyecto. Redes, UGC y pauta funcionan mucho mejor con un acuerdo mensual, porque lo que da resultado es la constancia, no la pieza suelta.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende del alcance: cuántas piezas, cuántas jornadas de filmación y si hay pauta o creadores de por medio. Por eso no hay lista de precios pública. Contanos qué necesitás y te pasamos un presupuesto sin costo.',
  },
  {
    q: '¿El material queda a mi nombre?',
    a: 'Sí. Las piezas finales y los archivos originales son de tu marca. Cuando hay creadores o influencers, los derechos de uso quedan por escrito antes de que salga la primera publicación: por cuánto tiempo, en qué canales y para qué campañas.',
  },
  {
    q: '¿Filman fuera de Asunción?',
    a: 'La base es Asunción y el Gran Asunción, y ahí trabajamos sin recargo. Al interior vamos coordinando la fecha y los viáticos con anticipación.',
  },
  {
    q: '¿Cómo usan la inteligencia artificial?',
    a: 'Como herramienta, no como reemplazo. Acelera guiones, variantes de copy, imágenes, video y locución. Todo pasa después por el tono de la marca, por SEO y por revisión de una persona antes de publicarse. Si un contenido es generado con IA y corresponde aclararlo, se aclara.',
  },
  {
    q: '¿Tengo que estar en la grabación?',
    a: 'En la primera conviene que estés: es donde se define el tono. Después trabajamos con un guion aprobado y coordinamos todo por WhatsApp.',
  },
];

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
