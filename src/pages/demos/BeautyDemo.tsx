import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft, Sparkles, Heart, Calendar, Clock, MessageCircle, Gift,
  Check, ChevronRight, Star, Bell, Smartphone, Quote, Mail
} from "lucide-react";
import beautyHero from "@/assets/demo-beauty.jpg";

type Service = { name: string; duration: string; price: number; desc: string; cat: string };

const SERVICES: Service[] = [
  { cat: "Facial", name: "Hydra Glow Premium", duration: "75 min", price: 89, desc: "Limpieza profunda, ácido hialurónico y radiofrecuencia. Piel luminosa al instante." },
  { cat: "Facial", name: "Peeling químico suave", duration: "45 min", price: 65, desc: "Renueva la piel sin descamación visible. Ideal para post-verano." },
  { cat: "Facial", name: "Microneedling con vitamina C", duration: "60 min", price: 110, desc: "Estimula colágeno, atenúa marcas y unifica el tono." },
  { cat: "Cuerpo", name: "Masaje descontracturante", duration: "60 min", price: 55, desc: "Aceites esenciales, maniobras profundas en zona dorsal y cervical." },
  { cat: "Cuerpo", name: "Drenaje linfático manual", duration: "75 min", price: 70, desc: "Reduce retención, mejora circulación. Recomendado en bonos de 5 sesiones." },
  { cat: "Láser", name: "Depilación láser piernas completas", duration: "45 min", price: 95, desc: "Tecnología diodo. 6-8 sesiones para resultado definitivo." },
  { cat: "Láser", name: "Depilación láser axilas + ingles", duration: "30 min", price: 55, desc: "Bono 6 sesiones: 280€ (ahorro 50€)." },
  { cat: "Uñas", name: "Manicura semipermanente", duration: "60 min", price: 28, desc: "Esmaltado, retirada incluida. Más de 80 colores." },
  { cat: "Uñas", name: "Pedicura spa", duration: "75 min", price: 38, desc: "Exfoliación, hidratación y esmaltado. Con masaje de pies." },
];

