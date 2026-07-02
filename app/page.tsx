import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import FlujoDeteccion from "@/components/FlujoDeteccion";
import Gama from "@/components/Gama";
import Plataforma from "@/components/Plataforma";
import Referencias from "@/components/Referencias";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-paper text-ink">
      <Header />
      <Hero />
      <Problema />
      <FlujoDeteccion />
      <Gama />
      <Plataforma />
      <Referencias />
      <Contacto />
      <Footer />
    </div>
  );
}
