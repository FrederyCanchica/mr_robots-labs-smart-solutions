import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, Bot, Send, ChevronRight, Scale, Briefcase, Shield, Building2,
  Users, AlertTriangle, FileText, Database, Calendar, Sparkles, Check,
  Phone, Mail, MapPin, X
} from "lucide-react";
import legalHero from "@/assets/demo-legal-pardo.jpg";

type CaseType = "despido" | "accidente" | "mercantil" | "contrato";

type ChatMsg = { role: "ai" | "user"; text: string; quick?: { label: string; value: CaseType }[]; slots?: string[] };

const PRACTICE = [
  { icon: Briefcase, title: "Derecho laboral", desc: "Despidos, reclamaciones de cantidad, accidentes de trabajo y negociaciones colectivas. Defendemos tu posición frente a la empresa." },
  { icon: Building2, title: "Derecho mercantil", desc: "Constitución de sociedades, contratos comerciales, conflictos entre socios y compraventa de empresas." },
  { icon: Shield, title: "Compliance & protección de datos", desc: "Adaptación a RGPD, planes de prevención penal y auditorías internas para empresas medianas." },
  { icon: Users, title: "Derecho concursal", desc: "Refinanciación, segunda oportunidad y procesos de insolvencia con reestructuración." },
];

const CASES = [
  { tag: "Laboral", result: "47.300€ recuperados", desc: "Despido improcedente de directivo con 14 años de antigüedad. Acuerdo extrajudicial en 5 semanas, sin juicio." },
  { tag: "Mercantil", result: "Conflicto resuelto en 90 días", desc: "Disputa entre tres socios fundadores de una startup tecnológica. Mediación con pacto de salida sin daños reputacionales." },
  { tag: "Concursal", result: "Empresa salvada", desc: "Acuerdo extrajudicial de pagos para PYME del sector logístico. Continuidad de la actividad y 23 empleos preservados." },
  { tag: "Laboral", result: "Indemnización doblada", desc: "Trabajadora con baja médica despedida durante el embarazo. Nulidad del despido y readmisión inmediata." },
];

const SCRIPT: ChatMsg[] = [
  { role: "ai", text: "Buenas tardes. Soy Lex, asistente del despacho Pardo & Asociados. Estoy aquí 24/7 para ayudarte. ¿Cuál es tu situación?", quick: [
    { label: "Me han despedido", value: "despido" },
    { label: "Accidente laboral", value: "accidente" },
    { label: "Tema empresa / socio", value: "mercantil" },
    { label: "Revisar contrato", value: "contrato" },
  ]},
];

