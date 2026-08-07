import BarraMovil from './components/BarraMovil';
import Consentimiento from './components/Consentimiento';
import Contacto from './components/Contacto';
import Declaracion from './components/Declaracion';
import Footer from './components/Footer';
import FranjaConfianza from './components/FranjaConfianza';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Proceso from './components/Proceso';
import Servicios from './components/Servicios';
import Trabajos from './components/Trabajos';
import WhatsAppFab from './components/WhatsAppFab';

/**
 * Orden de secciones y patrón de layout de cada una.
 * Regla dura: nunca dos patrones iguales seguidos.
 *
 *   01 Hero            → full-bleed video + solape de 25px con la 02
 *   02 Nosotros        → P4 dos columnas editoriales + P2 bloque desplazado
 *   03 Servicios       → P1 split asimétrico 5/7 con slider
 *   04 Franja          → P8 cinta full-bleed
 *   05 Trabajos        → P7 columna sticky + tarjetas que scrollean
 *   06 Proceso         → P5 riel numerado
 *   07 Declaración     → P9 statement sobredimensionado (uno por página)
 *   08 Contacto        → P1 espejado 5/7
 *   09 Footer
 */
export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Nosotros />
        <Servicios />
        <FranjaConfianza />
        <Trabajos />
        <Proceso />
        <Declaracion />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFab />
      <BarraMovil />
      <Consentimiento />
    </>
  );
}
