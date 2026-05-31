/*
 * Header — sticky navbar matching avnss.edu.np visuals + wpa-edu-np.vercel.app navigation style.
 * - Animated logo ring + orbital particles around the crest
 * - Clean nav links with gradient underline (wpa style)
 * - Apply Now (gradient-pill CTA)
 * - Full-page left-sliding mobile sidebar (avnss style) with icons, staggered animations, gradient header
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
  ArrowRight,
  Home,
  Info,
  BookOpen,
  Camera,
  Bell,
  Phone,
  Download,
  Check,
} from "lucide-react";
import { SCHOOL, NAV_ITEMS } from "@/const";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5" />,
  Info: <Info className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
  Camera: <Camera className="h-5 w-5" />,
  Bell: <Bell className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
};

export default function Header() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { canInstall, isInstalled, promptInstall } = usePWAInstall();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleApplyClick = () => {
    setOpen(false);
    setLocation("/apply");
  };

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <header
      data-no-translate
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-md shadow-[0_4px_30px_rgba(7,28,56,0.08)] py-2"
          : "bg-white py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group navbar-brand-hover no-underline min-w-0 flex-1 sm:flex-none"
        >
          <span className="logo-container">
            <span className="logo-bg-ring" />
            <span className="logo-particle" />
            <span className="logo-particle" />
            <span className="logo-particle" />
            <img src={SCHOOL.logo} alt="Shree Bhuwaneshwori crest" />
          </span>
          <div className="hidden sm:flex flex-col leading-tight">
            <span
              className="font-display font-extrabold tracking-wide text-[var(--color-navy)] text-[18px] lg:text-[22px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("BHUWANESHWORI")}
            </span>
            <span className="text-[10.5px] lg:text-[11.5px] font-bold tracking-[0.18em] text-[var(--color-gold)] uppercase">
              {t("Secondary School")}
            </span>
          </div>
          <div className="sm:hidden flex min-w-0 max-w-[calc(100vw-132px)] flex-col leading-tight">
            <span
              className="truncate font-extrabold text-[var(--color-navy)] text-[13px] tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("BHUWANESHWORI")}
            </span>
            <span className="truncate text-[8px] font-bold tracking-[0.12em] text-[var(--color-gold)] uppercase mt-0.5">
              {t("Secondary School")}
            </span>
          </div>
        </Link>

        {/* Right side: Desktop nav + CTA */}
        <div className="hidden xl:flex items-center gap-5 shrink-0">
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                data-active={isActive(item.href) ? "true" : "false"}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
          <LanguageToggle />
          <Link href="/apply" className="btn-cta no-underline">
            {t("Apply Now")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(true)}
          aria-label={t("Open navigation")}
          className="xl:hidden inline-flex h-10 w-11 items-center justify-center rounded-xl text-[var(--color-navy)] border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md transition shrink-0"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>
      </div>

      {/* ===== MOBILE SIDEBAR (avnss.edu.np style - LEFT sliding) ===== */}
      <div
        className={`mobile-sidebar-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`mobile-sidebar ${open ? "open" : ""}`}>
        {/* Gradient Header */}
        <div className="sidebar-header">
          <div className="flex items-center gap-3">
            <span className="logo-container" style={{ width: 38, height: 38 }}>
              <span className="logo-bg-ring" />
              <img
                src={SCHOOL.logo}
                alt=""
                style={{ height: 32, width: 32, borderRadius: "50%", background: "white", objectFit: "contain" }}
              />
            </span>
            <div className="leading-tight">
              <div className="font-extrabold text-[14px] text-white" style={{ fontFamily: "var(--font-display)" }}>
                {t("BHUWANESHWORI")}
              </div>
              <div className="text-[8px] font-bold tracking-widest uppercase text-white/80">
                {t("Secondary School")}
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label={t("Close navigation")}
            className="sidebar-close-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links with Icons */}
        <div className="sidebar-body flex flex-col">
          <div className="sidebar-body-inner flex flex-col">
            <ul className="sidebar-nav">
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.href}
                  style={{ transitionDelay: `${(index + 1) * 0.025}s` }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`sidebar-nav-link ${isActive(item.href) ? "active" : ""}`}
                  >
                    <span className="sidebar-nav-icon">
                      {iconMap[item.icon] || <Home className="h-5 w-5" />}
                    </span>
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mobile-sidebar-actions">
              <LanguageToggle compact className="w-full justify-center" />
              {isInstalled ? (
                <div className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50/60 text-emerald-700 border border-emerald-100/60 text-[11px] font-bold">
                  <Check className="h-3.5 w-3.5" /> {t("App Installed")}
                </div>
              ) : canInstall ? (
                <button
                  onClick={async () => {
                    await promptInstall();
                    setOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold hover:from-amber-600 hover:to-amber-700 shadow-sm active:scale-[0.98] transition-all duration-200"
                >
                  <Download className="h-3.5 w-3.5" /> {t("Download")}
                </button>
              ) : null}
              <button onClick={handleApplyClick} className="btn-cta w-full justify-center py-2.5 text-[11px]">
                {t("Apply Now")} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}
