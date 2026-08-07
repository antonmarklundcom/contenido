import Reveal from './Reveal';

const PASOS = [
  {
    titulo: 'Hablamos por WhatsApp',
    texto: 'Nos contás qué querés mostrar y para dónde va. En el mismo día te decimos qué se puede hacer y cuánto sale.',
  },
  {
    titulo: 'Armamos el guion',
    texto: 'Definimos las tomas, el orden y los textos antes de encender la cámara. Vos lo aprobás y recién ahí grabamos.',
  },
  {
    titulo: 'Grabamos en tu lugar',
    texto: 'Vamos al local, a la propiedad o al consultorio. Una jornada, equipo propio y sin frenar tu atención al público.',
  },
  {
    titulo: 'Entregamos listo',
    texto: 'Recibís las piezas editadas, subtituladas y en los formatos de cada red. Listas para publicar, sin retoques de tu lado.',
  },
];

/** SECCIÓN 6 — PROCESO. Patrón P5 (riel numerado). Vertical bajo 768px. */
export default function Proceso() {
  return (
    <section id="proceso" className="bg-base py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow text-accent-deep mb-5">Cómo trabajamos</p>
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] tracking-tight font-normal text-ink max-w-2xl">
          Cuatro pasos, sin sorpresas
        </h2>

        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {PASOS.map((paso, i) => (
            <Reveal key={paso.titulo} delay={i * 70}>
              {/* pt-14 deja el número gigante APENAS por encima del título:
                  se lee como capa, no como choque. Con pt-10 los glifos se
                  cruzaban con la línea del título. */}
              <li className="relative pt-14 border-t border-ink/10 h-full">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 text-[64px] leading-none font-normal text-accent/25 tabular-nums select-none"
                >
                  0{i + 1}
                </span>
                <h3 className="relative text-lg font-medium text-ink">{paso.titulo}</h3>
                <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">{paso.texto}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
