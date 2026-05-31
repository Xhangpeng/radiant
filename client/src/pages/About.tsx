import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Library,
  Medal,
  Microscope,
  Quote,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { ASSETS, LEADERSHIP, SCHOOL } from "@/const";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

const quickFacts = [
  { label: "Established", value: SCHOOL.established, icon: Award },
  { label: "Students", value: "1300+", icon: Users },
  { label: "Programs", value: "PG to XII", icon: GraduationCap },
  { label: "Streams", value: "Science & Management", icon: BookOpen },
];

const strengths = [
  {
    title: "Dedicated Faculty",
    body: "Experienced teachers guide students through structured lessons, regular feedback, and personal academic care.",
    icon: Users,
  },
  {
    title: "Science & Computer Labs",
    body: "Practical learning is supported through laboratory work, multimedia classes, and technology-based practice.",
    icon: Microscope,
  },
  {
    title: "Value-Based Schooling",
    body: "Radiant joins academic progress with discipline, confidence, moral responsibility, and public-minded character.",
    icon: HeartHandshake,
  },
  {
    title: "Modern Learning Culture",
    body: "Project work, counselling, library reading, activities, and tours help students learn beyond textbooks.",
    icon: Library,
  },
];

const milestones = [
  "Founded by experienced academicians in Mahendranagar in 2057 B.S.",
  "Started strong Ten Plus Two Science and Management programs.",
  "Expanded school-level classes from Play Group to Grade 10 in 2073 B.S.",
  "Now serves learners from pre-school to Grade XII in Bheemdatt-18.",
];

const values = [
  "Quality education",
  "Confidence building",
  "Character formation",
  "Guardian partnership",
  "Practical exposure",
  "Career readiness",
];

