import HeroSection from "@/components/sections/HeroSection";
import QueHaceSection from "@/components/sections/QueHaceSection";
import SectoresSection from "@/components/sections/SectoresSection";
import TpvSection from "@/components/sections/TpvSection";
import PilaresSection from "@/components/sections/PilaresSection";
import TestimoniosSection from "@/components/sections/TestimoniosSection";
import PlanesSection from "@/components/sections/PlanesSection";
import ContactoSection from "@/components/sections/ContactoSection";
import FaqSection from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <QueHaceSection />
      <SectoresSection />
      <TpvSection />
      <PilaresSection />
      <TestimoniosSection />
      <PlanesSection />
      <ContactoSection />
      <FaqSection />
    </main>
  );
}
