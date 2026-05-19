import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Value } from "@/components/site/Value";
import { About } from "@/components/site/About";
import { Demos } from "@/components/site/Demos";
import { Pricing } from "@/components/site/Pricing";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { LeadMagnet } from "@/components/site/LeadMagnet";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { useCursorGlow } from "@/hooks/use-cursor-glow";

const Index = () => {
  useCursorGlow();
  useEffect(() => {
    document.title = "aXory — Sistemas web que trabajan por ti";
    const desc =
      "aXory diseña sistemas web inteligentes y automatización con IA para negocios que quieren crecer: presencia digital premium, reservas online y agentes IA 24/7.";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }

    const ldId = "ld-org";
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = ldId;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "aXory",
      description: desc,
      url: window.location.origin,
      areaServed: ["ES", "EU", "LATAM"],
      sameAs: ["https://instagram.com/", "https://linkedin.com/"],
    });
    document.head.appendChild(script);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <Value />
      <Demos />
      <Pricing />
      <Process />
      <Testimonials />
      <LeadMagnet />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </main>
  );
};

export default Index;
