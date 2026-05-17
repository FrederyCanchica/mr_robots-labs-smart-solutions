import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import textureImg from "@/assets/texture-abstract.jpg";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  business: z.string().trim().min(2).max(120),
  message: z.string().trim().min(5).max(800),
});

export const LeadMagnet = () => {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    try {
      if (siteConfig.leadsWebhookUrl) {
        await fetch(siteConfig.leadsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...parsed.data, source: "audit_form", ts: new Date().toISOString() }),
        });
      } else {
        // Fallback to mailto if webhook not configured
        const body = `Nombre: ${parsed.data.name}%0AEmail: ${parsed.data.email}%0ANegocio: ${parsed.data.business}%0AMensaje: ${parsed.data.message}`;
        window.location.href = `mailto:${siteConfig.email}?subject=Auditoría gratuita&body=${body}`;
      }
      setDone(true);
      toast.success(t("lead.sent"));
      form.reset();
    } catch {
      toast.error(t("lead.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-carbon text-bone py-24 md:py-36 overflow-hidden">
      <img
        src={textureImg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/85 to-transparent" />

      <div ref={ref} className="container-editorial relative z-10 reveal">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 text-balance">
              {t("lead.title")}
            </h2>
            <p className="text-bone/70 text-lg leading-relaxed max-w-md">
              {t("lead.body")}
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-6 bg-bone text-carbon p-8 md:p-10 flex flex-col gap-5"
          >
            <Field name="name" label={t("lead.name")} />
            <Field name="email" label={t("lead.email")} type="email" />
            <Field name="business" label={t("lead.business")} />
            <Field name="message" label={t("lead.message")} textarea />

            <Button type="submit" variant="oxblood" size="lg" disabled={loading || done}>
              {done ? t("lead.sent") : loading ? "..." : t("lead.submit")}
              {!done && !loading && <ArrowUpRight className="ml-1" />}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  name,
  label,
  type = "text",
  textarea = false,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) => (
  <label className="flex flex-col gap-2">
    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon/60">
      {label}
    </span>
    {textarea ? (
      <textarea
        name={name}
        rows={3}
        required
        className="bg-transparent border-b border-carbon/30 py-2 focus:border-oxblood focus:outline-none font-display text-lg resize-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        required
        className="bg-transparent border-b border-carbon/30 py-2 focus:border-oxblood focus:outline-none font-display text-lg"
      />
    )}
  </label>
);
