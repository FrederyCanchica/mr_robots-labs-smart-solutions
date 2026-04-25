import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface DemoLayoutProps {
  index: string;
  kicker: string;
  title: string;
  intro: string;
  heroImg: string;
  children: ReactNode;
}

export const DemoLayout = ({ index, kicker, title, intro, heroImg, children }: DemoLayoutProps) => {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-12 bg-carbon text-bone grain relative">
        <div className="container-editorial">
          <Link
            to="/#demos"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/60 hover:text-oxblood-glow mb-10 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Showroom
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-10 h-px bg-oxblood-glow" />
                <span className="label-eyebrow text-bone/60">— {index} / {kicker}</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance">
                {title}
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-bone/70 leading-relaxed">{intro}</p>
            </div>
          </div>

          <div className="mt-12 aspect-[16/8] overflow-hidden border border-bone/10">
            <img src={heroImg} alt={title} className="w-full h-full object-cover" loading="eager" />
          </div>
        </div>
      </section>

      {children}

      {/* CTA bottom */}
      <section className="bg-bone-dim py-24">
        <div className="container-editorial text-center max-w-3xl mx-auto">
          <span className="label-eyebrow">Convencido</span>
          <h3 className="font-display text-4xl md:text-6xl mt-6 mb-8 leading-tight">
            ¿Lo quieres adaptado a tu negocio?
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="oxblood" size="xl">
              <Link to="/#contact">Solicitar asesoría <ArrowUpRight /></Link>
            </Button>
            <Button asChild variant="editorial" size="xl">
              <Link to="/#pricing">Ver paquetes</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </main>
  );
};
