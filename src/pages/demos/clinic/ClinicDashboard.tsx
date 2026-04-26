import { Activity, Bell, Bot, Calendar, Database, FileText, MessageCircle, Phone, Slack, Sparkles, TrendingUp, User as UserIcon, Zap, Mail, MapPin, Clock } from "lucide-react";

const CHART = [
  { d: "Lun", ai: 18, h: 4 },
  { d: "Mar", ai: 22, h: 5 },
  { d: "Mié", ai: 27, h: 3 },
  { d: "Jue", ai: 31, h: 6 },
  { d: "Vie", ai: 24, h: 4 },
  { d: "Sáb", ai: 14, h: 2 },
  { d: "Dom", ai: 9, h: 1 },
];

const MAX = Math.max(...CHART.map((c) => c.ai + c.h));

const CONVERSATIONS = [
  { time: "10:42", name: "María Castillo", topic: "Reserva pediatría", outcome: "Cita 28/04 16:00", status: "agendado" },
  { time: "10:28", name: "Jorge Peña", topic: "Síntomas tos persistente", outcome: "Derivada a Dr. Ortiz", status: "agendado" },
  { time: "10:11", name: "Anónimo", topic: "Precios análisis", outcome: "Info enviada", status: "info" },
  { time: "09:55", name: "Lucía Ramos", topic: "Cambiar hora cita", outcome: "Reagendada 02/05", status: "modificado" },
  { time: "09:33", name: "Antonio Silva", topic: "Dolor pecho leve", outcome: "Triaje urgente · Cardiología", status: "urgente" },
  { time: "09:18", name: "Eva Molina", topic: "Receta crónica", outcome: "Renovada vía Dr. Ortiz", status: "info" },
];

const FLOW = [
  { icon: MessageCircle, label: "Lead entra", sub: "WhatsApp / Web / IG", color: "#5BA88A" },
  { icon: Bot, label: "IA responde", sub: "Vita cualifica", color: "#2E6B53" },
  { icon: Calendar, label: "Agendado", sub: "Google Calendar", color: "#5BA88A" },
  { icon: Database, label: "Guarda en CRM", sub: "Ficha paciente", color: "#2E6B53" },
  { icon: Slack, label: "Notifica equipo", sub: "Slack #recepcion", color: "#5BA88A" },
];

const statusColor = (s: string) => {
  if (s === "urgente") return "#E74C3C";
  if (s === "agendado") return "#5BA88A";
  if (s === "modificado") return "#F59E0B";
  return "#6B7B78";
};

