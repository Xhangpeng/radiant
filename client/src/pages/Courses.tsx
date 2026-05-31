import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  Heart,
  HelpCircle,
  Laptop,
  Microscope,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { ASSETS, SCHOOL } from "@/const";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import CourseDetailsModal from "@/components/CourseDetailsModal";
import EnrollmentModal from "@/components/EnrollmentModal";
import { useLanguage } from "@/contexts/LanguageContext";

type CourseLevel =
  | "all"
  | "school"
  | "plus_two"
  | "early"
  | "primary"
  | "lower_sec"
  | "secondary"
  | "higher_sec";

interface CourseItem {
  id: string;
  section: "school" | "plus_two";
  level: string;
  levelName: string;
  title: string;
  age: string;
  grades: string;
  maxStudents: string;
  icon: React.ReactNode;
  image: string;
  desc: string;
  subjects: string[];
  focus: string;
}

export default function Courses() {
  const [filter, setFilter] = useState<CourseLevel>("all");
  const { t } = useLanguage();
  
  // Modal State Management
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  const courses: CourseItem[] = [
    {
      id: "001",
      section: "school",
      level: "early",
      levelName: "Early Childhood Education",
      title: "Early Childhood Education",
      age: "4 and above",
      grades: "Nursery, LKG, and UKG",
      maxStudents: "40 Max",
      icon: <Heart className="h-6 w-6 text-secondary" />,
      image: ASSETS.activity,
      desc: "At our school's Early Childhood Program, children begin their learning journey in a warm, loving environment. We focus on play-based learning, social habits, motor skill development, and basic language/cognitive concepts to build a strong, joyful foundation.",
      subjects: [
        "Nepali & English Alphabet Foundations",
        "Fun Numeracy & Shape Identification",
        "Creative Arts, Music & Dance",
        "Social Habits & Emotional Sharing",
        "Sensory & Fine Motor Play Activities",
      ],
      focus: "Play, Social Habits, Fine Motor Skills, Language",
    },
    {
      id: "002",
      section: "school",
      level: "primary",
      levelName: "Primary Level",
      title: "Primary Level (Grades 1 - 5)",
      age: "6 - 10",
      grades: "Class 1 to 5",
      maxStudents: "40 Max",
      icon: <BookOpen className="h-6 w-6 text-secondary" />,
      image: ASSETS.classroom,
      desc: "We provide a highly supportive and engaging environment to primary level students. Our focus is on establishing strong literacy in Nepali and English, core mathematics, environmental curiosity, and moral values that guide everyday behavior.",
      subjects: [
        "Nepali & English Languages",
        "Compulsory Mathematics",
        "Science & Environmental Studies",
        "Social Studies & Local Environment",
        "Creative Arts, Crafts & Physical Ed.",
      ],
      focus: "Reading, Writing, Core Math, Basic Science",
    },
    {
      id: "003",
      section: "school",
      level: "lower_sec",
      levelName: "Lower Secondary Level",
      title: "Lower Secondary Level (Grades 6 - 8)",
      age: "11 - 13",
      grades: "Class 6 to 8",
      maxStudents: "40 Max",
      icon: <Microscope className="h-6 w-6 text-secondary" />,
      image: ASSETS.activity,
      desc: "At the Lower Secondary Level, students continue to strengthen their academic foundation. We introduce structured laboratory practices, computer technology, integrated social sciences, and collaborative project work to encourage active enquiry.",
      subjects: [
        "English & Nepali Languages",
        "Compulsory Mathematics",
        "Science & Information Technology",
        "Social Studies & Population Ed.",
        "Moral & Health Education",
        "Occupation, Business & Tech Ed.",
      ],
      focus: "Critical Thinking, Science Labs, Tech Literacy",
    },
    {
      id: "004",
      section: "school",
      level: "secondary",
      levelName: "Secondary Level",
      title: "Secondary Level (Grades 9 - 10 · SEE)",
      age: "14 - 16",
      grades: "Class 9 and 10",
      maxStudents: "40 Max",
      icon: <Trophy className="h-6 w-6 text-secondary" />,
      image: ASSETS.hero,
      desc: "At the Secondary Level, students engage in a more focused and exam-oriented academic program. This track fully prepares students for the Secondary Education Examination (SEE) board with mock testing, extensive lab sessions, and stream counseling.",
      subjects: [
        "Compulsory English & Nepali",
        "Compulsory Mathematics",
        "Compulsory Science & Technology",
        "Compulsory Social Studies",
        "Optional I: Opt. Mathematics",
        "Optional II: Computer Science / Health Ed.",
      ],
      focus: "SEE Preparation, Advanced Science, Career Guidance",
    },
    {
      id: "005",
      section: "plus_two",
      level: "higher_sec",
      levelName: "Higher Secondary (+2 Science)",
      title: "+2 Science Program",
      age: "17 - 19",
      grades: "XI and XII",
      maxStudents: "100 Max",
      icon: <Laptop className="h-6 w-6 text-secondary" />,
      image: ASSETS.campus,
      desc: "Radiant's +2 Science stream follows the NEB curriculum with focused study in Physics, Chemistry, Biology, Mathematics or Social Studies, and Computer Science. The program is designed for students preparing for medical, engineering, agriculture, CSIT, and related higher studies.",
      subjects: [
        "Compulsory English & Nepali",
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics / Social Studies",
        "Computer Science",
        "Practical Lab Records",
        "Entrance Preparation & Model Tests",
      ],
      focus: "Science Labs, NEB Preparation, Medical, Engineering, Agriculture & CSIT Pathways",
    },
    {
      id: "006",
      section: "plus_two",
      level: "higher_sec",
      levelName: "Higher Secondary (+2 Management)",
      title: "+2 Management Program",
      age: "17 - 19",
      grades: "XI and XII",
      maxStudents: "100 Max",
      icon: <Laptop className="h-6 w-6 text-secondary" />,
      image: ASSETS.classroom,
      desc: "Radiant's +2 Management stream combines Accounting, Economics, Business Studies, Computer Science, and Social Studies/Life Skills to prepare students for commerce, management, entrepreneurship, and professional studies.",
      subjects: [
        "Compulsory English & Nepali",
        "Compulsory Social Studies / Life Skills",
        "Accountancy",
        "Economics",
        "Computer Science",
        "Business Studies",
        "Entrepreneurship & Project Work",
        "Board Exam Practice",
      ],
      focus: "Accounting, Economics, Business Studies, IT & Entrepreneurship",
    },
  ];

  const plusTwoStreams = [
    {
      code: "01",
      eyebrow: "Science Stream",
      title: "+2 Science",
      icon: <Microscope className="h-6 w-6" />,
      summary:
        "A NEB-aligned science pathway for students preparing for medicine, engineering, agriculture, CSIT, pharmacy, nursing, forestry, and applied science studies.",
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "English & Nepali"],
      pathways: ["Medical", "Engineering", "CSIT", "Agriculture", "Health Science"],
      image: ASSETS.campus,
    },
    {
      code: "02",
      eyebrow: "Management Stream",
      title: "+2 Management",
      icon: <Laptop className="h-6 w-6" />,
      summary:
        "A commerce and leadership pathway combining accounting, economics, business studies, computer science, and practical project work.",
      subjects: ["Accountancy", "Economics", "Business Studies", "Computer Science", "Social Studies", "English & Nepali"],
      pathways: ["BBA", "BBS", "CA Foundation", "Entrepreneurship", "Banking & IT"],
      image: ASSETS.classroom,
    },
  ];

  const plusTwoStrengths = [
    {
      title: "Subject-Specialist Faculty",
      body: "Experienced +2 teachers guide students through NEB concepts, board preparation, and higher-study planning.",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: "Practice-Based Learning",
      body: "Science labs, computer work, account projects, presentations, model exams, and regular feedback keep learning active.",
      icon: <Compass className="h-5 w-5" />,
    },
    {
      title: "Pathway Counselling",
      body: "Students receive stream counselling for medical, engineering, CSIT, commerce, management, and professional studies.",
      icon: <Trophy className="h-5 w-5" />,
    },
  ];

  useEffect(() => {
    const syncFilterFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "school") setFilter("school");
      if (hash === "plus-two" || hash === "plus2") setFilter("plus_two");
    };

    syncFilterFromHash();
    window.addEventListener("hashchange", syncFilterFromHash);
    return () => window.removeEventListener("hashchange", syncFilterFromHash);
  }, []);

  const handleOpenDetails = (course: CourseItem) => {
    setSelectedCourse(course);
    setIsDetailsOpen(true);
  };

  const handleOpenEnroll = (course: CourseItem) => {
    setSelectedCourse(course);
    setIsEnrollOpen(true);
  };

  const filteredCourses = courses.filter((c) => {
    if (filter === "all") return true;
    if (filter === "school" || filter === "plus_two") return c.section === filter;
    return c.level === filter;
  });

  return (
    <>
      {/* Hero */}
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
            backgroundImage: `url(${ASSETS.classroom})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
            mixBlendMode: "overlay",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(197,155,39,0.20) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(30,95,160,0.30) 0%, transparent 55%)",
          }}
        />

        <div className="container relative z-10 py-20 sm:py-24 md:py-32 lg:py-36 text-center">
          <span className="eyebrow-pill">
            <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
            {t("Academic Offerings")}
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
            {t("Our Courses")}
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
            {t("Explore Radiant's academic pathways from Play Group and school level through NEB +2 Science and Management streams, built around disciplined study, practical learning, and student-centred guidance.")}
          </p>
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

      {/* Course List & Filters */}
      <section className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <span className="eyebrow-pill">{t("Academic Programs")}</span>
          <h2 className="section-title mt-5">{t("Educational Pathways")}</h2>
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
            {t("Filter by academic levels to explore our structured curriculum, core subject matrices, and specialized focus areas. Click on any course to view full details and enrollment criteria.")}
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-10 sm:mb-14 border-b border-slate-200/60 pb-3 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: "all", label: "All Levels" },
            { id: "school", label: "School" },
            { id: "plus_two", label: "+2" },
            { id: "early", label: "Early Childhood" },
            { id: "primary", label: "Primary" },
            { id: "lower_sec", label: "Lower Secondary" },
            { id: "secondary", label: "Secondary" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as CourseLevel)}
              data-active={filter === tab.id}
              className="subtab"
            >
              <span className="subtab-dot" />
              {t(tab.label)}
            </button>
          ))}
        </div>

        {(filter === "all" || filter === "plus_two") && (
          <div id="plus-two" className="mb-14 rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div
                className="relative min-h-[360px] p-7 sm:p-10 lg:p-12 text-white"
                style={{ background: "linear-gradient(135deg, #071c38 0%, #0f4c5c 58%, #c59b27 140%)" }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: `url(${ASSETS.campus})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                  <div>
                    <span className="eyebrow-pill bg-white/10 text-white border-white/20">
                      {t("Radiant +2 College Wing")}
                    </span>
                    <h3 className="mt-6 font-display text-[clamp(2rem,1.4rem+2.4vw,4rem)] font-black leading-none">
                      {t("Science & Management with clear pathways.")}
                    </h3>
                    <p className="mt-6 max-w-xl text-white/84 leading-8">
                      {t("Radiant separates the college wing from school-level courses with clear stream identity, practical learning, and career direction for Science and Management students.")}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "2", label: "Streams" },
                      { value: "100", label: "Seats Each" },
                      { value: "NEB", label: "Curriculum" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                        <p className="text-2xl font-black">{stat.value}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                          {t(stat.label)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7 lg:p-8">
                <div className="grid gap-4">
                  {plusTwoStreams.map((stream) => (
                    <article key={stream.title} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6 hover-lift">
                      <div className="grid gap-5 md:grid-cols-[150px_1fr]">
                        <div className="relative overflow-hidden rounded-2xl bg-white">
                          <img src={stream.image} alt={stream.title} className="h-40 w-full object-cover md:h-full" />
                          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black text-primary">
                            {stream.code}
                          </span>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                              {stream.icon}
                            </span>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-secondary">
                                {t(stream.eyebrow)}
                              </p>
                              <h4 className="font-display text-2xl font-black text-[var(--color-navy)]">
                                {t(stream.title)}
                              </h4>
                            </div>
                          </div>
                          <p className="mt-4 text-sm leading-7 text-slate-600">{t(stream.summary)}</p>
                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                                {t("Subject Cluster")}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {stream.subjects.slice(0, 4).map((subject) => (
                                  <span key={subject} className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-600">
                                    {t(subject)}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                                {t("Pathways")}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {stream.pathways.slice(0, 4).map((pathway) => (
                                  <span key={pathway} className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                                    {t(pathway)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 border-t border-slate-100 bg-[var(--color-cream)] p-5 sm:grid-cols-3 sm:p-7">
              {plusTwoStrengths.map((item) => (
                <div key={item.title} className="rounded-2xl bg-white p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    {item.icon}
                  </span>
                  <h4 className="mt-4 font-display text-lg font-black text-[var(--color-navy)]">
                    {t(item.title)}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{t(item.body)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Cards Grid */}
        <div className="space-y-8 md:space-y-12">
          {filteredCourses.map((c, idx) => (
            <div
              key={c.id}
              className={`course-curriculum-card grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center reveal ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Frame */}
              <div
                className={`lg:col-span-5 ${
                  idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="relative group cursor-pointer" onClick={() => handleOpenDetails(c)}>
                  <div className="image-frame hover-zoom shadow-xl">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                  {/* Absolute Badge */}
                  <div
                    className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-white font-bold text-[10px] sm:text-xs shadow-lg flex flex-col items-center justify-center"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    <span className="opacity-75 uppercase tracking-widest text-[8px] sm:text-[9px]">{t("Capacity")}</span>
                    <span className="text-xs sm:text-sm font-extrabold mt-0.5">{t(c.maxStudents)}</span>
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div
                className={`lg:col-span-7 space-y-5 ${
                  idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-primary/5 text-secondary border border-secondary/10 flex items-center justify-center">
                    {c.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-secondary font-sans block">
                      {t("Code")} {c.id} · {t(c.levelName)}
                    </span>
                    <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-primary">
                      {c.section === "plus_two" ? t("+2 Section") : t("School Section")}
                    </span>
                    <span className="text-xs text-slate-400 font-sans block mt-0.5">
                      {t("Target Age:")} {t(c.age)} | {t(c.grades)}
                    </span>
                  </div>
                </div>

                <h3
                  className="font-display font-extrabold text-primary cursor-pointer hover:text-secondary transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem)",
                    lineHeight: 1.15,
                  }}
                  onClick={() => handleOpenDetails(c)}
                >
                  {t(c.title)}
                </h3>

                <p
                  className="text-slate-600 leading-relaxed text-[15px]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {t(c.desc)}
                </p>

                {/* Subject Matrices & Focus Grid */}
                <div className="course-detail-grid grid sm:grid-cols-2 gap-4 pt-5 border-t border-slate-200/70">
                  {/* Subject List */}
                  <div className="course-info-panel">
                    <h4
                      className="text-xs font-bold uppercase tracking-wider text-primary font-sans flex items-center gap-1.5"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-secondary" />
                      {t("Core Subject Matrix")}
                    </h4>
                    <ul className="mt-4 space-y-2.5 text-xs text-slate-600 font-sans">
                      {c.subjects.slice(0, 4).map((s) => (
                        <li key={s} className="course-subject-row">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                          {t(s)}
                        </li>
                      ))}
                      {c.subjects.length > 4 && (
                        <li className="text-secondary font-bold pl-3.5 mt-1 cursor-pointer hover:underline" onClick={() => handleOpenDetails(c)}>
                          + {c.subjects.length - 4} {t("more subjects")}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Core Focus Area */}
                  <div className="course-info-panel space-y-4">
                    <div>
                      <h4
                        className="text-xs font-bold uppercase tracking-wider text-primary font-sans flex items-center gap-1.5"
                      >
                        <Compass className="h-3.5 w-3.5 text-secondary animate-spin-slow" />
                        {t("Core Focus Area")}
                      </h4>
                      <p className="mt-2.5 text-xs text-slate-500 font-sans leading-relaxed">
                        {t(c.focus)}
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => handleOpenEnroll(c)}
                        className="btn-gold shine text-xs px-4 py-2.5 rounded-lg"
                      >
                        {t("Enroll Now")}
                      </button>
                      <button
                        onClick={() => handleOpenDetails(c)}
                        className="btn-ghost text-xs px-4 py-2.5 rounded-lg border border-slate-200 hover:border-primary"
                      >
                        {t("View Details")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* School and +2 Overview */}
      <section className="container pb-12 md:pb-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <div id="school" className="soft-card p-6 sm:p-8 hover-lift">
            <span className="eyebrow-pill">{t("School Section")}</span>
            <h3 className="mt-5 font-display text-2xl font-black text-[var(--color-navy)]">
              {t("Play Group to Grade 10")}
            </h3>
            <p className="mt-4 leading-8 text-[var(--muted-foreground)]">
              {t("The school section builds literacy, numeracy, science curiosity, technology habits, moral values, and SEE readiness through progressive levels from early childhood to Grade 10.")}
            </p>
          </div>
          <div className="soft-card p-6 sm:p-8 hover-lift">
            <span className="eyebrow-pill">{t("+2 Section")}</span>
            <h3 className="mt-5 font-display text-2xl font-black text-[var(--color-navy)]">
              {t("Science and Management Streams")}
            </h3>
            <p className="mt-4 leading-8 text-[var(--muted-foreground)]">
              {t("Radiant's +2 section combines NEB curriculum, subject-specialist faculty, lab work, model examinations, counselling, and pathway preparation for medical, engineering, CSIT, commerce, and management studies.")}
            </p>
          </div>
        </div>
      </section>

      {/* CDC Standard Banner */}
      <section className="container py-12 md:py-16">
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
              {t("Curriculum Development Centre (CDC) Standards")}
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
              {t("Aligned with National Education Standards")}
            </h2>
            <p
              className="mt-4 text-white/85 max-w-2xl"
              style={{ fontFamily: "var(--font-sans)", fontSize: "1.0625rem", lineHeight: 1.65 }}
            >
            {t("Radiant follows national curriculum and NEB requirements, combining them with laboratories, IT exposure, counselling, extra tutorials, sports, and regular evaluation so students are ready for board examinations and higher studies.")}
            </p>
          </div>
          <div className="md:col-span-4 flex flex-wrap md:justify-end items-center gap-3">
            <Link href="/contact" className="btn-gold shine">
              {t("Contact Admissions")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Course Details Modal */}
      <CourseDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        course={selectedCourse}
      />

      {/* Enrollment Inquiry Modal */}
      <EnrollmentModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        course={selectedCourse}
      />
    </>
  );
}