export default function About() {
  const { t } = useLanguage();

  return (
    <>
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
            opacity: 0.24,
            mixBlendMode: "overlay",
          }}
        />

        <div className="container relative z-10 py-20 sm:py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow-pill anim-fade-up">
                <Sparkles className="h-3 w-3 text-secondary" />
                {t("About Radiant Secondary School")}
              </span>
              <h1
                className="text-white mt-6 anim-fade-up font-display font-extrabold"
                style={{
                  fontSize: "clamp(2.15rem, 1.35rem + 3.8vw, 4.85rem)",
                  lineHeight: 1.04,
                  animationDelay: "80ms",
                }}
              >
                {t("Quality education with confidence and character.")}
              </h1>
              <p
                className="mt-6 max-w-2xl text-white/84 anim-fade-up"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1rem, 0.92rem + 0.45vw, 1.18rem)",
                  lineHeight: 1.7,
                  animationDelay: "150ms",
                }}
              >
                {t(
                  "Radiant Secondary School is a community-rooted academic institution in Bheemdatt Municipality-18, Mahendranagar. The school blends clear academic pathways, disciplined routines, practical exposure, and close guidance so students can grow with confidence.",
                )}
              </p>
              <div className="mt-9 flex flex-wrap gap-3 anim-fade-up" style={{ animationDelay: "220ms" }}>
                <a href="/courses" className="btn-gold shine">
                  {t("Explore Programs")} <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="btn-ghost"
                  style={{
                    background: "transparent",
                    color: "white",
                    borderColor: "rgba(255,255,255,0.35)",
                  }}
                >
                  {t("Contact School")}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 anim-fade-up" style={{ animationDelay: "260ms" }}>
              <div className="grid grid-cols-2 gap-4">
                {quickFacts.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md"
                  >
                    <Icon className="h-6 w-6 text-[var(--color-gold-soft)]" />
                    <div className="mt-4 text-2xl font-bold text-white font-display">{t(value)}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/65 font-bold">
                      {t(label)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="image-frame hover-zoom">
                <img
                  src={ASSETS.campus}
                  alt="Radiant Secondary School campus"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="eyebrow-left">{t("Our Identity")}</span>
              <h2 className="section-heading mt-5">
                {t("A complete academic home from early learning to Grade XII.")}
              </h2>
              <p className="section-lead mt-7">
                {t(
                  "Radiant Secondary School was founded in 2057 B.S. by highly experienced and dedicated academicians. The institution grew through its strong Plus Two Science and Management programs and later expanded school-level classes from Play Group to Grade 10.",
                )}
              </p>
              <p className="section-lead mt-5">
                {t(
                  "Today, Radiant combines structured academics, caring mentorship, practical exposure, labs, library learning, sports, cultural activities, and guardian partnership to support around 1300 students across Mahendranagar and nearby communities.",
                )}
              </p>

              <div className="mt-9 grid gap-4">
                {milestones.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <p className="text-slate-700 leading-relaxed">{t(item)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white border-y border-slate-200/70">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow-pill">{t("Why Radiant")}</span>
            <h2 className="section-title mt-5">{t("What Makes the School Strong")}</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              {t(
                "The school experience is organized around academics, discipline, exposure, and care so students can progress confidently at every level.",
              )}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {strengths.map(({ title, body, icon: Icon }) => (
              <article key={title} className="soft-card p-6 hover-lift">
                <div
                  className="h-12 w-12 rounded-2xl inline-flex items-center justify-center"
                  style={{ background: "rgba(197,155,39,0.12)" }}
                >
                  <Icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[var(--color-navy)]">
                  {t(title)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t(body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-6 soft-card p-7 md:p-9 hover-lift">
              <Compass className="h-8 w-8 text-secondary" />
              <h2 className="mt-5 section-title text-left">{t("Vision")}</h2>
              <p className="mt-4 text-slate-600 leading-8">
                {t(
                  "To produce world-class citizens with leadership capacity, strong moral values, and the confidence to meet the demands of the 21st century.",
                )}
              </p>
            </div>
            <div className="lg:col-span-6 soft-card p-7 md:p-9 hover-lift">
              <Building2 className="h-8 w-8 text-secondary" />
              <h2 className="mt-5 section-title text-left">{t("Mission")}</h2>
              <p className="mt-4 text-slate-600 leading-8">
                {t(
                  "To develop creative, critical, and practical learners through quality teaching, modern facilities, regular evaluation, and close school-family coordination.",
                )}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="flex flex-wrap gap-3">
              {values.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-[var(--color-navy)]"
                >
                  <Medal className="h-4 w-4 text-secondary" />
                  {t(value)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              {t("Radiant in Numbers")}
            </span>
            <h2 className="section-title text-white mt-5">{t("Growing with Mahendranagar")}</h2>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">
                <AnimatedCounter value={2057} suffix=" B.S." />
              </div>
              <p>{t("Established")}</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <AnimatedCounter value={1300} suffix="+" />
              </div>
              <p>{t("Students")}</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <AnimatedCounter value={50} suffix="+" />
              </div>
              <p>{t("Faculty & Staff")}</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <AnimatedCounter value={12} suffix="" />
              </div>
              <p>{t("Class Levels")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#f5f8fc]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="image-frame hover-zoom">
                <img
                  src={LEADERSHIP.principal.image}
                  alt={LEADERSHIP.principal.name}
                  className="w-full aspect-[4/5] object-cover"
                  style={{ objectPosition: "center 18%" }}
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="eyebrow-left">{t("Leadership Message")}</span>
              <div className="leadership-quote-card mt-6">
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
                  "{t(LEADERSHIP.principal.quote)}"
                </blockquote>
                <div className="leadership-person-row">
                  <div className="h-px w-12 shrink-0" style={{ background: "var(--color-gold)" }} />
                  <div>
                    <div className="font-display text-2xl font-bold text-[var(--color-navy)]">
                      {t(LEADERSHIP.principal.name)}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-secondary font-bold">
                      {t(LEADERSHIP.principal.role)}
                    </div>
                  </div>
                </div>
              </div>
              <a href={`tel:${SCHOOL.contact.replace(/\s/g, "")}`} className="btn-gold mt-8 shine">
                {t("Admission Enquiry")} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
