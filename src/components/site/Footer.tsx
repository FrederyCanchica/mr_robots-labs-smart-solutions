import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-graphite text-bone-dim border-t border-bone/10">
      <div className="container-editorial py-14">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <div className="font-display text-2xl text-bone mb-4">
              a<span className="text-oxblood">X</span>ory
            </div>
            <p className="font-display text-2xl md:text-3xl max-w-md leading-tight text-bone">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="label-eyebrow text-bone-dim/60 mb-4">Studio</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#solutions" className="hover:text-oxblood transition-colors">{t("nav.solutions")}</a></li>
              <li><a href="#demos" className="hover:text-oxblood transition-colors">{t("nav.demos")}</a></li>
              <li><a href="#pricing" className="hover:text-oxblood transition-colors">{t("nav.pricing")}</a></li>
              <li><a href="#process" className="hover:text-oxblood transition-colors">{t("nav.process")}</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="label-eyebrow text-bone-dim/60 mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-oxblood transition-colors">{siteConfig.email}</a></li>
              <li><a href={siteConfig.social.instagram} className="hover:text-oxblood transition-colors">Instagram</a></li>
              <li><a href={siteConfig.social.linkedin} className="hover:text-oxblood transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
