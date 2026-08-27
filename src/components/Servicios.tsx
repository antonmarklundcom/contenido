import Reveal from './Reveal';
import { SERVICIOS } from '../servicios';
import { wa } from '../site';

/**
 * SECCIÓN 03 — Los seis servicios, como filas numeradas.
 *
 * Filas y no tarjetas: seis tarjetas en una grilla se leen como un menú de
 * precios, y acá no hay precios. La fila deja que el titular respire a la
 * izquierda y el detalle ocupe la medida de lectura a la derecha.
 *
 * Cada fila enlaza a WhatsApp con su propio contexto (`servicio-ugc`), así en
 * el CRM se ve por qué servicio escribieron sin preguntar.
 */
export default function Servicios() {
  return (
    <section id="servicios" className="bg-sand px-4 sm:px-6 lg:px-8 py-20 md:py-32 scroll-mt-[70px]">
      <div className="w-full max-w-[1120px] mx-auto">
        <Reveal>
          <div className="mb-8 md:mb-12">
            <p className="label text-ink-muted m-0 mb-3.5 !max-w-none">Seis servicios, un solo equipo</p>
            <h2 className="m-0 font-medium tracking-display leading-[0.9] text-[clamp(2.3rem,6vw,4.6rem)]">
              Qué hacemos
            </h2>
          </div>
        </Reveal>

        {SERVICIOS.map((s, i) => (
          <Reveal key={s.id} delay={Math.min(i, 3) * 60}>
            <div
              className={`grid gap-3 md:gap-10 md:grid-cols-2 py-6 md:py-8 border-t border-ink/15 ${
                i === SERVICIOS.length - 1 ? 'border-b' : ''
              }`}
            >
              <div>
                <p className="label text-[0.62rem] text-ink-muted m-0 mb-3 !max-w-none">
                  {s.n} / {s.nombre}
                </p>
                <h3 className="m-0 max-w-[14ch] font-medium tracking-head leading-[0.98] text-[clamp(1.55rem,3.4vw,2.35rem)]">
                  {s.titulo}
                </h3>
              </div>

              <div>
                <p className="max-w-[46ch] m-0 text-ink-muted text-[clamp(1rem,1.8vw,1.06rem)] leading-relaxed">
                  {s.detalle}
                </p>
                <ul className="flex flex-wrap gap-2 mt-4 p-0 list-none">
                  {s.entrega.map((item) => (
                    <li
                      key={item}
                      className="label text-[0.58rem] text-ink-muted px-3 py-2 rounded-full border border-ink/15"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={wa(`servicio-${s.id}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev="whatsapp_click"
                  data-ev-loc={`servicio-${s.id}`}
                  className="label text-[0.62rem] inline-flex items-center gap-2 min-h-[48px] mt-1 text-acid-deep hover:underline underline-offset-4"
                >
                  Consultar por {s.nombre.toLowerCase()}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
