import Reveal from './Reveal';

/**
 * SECCIÓN 05 — Para quién sí y para quién todavía no.
 *
 * Decir en voz alta qué NO hacemos filtra las consultas que no van a cerrar y
 * hace creíble la columna de la izquierda. La columna derecha va en gris: es
 * secundaria, no es un descarte.
 */
const IDEAL = [
  'Tu marca ya vende y necesita contenido constante, no una pieza suelta.',
  'Publicás en redes, pero lo que sale no se parece a la marca.',
  'Querés probar UGC o influencers sin improvisar el casting ni los contratos.',
  'Tenés pauta corriendo y las creatividades ya se quemaron.',
];

const TODAVIA_NO = [
  'Buscás solo un logo o una identidad visual desde cero.',
  'Necesitás una tienda online o un sistema a medida.',
  'Buscás seguidores comprados o métricas infladas.',
  'Necesitás la producción filmada y entregada para pasado mañana.',
];

export default function Encaje() {
  return (
    <section className="bg-sand px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="grid gap-10 lg:gap-20 lg:grid-cols-2 w-full max-w-[1120px] mx-auto">
        <Reveal>
          <article>
            <p className="label text-ink-muted m-0 mb-4 !max-w-none">Esto es para vos</p>
            <h2 className="m-0 font-medium tracking-display leading-[0.94] text-[clamp(2rem,4.4vw,3.4rem)]">
              Ideal si…
            </h2>
            <ul className="grid mt-7 p-0 list-none">
              {IDEAL.map((item, i) => (
                <li
                  key={item}
                  className={`py-4 border-t border-ink/15 text-[1.02rem] leading-relaxed ${
                    i === IDEAL.length - 1 ? 'border-b' : ''
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={80}>
          <article className="text-ink-muted">
            <p className="label text-ink-muted m-0 mb-4 !max-w-none">Otro tipo de proyecto</p>
            <h2 className="m-0 font-medium tracking-display leading-[0.94] text-[clamp(2rem,4.4vw,3.4rem)]">
              Todavía no, si…
            </h2>
            <ul className="grid mt-7 p-0 list-none">
              {TODAVIA_NO.map((item, i) => (
                <li
                  key={item}
                  className={`py-4 border-t border-ink/10 text-[1.02rem] leading-relaxed ${
                    i === TODAVIA_NO.length - 1 ? 'border-b' : ''
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.95rem] text-ink-muted leading-relaxed">
              ¿Necesitás el sitio web antes que el contenido? Eso lo hacemos en{' '}
              <a
                href="https://sitiosweb.com.py"
                target="_blank"
                rel="noopener noreferrer"
                data-ev="cross_site_click"
                data-ev-loc="encaje"
                className="text-acid-deep font-medium underline underline-offset-4"
              >
                sitiosweb.com.py
              </a>
              .
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
