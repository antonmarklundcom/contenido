import { useState } from 'react';

const LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
];

/** Píldora flotante centrada, con hamburguesa que se convierte en X. */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[380px] sm:w-auto">
      <div className="bg-white rounded-full shadow-depth-2 flex items-center justify-between gap-6 pl-6 pr-2 py-2">
        <a href="#top" className="text-lg font-bold tracking-tight text-black py-3">
          Contenido<span className="text-accent">.</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="relative w-12 h-12 flex flex-col items-center justify-center gap-[5px] rounded-full hover:bg-black/5 transition-colors duration-200 ease-hover"
        >
          <span
            className="block w-5 h-[2px] bg-black transition-transform duration-300"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.77,0,0.175,1)',
              transform: open ? 'translateY(3.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-5 h-[2px] bg-black transition-transform duration-300"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.77,0,0.175,1)',
              transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      <nav
        id="menu-principal"
        className={`mt-2 bg-white rounded-lg2 shadow-depth-2 overflow-hidden origin-top transition-all duration-300 ease-entrance ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul className="py-2">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 text-sm font-medium text-black hover:bg-black/5 transition-colors duration-200 ease-hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
