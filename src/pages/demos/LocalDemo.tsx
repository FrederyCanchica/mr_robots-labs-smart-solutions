import { useState, useRef, useEffect } from "react";
import { DemoLayout } from "@/components/site/DemoLayout";
import { Button } from "@/components/ui/button";
import local from "@/assets/case-local.jpg";
import { Send, Bot, User } from "lucide-react";

interface Msg { role: "bot" | "user"; text: string; }

const SCRIPT: Msg[] = [
  { role: "bot", text: "Hola, soy Aria, asistente de Casa Brava. ¿En qué te ayudo?" },
  { role: "user", text: "Quería reservar mesa para el sábado." },
  { role: "bot", text: "Perfecto. ¿Para cuántas personas y a qué hora?" },
  { role: "user", text: "4 personas, 21:00." },
  { role: "bot", text: "Tengo disponibilidad. ¿A qué nombre la reservo? Te confirmo por WhatsApp en segundos." },
];

const LocalDemo = () => {
  const [shown, setShown] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i >= SCRIPT.length) return;
      setTyping(true);
      setTimeout(() => {
        setShown((prev) => [...prev, SCRIPT[i]]);
        setTyping(false);
        i++;
        if (i < SCRIPT.length) setTimeout(tick, 1100);
      }, 850);
    };
    tick();
  }, []);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  return (
    <DemoLayout
      index="DEMO_03"
      kicker="Local Business"
      title="Casa Brava — Atendido por IA, sin parecer IA."
      intro="Un agente que contesta WhatsApp y web 24/7, califica leads y agenda. Tu equipo solo trata con clientes ya cerrados."
      heroImg={local}
    >
      <section className="container-editorial py-20 md:py-28 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <span className="label-eyebrow">Conversación en vivo</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 mb-8">Así suena tu IA.</h2>

          <div className="bg-carbon text-bone overflow-hidden border border-foreground/10">
            <header className="flex items-center gap-3 px-5 py-4 border-b border-bone/10 bg-graphite">
              <div className="h-9 w-9 rounded-full bg-oxblood flex items-center justify-center">
                <Bot className="h-4 w-4 text-bone" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-display text-base leading-tight">Aria · AI Receptionist</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-oxblood-glow animate-pulse" /> en línea
                </div>
              </div>
            </header>

            <div ref={ref} className="h-[420px] overflow-y-auto p-5 space-y-4">
              {shown.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                >
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                    m.role === "bot" ? "bg-oxblood" : "bg-bone text-carbon"
                  }`}>
                    {m.role === "bot" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  </div>
                  <div className={`px-4 py-3 text-sm leading-relaxed ${
                    m.role === "bot" ? "bg-graphite text-bone" : "bg-bone text-carbon"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-3 max-w-[60%]">
                  <div className="h-7 w-7 rounded-full bg-oxblood flex items-center justify-center"><Bot className="h-3.5 w-3.5" /></div>
                  <div className="px-4 py-3 bg-graphite flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-bone/60 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-bone/60 animate-bounce [animation-delay:0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-bone/60 animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-4 border-t border-bone/10 bg-graphite flex items-center gap-3">
              <input
                disabled
                placeholder="Escribe un mensaje (demo)"
                className="flex-1 bg-transparent text-sm text-bone/70 placeholder:text-bone/30 focus:outline-none"
              />
              <button className="h-9 w-9 bg-oxblood flex items-center justify-center">
                <Send className="h-4 w-4 text-bone" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-bone-dim p-8 border border-foreground/10">
            <span className="label-eyebrow">Capacidades</span>
            <h3 className="font-display text-3xl mt-4 mb-6">¿Qué puede hacer Aria?</h3>
            <ul className="space-y-4">
              {[
                "Responder consultas frecuentes en tu tono",
                "Cualificar leads antes de pasarlos a humano",
                "Agendar y mover citas en tu calendario",
                "Enviar recordatorios automáticos",
                "Detectar urgencias y avisarte al instante",
              ].map((f) => (
                <li key={f} className="flex gap-4 items-start text-sm leading-relaxed">
                  <span className="font-mono text-[11px] text-oxblood mt-0.5">→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button asChild variant="oxblood" size="xl" className="w-full">
            <a href="/#contact">Quiero a Aria en mi negocio</a>
          </Button>
        </aside>
      </section>
    </DemoLayout>
  );
};

export default LocalDemo;
