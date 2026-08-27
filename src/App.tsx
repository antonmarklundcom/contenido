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
 *   04 Proceso     → bone, tres pasos
 *   05 Encaje      → sand, dos columnas (ideal si / todavía no)
 *   06 Preguntas   → bone, acordeón nativo
 *   07 Contacto    → ink, cierre + formulario
 *   08 Footer      → ink
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problema />
        <Servicios />
        <Proceso />
        <Encaje />
        <Preguntas />
        <Contacto />
      </main>
      <Footer />
      <BarraMovil />
      <Consentimiento />
    </>
  );
}
