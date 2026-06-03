/*
 * Header — sticky navbar matching avnss.edu.np visuals + wpa-edu-np.vercel.app navigation style.
 * - Clean compact logo lockup
 * - Clean nav links with gradient underline (wpa style)
 * - Apply Now (gradient-pill CTA)
 * - Full-page left-sliding mobile sidebar (avnss style) with icons, staggered animations, gradient header
 */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  ChevronDown,
  ExternalLink,
  Users,
} from "lucide-react";
import { SCHOOL, NAV_ITEMS } from "@/const";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5" />,
  Info: <Info className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
  Camera: <Camera className="h-5 w-5" />,
  Bell: <Bell className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  ExternalLink: <ExternalLink className="h-5 w-5" />,
};

const NAV_LOGO = "/radiant-assets/logo.png";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const { canInstall, isInstalled, promptInstall } = usePWAInstall();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  // Contain scroll bounce without changing the document scroll container.
  useEffect(() => {
    document.body.style.overscrollBehavior = open ? "contain" : "";
    document.documentElement.style.overscrollBehavior = open ? "contain" : "";
    if (!open) setExpandedMobileItem(null);
    return () => {
      document.body.style.overscrollBehavior = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, [open]);

  const handleApplyClick = () => {
    setOpen(false);
    setLocation("/apply");
  };

  const isActive = (href: string) => {
    if (href === "#") return false;
    const path = href.split("#")[0];
    return path === "/" ? location === "/" : location.startsWith(path);
  };

  const mobileNavigation = (
    <>
      <div
        className={`mobile-sidebar-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`mobile-sidebar ${open ? "open" : ""}`}>
        {/* Gradient Header */}
        <div className="sidebar-header">
          <div className="flex items-center gap-3">
            <span className="logo-container" style={{ width: 38, height: 38 }}>
              <img
                src={NAV_LOGO}
                alt=""
                style={{ height: 34, width: 34, borderRadius: "8px", background: "white", objectFit: "contain", objectPosition: "center" }}
              />
            </span>
            <div className="leading-tight">
              <div className="font-extrabold text-[14px] text-white" style={{ fontFamily: "var(--font-display)" }}>
                {t("RADIANT")}
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
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="sidebar-nav-link"
                    >
                      <span className="sidebar-nav-icon">
                        {iconMap[item.icon] || <Home className="h-5 w-5" />}
                      </span>
                      {t(item.label)}
                    </a>
                  ) : (
                    <>
                      {item.children?.length ? (
                        <button
                          type="button"
                          className={`sidebar-nav-link sidebar-nav-parent ${
                            item.children.some((child) => isActive(child.href)) ? "active" : ""
                          }`}
                          aria-expanded={expandedMobileItem === item.href}
                          onClick={() =>
                            setExpandedMobileItem((current) =>
                              current === item.href ? null : item.href,
                            )
                          }
                        >
                          <span className="sidebar-nav-icon">
                            {iconMap[item.icon] || <Home className="h-5 w-5" />}
                          </span>
                          <span className="flex-1 text-left">{t(item.label)}</span>
                          <ChevronDown className="sidebar-nav-caret h-4 w-4 text-current opacity-60" />
                        </button>
                      ) : (
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
                      )}
                      {item.children?.length && expandedMobileItem === item.href ? (
                        <div className="sidebar-subnav">
                          {item.children.map((child) =>
                            child.external ? (
                              <a
                                key={child.href}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                                className={`sidebar-subnav-link ${isActive(child.href) ? "active" : ""}`}
                              >
                                {t(child.label)}
                              </a>
                            ) : (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className={`sidebar-subnav-link ${isActive(child.href) ? "active" : ""}`}
                              >
                                {t(child.label)}
                              </Link>
                            ),
                          )}
                        </div>
                      ) : null}
                    </>
                  )}
                </li>
              ))}
            </ul>

            <div className="mobile-sidebar-actions">
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
    </>
  );

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
          aria-label={t("Radiant Secondary School home")}
          className="brand-lockup flex items-center gap-3 group navbar-brand-hover no-underline min-w-0 flex-1 sm:flex-none"
        >
          <span className="logo-container">
            <img src={NAV_LOGO} alt="School crest" />
          </span>
          <div className="hidden sm:flex flex-col leading-tight">
            <span
              className="font-display font-extrabold tracking-wide text-[var(--color-navy)] text-[18px] lg:text-[22px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("RADIANT")}
            </span>
            <span className="text-[10.5px] lg:text-[11.5px] font-bold tracking-[0.18em] text-[var(--color-gold-deep)] uppercase">
              {t("Secondary School")}
            </span>
          </div>
          <div className="sm:hidden flex min-w-0 max-w-[calc(100vw-132px)] flex-col leading-tight">
            <span
              className="truncate font-extrabold text-[var(--color-navy)] text-[13px] tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("RADIANT")}
            </span>
            <span className="truncate text-[8px] font-bold tracking-[0.12em] text-[var(--color-gold-deep)] uppercase mt-0.5">
              {t("Secondary School")}
            </span>
          </div>
        </Link>

        {/* Right side: Desktop nav + CTA */}
        <div className="hidden xl:flex items-center gap-5 shrink-0">
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active =
                !item.external &&
                (isActive(item.href) ||
                  item.children?.some((child) => isActive(child.href)));

              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                    data-active="false"
                  >
                    {t(item.label)}
                  </a>
                );
              }

              if (item.children?.length) {
                return (
                  <div key={item.href} className="relative group">
                    <button
                      type="button"
                      className="nav-link gap-1.5"
                      data-active={active ? "true" : "false"}
                    >
                      {t(item.label)}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-200">
                      <div className="min-w-[230px] rounded-xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-900/10">
                        {item.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.href}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2.5 text-[12px] font-bold tracking-[0.08em] text-slate-600 hover:bg-slate-50 hover:text-[var(--color-navy)]"
                            >
                              {t(child.label)}
                            </a>
                          ) : (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-[12px] font-bold tracking-[0.08em] text-slate-600 hover:bg-slate-50 hover:text-[var(--color-navy)]"
                            >
                              {t(child.label)}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  data-active={active ? "true" : "false"}
                >
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>
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

      {portalReady ? createPortal(mobileNavigation, document.body) : mobileNavigation}
    </header>
  );
}
