/*
 * Footer — 4-column gradient navy footer matching the reference site.
 */
import { Link } from "wouter";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Facebook } from "lucide-react";
import { NAV_ITEMS, SCHOOL } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import InstallAppButton from "./InstallAppButton";

export default function Footer() {
  const { t } = useLanguage();

  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(t("Subscribed. Thank you for joining our newsletter."));
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <footer className="site-footer" data-no-translate>
      <div className="container relative z-10">
        <div className="footer-main-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="footer-wordmark mb-5">
              <img src={SCHOOL.logo} alt={t("Radiant Secondary School")} />
              <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-soft)] font-bold">
                {t("Secondary School / Estd. 2057 BS")}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/75 max-w-md mb-6">
              {t("A modern academic institution in Mahendranagar offering school-level education and NEB +2 Science and Management in a safe, student-centred environment that nurtures confidence, character, and lifelong learning.")}
            </p>

            {/* Install PWA App Button */}
            <div className="mb-6">
              <InstallAppButton />
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/60 font-bold mb-2">
                {t("Connect with us")}
              </div>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2 footer-explore">
            <h4>{t("Explore")}</h4>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {t(item.label)}
                    </a>
                  ) : (
                    <Link href={item.href}>{t(item.label)}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 footer-right-stack">
            <div className="grid gap-10 sm:grid-cols-2">
              {/* Contact */}
              <div>
                <h4>{t("Contact")}</h4>
                <ul>
                  <li className="flex items-start gap-2.5 text-white/80">
                    <MapPin className="h-4 w-4 mt-0.5 text-[var(--color-gold-soft)] shrink-0" />
                    <span>
                      {t(SCHOOL.location)}
                      <br />
                      {t(SCHOOL.district)}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5 text-white/80">
                    <Phone className="h-4 w-4 text-[var(--color-gold-soft)] shrink-0" />
                    <a href={`tel:${SCHOOL.contact.replace(/\s/g, "")}`}>{SCHOOL.contact}</a>
                  </li>
                  <li className="flex items-center gap-2.5 text-white/80">
                    <Mail className="h-4 w-4 text-[var(--color-gold-soft)] shrink-0" />
                    <a href={`mailto:${SCHOOL.email}`} className="break-all">
                      {SCHOOL.email}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4>{t("Newsletter")}</h4>
                <p className="text-sm text-white/75 leading-relaxed mb-3">
                  {t("Subscribe for school notices, exam routines, and event updates.")}
                </p>
                <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder={t("Your email")}
                    className="flex-1 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-gold-soft)] focus:bg-white/15 transition"
                    style={{ fontFamily: "var(--font-sans)" }}
                  />
                  <button
                    type="submit"
                    className="bg-[var(--gradient-gold)] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition hover:brightness-110 active:scale-[0.98]"
                    style={{
                      background: "var(--gradient-gold)",
                      fontFamily: "var(--font-sans)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {t("Join")}
                  </button>
                </form>
              </div>
            </div>

            <div className="footer-map-panel">
              <div className="footer-map-copy">
                <span className="footer-map-kicker">{t("Visit Campus")}</span>
                <h4>{t("Radiant Location")}</h4>
                <p>
                  {t(SCHOOL.location)}, {t(SCHOOL.district)}
                </p>
              </div>
              <div className="footer-map-frame">
                <iframe
                  src={SCHOOL.mapEmbed}
                  title={t("Radiant Secondary School map")}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <span>&copy; {new Date().getFullYear()} {t("Radiant Secondary School")}. {t("All rights reserved.")}</span>
          <span className="uppercase tracking-[0.22em] text-[var(--color-gold-soft)] text-[11px] font-bold">
            {t("Quality / Confidence / Character")}
          </span>
        </div>
      </div>
    </footer>
  );
}
