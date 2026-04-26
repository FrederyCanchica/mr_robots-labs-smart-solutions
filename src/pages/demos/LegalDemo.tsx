import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Scale, Building2, FileText, Calculator, Calendar as CalIcon, Check, ChevronRight, Clock, Shield, Users, Award } from "lucide-react";
import legalHero from "@/assets/demo-legal.jpg";

const SERVICES = [
  { id: "consult", icon: Scale, name: "Consultoría legal", duration: "45 min", price: "Gratis", desc: "Primera reunión sin compromiso." },
  { id: "tax", icon: Calculator, name: "Asesoría fiscal", duration: "60 min", price: "75€", desc: "Optimización fiscal personalizada." },
  { id: "valuation", icon: Building2, name: "Tasación inmobiliaria", duration: "Visita", price: "120€", desc: "Informe oficial en 48h." },
  { id: "docs", icon: FileText, name: "Trámites y escrituras", duration: "30 min", price: "Desde 90€", desc: "Gestoría integral." },
];

const TIMES = ["09:00", "10:00", "11:30", "12:30", "16:00", "17:00", "18:00"];

const getNextDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    days.push(d);
    if (days.length === 8) break;
  }
  return days;
};

const LegalDemo = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<string | null>(null);
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const days = getNextDays();

  useEffect(() => {
    document.title = "Legalis & Co · Asesoría Legal y Fiscal";
  }, []);

  const selectedService = SERVICES.find((s) => s.id === service);

  return (
    <div className="legalis-root min-h-screen">
      <style>{`
        .legalis-root {
          --lg-navy: #0F2540;
          --lg-navy-deep: #081A30;
          --lg-navy-soft: #1A3559;
          --lg-sand: #E8DDC9;
          --lg-sand-soft: #F4EDDC;
          --lg-cream: #FBF7EE;
          --lg-white: #FFFFFF;
          --lg-mute: #6B7A8C;
          --lg-gold: #B8945C;
          background: var(--lg-cream);
          color: var(--lg-navy);
          font-family: 'Inter', system-ui, sans-serif;
        }
        .lg-display { font-family: 'Fraunces', Georgia, serif; font-weight: 400; letter-spacing: -0.02em; }
        .lg-mono { font-family: 'JetBrains Mono', monospace; }
        .lg-cta {
          background: var(--lg-navy);
          color: var(--lg-cream);
          padding: 14px 26px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
          border: none;
          cursor: pointer;
        }
        .lg-cta:hover { background: var(--lg-navy-soft); }
        .lg-cta:disabled { opacity: 0.4; cursor: not-allowed; }
        .lg-ghost {
          background: transparent;
          color: var(--lg-navy);
          padding: 14px 26px;
          font-size: 13px;
          letter-spacing: 0.05em;
          border: 1px solid var(--lg-navy);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .lg-ghost:hover { background: var(--lg-navy); color: var(--lg-cream); }
        .lg-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: var(--lg-gold);
        }
        .lg-card {
          background: var(--lg-white);
          border: 1px solid rgba(15,37,64,0.08);
          transition: all 0.3s;
        }
        .lg-card:hover { border-color: var(--lg-navy); box-shadow: 0 20px 50px -20px rgba(15,37,64,0.25); }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "rgba(251,247,238,0.92)", borderBottom: "1px solid rgba(15,37,64,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center" style={{ background: "var(--lg-navy)" }}>
              <Scale className="w-5 h-5" style={{ color: "var(--lg-sand)" }} strokeWidth={1.5} />
            </div>
            <div>
              <div className="lg-display text-lg leading-none">Legalis &amp; Co</div>
              <div className="lg-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: "var(--lg-mute)" }}>Est. 1998</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--lg-mute)" }}>
            <a href="#services" className="hover:text-[var(--lg-navy)]">Servicios</a>
            <a href="#booking" className="hover:text-[var(--lg-navy)]">Reservar</a>
            <a href="#trust" className="hover:text-[var(--lg-navy)]">Equipo</a>
          </nav>
          <Link
            to="/#demos"
            className="lg-mono text-[10px] uppercase tracking-[0.18em] flex items-center gap-2"
            style={{ color: "var(--lg-mute)" }}
          >
            <ArrowLeft className="w-3 h-3" /> Portafolio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-16 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="lg-eyebrow mb-6 flex items-center gap-3">
              <span className="w-8 h-px" style={{ background: "var(--lg-gold)" }} />
              Despacho fundado en 1998
            </div>
            <h1 className="lg-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
              Asesoría legal,<br />
              <em style={{ color: "var(--lg-gold)" }}>con criterio.</em>
            </h1>
            <p className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed" style={{ color: "var(--lg-mute)" }}>
              Más de 25 años acompañando a familias y empresas en sus decisiones más importantes. Reserva tu consultoría online en 30 segundos.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#booking" className="lg-cta">
                Reservar cita <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#services" className="lg-ghost">Ver servicios</a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t" style={{ borderColor: "rgba(15,37,64,0.12)" }}>
              {[
                { v: "25+", l: "años" },
                { v: "1.200", l: "clientes" },
                { v: "98%", l: "renueva" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="lg-display text-3xl md:text-4xl">{s.v}</div>
                  <div className="lg-mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: "var(--lg-mute)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden" style={{ background: "var(--lg-sand)" }}>
              <img src={legalHero} alt="Despacho Legalis & Co" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 max-w-[260px]" style={{ background: "var(--lg-navy)", color: "var(--lg-cream)" }}>
              <Award className="w-6 h-6 mb-3" style={{ color: "var(--lg-gold)" }} />
              <div className="lg-display text-xl leading-tight">Bufete reconocido por el ICAM</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8" style={{ background: "var(--lg-navy)", color: "var(--lg-cream)" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Shield, t: "Confidencialidad", s: "Total" },
            { icon: Clock, t: "Respuesta", s: "<24h" },
            { icon: Users, t: "Equipo", s: "12 expertos" },
            { icon: CalIcon, t: "Online", s: "Reserva 24/7" },
          ].map((b) => (
            <div key={b.t} className="flex items-center justify-center gap-3">
              <b.icon className="w-5 h-5" style={{ color: "var(--lg-gold)" }} />
              <div className="text-left">
                <div className="lg-mono text-[10px] uppercase tracking-[0.2em] opacity-60">{b.t}</div>
                <div className="text-sm font-medium">{b.s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32" style={{ background: "var(--lg-sand-soft)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-7">
              <div className="lg-eyebrow mb-4">— 001 / Servicios</div>
              <h2 className="lg-display text-5xl md:text-6xl">Todo lo que tu negocio necesita.</h2>
            </div>
            <p className="lg:col-span-5 text-lg pt-8" style={{ color: "var(--lg-mute)" }}>
              Desde una primera consulta hasta la gestión completa de tu empresa. Trato cercano, criterio profesional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.id} className="lg-card p-8 flex items-start gap-6">
                <div className="w-14 h-14 flex items-center justify-center shrink-0" style={{ background: "var(--lg-sand)" }}>
                  <s.icon className="w-6 h-6" style={{ color: "var(--lg-navy)" }} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="lg-display text-2xl">{s.name}</h3>
                    <span className="lg-mono text-[10px]" style={{ color: "var(--lg-mute)" }}>0{i + 1}</span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--lg-mute)" }}>{s.desc}</p>
                  <div className="flex items-center gap-4 lg-mono text-[11px] uppercase tracking-[0.18em]">
                    <span style={{ color: "var(--lg-gold)" }}>{s.price}</span>
                    <span style={{ color: "var(--lg-mute)" }}>· {s.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking System */}
      <section id="booking" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="lg-eyebrow mb-4">— 002 / Reserva online</div>
            <h2 className="lg-display text-5xl md:text-6xl mb-4">Tu cita en 3 pasos.</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--lg-mute)" }}>
              Sincronización automática con Google Calendar. Recibirás confirmación inmediata por email.
            </p>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 flex items-center justify-center lg-mono text-sm transition-all`}
                  style={{
                    background: step >= n ? "var(--lg-navy)" : "var(--lg-sand)",
                    color: step >= n ? "var(--lg-cream)" : "var(--lg-navy)",
                  }}
                >
                  {step > n ? <Check className="w-4 h-4" /> : n}
                </div>
                {n < 3 && <div className="w-12 h-px" style={{ background: step > n ? "var(--lg-navy)" : "var(--lg-sand)" }} />}
              </div>
            ))}
          </div>

          <div className="lg-card p-8 md:p-12 max-w-4xl mx-auto">
            {/* Step 1: Service */}
            {step === 1 && (
              <div>
                <h3 className="lg-display text-3xl mb-2">Elige el servicio</h3>
                <p className="text-sm mb-8" style={{ color: "var(--lg-mute)" }}>Selecciona el tipo de consulta.</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setService(s.id)}
                      className="text-left p-5 border transition-all flex items-start gap-4"
                      style={{
                        borderColor: service === s.id ? "var(--lg-navy)" : "rgba(15,37,64,0.12)",
                        background: service === s.id ? "var(--lg-sand-soft)" : "transparent",
                      }}
                    >
                      <s.icon className="w-5 h-5 mt-1 shrink-0" style={{ color: "var(--lg-gold)" }} />
                      <div className="flex-1">
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs mt-1" style={{ color: "var(--lg-mute)" }}>{s.duration} · {s.price}</div>
                      </div>
                      {service === s.id && <Check className="w-5 h-5" style={{ color: "var(--lg-navy)" }} />}
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setStep(2)} disabled={!service} className="lg-cta">
                    Siguiente <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div>
                <h3 className="lg-display text-3xl mb-2">Fecha y hora</h3>
                <p className="text-sm mb-8" style={{ color: "var(--lg-mute)" }}>{selectedService?.name} · {selectedService?.duration}</p>

                <div className="lg-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--lg-mute)" }}>Fecha disponible</div>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-8">
                  {days.map((d, i) => {
                    const sel = day?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={i}
                        onClick={() => setDay(d)}
                        className="p-3 border text-center transition-all"
                        style={{
                          borderColor: sel ? "var(--lg-navy)" : "rgba(15,37,64,0.12)",
                          background: sel ? "var(--lg-navy)" : "transparent",
                          color: sel ? "var(--lg-cream)" : "var(--lg-navy)",
                        }}
                      >
                        <div className="lg-mono text-[9px] uppercase tracking-[0.15em] opacity-70">
                          {d.toLocaleDateString("es", { weekday: "short" })}
                        </div>
                        <div className="lg-display text-xl mt-1">{d.getDate()}</div>
                      </button>
                    );
                  })}
                </div>

                {day && (
                  <>
                    <div className="lg-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--lg-mute)" }}>Hora</div>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-8">
                      {TIMES.map((t) => {
                        const sel = time === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            className="py-3 border lg-mono text-sm transition-all"
                            style={{
                              borderColor: sel ? "var(--lg-navy)" : "rgba(15,37,64,0.12)",
                              background: sel ? "var(--lg-navy)" : "transparent",
                              color: sel ? "var(--lg-cream)" : "var(--lg-navy)",
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="lg-ghost"><ArrowLeft className="w-4 h-4" /> Atrás</button>
                  <button onClick={() => setStep(3)} disabled={!day || !time} className="lg-cta">
                    Siguiente <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div>
                <h3 className="lg-display text-3xl mb-2">Confirma tus datos</h3>
                <p className="text-sm mb-8" style={{ color: "var(--lg-mute)" }}>Recibirás un email con el evento de Google Calendar.</p>

                <div className="p-5 mb-8" style={{ background: "var(--lg-sand-soft)" }}>
                  <div className="lg-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--lg-gold)" }}>Resumen</div>
                  <div className="lg-display text-2xl mb-1">{selectedService?.name}</div>
                  <div className="text-sm" style={{ color: "var(--lg-mute)" }}>
                    {day?.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" })} · {time} · {selectedService?.duration}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {["Nombre completo", "Email", "Teléfono", "Asunto / Empresa"].map((l) => (
                    <div key={l}>
                      <label className="lg-mono text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "var(--lg-mute)" }}>{l}</label>
                      <input className="w-full bg-transparent border-b py-2 outline-none focus:border-[var(--lg-navy)] transition-colors" style={{ borderColor: "rgba(15,37,64,0.2)" }} />
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 flex items-start gap-3 text-sm" style={{ background: "var(--lg-sand-soft)", color: "var(--lg-mute)" }}>
                  <CalIcon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "var(--lg-navy)" }} />
                  <div>
                    <strong style={{ color: "var(--lg-navy)" }}>Sincronización automática.</strong> Tu cita se añadirá al calendario del despacho y recibirás el evento en tu Google Calendar con un clic.
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(2)} className="lg-ghost"><ArrowLeft className="w-4 h-4" /> Atrás</button>
                  <button onClick={() => alert("Demo: cita reservada y enviada a Google Calendar")} className="lg-cta">
                    Confirmar reserva <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Google Calendar feature */}
      <section id="trust" className="py-24 md:py-32" style={{ background: "var(--lg-navy)", color: "var(--lg-cream)" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="lg-mono text-[11px] uppercase tracking-[0.22em] mb-4" style={{ color: "var(--lg-gold)" }}>— 003 / Integración</div>
            <h2 className="lg-display text-5xl md:text-6xl mb-6">
              Sincronizado con<br /><em style={{ color: "var(--lg-gold)" }}>Google Calendar.</em>
            </h2>
            <p className="text-lg opacity-80 mb-8">
              Cada reserva crea automáticamente un evento en el calendario del despacho y del cliente. Cero gestión manual, cero solapamientos.
            </p>
            <ul className="space-y-4">
              {[
                "Disponibilidad en tiempo real",
                "Recordatorios automáticos por email y SMS",
                "Reprogramación con un clic",
                "Bloqueo de huecos festivos automático",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <Check className="w-5 h-5" style={{ color: "var(--lg-gold)" }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8" style={{ background: "var(--lg-navy-deep)", border: "1px solid rgba(184,148,92,0.2)" }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
              </div>
              <div className="lg-mono text-[10px] uppercase tracking-[0.2em] opacity-50">calendar.google.com</div>
            </div>

            <div className="lg-display text-2xl mb-4">Abril 2026</div>

            <div className="grid grid-cols-7 gap-1 mb-3">
              {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
                <div key={d} className="lg-mono text-[10px] uppercase opacity-50 text-center py-1">{d}</div>
              ))}
              {Array.from({ length: 30 }, (_, i) => {
                const num = i + 1;
                const hasEvent = [3, 7, 14, 18, 22, 26].includes(num);
                const today = num === 8;
                return (
                  <div
                    key={num}
                    className="aspect-square text-xs flex items-center justify-center relative"
                    style={{
                      background: today ? "var(--lg-gold)" : hasEvent ? "rgba(184,148,92,0.15)" : "transparent",
                      color: today ? "var(--lg-navy)" : "var(--lg-cream)",
                    }}
                  >
                    {num}
                    {hasEvent && !today && <div className="absolute bottom-1 w-1 h-1 rounded-full" style={{ background: "var(--lg-gold)" }} />}
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 mt-6 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {[
                { t: "10:00 · Tasación inmueble C/ Serrano", c: "#4285F4" },
                { t: "12:30 · Consultoría fiscal — Pyme", c: "#34A853" },
                { t: "17:00 · Firma escrituras notario", c: "#EA4335" },
              ].map((e) => (
                <div key={e.t} className="flex items-center gap-3 text-sm">
                  <div className="w-1 h-6" style={{ background: e.c }} />
                  <span className="opacity-90">{e.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t" style={{ borderColor: "rgba(15,37,64,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm" style={{ color: "var(--lg-mute)" }}>
          <div>© 2025 Legalis &amp; Co · Colegiado ICAM 12.345</div>
          <Link to="/#demos" className="flex items-center gap-2 hover:text-[var(--lg-navy)]">
            <ArrowLeft className="w-3 h-3" /> Demo de MR_ROBOTS LABS
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LegalDemo;
