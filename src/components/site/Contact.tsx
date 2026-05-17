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
      label: "Escríbenos ahora",
      sub: "Respuesta en minutos · Sin formularios",
      micro: "+34 600 000 000",
      href: whatsappLink(),
      badge: "MÁS RÁPIDO",
      primary: true,
    },
    {
      Icon: Calendar,
      label: "Agenda una llamada",
      sub: "30 min · Gratuita · Sin ventas agresivas",
      micro: "Elige día y hora al instante",
      href: siteConfig.calendarUrl,
      badge: null,
      primary: false,
    },
    {
      Icon: Mail,
      label: "Cuéntanos tu proyecto",
      sub: "Te respondemos en menos de 2h",
      micro: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      badge: null,
      primary: false,
    },
  ];

  return (
    <section
      id="contact"
      className="noise-overlay text-bone py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#033E72", isolation: "isolate" }}
    >
      {/* Patrón tipográfico de fondo */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "0",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 18 }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "flex",
              gap: "32px",
              whiteSpace: "nowrap",
              transform: rowIdx % 2 === 0 ? "translateX(0px)" : "translateX(-80px)",
              flexShrink: 0,
            }}
          >
            {Array.from({ length: 14 }).map((_, colIdx) => (
              <span
                key={colIdx}
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "52px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.10)" }}>a</span>
                <span style={{ color: "rgba(252,163,17,0.22)" }}>X</span>
                <span style={{ color: "rgba(255,255,255,0.10)" }}>ory</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Overlay para legibilidad del contenido */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(3,62,114,0.3) 0%, rgba(3,62,114,0.7) 100%),
            linear-gradient(180deg, rgba(3,62,114,0.6) 0%, rgba(3,62,114,0) 30%, rgba(3,62,114,0) 70%, rgba(3,62,114,0.6) 100%)
          `,
        }}
      />

      {/* Contenido — encima del patrón */}
      <div ref={ref} className="container-editorial reveal-up relative z-10">

              <div className="mb-12 md:mb-16">
                <h2 className="font-display text-5xl md:text-7xl lg:text-[120px] leading-[0.9] tracking-[-0.03em] mb-6">
                  ¿Vamos a por más clientes?
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 ml-1 md:ml-20">
                  <p className="text-bone/100 text-lg leading-relaxed">
                    Primera consulta gratuita. · Sin compromiso. Sin tecnicismos.
                  </p>
                  <span
                    className="font-mono text-[11px] uppercase tracking-widest"
                    style={{ color: "rgba(252,163,17,0.8)" }}
                  >
                    → Respondemos en menos de 2 horas
                  </span>
                </div>
              </div>

        <p
          className="font-mono text-[10px] uppercase tracking-widest text-center mb-10"
          style={{ color: "rgba(229,229,229,0.35)" }}
        >
          Sin permanencia · Sin letra pequeña · Cancelación en cualquier momento
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {channels.map((c, idx) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="reveal-item group relative flex flex-col justify-between min-h-[280px] p-8 md:p-10 rounded-[4px] transition-all duration-300"
              style={{
                border: c.primary
                  ? "1px solid rgba(252,163,17,0.4)"
                  : "1px solid rgba(229,229,229,0.10)",
                background: c.primary ? "rgba(252,163,17,0.04)" : "rgba(0,0,0,0.20)",
                opacity: idx === 2 ? 0.85 : 1,
                transitionDelay: `${idx * 100}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                if (c.primary) {
                  el.style.background = "rgba(252,163,17,0.08)";
                  el.style.borderColor = "rgba(252,163,17,0.7)";
                } else {
                  el.style.borderColor = "rgba(229,229,229,0.25)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = c.primary ? "rgba(252,163,17,0.04)" : "rgba(0,0,0,0.20)";
                el.style.borderColor = c.primary
                  ? "rgba(252,163,17,0.4)"
                  : "rgba(229,229,229,0.10)";
              }}
            >
              {c.badge && (
                <span
                  className="absolute -top-3 left-8 font-mono text-[9px] uppercase tracking-widest px-3 py-1"
                  style={{ background: "#FCA311", color: "#000", borderRadius: 2 }}
                >
                  {c.badge}
                </span>
              )}

              <c.Icon
                className="h-7 w-7 transition-colors"
                style={{ color: c.primary ? "#FCA311" : "rgba(229,229,229,0.5)" }}
                strokeWidth={1.25}
              />

              <div>
                <h3 className="font-display text-2xl md:text-3xl mb-2 text-bone">
                  {c.label}
                </h3>
                <p
                  className="font-mono text-[11px] uppercase tracking-wider mb-4"
                  style={{ color: "rgba(229,229,229,0.45)" }}
                >
                  {c.sub}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[11px] uppercase tracking-wider"
                    style={{
                      color: c.primary ? "rgba(252,163,17,0.7)" : "rgba(229,229,229,0.3)",
                    }}
                  >
                    {c.micro}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: c.primary ? "#FCA311" : "rgba(229,229,229,0.4)" }}
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        <p
          className="font-mono text-[11px] uppercase tracking-widest text-center mt-12"
          style={{ color: "rgba(229,229,229,0.30)" }}
        >
          +12 negocios activos · Respuesta media 47 min · 100% proyectos entregados
        </p>

      </div>
    </section>
  );
};