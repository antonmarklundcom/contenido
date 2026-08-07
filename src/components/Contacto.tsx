import { useState, type FormEvent } from 'react';
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { HORARIO, PHONE_DISPLAY, PHONE_TEL, SITE_DOMAIN, TRUST, wa } from '../site';

type Estado = 'idle' | 'enviando' | 'ok' | 'error';

/**
 * SECCIÓN 8 — CONTACTO. Patrón P1 espejado (5/7).
 *
 * El formulario postea a enviar.php (mismo dominio). Ese handler reenvía a
 * VenderCRM con la API key del entorno. El navegador NUNCA habla directo con
 * el CRM y la key no aparece en el bundle.
 *
 * WhatsApp es la conversión principal; el formulario es secundario.
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

  return (
    <section id="contacto" className="bg-cream py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[5fr_7fr]">
        {/* --- Columna WhatsApp / datos --- */}
        <div>
          <p className="eyebrow text-accent-deep mb-5">Contacto</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] tracking-tight font-normal text-ink">
            Escribinos y lo{' '}
            <em className="not-italic" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
              charlamos
            </em>
          </h2>

          <p className="mt-6 text-ink-muted text-[17px] leading-relaxed">
            Lo más rápido es WhatsApp. Contanos qué negocio tenés y qué querés mostrar; te respondemos con una idea
            concreta y un número.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={wa('contacto')}
              target="_blank"
              rel="noopener noreferrer"
              data-ev="whatsapp_click"
              data-ev-loc="contacto"
              className="flex items-center gap-3 bg-ink text-cream rounded-full pl-1.5 pr-7 py-1.5 w-fit hover:bg-ink-hover hover:-translate-y-1 hover:shadow-depth-2 transition-all duration-200 ease-hover"
            >
              <span className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </span>
              <span className="text-xs uppercase tracking-wide font-medium">Escribinos por WhatsApp</span>
            </a>

            <a
              href={`tel:${PHONE_TEL}`}
              data-ev="call_click"
              data-ev-loc="contacto"
              className="flex items-center gap-3 text-ink min-h-[48px] w-fit"
            >
              <Phone size={16} className="text-accent-deep" aria-hidden="true" />
              <span className="text-[17px] font-medium">{PHONE_DISPLAY}</span>
            </a>
          </div>

          <ul className="mt-8 pt-8 border-t border-ink/10 flex flex-col gap-3 text-ink-muted text-[15px]">
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-accent-deep shrink-0" aria-hidden="true" />
              {TRUST.cobertura}
            </li>
            <li className="flex items-center gap-3">
              <Clock size={16} className="text-accent-deep shrink-0" aria-hidden="true" />
              {HORARIO}
            </li>
          </ul>
        </div>

        {/* --- Formulario --- */}
        <div className="bg-base rounded-lg2 p-6 md:p-10 shadow-depth-1 border border-ink/10">
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <input type="hidden" name="site" value={SITE_DOMAIN} />
            <input type="hidden" name="page_path" value={typeof window !== 'undefined' ? window.location.pathname : '/'} />
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
              <label htmlFor="nombre" className="text-[13px] uppercase tracking-wide font-semibold text-ink">
                Tu nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                autoComplete="name"
                className="min-h-[48px] px-4 rounded-md2 bg-cream border border-ink/10 text-ink text-[17px] placeholder:text-ink/55 focus:border-accent outline-none transition-colors duration-200 ease-hover"
                placeholder="Nombre y apellido"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="telefono" className="text-[13px] uppercase tracking-wide font-semibold text-ink">
                Tu WhatsApp
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                className="min-h-[48px] px-4 rounded-md2 bg-cream border border-ink/10 text-ink text-[17px] placeholder:text-ink/55 focus:border-accent outline-none transition-colors duration-200 ease-hover"
                placeholder="09XX XXX XXX"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mensaje" className="text-[13px] uppercase tracking-wide font-semibold text-ink">
                Qué querés mostrar
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={4}
                className="px-4 py-3 rounded-md2 bg-cream border border-ink/10 text-ink text-[17px] placeholder:text-ink/55 focus:border-accent outline-none resize-y transition-colors duration-200 ease-hover"
                placeholder="Tengo una inmobiliaria y necesito videos de las propiedades…"
              />
            </div>

            <button
              type="submit"
              disabled={estado === 'enviando'}
              data-ev="form_submit"
              data-ev-loc="contacto"
              className="min-h-[48px] bg-ink text-cream text-xs uppercase tracking-wide font-medium px-7 rounded-full hover:bg-ink-hover hover:-translate-y-1 hover:shadow-depth-2 disabled:opacity-60 disabled:hover:translate-y-0 transition-all duration-200 ease-hover"
            >
              {estado === 'enviando' ? 'Enviando…' : 'Enviar consulta'}
            </button>

            <p aria-live="polite" className="text-[15px] min-h-[1.5rem]">
              {estado === 'ok' && <span className="text-ink">Recibido. Te escribimos por WhatsApp a la brevedad.</span>}
              {estado === 'error' && (
                <span className="text-ink">
                  No se pudo enviar.{' '}
                  <a
                    href={wa('contacto-form-error')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ev="whatsapp_click"
                    data-ev-loc="contacto-form-error"
                    className="font-medium underline decoration-muted underline-offset-4"
                  >
                    Escribinos por WhatsApp
                  </a>
                  .
                </span>
              )}
            </p>

            <p className="text-[13px] text-ink-muted leading-relaxed">
              Usamos tus datos únicamente para responder esta consulta. No los compartimos con terceros.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
