import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  Compass,
  GraduationCap,
  HeartHandshake,
  Microscope,
  Quote,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users2,
} from "lucide-react";
import { ASSETS, LEADERSHIP, SCHOOL } from "@/const";
import AnimatedCounter from "@/components/AnimatedCounter";
import FlipCard from "@/components/FlipCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* ========================  HERO SECTION  ======================== */}
      <section className="home-hero relative overflow-hidden flex items-center">
        <div aria-hidden className="absolute inset-0 home-hero-bg" />
        <div
          aria-hidden
          className="absolute inset-0 home-hero-photo"
          style={{
            backgroundImage: `url(${ASSETS.hero})`,
          }}
        />
        <div aria-hidden className="absolute inset-0 home-hero-vignette" />
        <div className="container relative z-10 py-20 sm:py-24 md:py-32 lg:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-left">
              <span className="eyebrow-pill anim-fade-up">
                <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
                Excellence in Education Since {SCHOOL.establishedAd}
              </span>

              <h1 className="home-hero-title anim-fade-up">
                Radiant Secondary School
              </h1>

              <p
                className="home-hero-lead anim-fade-up"
                style={{
                  animationDelay: "70ms",
                }}
              >
                A disciplined, caring academic community in {SCHOOL.location},
                helping students grow with quality education, confidence, and
                character from early learning to Grade XII.
              </p>

              <div
                className="home-hero-actions anim-fade-up"
                style={{ animationDelay: "110ms" }}
              >
                <Link href="/apply" className="btn-gold shine">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/courses"
                  className="btn-ghost home-hero-secondary"
                >
                  View Courses <BookOpen className="h-4 w-4" />
                </Link>
              </div>

              <div
                className="hero-proof-grid anim-fade-up"
                style={{ animationDelay: "150ms" }}
              >
                <span className="hero-proof-item">
                  <Award className="h-4 w-4 text-secondary" />
                  Est. {SCHOOL.established}
                </span>
                <span className="hero-proof-item">
                  <Building2 className="h-4 w-4 text-secondary" />
                  Mahendranagar, Kanchanpur
                </span>
                <span className="hero-proof-item">
                  <Compass className="h-4 w-4 text-secondary" />
                  Quality / Confidence / Character
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="hero-media-board relative anim-fade-up"
                style={{ animationDelay: "120ms" }}
              >
                <div className="hero-media-frame image-frame hover-zoom pulse-gold">
                  <img
                    src={ASSETS.hero}
                    alt="Radiant Secondary School campus building"
                    className="hero-media-image w-full h-[340px] sm:h-[400px] lg:h-[480px] object-cover"
                    style={{ objectPosition: "center center" }}
                  />
                </div>
                <div
                  className="hero-quick-card hero-quick-card-main hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl px-5 py-4 float-gentle border border-border"
                  style={{ boxShadow: "0 24px 50px -22px rgba(7,28,56,0.45)" }}
                >
                  <div className="hero-quick-icon">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div className="hero-quick-copy">
                    <strong>25+ Years</strong>
                    <span>Of Quality Education</span>
                  </div>
                </div>
                <div className="hero-quick-card hero-quick-card-top hidden md:flex items-center gap-3 absolute -top-5 -right-5 px-4 py-3 border">
                  <div className="hero-quick-icon hero-quick-icon-cool">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="hero-quick-copy">
                    <strong>PG-XII</strong>
                    <span>Complete Academic Path</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved Divider */}
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

      {/* ========================  WELCOME / INTRO  ======================== */}
      <section className="container py-20 md:py-28 anchor-offset" id="welcome">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 reveal-left">
            <div className="image-frame hover-zoom">
              <img
                src={ASSETS.classroom}
                alt="A classroom at Radiant"
                className="w-full h-[360px] sm:h-[440px] lg:h-[520px] object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 reveal-right">
            <span className="eyebrow-left">About Radiant</span>
            <h2 className="section-heading mt-4">
              A community-rooted school where{" "}
              <em
                style={{
                  color: "var(--color-gold)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-display)",
                }}
              >
                discipline
              </em>{" "}
              and{" "}
              <em
                style={{
                  color: "var(--color-gold)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-display)",
                }}
              >
                learning
              </em>{" "}
              grow together.
            </h2>
            <p className="section-lead mt-5">
              Established in {SCHOOL.established} ({SCHOOL.establishedAd}),
              Radiant Secondary School is a modern academic institution founded
              by experienced and dedicated academicians in 2057 B.S. It began
              with Ten Plus Two programs in Science and Management, then
              expanded school-level education from Play Group to Grade 10 in
              2073 B.S. to make quality English-medium education accessible in
              Sudurpaschim Province.
            </p>
            <p className="section-lead mt-4">
              Today RSS serves around 1300 learners from PG to Grade XII, with
              student-centred teaching, disciplined monitoring, scholarships,
              practical labs, library resources, counselling, sports, cafeteria,
              multimedia learning, and educational tours.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3.5 stagger reveal">
              {[
                { icon: <ShieldCheck className="h-4 w-4" />, label: "Safe, secure campus" },
                { icon: <Users2 className="h-4 w-4" />, label: "Caring teacher-student bond" },
                { icon: <BookOpen className="h-4 w-4" />, label: "SEE-focused academics" },
                { icon: <Trophy className="h-4 w-4" />, label: "Cultural & sports tradition" },
              ].map((it) => (
                <div
                  key={it.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border hover-lift transition"
                  style={{ borderColor: "#eef2f6" }}
                >
                  <span
                    className="w-9 h-9 rounded-lg grid place-items-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(10,59,117,0.08), rgba(197,155,39,0.14))",
                      color: "var(--color-navy)",
                    }}
                  >
                    {it.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "var(--color-ink)",
                    }}
                  >
                    {it.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-9 flex justify-center lg:justify-start">
              <Link href="/about" className="btn-cta shine">
                Read full story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================  WHY CHOOSE US  ========================= */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            "linear-gradient(180deg, #fafbfc 0%, #f5f8fc 50%, #fafbfc 100%)",
        }}
      >
        <div className="container">
          <div className="text-center max-w-2xl mx-auto reveal">
            <span className="eyebrow-pill">Why Radiant</span>
            <h2 className="section-title mt-5">Why Choose Radiant?</h2>
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
              Six everyday commitments that shape the character of every
              student who walks through our gate.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger reveal">
            {[
              {
                icon: <GraduationCap className="h-6 w-6" />,
                title: "Dedicated Faculty",
                desc:
                  "Experienced teachers who invest in each student's progress, character, and confidence - not just exam scores.",
              },
              {
                icon: <Microscope className="h-6 w-6" />,
                title: "Practical Learning",
                desc:
                  "Projects, presentations, field exposure, and lab work make knowledge usable in real life.",
              },
              {
                icon: <Trophy className="h-6 w-6" />,
                title: "SEE Track Record",
                  desc:
                  "A proven record in SEE and NEB examinations, with impressive results from the earliest batches.",
              },
              {
                icon: <HeartHandshake className="h-6 w-6" />,
                title: "Holistic Development",
                desc:
                  "Sports, music, dance, and cultural programmes that build well-rounded young people.",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "Safe Environment",
                  desc:
                  "A student-friendly, well monitored environment with clear routines and close academic guidance.",
              },
              {
                icon: <Users2 className="h-6 w-6" />,
                title: "Community Partnership",
                desc:
                  "A steady, honest partnership between teachers, students, and guardians every single morning.",
              },
            ].map((f) => (
              <div key={f.title} className="feature-card hover-lift group">
                <div className="feature-icon group-hover:bg-gradient-gold group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="group-hover:text-secondary transition-colors duration-300">{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================  PROGRAMS (Interactive Flip Cards)  ========================= */}
      <section className="container py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center lg:items-end mb-12 reveal text-center lg:text-left">
          <div className="lg:col-span-7">
            <span className="eyebrow-left">Academic Levels</span>
            <h2 className="section-heading mt-4">
              Programs that meet students where they are.
            </h2>
          </div>
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <p className="section-lead">
              From the early grades through the SEE board, our academic ladder
              is designed to grow alongside each child slowly, surely, and with
              real teacher attention at every step.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger reveal">
          <FlipCard
            title="Primary Level"
            subtitle="Grades 1 - 5"
            icon={<BookOpen className="h-6 w-6 text-secondary" />}
            frontContent="Foundational literacy, numeracy, and habit-building in a warm, structured environment."
            backContent={
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2">- Basic English & Nepali Literacy</li>
                <li className="flex items-center gap-2">- Fun Mathematics Foundations</li>
                <li className="flex items-center gap-2">- Creative Arts & Social Habits</li>
                <li className="flex items-center gap-2">- Individual Attention & Care</li>
              </ul>
            }
            colorClass="bg-[var(--color-navy-deep)] text-white"
          />

          <FlipCard
            title="Lower Secondary"
            subtitle="Grades 6 - 8"
            icon={<Microscope className="h-6 w-6 text-secondary" />}
            frontContent="Strengthening core subjects with hands-on activities, projects, and growing responsibility."
            backContent={
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2">- Integrated Science & Tech</li>
                <li className="flex items-center gap-2">- Advanced Math & Social Studies</li>
                <li className="flex items-center gap-2">- Language & Writing Workshops</li>
                <li className="flex items-center gap-2">- Group Projects & Field Trips</li>
              </ul>
            }
            colorClass="bg-[var(--color-navy-deep)] text-white"
          />

          <FlipCard
            title="Secondary Level"
            subtitle="Grades 9 - 10 / SEE"
            icon={<Trophy className="h-6 w-6 text-secondary" />}
            frontContent="Focused, exam-ready preparation across science, mathematics, language, and social studies."
            backContent={
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2">- Dedicated SEE Prep Classes</li>
                <li className="flex items-center gap-2">- Practical Science & Computer Labs</li>
                <li className="flex items-center gap-2">- Mock Exams & Detailed Feedback</li>
                <li className="flex items-center gap-2">- Career & Stream Counselling</li>
              </ul>
            }
            colorClass="bg-[var(--color-navy-deep)] text-white"
          />
        </div>
      </section>

      {/* =========================  NOTICES + PRINCIPAL  ========================= */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            "linear-gradient(180deg, #f5f8fc 0%, #fafbfc 100%)",
        }}
      >
        <div className="container grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Notices */}
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between gap-4 mb-7">
              <div>
                <span className="eyebrow-left">Notices & Events</span>
                <h2 className="section-heading mt-4">Latest from the school</h2>
              </div>
              <Link
                href="/notices"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold tracking-wide hover:text-secondary transition-colors"
                style={{ color: "var(--color-navy)" }}
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3.5 stagger reveal">
              {[
                {
                  day: "12",
                  month: "Jul",
                  tag: "Admissions",
                  title: "Admission open for academic session 2082 BS",
                  desc: "Forms available at the school office. Limited seats across Grade 1 to Grade 9.",
                },
                {
                  day: "28",
                  month: "Jun",
                  tag: "Examination",
                  title: "First-term examination routine published",
                  desc: "Routines for all grades have been shared with class teachers and parents.",
                },
                {
                  day: "05",
                  month: "Jun",
                  tag: "Cultural",
                  title: "Annual cultural programme - Radiant Annual Programme",
                  desc: "A full day of music, dance, and student performances. Guardians cordially invited.",
                },
                {
                  day: "18",
                  month: "May",
                  tag: "Sports",
                  title: "Inter-house athletics meet results announced",
                  desc: "Congratulations to Radiant House for retaining the overall championship.",
                },
              ].map((n) => (
                <div key={n.title} className="notice-row hover-lift">
                  <div className="notice-date">
                    <span className="d-day">{n.day}</span>
                    <span className="d-month">{n.month}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="notice-tag">{n.tag}</span>
                    <h4 className="hover:text-secondary transition-colors duration-200">{n.title}</h4>
                    <p>{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <Link href="/notices" className="btn-ghost w-full justify-center">
                View all notices <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Principal Preview */}
          <aside className="lg:col-span-5 reveal-right">
            <span className="eyebrow-left">{t("Message / Principal")}</span>
            <h2 className="section-heading mt-4">{t("A word from our Principal")}</h2>

            <div className="soft-card mt-7 p-6 sm:p-8 hover-lift relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-gold" />
              <Quote className="h-8 w-8 text-secondary" />
              <p
                className="mt-4 leading-relaxed text-primary font-medium"
                style={{
                  fontFamily: "var(--font-quote)",
                  fontSize: "clamp(1rem, 0.92rem + 0.3vw, 1.125rem)",
                  lineHeight: 1.65,
                }}
              >
                {t(LEADERSHIP.principal.quote)}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src={LEADERSHIP.principal.image}
                  alt={t(LEADERSHIP.principal.name)}
                  className="w-14 h-14 rounded-full object-cover"
                  style={{
                    objectPosition: "center top",
                    boxShadow:
                      "0 0 0 2px white, 0 0 0 4px var(--color-gold), 0 8px 18px -8px rgba(7,28,56,0.30)",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      fontSize: 17,
                      lineHeight: 1.2,
                    }}
                  >
                    {t(LEADERSHIP.principal.name)}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      fontWeight: 700,
                      marginTop: 3,
                    }}
                  >
                    {t(LEADERSHIP.principal.role)}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/about" className="btn-ghost w-full justify-center">
                  {t("Read leadership messages")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =========================  STATS / ACHIEVEMENTS (Animated Counter)  ========================= */}
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
              {t("Our Achievement")}
            </span>
            <h2 className="section-title text-white mt-5">
              {t("Two decades of community impact")}
            </h2>
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
              {t("Each number is a quiet daily commitment from teachers, students, and guardians, repeated year after year.")}
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-item hover:scale-105 transition-transform duration-300">
              <div className="stat-icon">
                <Users2 className="h-6 w-6" />
              </div>
              <div className="stat-number">
                <AnimatedCounter value={1300} suffix="+" />
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
                <Award className="h-6 w-6" />
              </div>
              <div className="stat-number">
                <AnimatedCounter value={25} suffix="+" />
              </div>
              <p>{t("Years of Excellence")}</p>
            </div>

            <div className="stat-item hover:scale-105 transition-transform duration-300">
              <div className="stat-icon">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="stat-number">
                <AnimatedCounter value={95} suffix="%" />
              </div>
              <p>{t("SEE Success Rate")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================  GALLERY TEASER  ========================= */}
      <section className="gallery-slider-section">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="eyebrow-pill">Campus Life</span>
            <h2 className="section-title mt-5">A Living Campus</h2>
            <p
              className="mt-5 mx-auto"
              style={{
                color: "#64748b",
                fontFamily: "var(--font-sans)",
                fontSize: "1.05rem",
                lineHeight: 1.65,
                maxWidth: "55ch",
              }}
            >
              Glimpses of student life: focused classrooms, cultural celebration,
              and the everyday rhythm of community learning.
            </p>
          </div>
        </div>

        <div className="gallery-slider-wrapper">
          <div className="gallery-slider">
            {[
              { img: ASSETS.campus, caption: "School Campus" },
              { img: ASSETS.classroom, caption: "Student Tour" },
              { img: ASSETS.activity, caption: "Student Activity" },
              { img: ASSETS.activity2, caption: "School Programme" },
              { img: ASSETS.activity3, caption: "Campus Moment" },
              { img: ASSETS.event, caption: "Event Memory" },
              // duplicated for seamless loop
              { img: ASSETS.campus, caption: "School Campus" },
              { img: ASSETS.classroom, caption: "Student Tour" },
              { img: ASSETS.activity, caption: "Student Activity" },
              { img: ASSETS.activity2, caption: "School Programme" },
              { img: ASSETS.activity3, caption: "Campus Moment" },
              { img: ASSETS.event, caption: "Event Memory" },
            ].map((s, i) => (
              <div className="gallery-slide" key={i}>
                <img src={s.img} alt={s.caption} />
                <div className="gallery-caption">{s.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================  CTA BAND  ========================= */}
      <section className="container py-16 md:py-20">
        <div className="cta-band grid md:grid-cols-12 gap-8 items-center hover-lift relative overflow-hidden">
          <div className="md:col-span-8">
            <span
              className="eyebrow-pill"
              style={{
                color: "var(--color-gold-soft)",
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.18)",
              }}
            >
              <CalendarDays className="h-3 w-3 animate-bounce" />
              Admission Open / 2082 BS
            </span>
            <h2
              className="text-white mt-5"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 1.1rem + 1.8vw, 2.5rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Begin a confident academic journey in Mahendranagar.
            </h2>
            <p
              className="mt-4 text-white/85 max-w-2xl"
              style={{ fontFamily: "var(--font-sans)", fontSize: "1.0625rem", lineHeight: 1.65 }}
            >
              Visit our campus at {SCHOOL.location}, meet our teachers, and learn
              how Radiant can shape your child's school years with
              discipline, knowledge, and care.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-wrap md:justify-end items-center gap-3">
            <Link href="/contact" className="btn-gold shine">
              Admission Enquiry <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="btn-ghost"
              style={{
                background: "transparent",
                color: "white",
                borderColor: "rgba(255,255,255,0.35)",
              }}
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