const CASE_FLOWS: Record<CaseType, ChatMsg[]> = {
  despido: [
    { role: "user", text: "Me han despedido esta mañana." },
    { role: "ai", text: "Lo siento, sé que es un momento complicado. Para orientarte bien necesito tres datos rápidos:\n\n1. ¿Cuánto tiempo llevabas en la empresa?\n2. ¿Te han entregado carta de despido?\n3. ¿Te han ofrecido alguna indemnización?" },
    { role: "user", text: "8 años, sí me dieron carta, dicen 'causas objetivas' y me ofrecen 20 días por año." },
    { role: "ai", text: "Anotado. Por la información que me das, hay indicios claros para impugnar el despido como improcedente, lo que supondría 33 días por año (no 20). El plazo es de 20 días hábiles desde hoy.\n\nLa abogada Marta Pardo, especialista en laboral, puede revisar tu caso por videollamada. Estos son los huecos disponibles esta semana:", slots: ["Mañana 10:00", "Mañana 17:30", "Jueves 09:00"] },
    { role: "user", text: "Mañana a las 17:30 me viene bien." },
    { role: "ai", text: "✓ Videollamada confirmada con Marta Pardo · mañana 17:30 (45 min).\n\nTe envío al email un cuestionario breve y los documentos que conviene tener a mano. Tu caso queda marcado como prioridad ALTA en el CRM por la urgencia del plazo." },
  ],
  accidente: [
    { role: "user", text: "Tuve un accidente en el trabajo hace dos semanas." },
    { role: "ai", text: "Importante que actuemos rápido. Necesito saber:\n\n1. ¿Estás de baja médica actualmente?\n2. ¿La mutua ha calificado el accidente como laboral?\n3. ¿Hay testigos del accidente?" },
    { role: "user", text: "Sí, baja desde el día siguiente. La mutua dice que no es laboral. Hay un compañero que lo vio." },
    { role: "ai", text: "Tienes base sólida para impugnar la calificación. Es un procedimiento habitual y, con testigos, las probabilidades son altas.\n\nTe agendo con Javier Ruiz, especialista en accidentes laborales:", slots: ["Hoy 18:00", "Mañana 11:00", "Mañana 16:00"] },
    { role: "user", text: "Hoy a las 18:00." },
    { role: "ai", text: "✓ Videollamada confirmada con Javier Ruiz · hoy 18:00. Caso marcado como URGENTE. Recibirás email con instrucciones para reunir documentación médica." },
  ],
  mercantil: [
    { role: "user", text: "Tengo un conflicto con mis socios." },
    { role: "ai", text: "Entiendo. Para asignarte al especialista correcto:\n\n1. ¿Es una sociedad limitada o anónima?\n2. ¿Cuántos socios sois?\n3. ¿El conflicto es por gestión, reparto de dividendos o salida de algún socio?" },
    { role: "user", text: "SL, somos 3 socios y dos quieren forzar la salida del tercero." },
    { role: "ai", text: "Caso clásico de conflicto societario. Conviene mediación antes de judicializar. Carlos Pardo lleva este tipo de procesos:", slots: ["Jueves 12:00", "Viernes 10:00", "Viernes 17:00"] },
    { role: "user", text: "Viernes 10:00." },
    { role: "ai", text: "✓ Reunión confirmada con Carlos Pardo · viernes 10:00 (60 min). Te enviaré un cuestionario para preparar la sesión." },
  ],
  contrato: [
    { role: "user", text: "Quiero que revisen un contrato antes de firmarlo." },
    { role: "ai", text: "Perfecto, lo más sensato. Cuéntame:\n\n1. ¿Es un contrato laboral, mercantil o de arrendamiento?\n2. ¿Cuándo necesitas tener la revisión hecha?" },
    { role: "user", text: "Mercantil, contrato de distribución. Lo necesito para el lunes." },
    { role: "ai", text: "Llegamos. Revisión exprés (24-48h) con devolución comentada. Te agendo videollamada de cierre con la abogada:", slots: ["Mañana 12:00", "Mañana 16:00", "Sábado 10:00"] },
    { role: "user", text: "Mañana a las 16:00." },
    { role: "ai", text: "✓ Confirmado. Envíanos el contrato por email seguro (instrucciones en el correo que te llegará en un minuto). Marta lo tendrá revisado antes de la videollamada." },
  ],
};

