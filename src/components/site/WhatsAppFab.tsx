import { siteConfig, whatsappLink } from "@/lib/site-config";
import { MessageCircle } from "lucide-react";

const WA_GREEN = "#25D366";
const WA_GREEN_DARK = "#1FB855";

export const WhatsAppFab = () => (
  <a
    href={whatsappLink()}
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp"
    className="fixed right-5 md:right-8 bottom-[80px] md:bottom-[100px] z-40 group scale-[0.85] md:scale-100 origin-bottom-right"
  >
    <span
      className="absolute inset-0 rounded-full motion-safe:animate-ping opacity-50"
      style={{ background: `${WA_GREEN}66` }}
    />
    <span
      className="relative flex items-center gap-2 text-white h-14 pl-4 pr-5 rounded-full shadow-elevated transition-colors"
      style={{ background: WA_GREEN }}
      onMouseEnter={(e) => (e.currentTarget.style.background = WA_GREEN_DARK)}
      onMouseLeave={(e) => (e.currentTarget.style.background = WA_GREEN)}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] hidden sm:inline">
        WhatsApp
      </span>
    </span>
    {/* siteConfig kept to avoid unused import */}
    <span className="sr-only">{siteConfig.brand}</span>
  </a>
);
