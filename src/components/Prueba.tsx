import Reveal from './Reveal';
import { CLIENTES, RESENAS } from '../site';
import { SERVICIOS } from '../servicios';

/**
 * SECCIÓN — Prueba. Clientes y reseñas.
 *
 * Se renderiza SOLO si hay datos reales. Con los dos arrays vacíos devuelve
 * null y la página queda exactamente como está hoy: sin hueco, sin
 * "próximamente", sin logos grises de relleno.
 *
 * El andamiaje existe igual porque el día que haya permiso por escrito de un
 * cliente, cargarlo tiene que ser editar `site.ts` y nada más. Si la sección
 * no existiera, ese día alguien la improvisa con prisa y termina publicando
 * un testimonio sin apellido.
 *
 * Para una agencia de contenido esto es LA sección que falta: todo el resto de
 * la página son afirmaciones nuestras sobre nosotros mismos.
 */
export default function Prueba() {
  const hayClientes = CLIENTES.length > 0;
  const hayResenas = RESENAS.length > 0;
  if (!hayClientes && !hayResenas) return null;

  const nombreServicio = (id: string) => SERVICIOS.find((s) => s.id === id)?.nombre ?? '';

  return (
    <section id="prueba" className="bg-bone px-4 sm:px-6 lg:px-8 py-20 md:py-32 scroll-mt-[70px]">
      <div className="w-full max-w-[1120px] mx-auto">
        <Reveal>
          <div className="mb-8 md:mb-12">
            <p className="label text-ink-muted m-0 mb-3.5 !max-w-none">Con permiso de cada uno</p>
            <h2 className="m-0 font-medium tracking-display leading-[0.9] text-[clamp(2.3rem,6vw,4.6rem)]">
              Quién ya trabaja con nosotros
            </h2>
          </div>
        </Reveal>

        {hayClientes && (
          <Reveal>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 py-8 border-t border-ink/15 p-0 list-none">
              {CLIENTES.map((c) => (
                <li key={c.nombre}>
                  {/* Altura fija y ancho automático: los logos vienen en
                      proporciones distintas y alinearlos por ancho hace que
                      uno horizontal se vea el triple de grande que un isotipo. */}
                  <img src={c.logo} alt={c.nombre} loading="lazy" className="h-8 md:h-10 w-auto opacity-70" />
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {hayResenas && (
          <div className="grid gap-6 md:gap-10 md:grid-cols-2 mt-4">
            {RESENAS.map((r, i) => (
              <Reveal key={`${r.negocio}-${r.nombre}`} delay={Math.min(i, 3) * 70}>
                <figure className="h-full m-0 pt-6 border-t border-ink/15">
                  {r.servicio && (
                    <p className="label text-[0.6rem] text-ink-muted m-0 mb-4 !max-w-none">
                      {nombreServicio(r.servicio)}
                    </p>
                  )}
                  <blockquote className="m-0">
                    <p className="m-0 text-[clamp(1.05rem,2vw,1.24rem)] leading-[1.45]">“{r.texto}”</p>
                  </blockquote>
                  <figcaption className="mt-5 text-ink-muted text-[0.95rem]">
                    <strong className="font-medium text-ink">{r.nombre}</strong> · {r.negocio}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
