import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { ArrowDownRight, Zap, Bot, CalendarDays } from "lucide-react";
import { useMagneticEffect } from "@/hooks/use-magnetic";
import { BorderBeam } from "./BorderBeam";

export const Hero = () => {
  const { t } = useI18n();
  const cta1Ref = useRef<HTMLAnchorElement>(null);
  const cta2Ref = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  useMagneticEffect(cta1Ref);
  useMagneticEffect(cta2Ref, { strength: 0.25 });

  // Blue-prussian cursor glow with lerp follow (confined to hero, absolute layer)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = glowRef.current;
    const host = el?.parentElement as HTMLElement | null;
    if (!el || !host) return;

    let rect = host.getBoundingClientRect();
    let targetX = rect.width / 2;
    let targetY = rect.height / 2;
    let curX = targetX;
    let curY = targetY;
    let inside = false;
    let raf = 0;

    const updateRect = () => { rect = host.getBoundingClientRect(); };
    const onMove = (e: MouseEvent) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      targetX = x;
      targetY = y;
    };
    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      el.style.setProperty("--gx", `${curX}px`);
      el.style.setProperty("--gy", `${curY}px`);
      el.style.opacity = inside ? "1" : "0";
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
      cancelAnimationFrame(raf);
    };
  }, []);

  const titleParts = t("hero.title").split(" ");
  // Find "quieren" specifically; fallback to second-to-last word.
  const accentIdx = (() => {
    const i = titleParts.findIndex((w) => w.toLowerCase().replace(/[^a-záéíóúñ]/gi, "") === "quieren");
    return i >= 0 ? i : titleParts.length - 2;
  })();

  return (
    <section className="hero-typo noise-overlay relative min-h-screen bg-carbon text-bone overflow-hidden pt-24 md:pt-28 pb-32">
      {/* Ambient orbs */}
      <div aria-hidden className="hero-orb hero-orb-1" />
      <div aria-hidden className="hero-orb hero-orb-2" />
      {/* Blue cursor glow — fixed full-viewport layer, below content */}
      <div ref={glowRef} aria-hidden className="hero-cursor-glow" />

      <div className="container-editorial relative z-10 grid lg:grid-cols-12 gap-10 w-full">
        {/* LEFT */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Status pill */}
          <div className="mb-8">
            <span className="hero-pill inline-flex items-center gap-2">
              <span className="hero-pill-dot" />
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                Disponible para proyectos
              </span>
            </span>
          </div>

          <h1
            className="hero-title font-display text-balance text-bone"
            style={{
              fontSize: "clamp(52px, 7vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            {titleParts.map((w, i) =>
              i === accentIdx ? (
                <span key={i} className="italic font-light hero-shimmer">
                  {w}{" "}
                </span>
              ) : (
                <span key={i}>{w} </span>
              ),
            )}
          </h1>

          <p
            className="mt-8 text-base md:text-lg"
            style={{
              color: "#E5E5E5",
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          >
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
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

        {/* RIGHT — floating stat cards */}
        <div className="lg:col-span-5 relative hidden md:block">
          <div className="relative w-full h-full min-h-[480px]">
            <article
              className="hero-stat hero-stat-1"
              style={{ top: "8%", right: "8%" }}
            >
              <div className="hero-stat-icon"><Zap size={18} /></div>
              <div>
                <div className="hero-stat-value">+38% conversión media</div>
                <div className="hero-stat-meta">cliente: NitroFix</div>
              </div>
            </article>

            <article
              className="hero-stat hero-stat-2"
              style={{ top: "42%", left: "0%" }}
            >
              <div className="hero-stat-icon"><Bot size={18} /></div>
              <div>
                <div className="hero-stat-value">IA respondió 847 consultas</div>
                <div className="hero-stat-meta">este mes · VitalCenter</div>
              </div>
            </article>

            <article
              className="hero-stat hero-stat-3"
              style={{ bottom: "6%", right: "4%" }}
            >
              <div className="hero-stat-icon"><CalendarDays size={18} /></div>
              <div>
                <div className="hero-stat-value">12h ahorradas/semana</div>
                <div className="hero-stat-meta">en gestión · Legalis &amp; Co</div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: "0.25em",
            color: "rgba(229,229,229,0.4)",
          }}
        >
          Scroll
        </span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
};
