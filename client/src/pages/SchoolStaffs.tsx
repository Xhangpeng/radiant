import { ASSETS, SCHOOL } from "@/const";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "wouter";

type StaffMember = {
  name: string;
  designation: string;
  expertise?: string;
  officialRole: string;
  image: string;
};

type StaffCategory = {
  title: string;
  description: string;
  icon: typeof Users;
  members: StaffMember[];
};

const staffCategories: StaffCategory[] = [
  {
    title: "School Leadership",
    description:
      "The leadership team guides academic planning, school culture, guardian coordination, and daily discipline.",
    icon: BadgeCheck,
    members: [
      {
        name: "MR. SURYA BDR. CHAND",
        designation: "PRINCIPAL (SECONDARY)",
        expertise: "ENGLISH / SOCIAL",
        officialRole: "PRINCIPAL(SECONDARY)(ENGLISH/SOCIAL)",
        image:
          "/radiant-assets/staff/01-231778952_424891202230561_5609635319252346115_n.jpg",
      },
      {
        name: "MRS. USHA BISTA",
        designation: "V-PRINCIPAL (BASIC)",
        expertise: "SCIENCE",
        officialRole: "V-PRINCIPAL(BASIC) (SCIENCE)",
        image: "/radiant-assets/staff/03-sharada-Raishal_11.jpg",
      },
    ],
  },
  {
    title: "Secondary Level Faculty",
    description:
      "Subject teachers support senior students with focused instruction, board-level preparation, and academic confidence.",
    icon: GraduationCap,
    members: [
      {
        name: "MRS. JAGADISWORI PANT",
        designation: "TEACHER (SECONDARY)",
        expertise: "NEPALI",
        officialRole: "TEACHER (SECONDARY) (NEPALI)",
        image: "/radiant-assets/staff/04-sharada-Raishal_7.jpg",
      },
      {
        name: "MR. RAMESH SINGH PANT",
        designation: "TEACHER (SECONDARY)",
        expertise: "MATHS",
        officialRole: "TEACHER(SECONDARY)(MATHS)",
        image: "/radiant-assets/staff/05-Ramesh-Pant.jpg",
      },
    ],
  },
  {
    title: "Basic Level Faculty",
    description:
      "The basic level team builds strong foundations in language, mathematics, computer learning, and social awareness.",
    icon: BookOpen,
    members: [
      {
        name: "MR. MOHAN DEV JOSHI",
        designation: "TEACHER (BASIC)",
        expertise: "ENGLISH",
        officialRole: "TEACHER(BASIC)(ENGLISH)",
        image: "/radiant-assets/staff/08-sharada-Raishal_5.jpg",
      },
      {
        name: "MR. NIRAJAN BHATT",
        designation: "TEACHER (BASIC)",
        expertise: "COMPUTER",
        officialRole: "TEACHER(BASIC)(COMPUTER)",
        image: "/radiant-assets/staff/09-Nirajan-Bhatt.jpg",
      },
      {
        name: "MRS. SUNITA KARKI",
        designation: "TEACHER (BASIC)",
        expertise: "NEPALI",
        officialRole: "TEACHER(BASIC)(NEPALI)",
        image: "/radiant-assets/staff/13-sharada-Raishal_8.jpg",
      },
      {
        name: "MR. HARI DATT JOSHI",
        designation: "TEACHER (BASIC)",
        expertise: "COMPUTER",
        officialRole: "TEACHER(BASIC)(COMPUTER)",
        image: "/radiant-assets/staff/14-sharada-Raishal_14_Harish-Joshi.jpg",
      },
      {
        name: "MR. KESHAB RAJ JOSHI",
        designation: "TEACHER (BASIC)",
        expertise: "MATH",
        officialRole: "TEACHER(BASIC)(MATH)",
        image: "/radiant-assets/staff/15-sharada-Raishal_15.jpg",
      },
      {
        name: "MRS. DROPATI CHAND",
        designation: "TEACHER (BASIC)",
        expertise: "MATH",
        officialRole: "TEACHER(BASIC)(MATH)",
        image: "/radiant-assets/staff/18-sharada-Raishal_4_Dropati-chand.jpg",
      },
      {
        name: "MR. BIRENDRA BAHADUR DHAMI",
        designation: "TEACHER (BASIC)",
        expertise: "ENGLISH / SOCIAL",
        officialRole: "TEACHER(BASIC)(ENGLISH, SOCIAL)",
        image: "/radiant-assets/staff/21-Birendra-BDR-Dhami.jpg",
      },
    ],
  },
  {
    title: "Pre-Primary Faculty",
    description:
      "Our early-grade teachers create a caring start for young learners through routine, confidence, and guided activities.",
    icon: Sparkles,
    members: [
      {
        name: "MRS. KALPANA SINGH",
        designation: "TEACHER (PRE-PRIMARY)",
        expertise: "GRADE",
        officialRole: "TEACHER(PRE-PRIMARY)(GRADE)",
        image: "/radiant-assets/staff/17-sharada-Raishal_12_Kalpana-Singh.jpg",
      },
      {
        name: "MRS. JANAKI SINGH",
        designation: "TEACHER (PRE-PRIMARY)",
        expertise: "GRADE",
        officialRole: "TEACHER(PRE-PRIMARY)(GRADE)",
        image: "/radiant-assets/staff/19-sharada-Raishal_16.jpg",
      },
      {
        name: "MRS. JANAKI PANT",
        designation: "TEACHER (PRE-PRIMARY)",
        expertise: "GRADE",
        officialRole: "TEACHER(PRE-PRIMARY)(GRADE)",
        image: "/radiant-assets/staff/20-sharada-Raishal_6.jpg",
      },
    ],
  },
  {
    title: "Administration & Support",
    description:
      "The office, accounts, and campus support team keep the school day organised, responsive, and safe.",
    icon: Landmark,
    members: [
      {
        name: "MRS. SHARDA RAISHAL",
        designation: "ACCOUNTANT",
        officialRole: "ACCOUNTANT",
        image: "/radiant-assets/staff/11-sharada-Raishal_1.jpg",
      },
      {
        name: "MRS. PARWATI JOSHI",
        designation: "OFFICE ASSISTANT",
        officialRole: "OFFICE ASSISTANT",
        image: "/radiant-assets/staff/12-sharada-Raishal_3.jpg",
      },
      {
        name: "MR. NAM BAHADUR BC",
        designation: "SECURITY GUARD",
        officialRole: "SECURITY GUARD",
        image: "/radiant-assets/staff/16-sharada-Raishal_2.jpg",
      },
    ],
  },
  {
    title: "Teaching Faculty",
    description:
      "Additional teaching staff strengthen classroom routines and support students across regular school programmes.",
    icon: Users,
    members: [
      {
        name: "MR. SAGAR SUNAR",
        designation: "TEACHER",
        officialRole: "TEACHER",
        image: "/radiant-assets/staff/10-sharada-Raishal_13.jpg",
      },
    ],
  },
];

