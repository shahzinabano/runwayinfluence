import About from "@/components/About";
import Agency from "@/components/Agency";
import Clients from "@/components/Clients";
import Contact, { Footer } from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Influencers from "@/components/Influencers";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Press from "@/components/Press";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Trust from "@/components/Trust";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Press />
        <Services />
        <Influencers />
        <About />
        <Agency />
        <Projects />
        <Clients />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
