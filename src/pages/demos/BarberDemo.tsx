import { useState } from "react";
import { DemoLayout } from "@/components/site/DemoLayout";
import { Button } from "@/components/ui/button";
import barber from "@/assets/case-barber.jpg";
import { Scissors, Clock, Bell } from "lucide-react";

const SERVICES = [
  { name: "Corte clásico", time: "30 min", price: "18 €" },
  { name: "Corte + barba", time: "45 min", price: "26 €" },
  { name: "Afeitado tradicional", time: "30 min", price: "20 €" },
  { name: "Pack premium", time: "60 min", price: "38 €" },
];

const BARBERS = ["David", "Marco", "Luis"];
const HOURS = ["10:00", "11:00", "12:30", "16:00", "17:30", "19:00"];

const BarberDemo = () => {
  const [svc, setSvc] = useState(SERVICES[1].name);
  const [barber_, setBarber] = useState(BARBERS[0]);
  const [hour, setHour] = useState<string | null>(null);

  return (
    <DemoLayout
      index="DEMO_02"
      kicker="Barber Shop"
      title="The Cut Co. — Cita en 30 segundos."
      intro="Sin llamadas, sin DMs perdidos. Eligen servicio, barbero y hora. Llegan los recordatorios solos. Reduce no-shows un 40%."
      heroImg={barber}
    >
      <section className="container-editorial py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="label-eyebrow">01 — Servicio</span>
              <div className="mt-4 grid sm:grid-cols-2 gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSvc(s.name)}
                    className={`text-left p-5 border transition-all ${
                      svc === s.name
                        ? "border-oxblood bg-carbon text-bone"
                        : "border-foreground/15 hover:border-foreground/40"
                    }`}
                  >
                    <div className="font-display text-xl">{s.name}</div>
                    <div className="flex justify-between mt-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                      <span>{s.time}</span><span>{s.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="label-eyebrow">02 — Barbero</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {BARBERS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBarber(b)}
                    className={`font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-3 border transition-all ${
                      barber_ === b
                        ? "bg-carbon text-bone border-carbon"
                        : "border-foreground/20 hover:border-oxblood"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="label-eyebrow">03 — Hora (mañana)</span>
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHour(h)}
                    className={`font-mono text-[12px] py-3 border transition-all ${
                      hour === h
                        ? "bg-oxblood text-bone border-oxblood"
                        : "border-foreground/15 hover:border-foreground/40"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-bone-dim p-8 sticky top-24 border border-foreground/10">
              <span className="label-eyebrow">Resumen</span>
              <h3 className="font-display text-3xl mt-4">Tu cita</h3>
              <dl className="mt-6 space-y-3 text-sm">
                <Row k="Servicio" v={svc} />
                <Row k="Barbero" v={barber_} />
                <Row k="Hora" v={hour ?? "—"} />
              </dl>
              <Button variant="oxblood" size="lg" className="w-full mt-8" disabled={!hour}>
                {hour ? "Confirmar cita" : "Elige una hora"}
              </Button>
              <div className="mt-8 pt-6 border-t border-foreground/15 space-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                <div className="flex items-center gap-2"><Bell className="h-3.5 w-3.5 text-oxblood" /> Recordatorio 24h y 1h antes</div>
                <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-oxblood" /> Cancela hasta 2h antes</div>
                <div className="flex items-center gap-2"><Scissors className="h-3.5 w-3.5 text-oxblood" /> Sincronizado con Google Cal</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </DemoLayout>
  );
};

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between border-b border-foreground/10 pb-2">
    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">{k}</dt>
    <dd className="font-display text-base">{v}</dd>
  </div>
);

export default BarberDemo;
