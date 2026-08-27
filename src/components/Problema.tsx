import Reveal from './Reveal';

/**
 * SECCIÓN 02 — El problema, en tres líneas numeradas.
 *
 * Va antes de los servicios a propósito: nombra lo que el visitante ya siente
 * antes de que le vendamos nada. La primera línea va en tinta plena y las
 * otras dos apagadas — la escala de grises hace la lectura descendente sola.
 */
const LINEAS = [
  { n: '01', texto: 'Tu competencia publica todos los días. La gente pasa de largo igual.' },
  { n: '02', texto: 'Lo que frena el pulgar no es el presupuesto: es la idea, la luz y el corte.' },
  { n: '03', texto: 'Y lo que vende no es un video suelto: es un sistema que se repite todos los meses.' },
];

export default function Problema() {
  return (
    <section className="bg-bone px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="grid gap-8 lg:gap-16 lg:grid-cols-2 items-start w-full max-w-[1120px] mx-auto">
        <Reveal>
          <h2 className="m-0 max-w-[11ch] font-medium tracking-display leading-[0.9] text-[clamp(2.3rem,6vw,4.6rem)]">
            Publicar no es{' '}
            <span className="text-ink-muted">lo mismo que ser visto.</span>
          </h2>
        </Reveal>

        <div className="grid pt-1.5">
          {LINEAS.map((linea, i) => (
            <Reveal key={linea.n} delay={i * 70}>
              <p
                className={`grid grid-cols-[34px_1fr] gap-3.5 m-0 py-4 border-t border-ink/10 text-[clamp(1.05rem,2.2vw,1.28rem)] leading-[1.42] !max-w-none ${
                  i === 0 ? 'text-ink' : 'text-ink-muted'
                } ${i === LINEAS.length - 1 ? 'border-b' : ''}`}
              >
                <span className="font-mono text-[0.62rem] tracking-widest text-ink-muted pt-[0.42em]">{linea.n}</span>
                {linea.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
