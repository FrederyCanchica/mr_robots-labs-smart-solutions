import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { Layers, Workflow, Bot, BarChart3 } from "lucide-react";

export const Value = () => {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const items = [
    { Icon: Layers, k: "p1" },
    { Icon: Workflow, k: "p2" },
    { Icon: Bot, k: "p3" },
    { Icon: BarChart3, k: "p4" },
  ];

  // Marca "vender" en naranja en el body
  const bodyRaw: string = t("value.body");
  const bodyParts = bodyRaw.split(/\b(vender)\b/i);

  return (
    <section id="solutions" className="bg-background text-foreground py-24 md:py-36">
      <div ref={ref} className="container-editorial reveal">

        <div className="mb-16 md:mb-24 text-center">
          {/* Título — más pequeño */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-5xl leading-[1.05] mx-auto max-w-6xl">
            {t("value.title")}
          </h2>

          {/* Body — más grande, justo debajo */}
          <p className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] mx-auto max-w-6xl mt-6">
            {bodyParts.map((part, i) =>
              part.toLowerCase() === "vender" ? (
                <span key={i} className="italic font-light hero-shimmer">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-foreground/15">
          {items.map(({ Icon, k }, i) => (
            <div
              key={k}
              className={`reveal-item group relative p-8 md:p-10 border-b border-foreground/15 ${
                i < 3 ? "lg:border-r" : ""
              } ${i % 2 === 0 ? "sm:border-r lg:border-r" : ""} transition-colors duration-500 hover:bg-carbon hover:text-bone`}
            >
              <Icon
                className="h-6 w-6 mb-10 text-oxblood transition-colors group-hover:text-oxblood-glow"
                strokeWidth={1.25}
              />
              <h3 className="font-display text-2xl md:text-[28px] mb-4 leading-tight">
                {t(`value.${k}.title`)}
              </h3>
              <p className="text-sm leading-relaxed opacity-70">
                {t(`value.${k}.body`)}
              </p>            
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};