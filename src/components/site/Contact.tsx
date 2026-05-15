import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { MessageCircle, Calendar, Mail, ArrowUpRight } from "lucide-react";

export const Contact = () => {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();

  const channels = [
    {
      Icon: MessageCircle,
      label: t("contact.whatsapp"),
      sub: "+34 600 000 000",
      href: whatsappLink(),
    },
    {
      Icon: Calendar,
      label: t("contact.calendar"),
      sub: "30 min · gratis",
      href: siteConfig.calendarUrl,
    },
    {
      Icon: Mail,
      label: t("contact.form"),
      sub: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
  ];

  return (
    <section id="contact" className="glow-section noise-overlay bg-carbon text-bone py-24 md:py-36 relative">
      <div ref={ref} className="container-editorial reveal-up">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16 md:mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-oxblood" />
              <span className="label-eyebrow text-bone/60">— 010 / {t("contact.eyebrow")}</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-[140px] leading-[0.9] tracking-[-0.03em]">
              {t("contact.title")}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-bone/65 text-lg leading-relaxed">{t("contact.body")}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-bone/10 border border-bone/10">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="glow-card group bg-carbon p-8 md:p-10 flex flex-col justify-between min-h-[260px] transition-colors duration-500 hover:bg-graphite reveal-item"
            >
              <c.Icon className="h-7 w-7 text-oxblood group-hover:text-oxblood-glow transition-colors" strokeWidth={1.25} />
              <div>
                <h3 className="font-display text-2xl md:text-3xl mb-3">{c.label}</h3>
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55">
                  <span>{c.sub}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
