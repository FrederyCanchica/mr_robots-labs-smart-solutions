import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";

export const Process = () => {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const steps = ["s1", "s2", "s3", "s4"];

  return (
    <section id="process" className="glow-section noise-overlay bg-carbon text-bone py-24 md:py-36 relative">
      <div ref={ref} className="container-editorial reveal">
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-10 h-px bg-oxblood" />
            <span className="label-eyebrow">— 006 / {t("process.eyebrow")}</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-4xl">
            {t("process.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-bone/15">
          {steps.map((s, i) => (
            <div key={s} className={`reveal-item relative p-8 md:p-10 border-b border-bone/15 ${i < 3 ? "lg:border-r border-bone/15" : ""} ${i % 2 === 0 ? "md:border-r border-bone/15 lg:border-r" : ""}`}>
              <div className="font-display text-7xl md:text-8xl text-oxblood mb-8 leading-none">
                0{i + 1}
              </div>
              <h3 className="font-display text-2xl mb-3">{t(`process.${s}.t`)}</h3>
              <p className="text-sm text-bone/65 leading-relaxed">
                {t(`process.${s}.b`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}