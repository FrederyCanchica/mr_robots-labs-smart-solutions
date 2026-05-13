import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { ArrowDownRight } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=85";

export const Hero = () => {
  const { t } = useI18n();
  return (
    <section className="relative min-h-screen bg-carbon text-bone overflow-hidden pt-24">
      {/* Radial depth: prussian blue glow center-left → black */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 700px at 28% 45%, hsl(var(--graphite) / 0.85), transparent 70%)",
        }}
      />
      {/* Soft orange glow behind primary CTA */}
      <div
        aria-hidden
        className="absolute pointer-events-none rounded-full blur-[120px]"
        style={{
          left: "8%",
          top: "62%",
          width: 380,
          height: 380,
          background: "hsl(var(--oxblood) / 0.06)",
        }}
      />

      {/* Top index bar */}
      <div className="container-editorial relative z-10 flex items-center justify-between border-b border-bone/10 pb-4 mb-10 md:mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/55">
          — 001 / Studio
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/55 hidden md:inline">
          / 24/7 systems
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-oxblood">
          ● Available
        </span>
      </div>

      <div className="container-editorial relative z-10 grid lg:grid-cols-12 gap-10 pb-20">
        {/* LEFT — text */}
        <div className="lg:col-span-7 flex flex-col justify-center motion-safe:animate-fade-up">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-10 h-px bg-oxblood" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/60">
              {t("hero.eyebrow")}
            </span>
          </div>

          <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[86px] xl:text-[104px] leading-[0.92] tracking-[-0.03em] text-balance text-bone">
            {t("hero.title").split(" ").map((w, i, arr) =>
              i === arr.length - 2 ? (
                <span key={i} className="italic text-oxblood font-light">
                  {w}{" "}
                </span>
              ) : (
                <span key={i}>{w} </span>
              ),
            )}
          </h1>

          <p className="mt-8 max-w-xl text-bone-dim text-base md:text-lg leading-relaxed text-balance">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="oxblood" size="xl">
              <a href="#solutions">
                {t("hero.cta1")}
                <ArrowDownRight className="ml-1" />
              </a>
            </Button>
            <Button asChild variant="editorialBone" size="xl">
              <a href="#contact">{t("hero.cta2")}</a>
            </Button>
          </div>
        </div>

        {/* RIGHT — image */}
        <div className="lg:col-span-5 relative">
          <div
            className="relative aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden"
            style={{
              borderRadius: 16,
              boxShadow: "0 32px 80px rgba(252, 163, 17, 0.10)",
            }}
          >
            <img
              src={HERO_IMG}
              alt="Workspace tech moderno con múltiples pantallas"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={1600}
              height={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="container-editorial relative z-10 border-t border-bone/10">
        <div className="grid grid-cols-3 gap-4 py-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col">
              <span className="font-display text-3xl md:text-5xl text-bone">
                {t(`hero.metric${i}.value`)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55 mt-2">
                {t(`hero.metric${i}.label`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
