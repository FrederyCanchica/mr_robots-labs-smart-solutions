import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";

export const Testimonials = () => {
  const { t, lang } = useI18n();
  const ref = useReveal<HTMLDivElement>();

  const items = lang === "es"
    ? [
        {
          q: "Pasamos de perder citas por WhatsApp a tener la agenda llena dos semanas por delante. El sistema trabaja por nosotros.",
          a: "Lucía R.",
          r: "Estudio de tatuaje · Madrid",
        },
        {
          q: "El agente IA contesta a las 11 de la noche y agenda. Antes era yo, ahora es el sistema. Recuperé mis tardes.",
          a: "David M.",
          r: "Barber Shop · Valencia",
        },
        {
          q: "Mi pagina web que parece de marca grande con presupuesto de autónomo. Los clientes nos toman más en serio.",
          a: "Marta G.",
          r: "Estudio creativo · Bilbao",
        },
      ]
    : [
        {
          q: "We went from losing WhatsApp leads to a fully booked agenda two weeks ahead. The system does the work.",
          a: "Lucía R.",
          r: "Tattoo studio · Madrid",
        },
        {
          q: "The AI agent answers at 11pm and books the slot. It used to be me — now it's the system. I got my evenings back.",
          a: "David M.",
          r: "Barber shop · Valencia",
        },
        {
          q: "Big-brand design on a freelancer budget. Clients take us more seriously.",
          a: "Marta G.",
          r: "Creative studio · Bilbao",
        },
      ];

  return (
    <section className="bg-background text-foreground py-24 md:py-36 relative">
      <div ref={ref} className="container-editorial reveal">
        <div className="mb-16 md:mb-20">
          
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-4xl">
            {t("test.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {items.map((it, i) => (
            <figure key={i} className="bg-background p-8 md:p-10 flex flex-col">
              <span className="font-display text-6xl text-oxblood leading-none mb-6">"</span>
              <blockquote className="font-display text-xl md:text-2xl leading-snug text-foreground/95 mb-8 flex-1">
                {it.q}
              </blockquote>
              <figcaption className="border-t border-foreground/15 pt-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
                  {it.a}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50 mt-1">
                  {it.r}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