const totalStaff = staffCategories.reduce(
  (total, category) => total + category.members.length,
  0,
);

export default function SchoolStaffs() {
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

        <div className="container relative z-10 py-20 text-center sm:py-24 md:py-32">
          <span className="eyebrow-pill anim-fade-up">
            <Sparkles className="h-3 w-3 text-secondary" />
            FACULTY
          </span>
          <h1
            className="mt-6 font-display font-extrabold text-white anim-fade-up"
            style={{
              fontSize: "clamp(2.1rem, 1.4rem + 3.4vw, 4.4rem)",
              lineHeight: 1.06,
              animationDelay: "80ms",
            }}
          >
            School Staffs
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-white/86 anim-fade-up"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 0.9rem + 0.35vw, 1.14rem)",
              lineHeight: 1.7,
              animationDelay: "150ms",
            }}
          >
            A category-wise faculty and support directory for Radiant Secondary
            School, Mahendranagar.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="eyebrow-pill">
                <BadgeCheck className="h-3 w-3 text-secondary" />
                {SCHOOL.shortName}
              </span>
              <h2 className="section-title mt-5">Category-Wise Staff Directory</h2>
              <p className="mt-6 max-w-2xl leading-8 text-[var(--muted-foreground)]">
                The real Radiant staff page is now redesigned into clear sections,
                making it easier for guardians and students to understand each
                member's role and expertise.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="soft-card p-5 hover-lift">
                <p className="text-3xl font-black text-primary">{totalStaff}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-navy)]">
                  Staff Members
                </p>
              </div>
              <div className="soft-card p-5 hover-lift">
                <p className="text-3xl font-black text-primary">
                  {staffCategories.length}
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-navy)]">
                  Categories
                </p>
              </div>
              <div className="soft-card p-5 hover-lift">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-navy)]">
                  Verified From RSS
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 space-y-12">
            {staffCategories.map((category) => {
              const Icon = category.icon;
              return (
                <section key={category.title} className="relative">
                  <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
                            {category.members.length} Members
                          </p>
                          <h3 className="font-display text-2xl font-black text-[var(--color-navy)] sm:text-3xl">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-4 leading-7 text-[var(--muted-foreground)]">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {category.members.map((member) => (
                      <article
                        key={`${category.title}-${member.name}`}
                        className="soft-card group overflow-hidden border border-slate-100 hover-lift"
                      >
                        <div className="aspect-[4/4.15] overflow-hidden bg-slate-100">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5">
                          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.08em] text-primary">
                            {member.designation}
                          </span>
                          <h4 className="mt-4 font-display text-xl font-bold leading-tight text-[var(--color-navy)]">
                            {member.name}
                          </h4>
                          <p className="mt-3 min-h-[2.5rem] text-sm font-bold leading-5 text-[var(--muted-foreground)]">
                            {member.officialRole}
                          </p>
                          {member.expertise ? (
                            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                              <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
                                Expertise
                              </p>
                              <p className="mt-1 text-sm font-bold text-[var(--color-navy)]">
                                {member.expertise}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <span className="eyebrow-pill">
                <Users className="h-3 w-3 text-secondary" />
                FACULTY DIRECTORY
              </span>
              <h2 className="section-title mt-5">Learning Runs On People</h2>
              <p className="mt-6 max-w-3xl leading-8 text-[var(--muted-foreground)]">
                This page follows the real Radiant staff navigation and presents the
                staff by category, role, and expertise inside the redesigned school
                framework.
              </p>
            </div>
            <div className="soft-card p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-[var(--color-navy)]">
                Need to contact the school?
              </h3>
              <p className="mt-3 leading-7 text-[var(--muted-foreground)]">
                Reach the office for staff coordination, guardian meetings, documents,
                and school-day support.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-primary/90"
              >
                Contact Radiant
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
