import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Retardo en ms. Escalonado entre hermanos: 60–80ms, máximo 6 elementos. */
  delay?: number;
  /** Dirección de entrada. 'right' para las tarjetas de trabajos. */
  from?: 'up' | 'right';
  className?: string;
};

/**
 * Entrada por scroll. Una sola vez: revelado se queda revelado.
 * Respeta prefers-reduced-motion mostrando el contenido de entrada.
 */
export default function Reveal({ children, delay = 0, from = 'up', className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = from === 'right' ? 'opacity-0 translate-x-16' : 'opacity-0 translate-y-6';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-entrance ${shown ? 'opacity-100 translate-x-0 translate-y-0' : hidden} ${className}`}
    >
      {children}
    </div>
  );
}
