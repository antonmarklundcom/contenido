import { useState, type FormEvent } from 'react';
import { HORARIO, PHONE_DISPLAY, PHONE_TEL, SITE_DOMAIN, TRUST, wa } from '../site';
import Reveal from './Reveal';

type Estado = 'idle' | 'enviando' | 'ok' | 'error';

/**
 * SECCIÓN 07 — CONTACTO. Cierre oscuro, a pantalla completa de color.
 *
 * El formulario postea a enviar.php (mismo dominio). Ese handler reenvía a
 * VenderCRM con la API key del entorno. El navegador NUNCA habla directo con
 * el CRM y la key no aparece en el bundle.
 *
 * WhatsApp es la conversión principal; el formulario es para quien prefiere
 * dejar el pedido escrito y no abrir una conversación a las 11 de la noche.
 */
export default function Contacto() {
  const [estado, setEstado] = useState<Estado>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setEstado('enviando');

    try {
      const res = await fetch('/enviar.php', {
        method: 'POST',
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setEstado('ok');
      form.reset();
    } catch {
      setEstado('error');
    }
  }

  const campo =
    'min-h-[48px] px-4 rounded-md2 bg-bone/[.06] border border-bone/20 text-bone text-[17px] placeholder:text-bone/50 focus:border-acid outline-none transition-colors duration-200 ease-hover';

  return (
    <section
      id="contacto"
      className="relative grain overflow-hidden bg-ink text-bone px-4 sm:px-6 lg:px-8 py-20 md:py-32 scroll-mt-[70px]"
    >
      <div className="relative z-10 w-full max-w-[1060px] mx-auto">
        <Reveal>
          <div className="text-center">
            <p className="label text-bone/55 m-0 mb-4 mx-auto !max-w-none">El próximo paso es simple</p>
            <h2 className="m-0 font-medium tracking-display leading-[0.88] text-[clamp(2.8rem,9vw,6.2rem)]">
              Empecemos
            </h2>
            <p className="max-w-[42ch] mx-auto mt-5 text-bone/65 text-[clamp(1rem,2vw,1.18rem)] leading-relaxed">
              Contanos qué vende tu marca y te decimos qué contenido le falta. {TRUST.presupuesto}.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[5fr_7fr] mt-12 md:mt-16">
          <Reveal>
            <div>
              <a
                href={wa('contacto')}
                target="_blank"
                rel="noopener noreferrer"
                data-ev="whatsapp_click"
                data-ev-loc="contacto"
                className="inline-flex items-center justify-center gap-3.5 min-h-[56px] pl-7 pr-4 rounded-full bg-acid text-ink label text-[0.7rem] hover:brightness-95 transition-[filter] duration-200 ease-hover"
              >
                Escribinos por WhatsApp
                <span
                  aria-hidden="true"
                  className="grid place-items-center w-[30px] h-[30px] -my-1 rounded-full bg-ink text-bone"
                >
                  ↗
                </span>
              </a>

              <ul className="grid mt-8 p-0 list-none text-[15px]">
                <li className="py-3.5 border-t border-bone/15">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    data-ev="call_click"
                    data-ev-loc="contacto"
                    className="inline-flex items-center min-h-[48px] text-bone font-medium hover:text-acid transition-colors duration-200 ease-hover"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="py-4 border-t border-bone/15 text-bone/65">{TRUST.cobertura}</li>
                <li className="py-4 border-t border-b border-bone/15 text-bone/65">{HORARIO}</li>
              </ul>

              <p className="mt-6 text-[0.95rem] text-bone/50 leading-relaxed">
                Te responde una persona del equipo y te hace tres o cuatro preguntas sobre tu marca.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="p-6 md:p-9 rounded-xl2 border border-bone/15 bg-bone/[.04]">
              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <input type="hidden" name="site" value={SITE_DOMAIN} />
                <input
                  type="hidden"
                  name="page_path"
                  value={typeof window !== 'undefined' ? window.location.pathname : '/'}
                />
                {/* Trampa anti-spam: los humanos no completan un campo oculto. */}
                <input
                  type="text"
                  name="empresa_web"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className="label text-[0.62rem] text-bone/60">
                    Tu nombre
                  </label>
                  <input id="nombre" name="nombre" type="text" required autoComplete="name" className={campo} placeholder="Nombre y apellido" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="telefono" className="label text-[0.62rem] text-bone/60">
                    Tu WhatsApp
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    className={campo}
                    placeholder="09XX XXX XXX"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="mensaje" className="label text-[0.62rem] text-bone/60">
                    Qué necesitás
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    className={`${campo} py-3 resize-y`}
                    placeholder="Tenemos una marca de indumentaria y necesitamos reels todos los meses…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={estado === 'enviando'}
                  data-ev="form_submit"
                  data-ev-loc="contacto"
                  className="label text-[0.68rem] min-h-[52px] px-7 rounded-full bg-acid text-ink hover:brightness-95 disabled:opacity-60 transition-[filter,opacity] duration-200 ease-hover"
                >
                  {estado === 'enviando' ? 'Enviando…' : 'Enviar consulta'}
                </button>

                <p aria-live="polite" className="text-[15px] min-h-[1.5rem] text-bone/80">
                  {estado === 'ok' && <span>Recibido. Te escribimos por WhatsApp a la brevedad.</span>}
                  {estado === 'error' && (
                    <span>
                      No se pudo enviar.{' '}
                      <a
                        href={wa('contacto-form-error')}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ev="whatsapp_click"
                        data-ev-loc="contacto-form-error"
                        className="font-medium underline underline-offset-4 text-acid"
                      >
                        Escribinos por WhatsApp
                      </a>
                      .
                    </span>
                  )}
                </p>

                <p className="text-[13px] text-bone/55 leading-relaxed">
                  Usamos tus datos únicamente para responder esta consulta. No los compartimos con terceros.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
