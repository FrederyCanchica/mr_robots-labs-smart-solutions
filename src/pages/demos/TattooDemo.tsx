import { useState } from "react";
import { DemoLayout } from "@/components/site/DemoLayout";
import { Button } from "@/components/ui/button";
import tattoo from "@/assets/case-tattoo.jpg";
import { Calendar, Filter, Instagram } from "lucide-react";

const STYLES = ["Blackwork", "Fineline", "Oriental", "Realismo", "Lettering"];
const SLOTS = ["Lun 14:00", "Mar 11:30", "Mié 17:00", "Jue 10:00", "Vie 18:30", "Sáb 12:00"];

const TattooDemo = () => {
  const [style, setStyle] = useState("Blackwork");
  const [slot, setSlot] = useState<string | null>(null);

  return (
    <DemoLayout
      index="DEMO_01"
      kicker="Tattoo Studio"
      title="Inkhaus — Estudio que se llena solo."
      intro="Una web que filtra por estilo, muestra portfolio en formato editorial y agenda citas con depósito previo. Pensada para artistas que ya no dan abasto por DM."
      heroImg={tattoo}
    >
      <section className="container-editorial py-20 md:py-28 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <span className="label-eyebrow">Portfolio filtrable</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 mb-8">Encuentra tu artista por estilo.</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-all ${
                  style === s
                    ? "bg-carbon text-bone border-carbon"
                    : "border-foreground/20 hover:border-oxblood hover:text-oxblood"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-carbon relative overflow-hidden group"
                style={{
                  backgroundImage: `radial-gradient(circle at ${30 + i * 5}% ${20 + i * 3}%, hsl(var(--graphite-soft)), hsl(var(--carbon)))`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center font-display text-bone/30 text-3xl group-hover:text-oxblood-glow transition-colors">
                  {style[0]}
                </div>
                <div className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/40">
                  {style}_{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="bg-carbon text-bone p-8 sticky top-24">
            <span className="label-eyebrow text-bone/60">Reserva</span>
            <h3 className="font-display text-3xl mt-4 mb-6">Coge sesión.</h3>

            <div className="grid grid-cols-2 gap-2 mb-8">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] py-3 border transition-all ${
                    slot === s
                      ? "bg-oxblood text-bone border-oxblood"
                      : "border-bone/15 text-bone/80 hover:border-oxblood-glow"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <Button variant="oxblood" size="lg" className="w-full" disabled={!slot}>
              {slot ? `Confirmar ${slot}` : "Selecciona un hueco"}
            </Button>

            <div className="mt-8 pt-6 border-t border-bone/15 grid grid-cols-2 gap-4 text-bone/60 font-mono text-[10px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-oxblood-glow" /> Sync calendar</div>
              <div className="flex items-center gap-2"><Filter className="h-3.5 w-3.5 text-oxblood-glow" /> Depósito 30€</div>
              <div className="flex items-center gap-2"><Instagram className="h-3.5 w-3.5 text-oxblood-glow" /> IG feed live</div>
            </div>
          </div>
        </aside>
      </section>
    </DemoLayout>
  );
};

export default TattooDemo;
