import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { ChevronDown } from "lucide-react";
import { BorderBeam } from "./BorderBeam";
import mechanic from "@/assets/demo-mechanic.jpg";
import legal from "@/assets/demo-legal.jpg";
import clinic from "@/assets/demo-clinic.jpg";
import restaurant from "@/assets/demo-restaurant.jpg";
import beauty from "@/assets/demo-beauty.jpg";
import legalPardo from "@/assets/demo-legal-pardo.jpg";

type DemoItem = {
  slug: string;
  brand: string;
  niche: { es: string; en: string };
  pkg: "Smart Presence" | "Smart Booking" | "AI Receptionist";
  desc: { es: string; en: string };
  img: string;
};

const initialDemos: DemoItem[] = [
  {
    slug: "taller-mecanico",
    brand: "NitroFix",
    niche: { es: "Taller mecánico", en: "Auto repair shop" },
    pkg: "Smart Presence",
    desc: {
      es: "Presencia digital industrial con captación de presupuestos y reservas online.",
      en: "Industrial digital presence with online quoting and booking capture.",
    },
    img: mechanic,
  },
  {
    slug: "gestoria-pro",
    brand: "Legalis & Co",
    niche: { es: "Gestoría fiscal", en: "Tax advisory" },
    pkg: "Smart Booking",
    desc: {
      es: "Reservas integradas, área de cliente y flujos para asesores ocupados.",
      en: "Integrated bookings, client portal and flows for busy advisors.",
    },
    img: legal,
  },
  {
    slug: "clinica-vital",
    brand: "VitalCenter",
    niche: { es: "Clínica médica", en: "Medical clinic" },
    pkg: "AI Receptionist",
    desc: {
      es: "Recepcionista IA que cualifica pacientes y agenda en el CRM 24/7.",
      en: "AI receptionist that qualifies patients and books in the CRM 24/7.",
    },
    img: clinic,
  },
];

const expandedDemos: DemoItem[] = [
  {
    slug: "restaurante-gourmet",
    brand: "Sal & Olivo",
    niche: { es: "Restaurante mediterráneo", en: "Mediterranean restaurant" },
    pkg: "Smart Presence",
    desc: {
      es: "Carta digital, galería editorial y reservas con confirmación visual.",
      en: "Digital menu, editorial gallery and bookings with visual confirmation.",
    },
    img: restaurant,
  },
  {
    slug: "centro-estetica",
    brand: "Lumière Studio",
    niche: { es: "Centro de estética", en: "Beauty & wellness studio" },
    pkg: "Smart Booking",
    desc: {
      es: "Motor de reservas en 4 pasos, bonos digitales y sincronización automática.",
      en: "4-step booking engine, digital vouchers and automatic sync.",
    },
    img: beauty,
  },
  {
    slug: "despacho-legal",
    brand: "Pardo & Asociados",
    niche: { es: "Despacho de abogados", en: "Law firm" },
    pkg: "AI Receptionist",
    desc: {
      es: "Lex IA cualifica casos y agenda videollamadas con el abogado adecuado.",
      en: "Lex AI qualifies cases and schedules video calls with the right lawyer.",
    },
    img: legalPardo,
  },
];

const STORAGE_KEY = "mr_showroom_expanded";

export const Demos = () => {
  const { t, lang } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try {
      setExpanded(sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {}
  }, []);

  const toggle = () => {
    setExpanded((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  };

  const renderCard = (d: DemoItem, i: number) => (
    <article key={d.slug} className="reveal-item">
      <Link
        to={`/demos/${d.slug}`}
        className="demo-card group relative block aspect-[3/4] overflow-hidden rounded-[12px] border border-white/[0.08] hover:border-[rgba(252,163,17,0.25)] transition-colors duration-200"
      >
        <img
          src={d.img}
          alt={`${d.brand} — ${d.niche[lang]}`}
          loading="lazy"
          width={1200}
          height={1500}
          className="demo-card-img w-full h-full object-cover"
        />
        {/* Subtle bottom gradient for depth */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)" }}
        />
        {/* Index tag */}
        <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/70">
          DEMO_0{i + 1}
        </span>

        {/* Hover reveal panel */}
        <div
          className="demo-panel absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 py-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        >
          <div className="min-w-0 flex-1">
            <span
              className="inline-block font-mono text-[9px] uppercase tracking-widest text-[#FCA311] border border-[#FCA311] px-2 py-[2px]"
              style={{ borderRadius: 2 }}
            >
              {d.pkg}
            </span>
            <h3 className="font-display text-lg leading-tight text-white mt-1 truncate">
              {d.brand}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/50 mt-[2px] truncate">
              {d.desc[lang]}
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <span
              className="font-mono uppercase text-[10px] tracking-wider text-white border border-white/20 hover:border-white/60 transition-colors px-[14px] py-[6px] text-center"
              style={{ borderRadius: 2 }}
            >
              {lang === "es" ? "Ver demo" : "View demo"}
            </span>
            <span
              className="font-mono uppercase text-[10px] tracking-wider text-black bg-[#FCA311] px-[14px] py-[6px] text-center"
              style={{ borderRadius: 2 }}
            >
              {lang === "es" ? "Lo quiero →" : "I want it →"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );

  return (
    <section id="demos" className="glow-section noise-overlay bg-carbon text-bone py-24 md:py-36 relative">
      <div ref={ref} className="container-editorial reveal-up">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <div className="lg:col-span-8">
            
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-balance">
              {t("demos.title")}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-bone/65 leading-relaxed">{t("demos.body")}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {initialDemos.map((d, i) => renderCard(d, i))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="relative overflow-hidden bg-transparent border border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-black transition-colors duration-200 font-mono uppercase tracking-[0.22em] text-[12px]"
          >
            <a href="#contact">
              <BorderBeam />
              {lang === "es" ? "Quiero una para mi negocio" : "I want one for my business"}
            </a>
          </Button>
        </div>

        <div className="flex justify-center my-10 md:my-14">
          <Button
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls="showroom-expanded"
            size="lg"
            className="relative overflow-hidden group bg-transparent border border-bone/25 hover:border-[#FCA311] text-bone hover:text-[#FCA311] hover:bg-transparent font-mono uppercase tracking-[0.22em] text-[12px]"
          >
            <BorderBeam />
            <span>
              {expanded
                ? lang === "es"
                  ? "Ver menos"
                  : "Show less"
                : lang === "es"
                ? "Ver más proyectos"
                : "See more projects"}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-500 ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
        </div>

        <div
          id="showroom-expanded"
          className="showroom-expand grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          data-open={expanded}
          aria-hidden={!expanded}
        >
          {expandedDemos.map((d, i) => (
            <div
              key={d.slug}
              className="showroom-item"
              style={{ transitionDelay: expanded ? `${i * 90}ms` : "0ms" }}
            >
              {renderCard(d, i + 3)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
