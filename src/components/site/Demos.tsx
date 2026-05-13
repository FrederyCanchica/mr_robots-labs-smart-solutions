import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowUpRight, ChevronDown } from "lucide-react";
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
    <article key={d.slug} className="group flex flex-col">
      <Link
        to={`/demos/${d.slug}`}
        className="relative block aspect-[3/4] overflow-hidden border border-bone/10"
      >
        <img
          src={d.img}
          alt={`${d.brand} — ${d.niche[lang]}`}
          loading="lazy"
          width={1200}
          height={1500}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-carbon/20 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/80 bg-carbon/60 backdrop-blur px-2 py-1 border border-bone/15">
            DEMO_0{i + 1}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-carbon bg-oxblood backdrop-blur px-2 py-1 rounded-sm">
            {d.pkg}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/60 mb-1">
            {d.niche[lang]}
          </p>
          <h3 className="font-display text-2xl md:text-3xl mb-2 leading-none">
            {d.brand}
          </h3>
          <p className="text-sm text-bone/70 leading-relaxed">{d.desc[lang]}</p>
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-oxblood text-bone opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </Link>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <Button asChild variant="bone" size="sm" className="!bg-bone !text-carbon">
          <Link to={`/demos/${d.slug}`}>{t("demos.view")}</Link>
        </Button>
        <Button asChild variant="oxblood" size="sm" className="tracking-normal uppercase text-[12px]">
          <a href="#contact">{t("demos.want")}</a>
        </Button>
      </div>
    </article>
  );

  return (
    <section id="demos" className="bg-carbon text-bone py-24 md:py-36 grain relative">
      <div ref={ref} className="container-editorial reveal">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-oxblood" />
              <span className="label-eyebrow text-bone/60">— 003 / {t("demos.eyebrow")}</span>
            </div>
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

        <div className="flex justify-center my-10 md:my-14">
          <button
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls="showroom-expanded"
            className="group inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-bone border border-bone/25 hover:border-oxblood hover:text-bone bg-transparent hover:bg-oxblood transition-all duration-300 px-6 py-3"
          >
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
          </button>
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
