import Reveal from './Reveal';

/**
 * SECCIÓN 04 — Rubros. Cinta oscura a sangre entre dos secciones claras.
 *
 * Cumple tres cosas a la vez:
 *   · Corta la seguidilla de secciones claras y de puro texto que va de
 *     Problema a Preguntas. Es el único respiro visual del cuerpo.
 *   · Deja que el visitante se reconozca en una palabra antes de leer nada.
 *   · Le da a la página superficie para "contenido para inmobiliarias" y
 *     compañía, que es como se busca esto en Paraguay.
 *
 * Es una lista de rubros con los que la agencia trabaja — una decisión
 * comercial, no una afirmación sobre clientes que ya existen. No dice
 * "trabajamos con" en pasado ni insinúa casos.
 */
const RUBROS = [
  'Gastronomía',
  'Indumentaria y retail',
  'Inmobiliarias',
  'Clínicas y estética',
  'Automotriz',
  'Turismo',
  'Servicios profesionales',
  'E-commerce',
];

export default function Sectores() {
  return (
    <section className="relative grain overflow-hidden bg-ink text-bone px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="relative z-10 w-full max-w-[1120px] mx-auto">
        <Reveal>
          <p className="label text-bone/55 m-0 mb-4 !max-w-none">Rubros</p>
          <h2 className="m-0 max-w-[20ch] font-medium tracking-display leading-[0.94] text-[clamp(1.8rem,4vw,3rem)]">
            Cada rubro se filma distinto.
            <span className="block text-bone/50">Estos son los que atendemos.</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mt-8 md:mt-11 p-0 list-none">
            {RUBROS.map((rubro) => (
              <li
                key={rubro}
                className="flex items-baseline gap-3 font-medium tracking-head text-[clamp(1.15rem,2.6vw,1.9rem)]"
              >
                <span aria-hidden="true" className="text-acid text-[0.45em] leading-none">
                  ◆
                </span>
                {rubro}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-8 text-bone/55 text-[0.95rem] leading-relaxed">
            ¿El tuyo no está en la lista? Igual escribinos — lo que cambia es el guion, no la forma de trabajar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
