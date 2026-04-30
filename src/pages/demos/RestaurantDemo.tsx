import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft, MapPin, Clock, Phone, Instagram, Facebook, MessageCircle,
  Leaf, WheatOff, Star, Calendar, Users, Check, ChevronDown
} from "lucide-react";
import restaurantHero from "@/assets/demo-restaurant.jpg";

type Dish = { name: string; desc: string; price: string; tags?: ("veg" | "gf" | "chef")[] };

const MENU: { section: string; sub: string; items: Dish[] }[] = [
  {
    section: "Para empezar",
    sub: "Pequeños bocados para abrir el apetito",
    items: [
      { name: "Tartar de atún rojo", desc: "Tartar cortado a cuchillo, alcaparras de Mallorca, yema curada y aceite de albahaca.", price: "18", tags: ["chef"] },
      { name: "Burrata de Andría", desc: "Tomate raf en dos texturas, pesto de pistacho y pan de masa madre tostado.", price: "16", tags: ["veg"] },
      { name: "Croquetas de jamón ibérico", desc: "Receta de la abuela Carmen. Bechamel cremosa, jamón de bellota, fritura ligera (5 unidades).", price: "12" },
      { name: "Boquerones del Cantábrico", desc: "Marinados 24h en vinagre de Jerez, ajo confitado y perejil fresco.", price: "11", tags: ["gf"] },
    ],
  },
  {
    section: "Principales",
    sub: "Cocina mediterránea de raíz, producto de temporada",
    items: [
      { name: "Arroz meloso de carabineros", desc: "Caldo de pescado de roca de 12 horas, azafrán de La Mancha, alioli suave de azafrán.", price: "26", tags: ["chef", "gf"] },
      { name: "Cordero lechal a baja temperatura", desc: "12 horas a 64°. Puré de coliflor asada, jugo reducido al romero y crujiente de avellana.", price: "28", tags: ["gf"] },
      { name: "Lubina salvaje a la sal", desc: "Pescada en lonja de Dénia. Patata violeta, espárragos verdes y emulsión de limón quemado.", price: "32", tags: ["chef", "gf"] },
      { name: "Risotto de calabaza y trufa negra", desc: "Arroz carnaroli, caldo vegetal, parmesano de 24 meses y trufa fresca de temporada.", price: "22", tags: ["veg"] },
      { name: "Solomillo madurado 30 días", desc: "Vaca rubia gallega, mantequilla de chalota, patatas confitadas en grasa de pato.", price: "29", tags: ["gf"] },
    ],
  },
  {
    section: "Postres",
    sub: "Pastelería de la casa, elaborada cada mañana",
    items: [
      { name: "Torrija caramelizada", desc: "Brioche casero, leche infusionada con vainilla de Madagascar, helado de canela.", price: "8", tags: ["veg"] },
      { name: "Coulant de chocolate 72%", desc: "Chocolate Valrhona Guanaja, corazón fundente, helado de aceite de oliva virgen extra.", price: "9", tags: ["veg"] },
      { name: "Tarta de queso de cabra y miel", desc: "Queso de Garrotxa, miel de azahar, base de almendra tostada y romero.", price: "8", tags: ["veg", "gf"] },
    ],
  },
  {
    section: "Bodega",
    sub: "Selección a copa · Carta extendida disponible en sala",
    items: [
      { name: "Verdejo Rueda · Belondrade", desc: "Crianza sobre lías. Notas de hinojo, manzana verde y memoria salina.", price: "6 / 28" },
      { name: "Albariño · Pazo Señorans", desc: "Rías Baixas. Mineral, fresco, acompañamiento ideal para los arroces.", price: "5 / 24" },
      { name: "Tempranillo Rioja · Muga Reserva", desc: "18 meses en barrica. Estructura, fruta madura y final largo.", price: "7 / 32" },
      { name: "Cava brut nature · Recaredo", desc: "60 meses de crianza. Burbuja fina, ideal para abrir mesa.", price: "8 / 38" },
    ],
  },
];

const TAG_META = {
  veg: { label: "Vegetariano", icon: Leaf, color: "#5C6F3F" },
  gf: { label: "Sin gluten", icon: WheatOff, color: "#8A6A3D" },
  chef: { label: "Firma del chef", icon: Star, color: "#A84A2D" },
} as const;

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=900&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80", h: "tall" },
];

