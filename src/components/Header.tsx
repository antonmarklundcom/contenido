import { useEffect, useState } from 'react';
import { NAV, SITE_DOMAIN, wa } from '../site';

/**
 * Header pegajoso. Sobre el hero es transparente con texto claro; al pasar el
 * hero se vuelve una barra clara con blur.
 *
 * El cambio se decide por la posición del hero, no por un `scrollY > 100`
 * fijo: el hero mide 100svh y en un celular con la barra de direcciones
 * plegable esa altura cambia sola mientras se scrollea.
 */
export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      const hero = document.getElementById('inicio');
      setSolid(hero ? hero.getBoundingClientRect().bottom < 80 : window.scrollY > 100);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync, { passive: true });
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  // Escape cierra el menú: es un overlay, tiene que poder cerrarse sin apuntar.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[900] flex items-center justify-between gap-6 h-[66px] px-4 sm:px-6 lg:px-8 py-2.5 border-b transition-[background-color,border-color,color] duration-300 ease-hover ${
        solid
          ? 'bg-bone/90 backdrop-blur-md border-ink/10 text-ink'
          : 'bg-transparent border-transparent text-bone'
      }`}
    >
      <a href="#inicio" aria-label={`${SITE_DOMAIN}, inicio`} className="label inline-flex items-center min-h-[44px] whitespace-nowrap text-current text-[0.7rem]">
        {SITE_DOMAIN}
      </a>

      <nav aria-label="Navegación principal" className="hidden md:flex gap-6 lg:gap-8 whitespace-nowrap">
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="label text-[0.68rem] text-current opacity-70 hover:opacity-100 transition-opacity duration-200 ease-hover"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          className="md:hidden min-h-[44px] px-3.5 py-3 label text-[0.66rem] text-current border border-current rounded-full opacity-90"
        >
          {open ? 'Cerrar' : 'Menú'}
        </button>

        <a
          href={wa('header')}
          target="_blank"
          rel="noopener noreferrer"
          data-ev="whatsapp_click"
          data-ev-loc="header"
          className="hidden md:inline-flex items-center min-h-[44px] px-5 rounded-full bg-acid text-ink label text-[0.7rem] hover:brightness-95 transition-[filter] duration-200 ease-hover"
        >
          WhatsApp
        </a>
      </div>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Navegación móvil"
          className="md:hidden absolute top-[64px] left-3 right-3 grid p-2 rounded-[18px] border border-ink/10 bg-bone/[.98] backdrop-blur-md shadow-pop text-ink"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="label text-[0.72rem] px-3.5 py-4 rounded-xl hover:bg-ink/5 transition-colors duration-200 ease-hover"
            >
              {item.label}
            </a>
          ))}
          <a
            href={wa('menu-movil')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            data-ev="whatsapp_click"
            data-ev-loc="menu-movil"
            className="label text-[0.72rem] mt-1 px-3.5 py-4 rounded-xl bg-acid text-center"
          >
            Escribir por WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
