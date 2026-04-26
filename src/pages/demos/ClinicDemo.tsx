import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Heart, Stethoscope, Activity, Calendar as CalIcon, Check, ChevronRight, MessageCircle, Send, Bot, Sparkles, Database, Zap, User } from "lucide-react";
import clinicHero from "@/assets/demo-clinic.jpg";

const SPECIALTIES = [
  { icon: Heart, name: "Cardiología", desc: "Prevención y diagnóstico cardiovascular." },
  { icon: Stethoscope, name: "Medicina general", desc: "Atención integral para toda la familia." },
  { icon: Activity, name: "Análisis clínicos", desc: "Resultados en 24-48h." },
  { icon: User, name: "Pediatría", desc: "Cuidado especializado infantil." },
];

const SERVICES = [
  { id: "general", name: "Consulta general", duration: "30 min", price: "60€" },
  { id: "cardio", name: "Cardiología", duration: "45 min", price: "90€" },
  { id: "analytics", name: "Análisis clínicos", duration: "15 min", price: "45€" },
  { id: "pediatric", name: "Pediatría", duration: "30 min", price: "70€" },
];

const TIMES = ["09:00", "10:00", "11:30", "12:30", "16:00", "17:00", "18:00"];

const getNextDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0) continue;
    days.push(d);
    if (days.length === 7) break;
  }
  return days;
};

type Msg = { role: "ai" | "user"; text: string };

const SCRIPT: Msg[] = [
  { role: "ai", text: "Hola, soy Vita, asistente virtual de VitalCenter. ¿En qué puedo ayudarte hoy?" },
  { role: "user", text: "Tengo dolor en el pecho desde ayer." },
  { role: "ai", text: "Lamento oír eso. ¿Puedes describir el dolor? ¿Es opresivo, punzante o se irradia al brazo?" },
  { role: "user", text: "Es opresivo y aparece al subir escaleras." },
  { role: "ai", text: "Entiendo. Por tus síntomas, te recomiendo una consulta urgente con Cardiología. Tengo un hueco mañana a las 10:00 con la Dra. Méndez. ¿Lo confirmo?" },
  { role: "user", text: "Sí, por favor." },
  { role: "ai", text: "✓ Cita confirmada. Te he enviado el recordatorio por SMS y email, y se ha registrado en el CRM con prioridad alta." },
];

