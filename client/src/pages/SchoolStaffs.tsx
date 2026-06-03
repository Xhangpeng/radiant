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
import { useSiteContent } from "@/lib/siteContent";

type StaffMember = {
  name: string;
  designation: string;
  expertise?: string;
  officialRole: string;
  image: string;
};

const staffIconMap = {
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Sparkles,
  Users,
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter((part) => !["MR.", "MRS.", "MS.", "DR.", "PROF."].includes(part.toUpperCase()))
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

function StaffPortrait({ member }: { member: StaffMember }) {
  return (
    <div className="relative bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] p-3 sm:p-4">
      <div className="aspect-[4/3.35] w-full overflow-hidden rounded-md border border-white shadow-sm">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-black text-primary">
            {initials(member.name)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SchoolStaffs() {
  const { content } = useSiteContent();
  const staffCategories = content.faculty.schoolStaffCategories;
  const totalStaff = staffCategories.reduce((total, category) => total + category.members.length, 0);

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
              const Icon = staffIconMap[category.icon as keyof typeof staffIconMap] || Users;
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
                        className="soft-card group flex h-full flex-col overflow-hidden border border-slate-100 hover-lift"
                      >
                        <StaffPortrait member={member} />
                        <div className="flex flex-1 flex-col p-5">
                          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.08em] text-primary">
                            {member.designation}
                          </span>
                          <h4 className="mt-4 font-display text-xl font-bold leading-tight text-[var(--color-navy)]">
                            {member.name}
                          </h4>
                          <p className="mt-3 text-sm font-bold leading-5 text-[var(--muted-foreground)]">
                            {member.officialRole}
                          </p>
                          {member.expertise ? (
                            <div className="mt-auto pt-4">
                              <div className="rounded-md border border-slate-100 bg-slate-50 px-4 py-3">
                                <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
                                  Expertise
                                </p>
                                <p className="mt-1 text-sm font-bold text-[var(--color-navy)]">
                                  {member.expertise}
                                </p>
                              </div>
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
