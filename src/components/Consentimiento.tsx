import { useEffect, useState } from 'react';

const CLAVE = 'contenido-consent';

/**
 * Banner de consentimiento — Ley 6534/2020. Sin casillas pre-marcadas y sin
 * patrón oscuro: rechazar es tan fácil como aceptar.
 *
 * Hoy el sitio no carga scripts de terceros; el banner queda listo para
 * cuando entre GA4 o GTM.
 */
export default function Consentimiento() {
  const [visible, setVisible] = useState(false);

  /**
   * Aparece recién después de bajar del hero.
   *
   * En un celular de 390px el hero termina en el borde inferior, donde ya
   * están la barra fija y el botón de WhatsApp: mostrar el banner ahí tapa
   * el H1 y el CTA principal. Como el sitio todavía no carga ningún script
   * de terceros ni escribe cookies no esenciales, diferirlo hasta el primer
   * scroll es correcto y además no pelea con la conversión.
   *
   * Si algún día entra GA4/GTM, el disparo debe quedar condicionado a la
   * respuesta guardada acá, no al render del banner.
   */
  useEffect(() => {
    try {
      if (localStorage.getItem(CLAVE)) return;
    } catch {
      // Modo privado sin storage: no molestamos con el banner.
      return;
    }

    const alBajar = () => {
      if (window.scrollY > 200) {
        setVisible(true);
        window.removeEventListener('scroll', alBajar);
      }
    };

    window.addEventListener('scroll', alBajar, { passive: true });
    alBajar();
    return () => window.removeEventListener('scroll', alBajar);
  }, []);

  const responder = (valor: 'aceptado' | 'rechazado') => {
    try {
      localStorage.setItem(CLAVE, valor);
    } catch {
      // Sin storage no persiste; cerrar igual.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed left-4 right-4 bottom-[72px] md:bottom-6 md:left-6 md:right-auto md:max-w-md z-50 bg-cream rounded-md2 shadow-depth-2 border border-ink/10 p-5"
    >
      <p className="text-ink text-[15px] leading-relaxed">
        Usamos cookies solo para entender cómo se navega el sitio. Podés rechazarlas y el sitio funciona igual.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => responder('aceptado')}
          className="min-h-[48px] px-5 rounded-full bg-ink text-cream text-xs uppercase tracking-wide font-medium hover:bg-ink-hover transition-colors duration-200 ease-hover"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => responder('rechazado')}
          className="min-h-[48px] px-5 rounded-full bg-muted text-ink text-xs uppercase tracking-wide font-medium hover:bg-muted-hover transition-colors duration-200 ease-hover"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