const ClinicDemo = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<string | null>(null);
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([SCRIPT[0]]);
  const [typing, setTyping] = useState(false);
  const days = getNextDays();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "VitalCenter · Clínica con Recepcionista IA";
  }, []);

  useEffect(() => {
    if (!chatOpen) return;
    let i = 1;
    const tick = () => {
      if (i >= SCRIPT.length) return;
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, SCRIPT[i]]);
        i++;
        setTimeout(tick, SCRIPT[i]?.role === "user" ? 1100 : 1900);
      }, 1300);
    };
    const t = setTimeout(tick, 1500);
    return () => clearTimeout(t);
  }, [chatOpen]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const selectedService = SERVICES.find((s) => s.id === service);

  return (
    <div className="vital-root min-h-screen">
      <style>{`
        .vital-root {
          --vc-mint: #C7EBD9;
          --vc-mint-soft: #E4F5EC;
          --vc-mint-deep: #5BA88A;
          --vc-mint-dark: #2E6B53;
          --vc-grey: #F4F6F7;
          --vc-grey-soft: #FAFBFC;
          --vc-line: #E5EAEC;
          --vc-text: #1A2E2A;
          --vc-mute: #6B7B78;
          --vc-white: #FFFFFF;
          background: var(--vc-grey-soft);
          color: var(--vc-text);
          font-family: 'Inter', system-ui, sans-serif;
        }
        .vc-display { font-family: 'Fraunces', Georgia, serif; font-weight: 400; letter-spacing: -0.02em; }
        .vc-mono { font-family: 'JetBrains Mono', monospace; }
        .vc-cta {
          background: var(--vc-mint-dark);
          color: var(--vc-white);
          padding: 14px 26px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .vc-cta:hover { background: var(--vc-mint-deep); }
        .vc-cta:disabled { opacity: 0.4; cursor: not-allowed; }
        .vc-ghost {
          background: var(--vc-white);
          color: var(--vc-text);
          padding: 14px 26px;
          font-size: 13px;
          letter-spacing: 0.04em;
          border: 1px solid var(--vc-line);
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .vc-ghost:hover { border-color: var(--vc-mint-dark); color: var(--vc-mint-dark); }
        .vc-card {
          background: var(--vc-white);
          border: 1px solid var(--vc-line);
          border-radius: 24px;
          transition: all 0.3s;
        }
        .vc-card:hover { border-color: var(--vc-mint-deep); box-shadow: 0 20px 50px -25px rgba(46,107,83,0.25); }
        .vc-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: var(--vc-mint-dark);
        }
        .vc-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          pointer-events: none;
        }
        @keyframes vcDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .vc-typing span { animation: vcDot 1.2s infinite; display: inline-block; }
        .vc-typing span:nth-child(2) { animation-delay: 0.15s; }
        .vc-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes vcPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(91,168,138,0.5); }
          50% { box-shadow: 0 0 0 18px rgba(91,168,138,0); }
        }
        .vc-pulse { animation: vcPulse 2.2s infinite; }
        .vc-flow-line {
          background: linear-gradient(90deg, transparent, var(--vc-mint-deep), transparent);
          background-size: 200% 100%;
          animation: vcFlow 2.5s linear infinite;
        }
        @keyframes vcFlow { from { background-position: 200% 0; } to { background-position: -200% 0; } }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md" style={{ background: "rgba(250,251,252,0.9)", borderBottom: "1px solid var(--vc-line)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--vc-mint)" }}>
              <Heart className="w-4 h-4" style={{ color: "var(--vc-mint-dark)" }} fill="currentColor" />
            </div>
            <span className="vc-display text-xl">VitalCenter</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--vc-mute)" }}>
            <a href="#specialties" className="hover:text-[var(--vc-mint-dark)]">Especialidades</a>
            <a href="#booking" className="hover:text-[var(--vc-mint-dark)]">Reservar</a>
            <a href="#ai" className="hover:text-[var(--vc-mint-dark)]">IA</a>
          </nav>
          <Link
            to="/#demos"
            className="vc-mono text-[10px] uppercase tracking-[0.18em] flex items-center gap-2"
            style={{ color: "var(--vc-mute)" }}
          >
            <ArrowLeft className="w-3 h-3" /> Portafolio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 relative overflow-hidden">
        <div className="vc-blob" style={{ background: "var(--vc-mint)", width: 500, height: 500, top: -100, right: -100 }} />
        <div className="vc-blob" style={{ background: "var(--vc-mint-soft)", width: 400, height: 400, bottom: 0, left: -100 }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="vc-eyebrow mb-6 flex items-center gap-3">
              <Sparkles className="w-3.5 h-3.5" />
              Atención IA disponible 24/7
            </div>
            <h1 className="vc-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
              Tu salud,<br />
              <span style={{ color: "var(--vc-mint-dark)" }}>cuidada con calma.</span>
            </h1>
            <p className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed" style={{ color: "var(--vc-mute)" }}>
              Clínica de medicina integral con asistente virtual que escucha tus síntomas, te orienta y agenda tu cita en segundos.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#booking" className="vc-cta">
                Pedir cita <ChevronRight className="w-4 h-4" />
              </a>
              <button onClick={() => setChatOpen(true)} className="vc-ghost">
                <Bot className="w-4 h-4" /> Hablar con Vita IA
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t" style={{ borderColor: "var(--vc-line)" }}>
              {[
                { v: "24/7", l: "asistente IA" },
                { v: "<2 min", l: "para citar" },
                { v: "4.9★", l: "Doctoralia" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="vc-display text-3xl md:text-4xl" style={{ color: "var(--vc-mint-dark)" }}>{s.v}</div>
                  <div className="vc-mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: "var(--vc-mute)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[32px] overflow-hidden" style={{ background: "var(--vc-mint-soft)" }}>
              <img src={clinicHero} alt="VitalCenter" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 vc-card p-5 max-w-[260px] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--vc-mint)" }}>
                <Bot className="w-6 h-6" style={{ color: "var(--vc-mint-dark)" }} />
              </div>
              <div>
                <div className="text-sm font-medium">Vita IA</div>
                <div className="text-xs" style={{ color: "var(--vc-mute)" }}>En línea ahora</div>
              </div>
              <div className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="vc-eyebrow mb-4">— 001 / Especialidades</div>
            <h2 className="vc-display text-5xl md:text-6xl mb-4">Equipo médico de confianza.</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--vc-mute)" }}>
              Profesionales colegiados y trato humano en cada consulta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPECIALTIES.map((s) => (
              <div key={s.name} className="vc-card p-7">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "var(--vc-mint-soft)" }}>
                  <s.icon className="w-6 h-6" style={{ color: "var(--vc-mint-dark)" }} strokeWidth={1.5} />
                </div>
                <h3 className="vc-display text-2xl mb-2">{s.name}</h3>
                <p className="text-sm" style={{ color: "var(--vc-mute)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Flow visualization */}
      <section id="ai" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--vc-mint-soft)" }}>
        <div className="vc-blob" style={{ background: "var(--vc-mint)", width: 600, height: 600, top: "20%", left: "30%", opacity: 0.4 }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="vc-eyebrow mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> — 002 / Recepcionista IA
            </div>
            <h2 className="vc-display text-5xl md:text-6xl mb-4">Cómo trabaja Vita.</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--vc-mute)" }}>
              Un agente conversacional que recibe al paciente, cualifica síntomas y agenda automáticamente en el CRM.
            </p>
          </div>

          {/* Flow diagram */}
          <div className="vc-card p-8 md:p-12 mb-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
              </div>
              <div className="vc-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--vc-mute)" }}>n8n · workflow_vital</div>
            </div>

            <div className="grid md:grid-cols-5 gap-3 items-center">
              {[
                { icon: MessageCircle, label: "Mensaje paciente", sub: "WhatsApp / Web", color: "#5BA88A" },
                { icon: Bot, label: "Vita IA", sub: "GPT clasificador", color: "#2E6B53" },
                { icon: Activity, label: "Triaje síntomas", sub: "Prioridad + spec.", color: "#5BA88A" },
                { icon: CalIcon, label: "Agendar cita", sub: "Hueco óptimo", color: "#2E6B53" },
                { icon: Database, label: "CRM + SMS", sub: "Confirmación", color: "#5BA88A" },
              ].map((n, i, arr) => (
                <div key={n.label} className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 relative z-10" style={{ background: n.color, color: "white" }}>
                    <n.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <div className="vc-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--vc-mute)" }}>STEP_0{i + 1}</div>
                  <div className="font-medium text-sm mt-1">{n.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--vc-mute)" }}>{n.sub}</div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px vc-flow-line" />
                  )}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t" style={{ borderColor: "var(--vc-line)" }}>
              {[
                { v: "1.2s", l: "respuesta media" },
                { v: "94%", l: "citas autónomas" },
                { v: "0", l: "huecos perdidos" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="vc-display text-3xl" style={{ color: "var(--vc-mint-dark)" }}>{s.v}</div>
                  <div className="vc-mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: "var(--vc-mute)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini dashboard */}
          <div className="grid lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <div className="vc-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="vc-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--vc-mute)" }}>Hoy</div>
                <Zap className="w-4 h-4" style={{ color: "var(--vc-mint-dark)" }} />
              </div>
              <div className="vc-display text-4xl mb-1">47</div>
              <div className="text-sm" style={{ color: "var(--vc-mute)" }}>Conversaciones IA</div>
              <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs" style={{ borderColor: "var(--vc-line)", color: "var(--vc-mint-dark)" }}>
                <span>↑ 32%</span><span style={{ color: "var(--vc-mute)" }}>vs ayer</span>
              </div>
            </div>
            <div className="vc-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="vc-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--vc-mute)" }}>Semana</div>
                <CalIcon className="w-4 h-4" style={{ color: "var(--vc-mint-dark)" }} />
              </div>
              <div className="vc-display text-4xl mb-1">128</div>
              <div className="text-sm" style={{ color: "var(--vc-mute)" }}>Citas agendadas</div>
              <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs" style={{ borderColor: "var(--vc-line)", color: "var(--vc-mint-dark)" }}>
                <span>↑ 18%</span><span style={{ color: "var(--vc-mute)" }}>vs semana ant.</span>
              </div>
            </div>
            <div className="vc-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="vc-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--vc-mute)" }}>Tiempo ahorrado</div>
                <Activity className="w-4 h-4" style={{ color: "var(--vc-mint-dark)" }} />
              </div>
              <div className="vc-display text-4xl mb-1">22h</div>
              <div className="text-sm" style={{ color: "var(--vc-mute)" }}>Recepción humana</div>
              <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs" style={{ borderColor: "var(--vc-line)", color: "var(--vc-mint-dark)" }}>
                <span>= 2.750€</span><span style={{ color: "var(--vc-mute)" }}>/mes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="vc-eyebrow mb-4">— 003 / Reserva tu cita</div>
            <h2 className="vc-display text-5xl md:text-6xl mb-4">Sin esperas, sin llamadas.</h2>
          </div>

          <div className="flex items-center justify-center gap-4 mb-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center vc-mono text-sm transition-all"
                  style={{
                    background: step >= n ? "var(--vc-mint-dark)" : "var(--vc-mint-soft)",
                    color: step >= n ? "white" : "var(--vc-mint-dark)",
                  }}
                >
                  {step > n ? <Check className="w-4 h-4" /> : n}
                </div>
                {n < 3 && <div className="w-12 h-px" style={{ background: step > n ? "var(--vc-mint-dark)" : "var(--vc-line)" }} />}
              </div>
            ))}
          </div>

          <div className="vc-card p-8 md:p-12">
            {step === 1 && (
              <div>
                <h3 className="vc-display text-3xl mb-2">Elige especialidad</h3>
                <p className="text-sm mb-8" style={{ color: "var(--vc-mute)" }}>¿Qué consulta necesitas?</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setService(s.id)}
                      className="text-left p-5 rounded-2xl border-2 transition-all"
                      style={{
                        borderColor: service === s.id ? "var(--vc-mint-dark)" : "var(--vc-line)",
                        background: service === s.id ? "var(--vc-mint-soft)" : "transparent",
                      }}
                    >
                      <div className="font-medium mb-1">{s.name}</div>
                      <div className="text-xs" style={{ color: "var(--vc-mute)" }}>{s.duration} · {s.price}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setStep(2)} disabled={!service} className="vc-cta">Siguiente <ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className="vc-display text-3xl mb-2">Elige fecha y hora</h3>
                <p className="text-sm mb-8" style={{ color: "var(--vc-mute)" }}>{selectedService?.name}</p>
                <div className="vc-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--vc-mute)" }}>Día</div>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-8">
                  {days.map((d, i) => {
                    const sel = day?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={i}
                        onClick={() => setDay(d)}
                        className="p-3 rounded-xl border-2 text-center transition-all"
                        style={{
                          borderColor: sel ? "var(--vc-mint-dark)" : "var(--vc-line)",
                          background: sel ? "var(--vc-mint-dark)" : "transparent",
                          color: sel ? "white" : "var(--vc-text)",
                        }}
                      >
                        <div className="vc-mono text-[9px] uppercase opacity-70">{d.toLocaleDateString("es", { weekday: "short" })}</div>
                        <div className="vc-display text-xl mt-1">{d.getDate()}</div>
                      </button>
                    );
                  })}
                </div>
                {day && (
                  <>
                    <div className="vc-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--vc-mute)" }}>Hora</div>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-8">
                      {TIMES.map((t) => {
                        const sel = time === t;
                        return (
                          <button key={t} onClick={() => setTime(t)} className="py-3 rounded-xl border-2 vc-mono text-sm transition-all"
                            style={{
                              borderColor: sel ? "var(--vc-mint-dark)" : "var(--vc-line)",
                              background: sel ? "var(--vc-mint-dark)" : "transparent",
                              color: sel ? "white" : "var(--vc-text)",
                            }}
                          >{t}</button>
                        );
                      })}
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="vc-ghost"><ArrowLeft className="w-4 h-4" /> Atrás</button>
                  <button onClick={() => setStep(3)} disabled={!day || !time} className="vc-cta">Siguiente <ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 className="vc-display text-3xl mb-2">Tus datos</h3>
                <p className="text-sm mb-8" style={{ color: "var(--vc-mute)" }}>Vita confirmará tu cita por SMS y email.</p>
                <div className="p-5 rounded-2xl mb-8" style={{ background: "var(--vc-mint-soft)" }}>
                  <div className="vc-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--vc-mint-dark)" }}>Resumen</div>
                  <div className="vc-display text-2xl mb-1">{selectedService?.name}</div>
                  <div className="text-sm" style={{ color: "var(--vc-mute)" }}>
                    {day?.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" })} · {time}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {["Nombre completo", "DNI", "Email", "Teléfono"].map((l) => (
                    <div key={l}>
                      <label className="vc-mono text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "var(--vc-mute)" }}>{l}</label>
                      <input className="w-full bg-transparent border-b py-2 outline-none focus:border-[var(--vc-mint-dark)] transition-colors" style={{ borderColor: "var(--vc-line)" }} />
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(2)} className="vc-ghost"><ArrowLeft className="w-4 h-4" /> Atrás</button>
                  <button onClick={() => alert("Demo: cita confirmada por Vita IA")} className="vc-cta">Confirmar cita <Check className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-10 border-t" style={{ borderColor: "var(--vc-line)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm" style={{ color: "var(--vc-mute)" }}>
          <div>© 2025 VitalCenter · Centro médico autorizado</div>
          <Link to="/#demos" className="flex items-center gap-2 hover:text-[var(--vc-mint-dark)]">
            <ArrowLeft className="w-3 h-3" /> Demo de MR_ROBOTS LABS
          </Link>
        </div>
      </footer>

      {/* AI Chat Widget */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 vc-pulse rounded-full flex items-center gap-3 pl-4 pr-5 h-14 text-white"
          style={{ background: "var(--vc-mint-dark)" }}
          aria-label="Abrir chat IA"
        >
          <Bot className="w-5 h-5" />
          <span className="vc-mono text-[11px] uppercase tracking-[0.18em] hidden sm:inline">Habla con Vita IA</span>
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[520px] vc-card flex flex-col overflow-hidden" style={{ borderRadius: 24 }}>
          <div className="p-4 flex items-center justify-between" style={{ background: "var(--vc-mint-dark)", color: "white" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-sm">Vita IA</div>
                <div className="text-xs opacity-80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> En línea
                </div>
              </div>
            </div>
            <button onClick={() => { setChatOpen(false); setMessages([SCRIPT[0]]); }} className="text-white/70 hover:text-white text-xl leading-none w-8 h-8">×</button>
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "var(--vc-grey-soft)" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-4 py-2.5 text-sm rounded-2xl"
                  style={{
                    background: m.role === "user" ? "var(--vc-mint-dark)" : "white",
                    color: m.role === "user" ? "white" : "var(--vc-text)",
                    border: m.role === "user" ? "none" : "1px solid var(--vc-line)",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl border vc-typing" style={{ background: "white", borderColor: "var(--vc-line)", color: "var(--vc-mute)" }}>
                  <span>·</span><span>·</span><span>·</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t flex gap-2" style={{ borderColor: "var(--vc-line)" }}>
            <input placeholder="Escribe tu mensaje..." className="flex-1 px-4 py-2.5 text-sm rounded-full outline-none" style={{ background: "var(--vc-grey)", border: "1px solid var(--vc-line)" }} />
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: "var(--vc-mint-dark)" }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicDemo;
