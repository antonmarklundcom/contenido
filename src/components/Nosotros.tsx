import { MessageCircle, Play } from 'lucide-react';
import Logo from './Logo';
import Reveal from './Reveal';
import { wa } from '../site';

/**
 * SECCIÓN 2 — NOSOTROS. Patrón P4 (dos columnas editoriales) + P2 (bloque
 * desplazado). rounded-t-[25px] + z-10: pisa el hero por 25px.
 */
export default function Nosotros() {
  return (
    <section id="nosotros" className="relative z-10 bg-base rounded-t-[25px] py-20 md:py-32 px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <p className="eyebrow text-accent-deep mb-6">Quiénes somos</p>

        <p className="text-ink text-[17px] md:text-lg text-center leading-relaxed max-w-lg">
          Hacemos contenido que se ve profesional y que además trabaja para vender. Nada de producciones eternas ni
          archivos que terminan guardados en una carpeta.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={wa('nosotros')}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-loc="nosotros"
            className="group flex items-center gap-3 bg-ink text-cream rounded-full pl-1.5 pr-6 py-1.5 hover:bg-ink-hover transition-all duration-200 ease-hover hover:-translate-y-1 hover:shadow-depth-2"
          >
            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <MessageCircle size={16} className="text-ink" />
            </span>
            <span className="text-xs uppercase tracking-wide font-medium">Escribinos</span>
          </a>

          <a
            href="#trabajos"
            data-ev="portfolio_open"
            data-ev-loc="nosotros"
            className="flex items-center gap-3 bg-muted text-ink rounded-full pl-1.5 pr-6 py-1.5 hover:bg-muted-hover transition-all duration-200 ease-hover hover:-translate-y-1 hover:shadow-depth-1"
          >
            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <Play size={16} className="text-ink" />
            </span>
            <span className="text-xs uppercase tracking-wide font-medium">Ver trabajos</span>
          </a>
        </div>
      </div>

      <div className="mt-20 md:mt-28 flex items-center gap-[2px]" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-muted shrink-0" />
        <span className="flex-1 h-[2px] bg-muted" />
        <span className="w-2 h-2 rounded-full bg-muted shrink-0" />
      </div>

      <div className="mt-16 md:mt-24 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16">
        <div className="flex items-start gap-4 md:w-[200px] shrink-0">
          <Logo size={40} fill="#321C04" />
          <span className="text-xs uppercase tracking-widest font-semibold text-ink leading-relaxed">
            Contenido
            <br />
            Paraguay
          </span>
        </div>

        <Reveal className="flex-1">
          <p className="max-w-none text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] font-normal text-ink">
            Producimos video, foto y contenido para negocios paraguayos que ya tienen algo bueno para mostrar. Grabamos
            en tu local, en la propiedad o en el showroom, y te entregamos piezas listas para Instagram, para tu web y
            para mandar por WhatsApp. Vos seguís atendiendo clientes; del resto nos ocupamos nosotros.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
