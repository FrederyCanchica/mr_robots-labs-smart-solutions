import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { ArrowDownRight, Zap, Bot, CalendarDays } from "lucide-react";
import { useMagneticEffect } from "@/hooks/use-magnetic";
import { BorderBeam } from "./BorderBeam";

export const Hero = () => {
  const { t } = useI18n();
  const cta1Ref = useRef<HTMLAnchorElement>(null);
  const cta2Ref = useRef<HTMLAnchorElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);
  useMagneticEffect(cta1Ref);
  useMagneticEffect(cta2Ref, { strength: 0.25 });

  useEffect(() => {
    const layer = glowLayerRef.current;
    if (!layer) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const sync = () => {
      const root = document.documentElement;
      const x = root.style.getPropertyValue("--cursor-x") || "-200px";
      const y = root.style.getPropertyValue("--cursor-y") || "-200px";
      layer.style.setProperty("--cursor-x", x);
      layer.style.setProperty("--cursor-y", y);
      requestAnimationFrame(sync);
    };
    const raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, []);

  const titleParts = t("hero.title").split(" ");
  const accentIdx = (() => {
    const i = titleParts.findIndex(
      (w) => w.toLowerCase().replace(/[^a-záéíóúñ]/gi, "") === "quieren"
    );
    return i >= 0 ? i : titleParts.length - 2;
  })();

  return (
    <section className="hero-glow-section noise-overlay relative min-h-screen bg-carbon text-bone overflow-hidden pt-24 md:pt-28 pb-16" style={{ minHeight: "94vh" }}>

      {/* Glow layer */}
      <div ref={glowLayerRef} aria-hidden className="hero-cursor-layer" />

      {/* Orbe centrado detrás del texto */}
      <div aria-hidden className="hero-orb hero-orb-1"
        style={{
          position: "absolute",
          left: "18%",
          top: "-10%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />

      {/* STAT CARDS — posición absoluta a los lados */}
      

      {/* CONTENIDO CENTRAL */}
      <div className="container-editorial relative z-10 flex flex-col items-center text-center w-full justify-center pt-48 pb-20">

        <h1
          className="hero-title font-display text-balance text-bone"
          style={{
            fontSize: "clamp(48px, 6.5vw, 88px)",
            lineHeight: 0.95,
            letterSpacing: "-0em",
            
          }}
        >
          {titleParts.map((w, i) =>
            i === accentIdx ? (
              <span key={i} className="italic font-light hero-shimmer">
                {w}{" "}
              </span>
            ) : (
              <span key={i}>{w} </span>
            )
          )}
        </h1>

        <p
          className="mt-8 text-base md:text-lg text-center"
          style={{ color: "#E5E5E5", maxWidth: 480, lineHeight: 1.6 }}
        >
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-wrap gap-12 justify-center">
          <Button asChild variant="oxblood" size="xl" className="has-beam">
            <a ref={cta1Ref} href="#solutions">
              <BorderBeam />
              {t("hero.cta1")}
              <ArrowDownRight className="ml-1" />
            </a>
          </Button>
          <Button asChild variant="editorialBone" size="xl">
            <a ref={cta2Ref} href="#contact">
              {t("hero.cta2")}
            </a>
          </Button>
        </div>
      </div>

    </section>
  );
};