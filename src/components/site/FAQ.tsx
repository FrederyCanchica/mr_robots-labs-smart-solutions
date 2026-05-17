import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";

export const FAQ = () => {
  const { t, lang } = useI18n();
  const ref = useReveal<HTMLDivElement>();

  const items = lang === "es"
    ? [
        { q: "¿Cuánto tarda en estar lista mi web?", a: "Smart Presence en 7-10 días. Smart Booking en 2-3 semanas. AI Receptionist en 3-5 semanas según integraciones." },
        { q: "¿Puedo editar la web yo después?", a: "Sí. Te entregamos un panel sencillo y formación grabada. Si prefieres no tocar nada, ofrecemos planes de mantenimiento mensual." },
        { q: "¿El agente IA habla por WhatsApp?", a: "Sí. Conectamos el bot a WhatsApp Business, web, Instagram DM o el canal que uses. Juntos lo podemos entrenar para que responda 24/7 con tu tono." },
        { q: "¿Y si ya tengo web?", a: "La evaluamos sin coste. Si es sólida, construimos encima. Si creemos que te va a salir más caro parchearla que actualizarla, te daremos una opinión profesional basada en datos para que tú decidas." },
        { q: "¿Cómo se factura?", a: "50% al inicio, 50% a la entrega. Aceptamos transferencia, tarjeta y Bizum. Factura con IVA siempre." },
        { q: "¿Trabajáis fuera de España?", a: "Sí, trabajamos con clientes en toda la Unión Europea, Norteamérica y Latinoamérica. Todas nuestras reuniones son por videollamada para que la distancia no sea un freno." },
      ]
    : [
        { q: "How long until my site is ready?", a: "Smart Presence in 7–10 days. Smart Booking in 2–3 weeks. AI Receptionist in 3–5 weeks depending on integrations." },
        { q: "Can I edit the site myself later?", a: "Yes. You get a simple panel and recorded training. If you'd rather not touch anything, we offer monthly maintenance plans." },
        { q: "Does the AI agent work over WhatsApp?", a: "Yes. We connect the bot to WhatsApp Business, web chat, Instagram DM or any channel you use. Answers 24/7 in your tone." },
        { q: "What if I already have a website?", a: "We audit what you have. If it works, we automate on top. If not, we'll tell you honestly that starting fresh is better." },
        { q: "How is billing handled?", a: "50% upfront, 50% on delivery. Bank transfer, card and Bizum accepted. Always invoiced with VAT." },
        { q: "Do you work outside Spain?", a: "Yes, we work with clients across the EU and Latin America. Meetings over video call." },
      ];

  return (
    <section className="bg-background text-foreground py-24 md:py-36">
      <div ref={ref} className="container-editorial reveal">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
              {t("faq.title")}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {items.map((it, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-t border-foreground/15 last:border-b"
                >
                  <AccordionTrigger className="py-6 text-left hover:no-underline group">
                    <span className="flex items-center gap-6">
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                      </span>
                      <span className="font-display text-xl md:text-2xl leading-tight">
                        {it.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-[calc(11px+24px+8px)] pr-8 pb-6 text-foreground/70 text-base leading-relaxed">
                    {it.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
