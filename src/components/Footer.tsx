import Logo from './Logo';
import { HORARIO, PHONE_DISPLAY, PHONE_TEL, SITE_NAME, SOCIAL, TRUST } from '../site';

const ANIO = new Date().getFullYear();

/**
 * FOOTER. NAP idéntico al del schema. Sin dirección de calle: el negocio
 * opera por zona de cobertura, no por local a la calle. No se inventa una.
 */
export default function Footer() {
  const redes = [
    SOCIAL.instagram && { label: 'Instagram', href: SOCIAL.instagram },
    SOCIAL.facebook && { label: 'Facebook', href: SOCIAL.facebook },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="relative bg-ink grain overflow-hidden px-6 pt-16 pb-12">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={32} fill="rgba(255,249,242,0.9)" />
              <span className="text-cream text-lg font-bold tracking-tight">{SITE_NAME}</span>
            </div>
            <p className="mt-4 text-cream/60 text-[15px] leading-relaxed">
              Video y contenido para negocios de Asunción y el Gran Asunción.
            </p>
          </div>

          <div>
            <p className="eyebrow text-cream/60 mb-4">Contacto</p>
            <ul className="flex flex-col gap-2 text-cream/80 text-[15px]">
              <li>
                <a href={`tel:${PHONE_TEL}`} data-ev="call_click" data-ev-loc="footer" className="inline-flex items-center min-h-[48px] hover:text-cream">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>Asunción, Paraguay</li>
              <li>{HORARIO}</li>
              {TRUST.ruc && <li>RUC {TRUST.ruc}</li>}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-cream/60 mb-4">Secciones</p>
            <ul className="flex flex-col gap-2 text-cream/80 text-[15px]">
              <li>
                <a href="#servicios" className="inline-flex items-center min-h-[48px] hover:text-cream">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#trabajos" className="inline-flex items-center min-h-[48px] hover:text-cream">
                  Trabajos
                </a>
              </li>
              <li>
                <a href="#proceso" className="inline-flex items-center min-h-[48px] hover:text-cream">
                  Proceso
                </a>
              </li>
              <li>
                <a
                  href="https://sitiosweb.com.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev="cross_site_click"
                  data-ev-loc="footer"
                  className="inline-flex items-center min-h-[48px] hover:text-cream"
                >
                  sitiosweb.com.py
                </a>
              </li>
            </ul>

            {redes.length > 0 && (
              <ul className="mt-5 flex gap-4 text-cream/80 text-[15px]">
                {redes.map((red) => (
                  <li key={red.label}>
                    <a href={red.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[48px] hover:text-cream">
                      {red.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-wrap gap-x-6 gap-y-2 text-cream/60 text-[13px]">
          <span>
            © {ANIO} {SITE_NAME}
          </span>
          <a href="#privacidad" className="inline-flex items-center min-h-[48px] hover:text-cream/70">
            Política de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
