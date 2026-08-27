import { useEffect, useState } from 'react';
import { TRUST, wa } from '../site';

/**
 * Barra de conversión fija, solo bajo 768px.
 *
 * Aparece recién al salir del hero: en el hero el CTA "Empezar" ya está a la
 * vista y la barra le taparía el carrusel, que es justamente lo que tiene que
 * mirar. No lleva precio — no hay lista de precios pública.
 */
export default function BarraMovil() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      const hero = document.getElementById('inicio');
      setVisible(hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync, { passive: true });
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[800] flex items-center justify-between gap-3 px-3.5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] bg-ink/95 backdrop-blur-md border-t border-bone/15">
      <div className="grid gap-0.5 text-bone">
        <span className="label text-[0.52rem] text-bone/50">{TRUST.presupuesto}</span>
        <strong className="text-base font-medium tracking-head">Contale a un humano</strong>
      </div>
      <a
        href={wa('barra-movil')}
        target="_blank"
        rel="noopener noreferrer"
        data-ev="whatsapp_click"
        data-ev-loc="barra-movil"
        className="label text-[0.66rem] inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-acid text-ink"
      >
        Escribir
      </a>
    </div>
  );
}
