import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  HeartHandshake,
  Mountain,
  Quote,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { ASSETS, LEADERSHIP, SCHOOL } from "@/const";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

type SubTab = "story" | "messages";

export default function About() {
  const [active, setActive] = useState<SubTab>("story");
  const storyRef = useRef<HTMLElement>(null);
  const messagesRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  // Sub-nav active state via scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.section;
            if (id === "story" || id === "messages") setActive(id as SubTab);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    if (storyRef.current) observer.observe(storyRef.current);
    if (messagesRef.current) observer.observe(messagesRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: SubTab) => {
    const el = id === "story" ? storyRef.current : messagesRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top, behavior: "smooth" });
    setActive(id);
  };

  const galleryItems = [
    { src: ASSETS.hero, caption: "Morning Assembly" },
    { src: ASSETS.classroom, caption: "Classroom Learning" },
    { src: ASSETS.activity, caption: "Cultural Programme" },
    { src: ASSETS.campus, caption: "School Campus" },
    { src: ASSETS.hero, caption: "Student Life" },
    { src: ASSETS.classroom, caption: "Focused Study" },
  ];

  return (
    <>
      {/* ====================  HERO  ==================== */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${ASSETS.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.22,
            mixBlendMode: "overlay",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(197,155,39,0.20) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(30,95,160,0.30) 0%, transparent 55%)",
          }}
        />

        <div className="container relative z-10 py-20 sm:py-24 md:py-32 lg:py-36 text-center">
          <span className="eyebrow-pill anim-fade-up">
            <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
            {t("Estd.")} {t(SCHOOL.established)} · {t("Bedkot-6")}
          </span>
          <h1
            className="text-white mt-6 anim-fade-up font-display font-extrabold"
            style={{
              fontSize: "clamp(2.1rem, 1.4rem + 3.6vw, 4.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              animationDelay: "80ms",
            }}
          >
            {t("About")} <span className="text-shimmer" style={{ backgroundSize: "200% 100%" }}>{t("BHUWANESHWORI")}</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-white/85 anim-fade-up"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.98rem, 0.88rem + 0.4vw, 1.125rem)",
              lineHeight: 1.65,
              animationDelay: "160ms",
            }}
          >
            {t("A community-rooted secondary school in Shishaiya, Bedkot Municipality-6 — shaped by community trust, practical learning, and the belief that students grow best when academics and character move together.")}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-3 anim-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <button onClick={() => scrollTo("story")} className="btn-gold shine">
              {t("Our Story")} <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollTo("messages")}
              className="btn-ghost"
              style={{
                background: "transparent",
                color: "white",
                borderColor: "rgba(255,255,255,0.35)",
              }}
            >
              <Quote className="h-4 w-4" />
              {t("Messages")}
            </button>
          </div>
        </div>

        {/* Curved bottom transition */}
        <svg
          className="absolute bottom-[-1px] left-0 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: "60px", display: "block" }}
          aria-hidden
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fafbfc" />
        </svg>
      </section>

      {/* ====================  STICKY SUB-NAV  ==================== */}
      <nav
        className="sticky z-40 backdrop-blur-md border-b border-slate-200/70"
        style={{
          top: "var(--header-h, 70px)",
          background: "rgba(250, 251, 252, 0.92)",
        }}
      >
        <div className="container flex items-center gap-2 sm:gap-3 h-14 sm:h-16 overflow-x-auto no-scrollbar">
          <span className="hidden md:inline-flex items-center gap-2 shrink-0 text-[10px] uppercase tracking-[0.22em] font-bold text-[var(--color-navy)]/55">
            <span className="h-px w-6 bg-[var(--color-gold)]/70" />
            About
          </span>
          <button
            onClick={() => scrollTo("story")}
            data-active={active === "story"}
            className="subtab"
          >
            <span className="subtab-dot" />
            Our Story
          </button>
          <button
            onClick={() => scrollTo("messages")}
            data-active={active === "messages"}
            className="subtab"
          >
            <span className="subtab-dot" />
            Messages
          </button>
          <span className="ml-auto hidden lg:inline text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)] font-bold shrink-0">
            Shree Bhuwaneshwori Secondary School
          </span>
        </div>
      </nav>

      {/* ====================  01 OUR STORY  ==================== */}
      <section ref={storyRef} data-section="story" className="anchor-offset">
        {/* Section eyebrow */}
        <div className="container pt-16 md:pt-24">
          <div className="flex flex-row justify-center lg:justify-start items-center gap-4 anim-fade-up">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] font-bold text-[var(--color-gold)]">
              <span className="h-px w-10 bg-[var(--color-gold)]" />
              Section 01
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--color-navy)]/60">
              Our Story
            </span>
          </div>
        </div>

        {/* Founding story (text + sticky image) */}
        <div className="container py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 reveal-left">
              <span className="eyebrow-left">A Brief History</span>
              <h2 className="section-heading mt-5">
                Built from{" "}
                <em
                  style={{
                    color: "var(--color-gold)",
                    fontStyle: "italic",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  community trust
                </em>
                , carried forward by students.
              </h2>
              <p className="section-lead mt-7">
                {t("Shree Bhuwaneshwori Secondary School was established in 2036 B.S. (1979 A.D.) with a clear promise: to provide dependable, character-rich education for the families of Shishaiya and the wider Bedkot Municipality. What began as a modest village school has grown, over four decades, into a trusted secondary institution where generations of Sudurpashchim students have found their footing.")}
              </p>
              <p className="section-lead mt-5">
                {t("Our school culture combines classroom discipline with the warmth of a close community. Students learn through lectures, projects, presentations, sports, picnics, and cultural programmes that help them become capable, cooperative, and responsible young people. The school takes its name — and its spirit — from the goddess Bhuwaneshwori, whose presence on our crest reminds us that knowledge, when offered as service, is its own form of devotion.")}
              </p>

              {/* Quick facts */}
              <div className="mt-9 grid sm:grid-cols-3 gap-4">
                {[
                  { k: "Established", v: SCHOOL.established },
                  { k: "Location", v: "Bedkot-6, Kanchanpur" },
                  { k: "Levels", v: "Grades 1 — 10" },
                ].map((it) => (
                  <div
                    key={it.k}
                    className="px-5 py-4 rounded-2xl bg-white border hover-lift"
                    style={{ borderColor: "#eef2f6" }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 10.5,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        fontWeight: 700,
                      }}
                    >
                      {t(it.k)}
                    </div>
                    <div
                      className="mt-1.5"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        color: "var(--color-navy)",
                        fontSize: 17,
                        lineHeight: 1.25,
                      }}
                    >
                      {t(it.v)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-44 reveal-right">
              <div className="relative">
                <div className="image-frame hover-zoom">
                  <img
                    src={ASSETS.campus}
                    alt="Bhuwaneshwori School campus"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 left-4 right-4 sm:-left-6 sm:right-auto sm:max-w-[260px] soft-card p-5 hover-lift">
                  <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[var(--color-gold)]">
                    Bedkot-6 · Kanchanpur
                  </div>
                  <div
                    className="mt-2 leading-snug"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: "#475569",
                    }}
                  >
                    Shishaiya village — a school home for learners across
                    Sudurpashchim Province.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="relative py-16 md:py-24 bg-white border-y border-slate-200/60">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <span className="eyebrow-pill">Direction</span>
              <h3 className="section-title mt-5">Vision & Mission</h3>
              <p
                className="mt-5 mx-auto"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "#64748b",
                  fontSize: "1.0625rem",
                  lineHeight: 1.65,
                  maxWidth: "60ch",
                }}
              >
                Our direction is shaped by what we see in daily life: students
                learning, teachers guiding, and activities that quietly build
                confidence.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 stagger reveal">
              {[
                {
                  icon: Compass,
                  title: "Vision",
                  body:
                    "To develop confident, capable, and responsible learners who can pursue higher education, serve society, and lead with integrity in a changing world.",
                },
                {
                  icon: HeartHandshake,
                  title: "Mission",
                  body:
                    "To provide quality, student-centred education through dedicated teaching, practical activities, moral guidance, and a steady partnership among school, students, and guardians.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="soft-card p-7 md:p-9 hover-lift relative overflow-hidden group"
                >
                  <div
                    className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full group-hover:h-[5px] transition-all duration-300"
                    style={{ background: "var(--gradient-gold)" }}
                  />
                  <div
                    className="h-12 w-12 rounded-2xl inline-flex items-center justify-center group-hover:bg-gradient-gold group-hover:text-white transition-all duration-300"
                    style={{ background: "rgba(197,155,39,0.12)" }}
                  >
                    <Icon className="h-6 w-6 text-secondary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4
                    className="mt-5 group-hover:text-secondary transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      fontSize: "clamp(1.4rem, 1rem + 1.2vw, 1.85rem)",
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "#475569",
                      fontSize: "1rem",
                    }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <span className="eyebrow-pill">Objectives</span>
              <h3 className="section-title mt-5">Guiding Objectives</h3>
              <p
                className="mt-5 mx-auto"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "#64748b",
                  fontSize: "1.0625rem",
                  lineHeight: 1.65,
                  maxWidth: "60ch",
                }}
              >
                Goals that connect academic work with the everyday culture
                visible across our campus.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 stagger reveal">
              {[
                {
                  n: "01",
                  icon: Mountain,
                  title: "Disciplined Character",
                  body:
                    "Punctuality, respectful conduct, self-belief, and responsibility — without losing warmth or dignity.",
                },
                {
                  n: "02",
                  icon: BookOpen,
                  title: "Academic Foundations",
                  body:
                    "Dependable secondary teaching across science, mathematics, language, and social sciences toward SEE success.",
                },
                {
                  n: "03",
                  icon: Sparkles,
                  title: "Practical Learning",
                  body:
                    "Projects, presentations, field exposure, sports, and cultural activities so knowledge becomes usable in real life.",
                },
                {
                  n: "04",
                  icon: Users,
                  title: "Care for Every Learner",
                  body:
                    "Close teacher–student relationships so each student is noticed, guided, corrected, and encouraged.",
                },
              ].map(({ n, icon: Icon, title, body }) => (
                <div
                  key={n}
                  className="soft-card p-6 md:p-7 hover-lift group"
                >
                  <div className="flex items-center justify-between">
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "2rem",
                        color: "var(--color-gold)",
                        opacity: 0.9,
                        lineHeight: 1,
                      }}
                    >
                      {n}
                    </div>
                    <div
                      className="h-10 w-10 rounded-full inline-flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      style={{ background: "rgba(10,59,117,0.08)" }}
                    >
                      <Icon className="h-5 w-5 text-[var(--color-navy)] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <h4
                    className="mt-4 group-hover:text-secondary transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      fontSize: "1.2rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    className="mt-2.5"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "#64748b",
                      fontSize: "14.5px",
                      lineHeight: 1.65,
                    }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================  ACHIEVEMENTS (Animated Counter)  ==================== */}
      <section className="stats">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <span
              className="eyebrow-pill"
              style={{
                color: "var(--color-gold-soft)",
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.18)",
              }}
            >
              <Trophy className="h-3 w-3" />
              {t("Our Achievements")}
            </span>
            <h3 className="section-title text-white mt-5">
              {t("Four decades of community impact")}
            </h3>
            <p
              className="mt-5 mx-auto"
              style={{
                color: "rgba(255,255,255,0.78)",
                fontFamily: "var(--font-sans)",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                maxWidth: "62ch",
              }}
            >
              {t("Each number reflects a quiet daily commitment from teachers, students, and guardians.")}
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-item hover:scale-105 transition-transform duration-300">
              <div className="stat-icon">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="stat-number">
                <AnimatedCounter value={45} suffix="+" />
              </div>
              <p>{t("Years of Service")}</p>
            </div>

            <div className="stat-item hover:scale-105 transition-transform duration-300">
              <div className="stat-icon">
                <Users className="h-6 w-6" />
              </div>
              <div className="stat-number">
                <AnimatedCounter value={1200} suffix="+" />
              </div>
              <p>{t("Students Enrolled")}</p>
            </div>

            <div className="stat-item hover:scale-105 transition-transform duration-300">
              <div className="stat-icon">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="stat-number">
                <AnimatedCounter value={50} suffix="+" />
              </div>
              <p>{t("Faculty & Staff")}</p>
            </div>

            <div className="stat-item hover:scale-105 transition-transform duration-300">
              <div className="stat-icon">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="stat-number">
                <AnimatedCounter value={12} suffix="" />
              </div>
              <p>{t("Class Levels")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================  GALLERY MARQUEE  ==================== */}
      <section className="gallery-slider-section">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow-pill">{t("Campus Life")}</span>
            <h3 className="section-title mt-5">{t("A Living Campus")}</h3>
            <p
              className="mt-5 mx-auto"
              style={{
                fontFamily: "var(--font-sans)",
                color: "#64748b",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                maxWidth: "55ch",
              }}
            >
              {t("Glimpses of student life — focused classrooms, cultural celebration, and the everyday rhythm of community learning.")}
            </p>
          </div>
        </div>
        <div className="gallery-slider-wrapper">
          <div className="gallery-slider">
            {[...galleryItems, ...galleryItems].map((g, i) => (
              <div key={i} className="gallery-slide">
                <img src={g.src} alt={g.caption} loading="lazy" />
                <div className="gallery-caption">{g.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================  02 MESSAGES  ==================== */}
      <section
        ref={messagesRef}
        data-section="messages"
        className="anchor-offset"
        style={{ background: "#f5f8fc" }}
      >
        <div className="container pt-20 md:pt-24">
          <div className="flex items-center gap-4 anim-fade-up">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] font-bold text-[var(--color-gold)]">
              <span className="h-px w-10 bg-[var(--color-gold)]" />
              {t("Section 02")}
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--color-navy)]/60">
              {t("Messages")}
            </span>
          </div>
        </div>

        <div className="container py-10 md:py-14">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow-pill">{t("Leadership")}</span>
            <h3 className="section-title mt-5">{t("From Our Leadership")}</h3>
            <p
              className="mt-5 mx-auto"
              style={{
                fontFamily: "var(--font-sans)",
                color: "#64748b",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                maxWidth: "60ch",
              }}
            >
              {t("Words from those who steward Bhuwaneshwori — reflecting the values and steady commitment that move the school forward each day.")}
            </p>
          </div>

          {/* Principal — featured */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center reveal">
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative h-full">
                <div className="image-frame hover-zoom h-full">
                  <img
                    src={LEADERSHIP.principal.image}
                    alt={LEADERSHIP.principal.name}
                    className="w-full object-cover"
                    style={{ objectPosition: "center 18%", aspectRatio: "4/5", minHeight: 360 }}
                  />
                </div>
                <div
                  className="absolute -bottom-5 right-4 sm:-right-5 px-5 py-3 rounded-full shadow-lg text-white"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] font-bold">
                    {t("Principal")}
                  </div>
                </div>
                <div
                  className="absolute -top-4 -left-4 hidden md:block h-24 w-24 rounded-3xl -z-10"
                  style={{ background: "rgba(197,155,39,0.18)" }}
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="leadership-quote-card">
                <div className="leadership-quote-mark">
                  <Quote className="h-6 w-6" />
                </div>
              <blockquote
                className="text-[var(--color-navy)] font-medium"
                style={{
                  fontFamily: "var(--font-quote)",
                  fontSize: "clamp(1.05rem, 0.92rem + 0.7vw, 1.42rem)",
                  lineHeight: 1.72,
                }}
              >
                “{t(LEADERSHIP.principal.quote)}”
              </blockquote>
              <div className="leadership-person-row">
                <div
                  className="h-px w-12 shrink-0"
                  style={{ background: "var(--color-gold)" }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      fontSize: "1.4rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {t(LEADERSHIP.principal.name)}
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      fontWeight: 700,
                    }}
                  >
                    {t(LEADERSHIP.principal.role)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>

          {/* VP & Admin */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 stagger reveal">
            {[LEADERSHIP.vicePrincipal, LEADERSHIP.administrator].map((p) => (
              <article
                key={p.name}
                className="soft-card p-7 md:p-9 hover-lift relative overflow-hidden group"
              >
                <div
                  className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full group-hover:h-[5px] transition-all duration-300"
                  style={{ background: "var(--gradient-gold)" }}
                />
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
                      style={{ objectPosition: "center 18%" }}
                    />
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: "0 0 0 2px var(--color-gold), 0 0 0 6px white",
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        color: "var(--color-navy)",
                        fontSize: "1.2rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {t(p.name)}
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 11,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        fontWeight: 700,
                      }}
                    >
                      {t(p.role)}
                    </div>
                  </div>
                </div>
                <Quote
                  className="h-6 w-6 mt-6 text-secondary"
                />
                <p
                  className="mt-2 text-primary font-medium"
                  style={{
                    fontFamily: "var(--font-quote)",
                    fontSize: "1.05rem",
                    lineHeight: 1.65,
                  }}
                >
                  “{t(p.quote)}”
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative py-16 md:py-24 mt-14 md:mt-20 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${ASSETS.hero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.18,
            }}
          />
          <div className="container relative text-center">
            <span
              className="eyebrow-pill"
              style={{
                color: "var(--color-gold-soft)",
                background: "rgba(197,155,39,0.12)",
                borderColor: "rgba(197,155,39,0.30)",
              }}
            >
              Shree Bhuwaneshwori
            </span>
            <h2
              className="text-white mt-5 mx-auto max-w-2xl font-display font-extrabold"
              style={{
                fontSize: "clamp(1.7rem, 1.2rem + 2vw, 2.85rem)",
                lineHeight: 1.2,
              }}
            >
              Begin a confident academic journey in Bedkot.
            </h2>
            <div
              className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-white/80"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span>Shishaiya, Bedkot-6</span>
              <span style={{ color: "var(--color-gold-soft)" }}>·</span>
              <span>Established 2036 BS</span>
              <span style={{ color: "var(--color-gold-soft)" }}>·</span>
              <span>Discipline · Knowledge · Service</span>
            </div>
            <a
              href={`tel:${SCHOOL.contact.replace(/\s/g, "")}`}
              className="btn-gold mt-8 shine"
            >
              Admission Enquiry <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
