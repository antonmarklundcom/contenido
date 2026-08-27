import Logo from './Logo';
import { HORARIO, NAV, PHONE_DISPLAY, PHONE_TEL, SITE_DOMAIN, SITE_NAME, SOCIAL, TRUST } from '../site';

const ANIO = new Date().getFullYear();

/**
 * FOOTER. NAP idéntico al del schema. Sin dirección de calle: la agencia
 * trabaja por zona de cobertura, no por local a la calle. No se inventa una.
 */
export default function Footer() {
  const redes = [
    SOCIAL.instagram && { label: 'Instagram', href: SOCIAL.instagram },
    SOCIAL.facebook && { label: 'Facebook', href: SOCIAL.facebook },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="bg-ink text-bone/50 border-t border-bone/12 px-4 sm:px-6 lg:px-8 pt-12 pb-10">
      <div className="w-full max-w-[1120px] mx-auto">
        <div className="grid gap-9 md:grid-cols-3">
          <div>
            <a href="#inicio" className="inline-flex items-center gap-3 min-h-[44px] text-bone">
              <Logo size={30} fill="rgba(247,245,242,0.9)" />
              <span className="label text-[0.7rem]">{SITE_DOMAIN}</span>
            </a>
            <p className="mt-4 text-[15px] leading-relaxed text-bone/50">
              Agencia de contenido en Paraguay: estrategia, producción y distribución para marcas.
            </p>
          </div>

          <div>
            <p className="label text-[0.6rem] text-bone/55 mb-3 !max-w-none">Contacto</p>
            <ul className="grid gap-1 p-0 list-none text-[15px] text-bone/70">
              <li>
                <a
                  href={`tel:${PHONE_TEL}`}
                  data-ev="call_click"
                  data-ev-loc="footer"
                  className="inline-flex items-center min-h-[48px] hover:text-bone transition-colors duration-200 ease-hover"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>{TRUST.cobertura}</li>
              <li>{HORARIO}</li>
              {TRUST.ruc && <li>RUC {TRUST.ruc}</li>}
            </ul>
          </div>

          <div>
            <p className="label text-[0.6rem] text-bone/55 mb-3 !max-w-none">Secciones</p>
            <ul className="grid p-0 list-none text-[15px] text-bone/70">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex items-center min-h-[48px] hover:text-bone transition-colors duration-200 ease-hover"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://sitiosweb.com.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev="cross_site_click"
                  data-ev-loc="footer"
                  className="inline-flex items-center min-h-[48px] hover:text-bone transition-colors duration-200 ease-hover"
                >
                  sitiosweb.com.py
                </a>
              </li>
            </ul>

            {redes.length > 0 && (
              <ul className="flex gap-4 mt-4 p-0 list-none text-[15px] text-bone/70">
                {redes.map((red) => (
                  <li key={red.label}>
                    <a
                      href={red.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-[48px] hover:text-bone transition-colors duration-200 ease-hover"
                    >
                      {red.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-10 pt-6 border-t border-bone/12 label text-[0.58rem] text-bone/55">
          <span>
            © {ANIO} {SITE_NAME}
          </span>
          <a href="#privacidad" className="inline-flex items-center min-h-[48px] hover:text-bone/70">
            Política de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
