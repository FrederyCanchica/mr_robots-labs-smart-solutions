import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Wrench, Gauge, Cog, ShieldCheck, Zap, Phone, MapPin, Clock, MessageCircle, ChevronRight } from "lucide-react";
import mechanicHero from "@/assets/demo-mechanic.jpg";

const SERVICES = [
  { icon: Wrench, name: "Mecánica general", desc: "Diagnóstico, reparación y mantenimiento integral.", price: "Desde 49€" },
  { icon: Gauge, name: "Pre-ITV", desc: "Revisión completa para que pases a la primera.", price: "59€" },
  { icon: Cog, name: "Distribución", desc: "Cambio de correa y kit completo con garantía.", price: "Desde 290€" },
  { icon: Zap, name: "Diagnóstico OBD", desc: "Lectura electrónica + informe en 30 minutos.", price: "29€" },
  { icon: ShieldCheck, name: "Frenos y suspensión", desc: "Cambio de pastillas, discos y amortiguadores.", price: "Desde 89€" },
  { icon: Wrench, name: "Aire acondicionado", desc: "Recarga, limpieza y revisión del circuito.", price: "55€" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80",
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80",
  "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=900&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80",
  "https://images.unsplash.com/photo-1597007030739-6d2e7172ee6c?w=900&q=80",
  "https://images.unsplash.com/photo-1605557202138-cd9b4d6e8a8e?w=900&q=80",
];

const MechanicDemo = () => {
  useEffect(() => {
    document.title = "NitroFix · Taller Mecánico Premium";
  }, []);

  return (
    <div className="nitrofix-root min-h-screen">
      <style>{`
        .nitrofix-root {
          --nf-asphalt: #0E0F11;
          --nf-graphite: #1A1C1F;
          --nf-steel: #2A2D31;
          --nf-white: #F5F6F7;
          --nf-mute: #A0A4AB;
          --nf-orange: #FF6A00;
          --nf-yellow: #F2FF00;
          background: var(--nf-asphalt);
          color: var(--nf-white);
          font-family: 'Inter', system-ui, sans-serif;
        }
        .nf-display { font-family: 'Fraunces', Georgia, serif; }
        .nf-mono { font-family: 'JetBrains Mono', monospace; }
        .nf-stripe {
          background-image: repeating-linear-gradient(
            45deg,
            var(--nf-yellow) 0 14px,
            transparent 14px 28px
          );
        }
        .nf-grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .nf-cta {
          background: var(--nf-orange);
          color: #000;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 12px;
          font-weight: 600;
          padding: 14px 22px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 2px solid var(--nf-orange);
          transition: all 0.2s;
          clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .nf-cta:hover { background: var(--nf-yellow); border-color: var(--nf-yellow); }
        .nf-ghost {
          background: transparent; color: var(--nf-white);
          border: 1px solid rgba(255,255,255,0.25);
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase; letter-spacing: 0.15em;
          font-size: 12px; padding: 14px 22px;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .nf-ghost:hover { border-color: var(--nf-orange); color: var(--nf-orange); }
        .nf-card {
          background: var(--nf-graphite);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s;
        }
        .nf-card:hover {
          border-color: var(--nf-orange);
          transform: translateY(-4px);
        }
        .nf-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--nf-orange);
        }
        @keyframes nfPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,106,0,0.7); }
          50% { box-shadow: 0 0 0 16px rgba(255,106,0,0); }
        }
        .nf-pulse { animation: nfPulse 2s infinite; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "rgba(14,15,17,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: "var(--nf-orange)" }}>
              <Cog className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            <span className="nf-display text-xl font-semibold tracking-tight">
              Nitro<span style={{ color: "var(--nf-orange)" }}>Fix</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 nf-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--nf-mute)" }}>
            <a href="#services" className="hover:text-white">Servicios</a>
            <a href="#gallery" className="hover:text-white">Trabajos</a>
            <a href="#contact" className="hover:text-white">Contacto</a>
          </nav>
          <Link
            to="/#demos"
            className="nf-mono text-[10px] uppercase tracking-[0.18em] flex items-center gap-2 hover:text-white"
            style={{ color: "var(--nf-mute)" }}
          >
            <ArrowLeft className="w-3 h-3" /> Portafolio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 nf-grid-bg opacity-60" />
        <div className="absolute inset-0">
          <img src={mechanicHero} alt="Taller NitroFix" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,17,0.5) 0%, rgba(14,15,17,0.95) 100%)" }} />
        </div>

        <div className="absolute top-24 left-0 right-0 h-3 nf-stripe opacity-80" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-12 gap-10 items-end w-full">
          <div className="lg:col-span-8">
            <div className="nf-eyebrow mb-6 flex items-center gap-3">
              <span className="w-8 h-px" style={{ background: "var(--nf-orange)" }} />
              EST. 2008 · MADRID SUR
            </div>
            <h1 className="nf-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-6">
              POTENCIA.<br />
              <span style={{ color: "var(--nf-orange)" }}>PRECISIÓN.</span><br />
              GARANTÍA.
            </h1>
            <p className="text-lg md:text-xl max-w-xl mb-10" style={{ color: "var(--nf-mute)" }}>
              Más de 15 años reparando coches con la rapidez de un boxes y la honestidad de un mecánico de barrio.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="nf-cta">
                Pedir cita <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#services" className="nf-ghost">Ver servicios</a>
            </div>
          </div>
          <div className="lg:col-span-4 grid grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.08)" }}>
            {[
              { v: "15+", l: "años" },
              { v: "4.9★", l: "Google" },
              { v: "24h", l: "respuesta" },
            ].map((s) => (
              <div key={s.l} className="p-6 text-center" style={{ background: "var(--nf-asphalt)" }}>
                <div className="nf-display text-3xl md:text-4xl" style={{ color: "var(--nf-orange)" }}>{s.v}</div>
                <div className="nf-mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: "var(--nf-mute)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-7">
              <div className="nf-eyebrow mb-4">— 001 / Servicios</div>
              <h2 className="nf-display text-5xl md:text-6xl">Lo que hacemos mejor.</h2>
            </div>
            <p className="lg:col-span-5 text-lg pt-8" style={{ color: "var(--nf-mute)" }}>
              Equipo certificado, herramienta de diagnóstico de última generación y precios cerrados antes de empezar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {SERVICES.map((s, i) => (
              <div key={s.name} className="nf-card p-8 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ background: "var(--nf-steel)" }}>
                    <s.icon className="w-6 h-6" style={{ color: "var(--nf-orange)" }} strokeWidth={1.5} />
                  </div>
                  <span className="nf-mono text-[10px]" style={{ color: "var(--nf-mute)" }}>0{i + 1}</span>
                </div>
                <h3 className="nf-display text-2xl mb-3">{s.name}</h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--nf-mute)" }}>{s.desc}</p>
                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <span className="nf-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--nf-yellow)" }}>{s.price}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: "var(--nf-orange)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 md:py-32" style={{ background: "var(--nf-graphite)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="nf-eyebrow mb-4">— 002 / Garaje</div>
              <h2 className="nf-display text-5xl md:text-6xl">Nuestros trabajos.</h2>
            </div>
            <a href="#" className="nf-mono text-[11px] uppercase tracking-[0.18em] flex items-center gap-2 hover:text-orange-500" style={{ color: "var(--nf-orange)" }}>
              Ver Instagram <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {GALLERY.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden relative group cursor-pointer">
                <img src={src} alt={`Trabajo ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.85) 100%)" }}>
                  <div>
                    <div className="nf-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--nf-orange)" }}>JOB_{String(i + 1).padStart(3, "0")}</div>
                    <div className="text-sm mt-1">Reparación completa</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 nf-grid-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <div className="nf-eyebrow mb-4">— 003 / Contacto</div>
            <h2 className="nf-display text-5xl md:text-7xl mb-8 leading-[0.95]">
              Tu coche.<br /><span style={{ color: "var(--nf-orange)" }}>Listo hoy.</span>
            </h2>
            <p className="text-lg mb-10 max-w-md" style={{ color: "var(--nf-mute)" }}>
              Escríbenos por WhatsApp, te damos presupuesto cerrado en menos de 1 hora.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: "Teléfono", value: "+34 600 123 456" },
                { icon: MapPin, label: "Dirección", value: "C/ del Motor 24, Madrid" },
                { icon: Clock, label: "Horario", value: "L-V 8:00-19:00 · S 9:00-14:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 pb-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 flex items-center justify-center" style={{ background: "var(--nf-steel)" }}>
                    <c.icon className="w-4 h-4" style={{ color: "var(--nf-orange)" }} />
                  </div>
                  <div>
                    <div className="nf-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--nf-mute)" }}>{c.label}</div>
                    <div className="text-base mt-1">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="nf-card p-8 md:p-10">
            <div className="nf-eyebrow mb-4">Solicita presupuesto</div>
            <h3 className="nf-display text-3xl mb-8">Cuéntanos qué necesitas.</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {[
                { l: "Nombre", t: "text" },
                { l: "Teléfono", t: "tel" },
                { l: "Matrícula / Modelo", t: "text" },
              ].map((f) => (
                <div key={f.l}>
                  <label className="nf-mono text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "var(--nf-mute)" }}>{f.l}</label>
                  <input type={f.t} className="w-full bg-transparent border-b py-3 outline-none focus:border-orange-500 transition-colors" style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--nf-white)" }} />
                </div>
              ))}
              <div>
                <label className="nf-mono text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "var(--nf-mute)" }}>Avería</label>
                <textarea rows={3} className="w-full bg-transparent border-b py-3 outline-none focus:border-orange-500 transition-colors resize-none" style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--nf-white)" }} />
              </div>
              <button type="submit" className="nf-cta w-full justify-center mt-4">
                Enviar solicitud <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 nf-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--nf-mute)" }}>
          <div>© 2025 NitroFix · Todos los derechos reservados</div>
          <Link to="/#demos" className="hover:text-orange-500 flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Demo de MR_ROBOTS LABS
          </Link>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/34600123456?text=Hola%20NitroFix"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 nf-pulse rounded-full"
        aria-label="WhatsApp"
      >
        <span className="flex items-center gap-3 pl-4 pr-5 h-14 rounded-full font-semibold text-black" style={{ background: "var(--nf-orange)" }}>
          <MessageCircle className="w-6 h-6" strokeWidth={2} />
          <span className="nf-mono text-[11px] uppercase tracking-[0.18em] hidden sm:inline">WhatsApp</span>
        </span>
      </a>
    </div>
  );
};

export default MechanicDemo;
