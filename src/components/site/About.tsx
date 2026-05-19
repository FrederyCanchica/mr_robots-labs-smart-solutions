import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { TrendingUp, Zap, Shield } from "lucide-react";

const values = [
  {
    Icon: TrendingUp,
    titleKey: "about.value1.title",
    descKey: "about.value1.desc",
  },
  {
    Icon: Zap,
    titleKey: "about.value2.title",
    descKey: "about.value2.desc",
  },
  {
    Icon: Shield,
    titleKey: "about.value3.title",
    descKey: "about.value3.desc",
  },
];

export const About = () => {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();

  const titleParts = t("about.title").split("||");

  return (
    <section id="about" className="bg-background text-foreground py-24 md:py-36">
      <div ref={ref} className="container-editorial reveal-up">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/40 mb-6">
            {t("about.eyebrow")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-balance">
            {titleParts.map((part, i) => (
              <span key={i} className="block">
                {part}
              </span>
            ))}
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-foreground/65 mt-8">
            {t("about.intro")}
          </p>
        </div>

        {/* Values grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {values.map(({ Icon, titleKey, descKey }) => (
            <div key={titleKey} className="reveal-item">
              <Icon
                className="h-7 w-7 mb-6"
                style={{ color: "#FCA311" }}
                strokeWidth={1.5}
              />
              <h3 className="font-display text-2xl mb-3">
                {t(titleKey)}
              </h3>
              <p className="text-foreground/65 leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/30 text-center mt-16">
          {t("about.closing")}
        </p>
      </div>
    </section>
  );
};