const STAFF = [
  { name: "Claudia Renaud", role: "Esteticista facial · directora", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Marta Vidal", role: "Especialista láser & cuerpo", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Sofía Reig", role: "Manicurista · pedicurista", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80" },
];

const TESTIMONIALS = [
  { name: "Lucía Marín", text: "Llevo dos años yendo cada cuatro semanas. Claudia tiene unas manos prodigiosas y la app me avisa siempre la noche antes. Cero esfuerzo.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { name: "Andrea Solé", text: "El láser ha sido la mejor inversión. Marta me explicó todo con calma y los resultados después de 5 sesiones son increíbles.", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80" },
  { name: "Carmen Olivares", text: "Reservo desde el móvil en 30 segundos. Y si tengo que cambiar la cita, lo hago yo misma sin llamar a nadie. Justo lo que necesitaba.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
];

const SLOTS = ["09:30", "11:00", "12:30", "16:00", "17:30", "19:00"];
const CATS = ["Facial", "Cuerpo", "Láser", "Uñas"];

const BeautyDemo = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [activeCat, setActiveCat] = useState("Facial");
  const [picked, setPicked] = useState<Service | null>(null);
  const [pro, setPro] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);

  const [giftForm, setGiftForm] = useState({ from: "", to: "", email: "", amount: 50 });
  const [giftSent, setGiftSent] = useState(false);

  useEffect(() => { document.title = "Lumière Studio · Estética & bienestar"; }, []);

  const handlePickService = (s: Service) => { setPicked(s); setStep(2); };
  const confirmBooking = () => setStep(4);

  const sendGift = (e: React.FormEvent) => {
    e.preventDefault();
    setGiftSent(true);
    setTimeout(() => setGiftSent(false), 6000);
  };

  return (
    <div className="lumiere-root min-h-screen">
      <style>{`
        .lumiere-root {
          --lm-blush: #F5DCD2;
          --lm-blush-soft: #FBEDE6;
          --lm-nude: #E8D5C4;
          --lm-bone: #FAF6F2;
          --lm-bone-dim: #F2EBE3;
          --lm-gold: #C9A96B;
          --lm-gold-deep: #A8884B;
          --lm-ink: #3D2E26;
          --lm-mute: #8C7665;
          --lm-line: #EFE4D9;
          background: var(--lm-bone);
          color: var(--lm-ink);
          font-family: 'Manrope', system-ui, sans-serif;
        }
        .lm-display { font-family: 'DM Serif Display', 'Times New Roman', serif; font-weight: 400; letter-spacing: -0.01em; }
        .lm-eyebrow { font-family: 'Manrope', sans-serif; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--lm-gold-deep); }
        .lm-cta {
          background: var(--lm-ink); color: var(--lm-bone);
          padding: 15px 28px; font-size: 12px; letter-spacing: 0.18em;
          text-transform: uppercase; font-weight: 500;
          border: none; cursor: pointer; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 10px;
          transition: all 0.3s;
        }
        .lm-cta:hover { background: var(--lm-gold-deep); transform: translateY(-1px); }
        .lm-cta:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
        .lm-ghost {
          background: var(--lm-bone); color: var(--lm-ink);
          padding: 15px 28px; font-size: 12px; letter-spacing: 0.18em;
          text-transform: uppercase; border: 1px solid var(--lm-line);
          border-radius: 999px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 10px;
          transition: all 0.25s;
        }
        .lm-ghost:hover { border-color: var(--lm-gold); color: var(--lm-gold-deep); }
        .lm-card {
          background: var(--lm-bone); border: 1px solid var(--lm-line);
          border-radius: 24px; transition: all 0.35s;
        }
        .lm-card:hover { border-color: var(--lm-gold); box-shadow: 0 20px 50px -25px rgba(168,136,75,0.25); transform: translateY(-3px); }
        .lm-pill {
          padding: 8px 16px; border-radius: 999px; font-size: 12px;
          letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s;
          border: 1px solid var(--lm-line); background: var(--lm-bone);
        }
        .lm-pill.active { background: var(--lm-ink); color: var(--lm-bone); border-color: var(--lm-ink); }
        .lm-pill:hover:not(.active) { border-color: var(--lm-gold); }
        .lm-input {
          width: 100%; padding: 14px 18px; font-size: 14px;
          border: 1px solid var(--lm-line); border-radius: 14px;
          background: var(--lm-bone); outline: none;
          transition: border-color 0.2s; font-family: inherit;
        }
        .lm-input:focus { border-color: var(--lm-gold); }
        .lm-glow { background: radial-gradient(60% 60% at 50% 50%, var(--lm-blush) 0%, transparent 70%); position: absolute; pointer-events: none; opacity: 0.7; }
        @keyframes lmPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.9; } }
        .lm-pulse-dot { animation: lmPulse 2s infinite; }
        .lm-step-num {
          width: 28px; height: 28px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 600;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md" style={{ background: "rgba(250,246,242,0.92)", borderBottom: "1px solid var(--lm-line)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--lm-blush)" }}>
              <Sparkles className="w-4 h-4" style={{ color: "var(--lm-gold-deep)" }} />
            </div>
            <div className="lm-display text-xl">Lumière Studio</div>
          </div>
          <nav className="hidden md:flex gap-8 text-sm" style={{ color: "var(--lm-ink)" }}>
            <a href="#tratamientos" className="hover:text-[var(--lm-gold-deep)]">Tratamientos</a>
            <a href="#reserva" className="hover:text-[var(--lm-gold-deep)]">Reservar</a>
            <a href="#tecnologia" className="hover:text-[var(--lm-gold-deep)]">Cómo funciona</a>
            <a href="#opiniones" className="hover:text-[var(--lm-gold-deep)]">Opiniones</a>
            <a href="#regalo" className="hover:text-[var(--lm-gold-deep)]">Bono regalo</a>
          </nav>
          <Link to="/#demos" className="lm-eyebrow text-[10px] flex items-center gap-2" style={{ color: "var(--lm-mute)" }}>
            <ArrowLeft className="w-3 h-3" /> Portafolio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-20 relative overflow-hidden">
        <div className="lm-glow" style={{ width: 600, height: 600, top: -100, right: -100 }} />
        <div className="lm-glow" style={{ width: 500, height: 500, bottom: -200, left: -100, background: "radial-gradient(60% 60% at 50% 50%, var(--lm-nude) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="lm-eyebrow mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--lm-gold)] lm-pulse-dot" />
              Reservas online · disponibilidad en tiempo real
            </div>
            <h1 className="lm-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] mb-7">
              Tu ritual<br />
              de belleza,<br />
              <span style={{ color: "var(--lm-gold-deep)" }}>sin esperas.</span>
            </h1>
            <p className="text-lg max-w-lg mb-10 leading-relaxed" style={{ color: "var(--lm-mute)" }}>
              Centro de estética y bienestar con reserva online, recordatorios automáticos por WhatsApp y un equipo que recuerda tu última cita mejor que tú.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#reserva" className="lm-cta">Reservar tratamiento <ChevronRight className="w-3.5 h-3.5" /></a>
              <a href="#regalo" className="lm-ghost"><Gift className="w-4 h-4" /> Bono regalo</a>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t" style={{ borderColor: "var(--lm-line)" }}>
              {[
                { v: "4.9", l: "puntuación Treatwell" },
                { v: "8 años", l: "cuidando piel" },
                { v: "1.2k+", l: "clientas habituales" },
              ].map(s => (
                <div key={s.l}>
                  <div className="lm-display text-3xl md:text-4xl" style={{ color: "var(--lm-gold-deep)" }}>{s.v}</div>
                  <div className="lm-eyebrow text-[9px] mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[36px] overflow-hidden" style={{ background: "var(--lm-blush-soft)", boxShadow: "0 30px 80px -30px rgba(168,136,75,0.3)" }}>
              <img src={beautyHero} alt="Lumière Studio interior" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 lm-card p-5 max-w-[260px] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--lm-blush)" }}>
                <Bell className="w-5 h-5" style={{ color: "var(--lm-gold-deep)" }} />
              </div>
              <div>
                <div className="text-xs font-medium">Recordatorio enviado</div>
                <div className="text-[11px]" style={{ color: "var(--lm-mute)" }}>WhatsApp · 24h antes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos */}
      <section id="tratamientos" className="py-24 md:py-32" style={{ background: "var(--lm-bone-dim)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="lm-eyebrow mb-4">— 001 / Servicios</div>
            <h2 className="lm-display text-5xl md:text-6xl mb-4">Tratamientos & precios</h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--lm-mute)" }}>
              Cada tratamiento incluye consulta previa, producto profesional y rutina personalizada para casa.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATS.map(c => (
              <button key={c} onClick={() => setActiveCat(c)} className={`lm-pill ${activeCat === c ? "active" : ""}`}>{c}</button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.filter(s => s.cat === activeCat).map(s => (
              <div key={s.name} className="lm-card p-7 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="lm-display text-2xl flex-1">{s.name}</h3>
                  <div className="lm-display text-2xl whitespace-nowrap" style={{ color: "var(--lm-gold-deep)" }}>{s.price}€</div>
                </div>
                <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: "var(--lm-mute)" }}>
                  <Clock className="w-3.5 h-3.5" /> {s.duration}
                </div>
                <p className="text-sm mb-6 flex-1" style={{ color: "var(--lm-mute)" }}>{s.desc}</p>
                <button onClick={() => { handlePickService(s); document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" }); }} className="lm-ghost w-full justify-center">
                  Reservar <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="reserva" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="lm-eyebrow mb-4">— 002 / Reserva</div>
            <h2 className="lm-display text-5xl md:text-6xl mb-4">Reserva en 4 pasos</h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--lm-mute)" }}>Sin llamadas, sin esperar a que abramos. La agenda es real, lo que ves es lo que hay.</p>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="flex items-center gap-3">
                <div className="lm-step-num" style={{
                  background: step >= n ? "var(--lm-ink)" : "var(--lm-bone-dim)",
                  color: step >= n ? "var(--lm-bone)" : "var(--lm-mute)"
                }}>
                  {step > n ? <Check className="w-3.5 h-3.5" /> : n}
                </div>
                {n < 4 && <div className="w-12 h-px" style={{ background: step > n ? "var(--lm-ink)" : "var(--lm-line)" }} />}
              </div>
            ))}
          </div>

          <div className="lm-card p-8 md:p-12">
            {step === 1 && (
              <div>
                <h3 className="lm-display text-3xl mb-2">Elige tu tratamiento</h3>
                <p className="text-sm mb-8" style={{ color: "var(--lm-mute)" }}>O usa los botones de la sección anterior.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {SERVICES.slice(0, 6).map(s => (
                    <button key={s.name} onClick={() => handlePickService(s)} className="text-left p-4 rounded-2xl border transition-all hover:border-[var(--lm-gold)]" style={{ borderColor: "var(--lm-line)" }}>
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <div className="font-medium text-sm">{s.name}</div>
                          <div className="text-xs mt-1" style={{ color: "var(--lm-mute)" }}>{s.duration}</div>
                        </div>
                        <div className="lm-display" style={{ color: "var(--lm-gold-deep)" }}>{s.price}€</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && picked && (
              <div>
                <button onClick={() => setStep(1)} className="text-xs mb-4 flex items-center gap-1.5" style={{ color: "var(--lm-mute)" }}>
                  <ArrowLeft className="w-3 h-3" /> Cambiar tratamiento
                </button>
                <h3 className="lm-display text-3xl mb-2">¿Con quién prefieres?</h3>
                <p className="text-sm mb-8" style={{ color: "var(--lm-mute)" }}>Tu reserva: <strong>{picked.name}</strong> · {picked.duration} · {picked.price}€</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {STAFF.map(s => (
                    <button key={s.name} onClick={() => { setPro(s.name); setStep(3); }} className={`text-left p-4 rounded-2xl border transition-all ${pro === s.name ? "border-[var(--lm-gold)]" : ""}`} style={{ borderColor: pro === s.name ? "var(--lm-gold)" : "var(--lm-line)" }}>
                      <div className="aspect-square rounded-xl overflow-hidden mb-3">
                        <img src={s.img} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="font-medium text-sm">{s.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--lm-mute)" }}>{s.role}</div>
                    </button>
                  ))}
                </div>
                <button onClick={() => { setPro("indiferente"); setStep(3); }} className="text-xs mt-5 underline underline-offset-4" style={{ color: "var(--lm-gold-deep)" }}>
                  Me da igual quién, lo importante es la hora →
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <button onClick={() => setStep(2)} className="text-xs mb-4 flex items-center gap-1.5" style={{ color: "var(--lm-mute)" }}>
                  <ArrowLeft className="w-3 h-3" /> Cambiar profesional
                </button>
                <h3 className="lm-display text-3xl mb-2">Fecha y hora</h3>
                <p className="text-sm mb-6" style={{ color: "var(--lm-mute)" }}>Solo te mostramos lo que está realmente libre.</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="lm-eyebrow block mb-2">Día</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="lm-input" />
                  </div>
                  <div>
                    <label className="lm-eyebrow block mb-2">Hora disponible</label>
                    <div className="grid grid-cols-3 gap-2">
                      {SLOTS.map(s => (
                        <button key={s} onClick={() => setSlot(s)} className={`py-3 rounded-xl text-sm border transition-all ${slot === s ? "bg-[var(--lm-ink)] text-[var(--lm-bone)] border-[var(--lm-ink)]" : "border-[var(--lm-line)] hover:border-[var(--lm-gold)]"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button disabled={!date || !slot} onClick={confirmBooking} className="lm-cta mt-10 w-full justify-center">
                  Confirmar reserva <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {step === 4 && picked && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--lm-blush)" }}>
                  <Check className="w-8 h-8" style={{ color: "var(--lm-gold-deep)" }} strokeWidth={2.5} />
                </div>
                <h3 className="lm-display text-4xl mb-3">¡Cita reservada!</h3>
                <p className="mb-8" style={{ color: "var(--lm-mute)" }}>
                  <strong>{picked.name}</strong> con <strong>{pro === "indiferente" ? "el primer hueco disponible" : pro}</strong><br />
                  {date} · {slot}
                </p>
                <div className="inline-flex flex-wrap justify-center items-center gap-4 px-6 py-4 rounded-2xl text-sm" style={{ background: "var(--lm-blush-soft)" }}>
                  <span className="flex items-center gap-2"><Mail className="w-4 h-4" style={{ color: "var(--lm-gold-deep)" }} /> Confirmación enviada</span>
                  <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4" style={{ color: "var(--lm-gold-deep)" }} /> Recordatorio WhatsApp 24h antes</span>
                </div>
                <div className="mt-8">
                  <button onClick={() => { setStep(1); setPicked(null); setPro(null); setDate(""); setSlot(null); }} className="lm-ghost">Hacer otra reserva</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cómo funciona la sincronización */}
      <section id="tecnologia" className="py-24 md:py-32" style={{ background: "var(--lm-bone-dim)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="lm-eyebrow mb-4">— 003 / Tecnología</div>
            <h2 className="lm-display text-5xl md:text-6xl mb-4">Tu agenda, en piloto automático</h2>
            <p className="max-w-2xl mx-auto" style={{ color: "var(--lm-mute)" }}>
              Las reservas se sincronizan en tiempo real con Google Calendar y nuestro sistema envía recordatorios sin que muevas un dedo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Calendar, title: "Sincronización Google Calendar", desc: "Cada reserva entra automáticamente en la agenda del profesional. Si bloqueas una hora, deja de aparecer como libre al instante." },
              { icon: MessageCircle, title: "Recordatorios por WhatsApp", desc: "24h y 2h antes. Reduce los no-shows un 78%. Si la clienta no puede, puede cancelar respondiendo al mensaje." },
              { icon: Smartphone, title: "Auto-rebooking inteligente", desc: "Tras un facial de mantenimiento, sugerimos automáticamente la próxima cita en 4 semanas. Ella sólo confirma." },
            ].map(b => (
              <div key={b.title} className="lm-card p-7">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "var(--lm-blush)" }}>
                  <b.icon className="w-5 h-5" style={{ color: "var(--lm-gold-deep)" }} strokeWidth={1.5} />
                </div>
                <h3 className="lm-display text-2xl mb-3">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--lm-mute)" }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Flow visualization */}
          <div className="lm-card mt-12 p-8 md:p-12">
            <div className="lm-eyebrow mb-6 text-center">Flujo en tiempo real</div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
              {[
                { l: "Clienta reserva", icon: Sparkles },
                { l: "Google Calendar", icon: Calendar },
                { l: "WhatsApp 24h", icon: MessageCircle },
                { l: "Cita realizada", icon: Heart },
                { l: "Reagenda 4 sem.", icon: Bell },
              ].map((s, i, arr) => (
                <div key={s.l} className="flex items-center gap-3 md:gap-5">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: "var(--lm-blush-soft)", border: "1px solid var(--lm-line)" }}>
                      <s.icon className="w-5 h-5" style={{ color: "var(--lm-gold-deep)" }} strokeWidth={1.5} />
                    </div>
                    <div className="text-[11px] font-medium max-w-[80px]">{s.l}</div>
                  </div>
                  {i < arr.length - 1 && <ChevronRight className="w-4 h-4 hidden sm:block" style={{ color: "var(--lm-gold)" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="opiniones" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="lm-eyebrow mb-4">— 004 / Opiniones</div>
            <h2 className="lm-display text-5xl md:text-6xl mb-4">Lo que cuentan ellas</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="lm-card p-7">
                <Quote className="w-6 h-6 mb-4" style={{ color: "var(--lm-gold)" }} />
                <p className="text-base leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: "var(--lm-line)" }}>
                  <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="flex gap-0.5 mt-0.5">
                      {[1,2,3,4,5].map(n => <Star key={n} className="w-3 h-3" fill="var(--lm-gold)" stroke="var(--lm-gold)" />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bono regalo */}
      <section id="regalo" className="py-24 md:py-32" style={{ background: "var(--lm-blush-soft)" }}>
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="lm-eyebrow mb-4">— 005 / Bono regalo</div>
            <h2 className="lm-display text-5xl md:text-6xl mb-6 leading-tight">Regala un<br />momento de calma.</h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--lm-mute)" }}>
              Bonos digitales que llegan al email de quien tú elijas, listos para canjear en cualquier tratamiento. Sin caducidad de un año.
            </p>
            <ul className="space-y-3 text-sm">
              {["Envío inmediato por email", "Diseño impreso para regalar en mano", "Sin caducidad anual"].map(b => (
                <li key={b} className="flex items-center gap-3"><Check className="w-4 h-4" style={{ color: "var(--lm-gold-deep)" }} /> {b}</li>
              ))}
            </ul>
          </div>

          <div className="lm-card p-8">
            {giftSent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "var(--lm-blush)" }}>
                  <Check className="w-7 h-7" style={{ color: "var(--lm-gold-deep)" }} strokeWidth={2.5} />
                </div>
                <h3 className="lm-display text-3xl mb-2">¡Bono enviado!</h3>
                <p className="text-sm" style={{ color: "var(--lm-mute)" }}>{giftForm.to} recibirá un email precioso en unos minutos.</p>
              </div>
            ) : (
              <form onSubmit={sendGift} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="lm-eyebrow block mb-2">De parte de</label>
                    <input required value={giftForm.from} onChange={e => setGiftForm({ ...giftForm, from: e.target.value })} className="lm-input" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="lm-eyebrow block mb-2">Para</label>
                    <input required value={giftForm.to} onChange={e => setGiftForm({ ...giftForm, to: e.target.value })} className="lm-input" placeholder="Nombre" />
                  </div>
                </div>
                <div>
                  <label className="lm-eyebrow block mb-2">Email del destinatario</label>
                  <input required type="email" value={giftForm.email} onChange={e => setGiftForm({ ...giftForm, email: e.target.value })} className="lm-input" placeholder="email@ejemplo.com" />
                </div>
                <div>
                  <label className="lm-eyebrow block mb-3">Importe</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[30, 50, 80, 120].map(a => (
                      <button type="button" key={a} onClick={() => setGiftForm({ ...giftForm, amount: a })} className={`py-3 rounded-xl text-sm border transition-all ${giftForm.amount === a ? "bg-[var(--lm-ink)] text-[var(--lm-bone)] border-[var(--lm-ink)]" : "border-[var(--lm-line)]"}`}>{a}€</button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="lm-cta w-full justify-center"><Gift className="w-4 h-4" /> Enviar bono · {giftForm.amount}€</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderColor: "var(--lm-line)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm" style={{ color: "var(--lm-mute)" }}>
          <div className="lm-display text-2xl" style={{ color: "var(--lm-ink)" }}>Lumière Studio</div>
          <div>Calle Aribau 142 · 08036 Barcelona · 932 17 04 88</div>
          <Link to="/#demos" className="flex items-center gap-2 hover:text-[var(--lm-gold-deep)]">
            <ArrowLeft className="w-3 h-3" /> Demo de MR_ROBOTS LABS
          </Link>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/34932170488?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20en%20Lumi%C3%A8re"
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110"
        style={{ background: "#25D366", color: "white", boxShadow: "0 10px 30px rgba(37,211,102,0.4)" }}
        aria-label="Reservar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

export default BeautyDemo;
