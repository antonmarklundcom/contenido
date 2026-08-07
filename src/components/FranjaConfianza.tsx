import { FileCheck2, MapPin, MessageSquare, Receipt } from 'lucide-react';
import { TRUST } from '../site';

/**
 * SECCIÓN 4 — FRANJA DE CONFIANZA. Patrón P8 (cinta full-bleed).
 *
 * Regla: nada acá se inventa. Cada dato sale de site.ts y las filas vacías
 * NO se renderizan. Sin RUC cargado, la fila del RUC directamente no existe.
 */
export default function FranjaConfianza() {
  const items = [
    TRUST.ruc && { icon: Receipt, label: `RUC ${TRUST.ruc}` },
    TRUST.facturaLegal && { icon: FileCheck2, label: 'Factura legal' },
    TRUST.cobertura && { icon: MapPin, label: TRUST.cobertura },
    TRUST.presupuesto && { icon: MessageSquare, label: TRUST.presupuesto },
  ].filter(Boolean) as { icon: typeof Receipt; label: string }[];

  if (items.length === 0) return null;

  return (
    <section aria-label="Datos de confianza" className="relative bg-ink grain overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-6 md:py-7">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5">
              <item.icon size={16} className="text-accent shrink-0" aria-hidden="true" />
              <span className="text-cream/85 text-[13px] uppercase tracking-wide font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