const ClinicDashboard = () => {
  return (
    <main className="pt-28 pb-20" style={{ background: "var(--vc-grey-soft)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="vc-eyebrow mb-3">— Panel de control · Demo</div>
            <h1 className="vc-display text-4xl md:text-5xl mb-2">Buenos días, Dra. Méndez.</h1>
            <p className="text-sm" style={{ color: "var(--vc-mute)" }}>Resumen operativo de hoy · 26 abril</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="vc-ghost"><Bell className="w-4 h-4" /> 3 alertas</button>
            <button className="vc-cta"><Sparkles className="w-4 h-4" /> Insights IA</button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: "Citas agendadas hoy", v: "47", delta: "+12%", icon: Calendar },
            { label: "Conversaciones IA", v: "184", delta: "+34%", icon: Bot },
            { label: "Tasa autonomía Vita", v: "94%", delta: "+3pts", icon: Zap },
            { label: "Tiempo recepción ahorrado", v: "22h", delta: "≈ 2.750€", icon: TrendingUp },
          ].map((k) => (
            <div key={k.label} className="vc-card-static p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="vc-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--vc-mute)" }}>{k.label}</div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--vc-mint-soft)" }}>
                  <k.icon className="w-4 h-4" style={{ color: "var(--vc-mint-dark)" }} />
                </div>
              </div>
              <div className="vc-display text-4xl">{k.v}</div>
              <div className="text-xs mt-2 vc-mono" style={{ color: "var(--vc-mint-dark)" }}>{k.delta}</div>
            </div>
          ))}
        </div>

        {/* Chart + Log */}
        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {/* Chart */}
          <div className="vc-card-static p-7 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="vc-display text-2xl">Citas agendadas — últimos 7 días</h3>
                <p className="text-xs mt-1" style={{ color: "var(--vc-mute)" }}>Distribución entre IA y recepción humana</p>
              </div>
              <div className="flex items-center gap-4 text-xs" style={{ color: "var(--vc-mute)" }}>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--vc-mint-dark)" }} /> Vita IA</span>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--vc-mint)" }} /> Humana</span>
              </div>
            </div>

            <div className="h-64 flex items-end gap-3">
              {CHART.map((c) => {
                const aiH = (c.ai / MAX) * 100;
                const hH = (c.h / MAX) * 100;
                return (
                  <div key={c.d} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-xs vc-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--vc-mint-dark)" }}>{c.ai + c.h}</div>
                    <div className="w-full flex flex-col justify-end" style={{ height: "85%" }}>
                      <div className="w-full rounded-t-lg transition-all hover:opacity-90" style={{ background: "var(--vc-mint)", height: `${hH}%`, minHeight: 4 }} />
                      <div className="w-full transition-all hover:opacity-90" style={{ background: "var(--vc-mint-dark)", height: `${aiH}%`, minHeight: 4, borderTopLeftRadius: hH < 1 ? 8 : 0, borderTopRightRadius: hH < 1 ? 8 : 0 }} />
                    </div>
                    <div className="vc-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--vc-mute)" }}>{c.d}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conversation log */}
          <div className="vc-card-static p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="vc-display text-2xl">Últimas conversaciones</h3>
              <span className="vc-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full" style={{ background: "var(--vc-mint-soft)", color: "var(--vc-mint-dark)" }}>EN VIVO</span>
            </div>
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
              {CONVERSATIONS.map((c, i) => (
                <div key={i} className="flex gap-3 pb-3 border-b last:border-0" style={{ borderColor: "var(--vc-line)" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--vc-mint-soft)" }}>
                    <Bot className="w-4 h-4" style={{ color: "var(--vc-mint-dark)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-sm font-medium truncate">{c.name}</span>
                      <span className="vc-mono text-[10px]" style={{ color: "var(--vc-mute)" }}>{c.time}</span>
                    </div>
                    <div className="text-xs truncate" style={{ color: "var(--vc-mute)" }}>{c.topic}</div>
                    <div className="text-xs mt-1 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor(c.status) }} />
                      <span style={{ color: statusColor(c.status) }}>{c.outcome}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* n8n Flow + CRM patient card */}
        <div className="grid lg:grid-cols-5 gap-5">
          {/* n8n Flow */}
          <div className="vc-card-static p-7 lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="vc-display text-2xl">Flujo de automatización</h3>
                <p className="text-xs mt-1 vc-mono uppercase tracking-[0.18em]" style={{ color: "var(--vc-mute)" }}>n8n · workflow_vital_v3</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="vc-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--vc-mute)" }}>Activo</span>
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: "var(--vc-grey-soft)" }}>
              <div className="grid grid-cols-5 gap-2 items-start">
                {FLOW.map((n, i) => (
                  <div key={n.label} className="flex flex-col items-center text-center relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 relative z-10 shadow-md" style={{ background: n.color, color: "white" }}>
                      <n.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div className="vc-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "var(--vc-mute)" }}>STEP_0{i + 1}</div>
                    <div className="font-medium text-xs mt-1">{n.label}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: "var(--vc-mute)" }}>{n.sub}</div>
                    {i < FLOW.length - 1 && (
                      <div className="absolute top-7 left-[60%] w-[80%] h-px vc-flow-line" />
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t" style={{ borderColor: "var(--vc-line)" }}>
                {[
                  { l: "Ejecuciones hoy", v: "184" },
                  { l: "Éxito", v: "98.4%" },
                  { l: "Latencia media", v: "1.2s" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="vc-display text-2xl" style={{ color: "var(--vc-mint-dark)" }}>{s.v}</div>
                    <div className="vc-mono text-[9px] uppercase tracking-[0.2em] mt-1" style={{ color: "var(--vc-mute)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CRM Patient card */}
          <div className="vc-card-static p-7 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h3 className="vc-display text-2xl">Ficha paciente · CRM</h3>
              <span className="vc-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full" style={{ background: "var(--vc-mint-soft)", color: "var(--vc-mint-dark)" }}>
                <Sparkles className="w-2.5 h-2.5 inline mr-1" /> AUTO
              </span>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "var(--vc-grey-soft)", border: "1px solid var(--vc-line)" }}>
              <div className="flex items-center gap-4 mb-5 pb-5 border-b" style={{ borderColor: "var(--vc-line)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center vc-display text-xl" style={{ background: "var(--vc-mint)", color: "var(--vc-mint-dark)" }}>
                  AS
                </div>
                <div className="flex-1">
                  <div className="vc-display text-xl">Antonio Silva</div>
                  <div className="text-xs flex items-center gap-2" style={{ color: "var(--vc-mute)" }}>
                    <span className="vc-mono">#PAT_4827</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: "#FEE2E2", color: "#E74C3C" }}>Prioridad alta</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <Field icon={Phone} label="Teléfono" value="+34 612 84 39 27" />
                <Field icon={Mail} label="Email" value="antonio.silva@gmail.com" />
                <Field icon={MapPin} label="Dirección" value="C/ Mayor 12, Madrid" />
                <Field icon={Activity} label="Síntomas detectados" value="Dolor torácico opresivo · esfuerzo" highlight />
                <Field icon={Calendar} label="Cita asignada" value="Cardiología · 27/04 10:00" />
                <Field icon={UserIcon} label="Profesional" value="Dra. Elena Méndez" />
                <Field icon={Clock} label="Capturado" value="Hoy 09:33 vía WhatsApp" />
              </div>

              <div className="mt-5 pt-5 border-t" style={{ borderColor: "var(--vc-line)" }}>
                <div className="vc-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--vc-mute)" }}>Notas IA</div>
                <p className="text-xs leading-relaxed p-3 rounded-xl" style={{ background: "var(--vc-mint-soft)", color: "var(--vc-text)" }}>
                  Vita IA detectó posibles síntomas de angina de esfuerzo. Recomendado triaje cardiológico urgente. Paciente notificado por SMS y email. Equipo alertado en Slack.
                </p>
              </div>

              <div className="mt-5 flex gap-2">
                <button className="vc-ghost flex-1 justify-center text-xs"><FileText className="w-3.5 h-3.5" /> Historial</button>
                <button className="vc-cta flex-1 justify-center text-xs"><MessageCircle className="w-3.5 h-3.5" /> Contactar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const Field = ({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-start gap-3">
    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "white", border: "1px solid var(--vc-line)" }}>
      <Icon className="w-3.5 h-3.5" style={{ color: "var(--vc-mint-dark)" }} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="vc-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--vc-mute)" }}>{label}</div>
      <div className="text-sm mt-0.5 truncate" style={{ color: highlight ? "#E74C3C" : "var(--vc-text)", fontWeight: highlight ? 500 : 400 }}>{value}</div>
    </div>
  </div>
);

export default ClinicDashboard;