const LegalPardoDemo = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>(SCRIPT);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const [formCaseType, setFormCaseType] = useState<CaseType>("despido");
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", details: "" });

  useEffect(() => { document.title = "Pardo & Asociados · Abogados laboral & empresa"; }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handleQuick = (caseType: CaseType) => {
    const flow = CASE_FLOWS[caseType];
    let i = 0;
    const cancelled = { v: false };
    const timers: ReturnType<typeof setTimeout>[] = [];
    const tick = () => {
      if (cancelled.v || i >= flow.length) return;
      const msg = flow[i];
      const delay = msg.role === "user" ? 1000 : 1900;
      setTyping(true);
      timers.push(setTimeout(() => {
        if (cancelled.v) return;
        setTyping(false);
        setMessages(m => [...m, msg]);
        i++;
        if (i < flow.length) timers.push(setTimeout(tick, 800));
      }, delay));
    };
    // Remove quick buttons from initial message
    setMessages(m => m.map(msg => ({ ...msg, quick: undefined })));
    tick();
    return () => { cancelled.v = true; timers.forEach(clearTimeout); };
  };

  const handleSlotPick = (slot: string) => {
    setMessages(m => [...m, { role: "user", text: `Me viene bien ${slot}.` }]);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 8000);
  };

  return (
    <div className="pardo-root min-h-screen">
      <style>{`
        .pardo-root {
          --pa-slate: #1A2A3D;
          --pa-slate-deep: #0F1B29;
          --pa-graphite: #2D3540;
          --pa-stone: #6B7585;
          --pa-mist: #E8EBEF;
          --pa-paper: #F7F8F9;
          --pa-white: #FFFFFF;
          --pa-gold: #B89657;
          --pa-gold-soft: #D4B87A;
          --pa-line: #DCE0E5;
          background: var(--pa-paper);
          color: var(--pa-slate);
          font-family: 'Manrope', system-ui, sans-serif;
        }
        .pa-display { font-family: 'Libre Caslon Text', 'Times New Roman', serif; font-weight: 400; letter-spacing: -0.01em; }
        .pa-mono { font-family: 'JetBrains Mono', monospace; }
        .pa-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--pa-gold); }
        .pa-cta {
          background: var(--pa-slate); color: var(--pa-white);
          padding: 16px 28px; font-size: 12px; letter-spacing: 0.18em;
          text-transform: uppercase; font-weight: 500;
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid var(--pa-slate); cursor: pointer;
          transition: all 0.3s;
        }
        .pa-cta:hover { background: var(--pa-slate-deep); border-color: var(--pa-gold); }
        .pa-ghost {
          background: transparent; color: var(--pa-slate);
          padding: 16px 28px; font-size: 12px; letter-spacing: 0.18em;
          text-transform: uppercase; font-weight: 500;
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid var(--pa-line); cursor: pointer;
          transition: all 0.3s;
        }
        .pa-ghost:hover { border-color: var(--pa-gold); color: var(--pa-gold); }
        .pa-card {
          background: var(--pa-white); border: 1px solid var(--pa-line);
          transition: all 0.35s;
        }
        .pa-card:hover { border-color: var(--pa-gold); transform: translateY(-3px); box-shadow: 0 30px 60px -30px rgba(26,42,61,0.18); }
        .pa-input {
          width: 100%; padding: 14px 16px; font-size: 14px;
          border: 1px solid var(--pa-line); background: var(--pa-white);
          outline: none; transition: border-color 0.2s;
          font-family: inherit;
        }
        .pa-input:focus { border-color: var(--pa-slate); }
        @keyframes paPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(184,150,87,0.5); } 50% { box-shadow: 0 0 0 18px rgba(184,150,87,0); } }
        .pa-pulse { animation: paPulse 2.2s infinite; }
        @keyframes paDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }
        .pa-typing span { animation: paDot 1.2s infinite; display: inline-block; }
        .pa-typing span:nth-child(2) { animation-delay: 0.15s; }
        .pa-typing span:nth-child(3) { animation-delay: 0.3s; }
        .pa-flow-line {
          position: relative; overflow: hidden;
          background: linear-gradient(90deg, transparent, var(--pa-gold), transparent);
          background-size: 200% 100%;
          animation: paFlow 2.8s linear infinite;
        }
        @keyframes paFlow { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        .pa-grid-bg {
          background-image:
            linear-gradient(rgba(26,42,61,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,42,61,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md" style={{ background: "rgba(247,248,249,0.94)", borderBottom: "1px solid var(--pa-line)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center" style={{ background: "var(--pa-slate)" }}>
              <span className="pa-display text-base text-white">P</span>
            </div>
            <div>
              <div className="pa-display text-lg leading-none">Pardo & Asociados</div>
              <div className="pa-eyebrow text-[9px] mt-0.5" style={{ color: "var(--pa-stone)" }}>Abogados · desde 1998</div>
            </div>
          </div>
          <nav className="hidden lg:flex gap-7 text-sm" style={{ color: "var(--pa-slate)" }}>
            <a href="#areas" className="hover:text-[var(--pa-gold)]">Áreas</a>
            <a href="#proceso" className="hover:text-[var(--pa-gold)]">Cómo trabajamos</a>
            <a href="#casos" className="hover:text-[var(--pa-gold)]">Casos</a>
            <a href="#consulta" className="hover:text-[var(--pa-gold)]">Consulta inicial</a>
          </nav>
          <Link to="/#demos" className="pa-eyebrow text-[10px] flex items-center gap-2" style={{ color: "var(--pa-stone)" }}>
            <ArrowLeft className="w-3 h-3" /> Portafolio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pa-grid-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="pa-eyebrow mb-7 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Lex IA · disponible 24/7 para tu primera consulta
            </div>
            <h1 className="pa-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] mb-7">
              Cuando algo<br />
              se tuerce, <em style={{ color: "var(--pa-gold)" }}>actuamos.</em>
            </h1>
            <p className="text-lg max-w-xl mb-10 leading-relaxed" style={{ color: "var(--pa-stone)" }}>
              Despacho boutique especializado en derecho laboral y empresarial. Llevamos 27 años defendiendo a trabajadores y empresas con un único principio: claridad antes que lenguaje legal.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setChatOpen(true)} className="pa-cta">
                <Bot className="w-4 h-4" /> Habla con Lex IA ahora
              </button>
              <a href="#consulta" className="pa-ghost">Consulta inicial gratuita</a>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t" style={{ borderColor: "var(--pa-line)" }}>
              {[
                { v: "27", l: "años de despacho" },
                { v: "1.400+", l: "casos resueltos" },
                { v: "24/7", l: "Lex IA atiende" },
              ].map(s => (
                <div key={s.l}>
                  <div className="pa-display text-3xl md:text-4xl" style={{ color: "var(--pa-slate)" }}>{s.v}</div>
                  <div className="pa-eyebrow text-[9px] mt-1" style={{ color: "var(--pa-stone)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden" style={{ background: "var(--pa-slate)" }}>
              <img src={legalHero} alt="Pardo & Asociados oficina" className="w-full h-full object-cover" style={{ filter: "saturate(0.85)" }} />
            </div>
            <div className="absolute -bottom-6 -left-6 pa-card p-5 max-w-[280px]" style={{ borderLeft: "3px solid var(--pa-gold)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--pa-gold)" }} />
                <span className="pa-eyebrow text-[9px]">Caso recibido a las 23:47</span>
              </div>
              <div className="text-sm" style={{ color: "var(--pa-slate)" }}>
                "Despido objetivo · 8 años antigüedad" → cualificado, agendado y en cola del abogado para 09:00.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas */}
      <section id="areas" className="py-24 md:py-32" style={{ background: "var(--pa-white)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <div className="pa-eyebrow mb-4">— 001 / Áreas de práctica</div>
              <h2 className="pa-display text-5xl md:text-6xl leading-tight">
                Lo que sabemos<br />hacer bien.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 self-end">
              <p className="text-lg" style={{ color: "var(--pa-stone)" }}>
                No tocamos todo. Nos concentramos en cuatro áreas y lo hacemos en profundidad. Sin promesas vagas, sin facturar horas que no aportan.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "var(--pa-line)" }}>
            {PRACTICE.map((p, i) => (
              <div key={p.title} className="p-10 group" style={{ background: "var(--pa-white)" }}>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[var(--pa-slate)]" style={{ background: "var(--pa-mist)" }}>
                    <p.icon className="w-5 h-5 transition-colors group-hover:text-[var(--pa-gold)]" style={{ color: "var(--pa-slate)" }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="pa-eyebrow mb-2" style={{ color: "var(--pa-stone)" }}>0{i + 1}</div>
                    <h3 className="pa-display text-2xl mb-3">{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--pa-stone)" }}>{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso AI Receptionist */}
      <section id="proceso" className="py-24 md:py-32" style={{ background: "var(--pa-slate)", color: "var(--pa-white)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="pa-eyebrow mb-4">— 002 / Cómo trabajamos</div>
            <h2 className="pa-display text-5xl md:text-6xl mb-4">Así funciona Lex IA.</h2>
            <p className="max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Tu primera consulta no espera a horario de oficina. La IA atiende, cualifica el caso y agenda la videollamada con el abogado adecuado. Tú llegas con todo preparado.
            </p>
          </div>

          {/* Flow diagram */}
          <div className="grid md:grid-cols-5 gap-4 mb-10">
            {[
              { icon: Users, title: "Visitante llega", desc: "23:47 — busca ayuda urgente" },
              { icon: Bot, title: "Lex IA recibe", desc: "Saluda y abre la conversación" },
              { icon: Sparkles, title: "Cualifica caso", desc: "Tipo, urgencia, datos clave" },
              { icon: Database, title: "Agenda en CRM", desc: "Asigna abogado · prioridad" },
              { icon: Briefcase, title: "Abogado recibe briefing", desc: "Llega 09:00 con todo claro" },
            ].map((s, i, arr) => (
              <div key={s.title} className="relative">
                <div className="p-6" style={{ background: "var(--pa-graphite)", border: "1px solid rgba(184,150,87,0.2)" }}>
                  <div className="pa-eyebrow mb-3" style={{ color: "var(--pa-gold)" }}>0{i + 1}</div>
                  <s.icon className="w-7 h-7 mb-4" style={{ color: "var(--pa-gold-soft)" }} strokeWidth={1.5} />
                  <h4 className="font-medium mb-1.5">{s.title}</h4>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{s.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px pa-flow-line z-10" />
                )}
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: AlertTriangle, t: "Captamos urgencias", d: "Plazos legales que vencen, situaciones de estrés. La IA detecta la prioridad y la marca." },
              { icon: FileText, t: "Tiempo de abogado optimizado", d: "Cero consultas iniciales repetitivas. El briefing está listo al empezar la videollamada." },
              { icon: Calendar, t: "Disponibilidad real 24/7", d: "Tu cliente del próximo lunes ya está agendado un sábado a las dos de la madrugada." },
            ].map(b => (
              <div key={b.t} className="p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <b.icon className="w-6 h-6 mb-4" style={{ color: "var(--pa-gold)" }} strokeWidth={1.5} />
                <h4 className="font-medium mb-2">{b.t}</h4>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{b.d}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <button onClick={() => setChatOpen(true)} className="pa-cta" style={{ background: "var(--pa-gold)", borderColor: "var(--pa-gold)", color: "var(--pa-slate-deep)" }}>
              <Bot className="w-4 h-4" /> Probar la conversación
            </button>
          </div>
        </div>
      </section>

      {/* Casos */}
      <section id="casos" className="py-24 md:py-32" style={{ background: "var(--pa-white)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="pa-eyebrow mb-4">— 003 / Casos resueltos</div>
            <h2 className="pa-display text-5xl md:text-6xl mb-4">Hechos, no promesas.</h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--pa-stone)" }}>
              Datos anonimizados de casos reales. Sin nombres, sin sectores identificables, con resultados verificables.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "var(--pa-line)" }}>
            {CASES.map(c => (
              <div key={c.desc} className="p-10 group transition-colors hover:bg-[var(--pa-paper)]" style={{ background: "var(--pa-white)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="pa-eyebrow text-[10px] px-2.5 py-1" style={{ background: "var(--pa-mist)", color: "var(--pa-slate)" }}>{c.tag}</span>
                  <Scale className="w-4 h-4" style={{ color: "var(--pa-gold)" }} />
                </div>
                <h3 className="pa-display text-3xl mb-3" style={{ color: "var(--pa-slate)" }}>{c.result}</h3>
                <p className="leading-relaxed" style={{ color: "var(--pa-stone)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulta inicial */}
      <section id="consulta" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="pa-eyebrow mb-4">— 004 / Consulta inicial</div>
            <h2 className="pa-display text-5xl md:text-6xl mb-6 leading-tight">Cuéntanos qué pasa.</h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--pa-stone)" }}>
              Primera consulta gratuita y sin compromiso. Si prefieres no esperar, abre el chat con Lex y agenda en menos de 3 minutos.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4" style={{ color: "var(--pa-gold)" }} /> 91 458 22 30</div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4" style={{ color: "var(--pa-gold)" }} /> despacho@pardoabogados.es</div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4" style={{ color: "var(--pa-gold)" }} /> Calle Velázquez 78, 28006 Madrid</div>
            </div>
          </div>

          <div className="pa-card p-8">
            {formSent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "var(--pa-mist)" }}>
                  <Check className="w-7 h-7" style={{ color: "var(--pa-slate)" }} strokeWidth={2.5} />
                </div>
                <h3 className="pa-display text-3xl mb-3">Consulta recibida</h3>
                <p className="text-sm" style={{ color: "var(--pa-stone)" }}>Un abogado te contactará en menos de 4 horas hábiles.</p>
              </div>
            ) : (
              <form onSubmit={submitForm} className="space-y-5">
                <div>
                  <label className="pa-eyebrow block mb-2" style={{ color: "var(--pa-stone)" }}>Tipo de caso</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      { v: "despido" as const, l: "Despido / laboral" },
                      { v: "accidente" as const, l: "Accidente laboral" },
                      { v: "mercantil" as const, l: "Empresa / socios" },
                      { v: "contrato" as const, l: "Revisar contrato" },
                    ]).map(o => (
                      <button type="button" key={o.v} onClick={() => setFormCaseType(o.v)} className={`p-3 text-xs text-left transition-all border ${formCaseType === o.v ? "border-[var(--pa-slate)] bg-[var(--pa-slate)] text-white" : "border-[var(--pa-line)]"}`}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="pa-eyebrow block mb-2" style={{ color: "var(--pa-stone)" }}>Nombre</label>
                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="pa-input" />
                  </div>
                  <div>
                    <label className="pa-eyebrow block mb-2" style={{ color: "var(--pa-stone)" }}>Teléfono</label>
                    <input required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="pa-input" />
                  </div>
                </div>
                <div>
                  <label className="pa-eyebrow block mb-2" style={{ color: "var(--pa-stone)" }}>Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="pa-input" />
                </div>
                <div>
                  <label className="pa-eyebrow block mb-2" style={{ color: "var(--pa-stone)" }}>
                    {formCaseType === "despido" && "¿Cuándo te despidieron y cuántos años llevabas?"}
                    {formCaseType === "accidente" && "¿Cuándo ocurrió y estás de baja?"}
                    {formCaseType === "mercantil" && "¿Tipo de sociedad y nº de socios implicados?"}
                    {formCaseType === "contrato" && "¿Tipo de contrato y fecha límite?"}
                  </label>
                  <textarea required value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} className="pa-input" rows={4} placeholder="Cuéntanos lo esencial. Sin tecnicismos." />
                </div>
                <button type="submit" className="pa-cta w-full justify-center">Enviar consulta <ChevronRight className="w-3.5 h-3.5" /></button>
                <p className="text-[11px]" style={{ color: "var(--pa-stone)" }}>Tus datos quedan protegidos bajo secreto profesional.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t" style={{ borderColor: "var(--pa-line)", background: "var(--pa-white)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm" style={{ color: "var(--pa-stone)" }}>
          <div className="pa-display text-xl" style={{ color: "var(--pa-slate)" }}>Pardo & Asociados</div>
          <div>Colegiados ICAM · 27 años de despacho</div>
          <Link to="/#demos" className="flex items-center gap-2 hover:text-[var(--pa-gold)]">
            <ArrowLeft className="w-3 h-3" /> Demo de MR_ROBOTS LABS
          </Link>
        </div>
      </footer>

      {/* Chat FAB */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 pa-pulse rounded-none flex items-center gap-3 pl-4 pr-5 h-14 text-white"
          style={{ background: "var(--pa-slate)", borderLeft: "3px solid var(--pa-gold)" }}
        >
          <Bot className="w-5 h-5" />
          <span className="pa-mono text-[11px] uppercase tracking-[0.18em] hidden sm:inline">Habla con Lex IA</span>
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] h-[600px] flex flex-col overflow-hidden" style={{ background: "var(--pa-white)", border: "1px solid var(--pa-line)", boxShadow: "0 30px 80px -20px rgba(15,27,41,0.4)" }}>
          <div className="p-4 flex items-center justify-between" style={{ background: "var(--pa-slate)", color: "white", borderBottom: "2px solid var(--pa-gold)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center" style={{ background: "rgba(184,150,87,0.2)" }}>
                <Bot className="w-5 h-5" style={{ color: "var(--pa-gold-soft)" }} />
              </div>
              <div>
                <div className="font-medium text-sm">Lex IA · Pardo & Asociados</div>
                <div className="text-xs opacity-70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Conectada al CRM
                </div>
              </div>
            </div>
            <button onClick={() => { setChatOpen(false); setMessages(SCRIPT); }} className="text-white/70 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "var(--pa-paper)" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[88%] space-y-2">
                  <div
                    className="px-4 py-2.5 text-sm whitespace-pre-line"
                    style={{
                      background: m.role === "user" ? "var(--pa-slate)" : "var(--pa-white)",
                      color: m.role === "user" ? "white" : "var(--pa-slate)",
                      border: m.role === "ai" ? "1px solid var(--pa-line)" : "none",
                    }}
                  >
                    {m.text}
                  </div>
                  {m.quick && (
                    <div className="flex flex-col gap-1.5">
                      {m.quick.map(q => (
                        <button key={q.value} onClick={() => handleQuick(q.value)} className="text-xs px-3 py-2 text-left transition-colors hover:bg-[var(--pa-slate)] hover:text-white" style={{ background: "var(--pa-white)", border: "1px solid var(--pa-line)", color: "var(--pa-slate)" }}>
                          → {q.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {m.slots && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.slots.map(s => (
                        <button key={s} onClick={() => handleSlotPick(s)} className="text-xs px-3 py-1.5 pa-mono transition-colors hover:bg-[var(--pa-slate)] hover:text-white" style={{ background: "var(--pa-mist)", color: "var(--pa-slate)" }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 pa-typing" style={{ background: "var(--pa-white)", border: "1px solid var(--pa-line)", color: "var(--pa-stone)" }}>
                  <span>·</span><span>·</span><span>·</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t flex gap-2" style={{ borderColor: "var(--pa-line)", background: "var(--pa-white)" }}>
            <input placeholder="Escribe tu consulta..." className="flex-1 px-4 py-2.5 text-sm outline-none" style={{ background: "var(--pa-paper)", border: "1px solid var(--pa-line)" }} />
            <button className="w-10 h-10 flex items-center justify-center text-white shrink-0" style={{ background: "var(--pa-slate)" }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalPardoDemo;