const HOURS = [
  { day: "Martes — Jueves", time: "13:00 – 16:00 · 20:00 – 23:30" },
  { day: "Viernes — Sábado", time: "13:00 – 16:30 · 20:00 – 00:00" },
  { day: "Domingo", time: "13:00 – 16:30" },
  { day: "Lunes", time: "Cerrado" },
];

const RestaurantDemo = () => {
  const [form, setForm] = useState({ name: "", date: "", time: "21:00", guests: 2, phone: "" });
  const [confirmed, setConfirmed] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("Para empezar");

  useEffect(() => {
    document.title = "Sal & Olivo · Cocina mediterránea de autor";
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 8000);
  };

  return (
    <div className="salolivo-root min-h-screen">
      <style>{`
        .salolivo-root {
          --so-cream: #F4EDE0;
          --so-cream-soft: #FAF6EE;
          --so-terracotta: #B85C3C;
          --so-terracotta-deep: #8A3F26;
          --so-olive: #3D4A2A;
          --so-olive-soft: #5C6F3F;
          --so-gold: #B8915C;
          --so-ink: #2A1F18;
          --so-mute: #6B5C4D;
          --so-line: #E5DCC9;
          background: var(--so-cream-soft);
          color: var(--so-ink);
          font-family: 'Manrope', system-ui, sans-serif;
        }
        .so-display { font-family: 'Cormorant Garamond', 'Times New Roman', serif; font-weight: 400; letter-spacing: -0.01em; }
        .so-script { font-family: 'Italiana', serif; }
        .so-tracking { letter-spacing: 0.32em; text-transform: uppercase; font-size: 11px; }
        .so-rule { display: inline-block; width: 28px; height: 1px; background: var(--so-terracotta); vertical-align: middle; }
        .so-cta {
          background: var(--so-terracotta); color: var(--so-cream-soft);
          padding: 16px 28px; font-size: 12px; letter-spacing: 0.22em;
          text-transform: uppercase; font-weight: 500;
          display: inline-flex; align-items: center; gap: 10px;
          transition: all 0.3s; cursor: pointer; border: none;
        }
        .so-cta:hover { background: var(--so-terracotta-deep); transform: translateY(-1px); }
        .so-ghost {
          border: 1px solid var(--so-ink); background: transparent;
          color: var(--so-ink); padding: 16px 28px; font-size: 12px;
          letter-spacing: 0.22em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 10px;
          transition: all 0.3s; cursor: pointer;
        }
        .so-ghost:hover { background: var(--so-ink); color: var(--so-cream); }
        .so-input {
          width: 100%; background: transparent;
          border: none; border-bottom: 1px solid var(--so-line);
          padding: 14px 0; font-family: 'Manrope', sans-serif;
          font-size: 15px; color: var(--so-ink); outline: none;
          transition: border-color 0.2s;
        }
        .so-input:focus { border-color: var(--so-terracotta); }
        .so-label { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--so-mute); }
        .so-section-row { border-bottom: 1px solid var(--so-line); transition: background 0.3s; }
        .so-dish-row { transition: background 0.3s; padding: 22px 0; border-bottom: 1px dashed var(--so-line); }
        .so-dish-row:last-child { border-bottom: none; }
        .so-dish-row:hover { padding-left: 8px; }
        .so-tag {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 2px;
        }
        @keyframes soFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .so-fade { animation: soFadeUp 0.6s ease forwards; }
        .so-grain {
          background-image: radial-gradient(rgba(184,92,60,0.04) 1px, transparent 1px);
          background-size: 4px 4px;
        }
        .so-mason img { transition: transform 0.6s ease; }
        .so-mason a:hover img { transform: scale(1.04); }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md" style={{ background: "rgba(250,246,238,0.9)", borderBottom: "1px solid var(--so-line)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--so-terracotta)" }}>
              <Leaf className="w-4 h-4" style={{ color: "var(--so-cream-soft)" }} />
            </div>
            <div>
              <div className="so-display text-xl leading-none">Sal & Olivo</div>
              <div className="so-tracking text-[9px]" style={{ color: "var(--so-mute)" }}>cocina · mediterránea</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-sm" style={{ color: "var(--so-ink)" }}>
            <a href="#carta" className="hover:text-[var(--so-terracotta)] transition-colors">Carta</a>
            <a href="#chef" className="hover:text-[var(--so-terracotta)] transition-colors">El chef</a>
            <a href="#galeria" className="hover:text-[var(--so-terracotta)] transition-colors">Galería</a>
            <a href="#reserva" className="hover:text-[var(--so-terracotta)] transition-colors">Reservar</a>
            <a href="#contacto" className="hover:text-[var(--so-terracotta)] transition-colors">Contacto</a>
          </nav>
          <Link to="/#demos" className="so-tracking text-[10px] flex items-center gap-2" style={{ color: "var(--so-mute)" }}>
            <ArrowLeft className="w-3 h-3" /> Portafolio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 so-grain">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 so-fade">
            <div className="so-tracking mb-8" style={{ color: "var(--so-terracotta)" }}>
              <span className="so-rule mr-3" /> Desde 2018, en el corazón de Russafa
            </div>
            <h1 className="so-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.92] mb-8">
              Cocinamos<br />
              <em className="so-script not-italic" style={{ color: "var(--so-terracotta)" }}>despacio.</em><br />
              Como en casa.
            </h1>
            <p className="text-lg max-w-lg mb-10 leading-relaxed" style={{ color: "var(--so-mute)" }}>
              Producto de mercado, recetas de tres generaciones y un horno de leña que llevamos encendido desde las seis. Aquí no hay prisa: hay tiempo para que las cosas sepan a verdad.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#reserva" className="so-cta">Reservar mesa <Calendar className="w-3.5 h-3.5" /></a>
              <a href="#carta" className="so-ghost">Ver la carta</a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden" style={{ background: "var(--so-ink)" }}>
              <img src={restaurantHero} alt="Plato de cocina mediterránea" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 px-6 py-4 max-w-[240px]" style={{ background: "var(--so-cream)", border: "1px solid var(--so-line)" }}>
              <div className="so-tracking text-[9px] mb-2" style={{ color: "var(--so-mute)" }}>guía Repsol 2024</div>
              <div className="flex items-center gap-1" style={{ color: "var(--so-terracotta)" }}>
                {[1,2,3].map(n => <Leaf key={n} className="w-4 h-4" fill="currentColor" />)}
              </div>
              <div className="text-sm mt-2" style={{ color: "var(--so-ink)" }}>Tres soles. Cocina honesta y con criterio.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Carta */}
      <section id="carta" className="py-24 md:py-32" style={{ background: "var(--so-cream)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="so-tracking mb-4" style={{ color: "var(--so-terracotta)" }}>— 001 / Carta</div>
            <h2 className="so-display text-5xl md:text-7xl mb-4">Lo que cocinamos hoy.</h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--so-mute)" }}>
              La carta cambia con la temporada y con lo que llega cada mañana del mercado. Estos son los platos que están en mesa esta semana.
            </p>
          </div>

          <div>
            {MENU.map((sec, idx) => {
              const open = openSection === sec.section;
              return (
                <div key={sec.section} className="so-section-row">
                  <button
                    onClick={() => setOpenSection(open ? null : sec.section)}
                    className="w-full flex items-center justify-between py-7 group text-left"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="so-tracking text-[10px]" style={{ color: "var(--so-terracotta)" }}>0{idx + 1}</span>
                      <div>
                        <div className="so-display text-3xl md:text-4xl">{sec.section}</div>
                        <div className="text-sm mt-1" style={{ color: "var(--so-mute)" }}>{sec.sub}</div>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} style={{ color: "var(--so-mute)" }} />
                  </button>
                  {open && (
                    <div className="pb-8 so-fade">
                      {sec.items.map(d => (
                        <div key={d.name} className="so-dish-row flex items-baseline gap-6">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="so-display text-2xl">{d.name}</h3>
                              <div className="flex gap-1.5">
                                {d.tags?.map(t => {
                                  const meta = TAG_META[t];
                                  const Icon = meta.icon;
                                  return (
                                    <span key={t} className="so-tag" style={{ background: `${meta.color}15`, color: meta.color }}>
                                      <Icon className="w-3 h-3" /> {meta.label}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--so-mute)" }}>{d.desc}</p>
                          </div>
                          <div className="so-display text-2xl shrink-0" style={{ color: "var(--so-terracotta)" }}>{d.price}€</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-center mt-12" style={{ color: "var(--so-mute)" }}>
            Menú degustación disponible para mesa completa · 7 pases · 58€ por persona (maridaje +24€)
          </p>
        </div>
      </section>

      {/* Chef */}
      <section id="chef" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80"
                alt="Chef Marco Olivares"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="so-tracking mb-6" style={{ color: "var(--so-terracotta)" }}>— 002 / El chef</div>
            <h2 className="so-display text-5xl md:text-6xl mb-8 leading-tight">
              Marco Olivares.<br />
              <em className="so-script not-italic" style={{ color: "var(--so-olive)" }}>Tres décadas frente al fuego.</em>
            </h2>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--so-ink)" }}>
              <p>
                Aprendí a cocinar mirando a mi madre en Almería. Después vinieron años de oficio en Casa Lúa, El Bohío y un paso por la cocina de Quique Dacosta que me marcó para siempre.
              </p>
              <p style={{ color: "var(--so-mute)" }}>
                En Sal & Olivo no busco innovar por innovar. Busco que cuando muerdas el cordero te acuerdes de las tardes de domingo. Que el arroz sepa al puerto. Que la torrija te haga llamar a tu abuela. Eso es lo único que me importa.
              </p>
              <div className="pt-4 flex items-center gap-3">
                <span className="so-rule" />
                <span className="so-tracking" style={{ color: "var(--so-terracotta)" }}>Marco Olivares · chef ejecutivo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="py-24 md:py-32" style={{ background: "var(--so-cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="so-tracking mb-4" style={{ color: "var(--so-terracotta)" }}>— 003 / Mesa</div>
            <h2 className="so-display text-5xl md:text-6xl mb-4">Cómo se ve nuestra mesa.</h2>
          </div>
          <div className="so-mason columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {GALLERY.map((g, i) => (
              <a key={i} href={g.src} target="_blank" rel="noreferrer" className="block mb-4 break-inside-avoid overflow-hidden">
                <img
                  src={g.src}
                  alt={`Plato ${i + 1}`}
                  className={`w-full object-cover ${g.h === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Reserva */}
      <section id="reserva" className="py-24 md:py-32" style={{ background: "var(--so-ink)", color: "var(--so-cream-soft)" }}>
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="so-tracking mb-6" style={{ color: "var(--so-gold)" }}>— 004 / Reserva</div>
            <h2 className="so-display text-5xl md:text-6xl mb-6 leading-tight">
              Tu mesa,<br />
              <em className="so-script not-italic" style={{ color: "var(--so-gold)" }}>esperándote.</em>
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "rgba(244,237,224,0.7)" }}>
              Reservamos hasta para 8 comensales online. Para grupos mayores o eventos privados, llámanos directamente.
            </p>
            <div className="space-y-4 text-sm" style={{ color: "rgba(244,237,224,0.85)" }}>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4" style={{ color: "var(--so-gold)" }} /> 963 27 14 88</div>
              <div className="flex items-center gap-3"><MessageCircle className="w-4 h-4" style={{ color: "var(--so-gold)" }} /> WhatsApp directo</div>
            </div>
          </div>

          <div>
            {confirmed ? (
              <div className="p-10 so-fade text-center" style={{ background: "rgba(184,145,92,0.1)", border: "1px solid var(--so-gold)" }}>
                <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "var(--so-gold)", color: "var(--so-ink)" }}>
                  <Check className="w-7 h-7" strokeWidth={2.5} />
                </div>
                <h3 className="so-display text-3xl mb-3">¡Mesa reservada!</h3>
                <p className="text-sm" style={{ color: "rgba(244,237,224,0.75)" }}>
                  Te hemos enviado la confirmación. Si necesitas cambiar algo, escríbenos por WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-7">
                <div>
                  <label className="so-label block mb-2" style={{ color: "var(--so-gold)" }}>A nombre de</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="so-input" style={{ borderColor: "rgba(244,237,224,0.2)", color: "var(--so-cream-soft)" }} placeholder="Nombre completo" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="so-label block mb-2" style={{ color: "var(--so-gold)" }}>Fecha</label>
                    <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="so-input" style={{ borderColor: "rgba(244,237,224,0.2)", color: "var(--so-cream-soft)", colorScheme: "dark" }} />
                  </div>
                  <div>
                    <label className="so-label block mb-2" style={{ color: "var(--so-gold)" }}>Hora</label>
                    <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="so-input" style={{ borderColor: "rgba(244,237,224,0.2)", color: "var(--so-cream-soft)", background: "transparent" }}>
                      {["13:30","14:00","14:30","20:00","20:30","21:00","21:30","22:00"].map(t => <option key={t} value={t} style={{ color: "#000" }}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="so-label block mb-2" style={{ color: "var(--so-gold)" }}>Comensales</label>
                    <div className="flex items-center justify-between pt-3 pb-2 border-b" style={{ borderColor: "rgba(244,237,224,0.2)" }}>
                      <button type="button" onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })} className="w-8 h-8 flex items-center justify-center" style={{ color: "var(--so-gold)" }}>−</button>
                      <span className="so-display text-2xl flex items-center gap-2"><Users className="w-4 h-4" /> {form.guests}</span>
                      <button type="button" onClick={() => setForm({ ...form, guests: Math.min(8, form.guests + 1) })} className="w-8 h-8 flex items-center justify-center" style={{ color: "var(--so-gold)" }}>+</button>
                    </div>
                  </div>
                  <div>
                    <label className="so-label block mb-2" style={{ color: "var(--so-gold)" }}>Teléfono</label>
                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="so-input" style={{ borderColor: "rgba(244,237,224,0.2)", color: "var(--so-cream-soft)" }} placeholder="6XX XX XX XX" />
                  </div>
                </div>
                <button type="submit" className="so-cta w-full justify-center" style={{ background: "var(--so-gold)", color: "var(--so-ink)" }}>
                  Confirmar reserva <Check className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24" style={{ background: "var(--so-cream-soft)" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div>
            <div className="so-tracking mb-3" style={{ color: "var(--so-terracotta)" }}><Clock className="w-3 h-3 inline mr-2" /> Horario</div>
            <ul className="space-y-2 text-sm">
              {HOURS.map(h => (
                <li key={h.day} className="flex justify-between gap-4 py-1 border-b" style={{ borderColor: "var(--so-line)" }}>
                  <span style={{ color: "var(--so-ink)" }}>{h.day}</span>
                  <span style={{ color: "var(--so-mute)" }}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="so-tracking mb-3" style={{ color: "var(--so-terracotta)" }}><MapPin className="w-3 h-3 inline mr-2" /> Encuéntranos</div>
            <p className="text-sm mb-2">Calle Cuba 47, Russafa<br />46006 Valencia</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Calle+Cuba+47+Valencia"
              target="_blank" rel="noreferrer"
              className="text-sm underline underline-offset-4 inline-block mt-2"
              style={{ color: "var(--so-terracotta)" }}
            >
              Cómo llegar →
            </a>
          </div>
          <div>
            <div className="so-tracking mb-3" style={{ color: "var(--so-terracotta)" }}>Contacto directo</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> 963 27 14 88</li>
              <li className="flex items-center gap-2"><MessageCircle className="w-3.5 h-3.5" /> hola@salyolivo.es</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="aspect-[16/6] overflow-hidden" style={{ background: "var(--so-cream)" }}>
            <iframe
              title="Sal & Olivo en el mapa"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.378%2C39.460%2C-0.366%2C39.470&layer=mapnik&marker=39.4647%2C-0.3725"
              className="w-full h-full"
              style={{ border: 0, filter: "sepia(0.2) saturate(0.7)" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ background: "var(--so-ink)", color: "var(--so-cream-soft)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8 pb-8 border-b" style={{ borderColor: "rgba(244,237,224,0.1)" }}>
            <div className="so-display text-3xl">Sal & Olivo</div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--so-terracotta)]" style={{ border: "1px solid rgba(244,237,224,0.2)" }}>
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--so-terracotta)]" style={{ border: "1px solid rgba(244,237,224,0.2)" }}>
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs" style={{ color: "rgba(244,237,224,0.55)" }}>
            <div>© 2025 Sal & Olivo · Cocina mediterránea</div>
            <div>
              Disponemos de carta de alérgenos completa. Consulte a nuestro personal sobre intolerancias alimentarias.
            </div>
            <Link to="/#demos" className="flex items-center gap-2 hover:text-[var(--so-gold)]">
              <ArrowLeft className="w-3 h-3" /> Demo de MR_ROBOTS LABS
            </Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/34963271488?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20mesa%20en%20Sal%20%26%20Olivo"
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

export default RestaurantDemo;
