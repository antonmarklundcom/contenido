import Reveal from './Reveal';

/**
 * SECCIÓN 04 — Cómo trabajamos. Tres pasos, riel numerado.
 *
 * Tres y no cinco: el proceso real tiene más etapas, pero lo que el visitante
 * necesita saber antes de escribir es qué pasa primero, qué recibe y cuándo se
 * mide. El detalle fino se conversa.
 */
const PASOS = [
  {
    n: '01',
    titulo: 'Estrategia',
    texto:
      'Entendemos el negocio, el público y qué tiene que pasar después de ver la pieza. De ahí sale el plan y el guion, no al revés.',
  },
  {
    n: '02',
    titulo: 'Producción',
    texto:
      'Filmamos, fotografiamos, editamos. Según el servicio entra un creador de UGC, un influencer o la IA como herramienta — siempre con dirección nuestra.',
  },
  {
    n: '03',
    titulo: 'Distribución y medición',
    texto: 'Publicamos donde corresponde, empujamos con pauta si hace falta y mostramos los números al cierre del mes.',
  },
];

export default function Proceso() {
  return (
    <section id="proceso" className="bg-bone px-4 sm:px-6 lg:px-8 py-20 md:py-32 scroll-mt-[70px]">
      <div className="w-full max-w-[1120px] mx-auto">
        <Reveal>
          <div className="mb-9 md:mb-14">
            <p className="label text-ink-muted m-0 mb-3.5 !max-w-none">De la idea a la publicación</p>
            <h2 className="m-0 font-medium tracking-display leading-[0.9] text-[clamp(2.3rem,6vw,4.6rem)]">
              Cómo trabajamos
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:gap-12 md:grid-cols-3">
          {PASOS.map((paso, i) => (
            <Reveal key={paso.n} delay={i * 70}>
              <article className="pt-4 border-t border-ink/15 h-full">
                <span className="block text-ink/50 font-medium tracking-display leading-none text-[clamp(2.8rem,5.5vw,4.4rem)]">
                  {paso.n}
                </span>
                <h3 className="mt-5 mb-2.5 font-medium tracking-head leading-tight text-[clamp(1.25rem,2.4vw,1.55rem)]">
                  {paso.titulo}
                </h3>
                <p className="max-w-[36ch] m-0 text-ink-muted leading-relaxed">{paso.texto}</p>
                {i === PASOS.length - 1 && (
                  <small className="label text-[0.62rem] inline-block mt-5 px-3 py-2 rounded-full border border-ink/15 text-ink-muted">
                    Por proyecto o por mes
                  </small>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
