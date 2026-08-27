import BarraMovil from './components/BarraMovil';
import Consentimiento from './components/Consentimiento';
import Contacto from './components/Contacto';
import Encaje from './components/Encaje';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Preguntas from './components/Preguntas';
import Problema from './components/Problema';
import Proceso from './components/Proceso';
import Prueba from './components/Prueba';
import Sectores from './components/Sectores';
import Servicios from './components/Servicios';

/**
 * Orden de secciones y fondo de cada una.
 *
 * Regla dura del track: los fondos alternan bone → sand → bone, y el único
 * bloque oscuro del cuerpo es el cierre. El hero también es oscuro, así que la
 * página abre y cierra en oscuro con todo lo claro en el medio.
 *
 *   01 Hero        → night, pantalla completa + carrusel de reels
 *   02 Problema    → bone, tres líneas numeradas
 *   03 Servicios   → sand, seis filas numeradas
 *   04 Sectores    → ink, cinta a sangre (único respiro visual del cuerpo)
 *   05 Proceso     → bone, tres pasos
 *   06 Encaje      → sand, dos columnas (ideal si / todavía no)
 *   07 Prueba      → bone, clientes y reseñas — NO se renderiza si no hay datos
 *   08 Preguntas   → bone, acordeón nativo
 *   09 Contacto    → ink, cierre + formulario
 *   10 Footer      → ink
 *
 * Prueba y Preguntas son las dos claras seguidas de la página. Es a propósito:
 * Prueba hoy devuelve null, así que el orden real es Encaje (sand) → Preguntas
 * (bone). El día que haya clientes, Prueba entra entre las dos y el par bone
 * queda separado por su propio borde superior.
 */
export default function App() {
  return (
    <>
      {/* Primera parada de tabulación de la página. El carrusel del hero es
          enfocable y está antes que todo el contenido: sin este link, llegar
          al cuerpo con el teclado son unas quince tabulaciones. */}
      <a
        href="#contenido"
        className="label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:inline-flex focus:items-center focus:min-h-[48px] focus:px-5 focus:rounded-full focus:bg-acid focus:text-ink"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Problema />
        <Servicios />
        <Sectores />
        <Proceso />
        <Encaje />
        <Prueba />
        <Preguntas />
        <Contacto />
      </main>
      <Footer />
      <BarraMovil />
      <Consentimiento />
    </>
  );
}
