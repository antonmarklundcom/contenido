import { MessageCircle, Phone } from 'lucide-react';
import { PHONE_TEL, wa } from '../site';

/** Barra fija inferior, solo bajo 768px. WhatsApp primario, llamada secundaria. */
export default function BarraMovil() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex bg-ink border-t border-cream/10">
      <a
        href={wa('barra-movil')}
        target="_blank"
        rel="noopener noreferrer"
        data-ev="whatsapp_click"
        data-ev-loc="barra-movil"
        className="flex-1 min-h-[56px] flex items-center justify-center gap-2 text-cream text-sm font-medium"
      >
        <MessageCircle size={18} aria-hidden="true" />
        WhatsApp
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        data-ev="call_click"
        data-ev-loc="barra-movil"
        className="flex-1 min-h-[56px] flex items-center justify-center gap-2 text-cream/70 text-sm font-medium border-l border-cream/10"
      >
        <Phone size={18} aria-hidden="true" />
        Llamar
      </a>
    </div>
  );
}
