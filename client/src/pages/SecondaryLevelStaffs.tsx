import { ASSETS, SCHOOL } from "@/const";
import { Atom, BadgeCheck, BookOpen, Calculator, FlaskConical, GraduationCap, Leaf, Sparkles } from "lucide-react";

type SecondaryStaff = {
  name: string;
  expertise: string;
  image: string;
};

type Department = {
  title: string;
  summary: string;
  icon: typeof Atom;
  members: SecondaryStaff[];
};

const img = (file: string) => `/radiant-assets/secondary-staff/${file}`;

const departments: Department[] = [
  {
    title: "Department of Physics",
    summary: "Physics faculty for +2 science, practical concepts, and senior-level academic mentoring.",
    icon: Atom,
    members: [
      { name: "Dr. Bal Ram Ghimire", expertise: "M.Sc. in Physics, Ph.D. from US (Physics)", image: img("01-Mr.-Bal-Ram-Ghimire-Department-of-Physics-147x150.jpg") },
      { name: "Dr. Bhawani Datt Joshi", expertise: "M.Sc. in Physics, Ph.D. and Post Doc. (Physics)", image: img("02-Mr.-Bhawani-Datt-Joshi-Department-of-Physics-221x300-1-p8y68r7zx8ka94iaxf6kiwdvxzpaw6h809s7dz5pi4.jpg") },
      { name: "Dr. Ajaya Kumar Jha", expertise: "M.Sc. in Physics, Ph.D. (Physics)", image: img("03-Dr.-Ajay-Kumar-Jha-Department-of-Physics.jpg") },
      { name: "Mr. Dipak Singh Thapa", expertise: "M.Sc. in Physics (Physics)", image: img("04-Mr.-Depak-Singh-Thapa-Department-of-Physics-257x300-1-150x150.jpg") },
      { name: "Mr. Krishna Dev Bhatt", expertise: "M.Sc. in Physics (Physics)", image: img("05-Mr.-Krishna-Dev-Bhatt-Department-of-Physics-223x300-1-150x150.jpg") },
      { name: "Mr. Mahadev Awasthi", expertise: "M.Sc. in Physics (Physics)", image: img("06-Mr.-Mahadev-Awasthi-Department-of-Physics-214x300-1-150x150.jpg") },
      { name: "Mr. Prakash Khatri", expertise: "M.Sc. in Physics (Physics)", image: img("07-prakash-khatri-150x150.jpg") },
      { name: "Mr. Prakash Bokati", expertise: "M.Sc. in Physics (Physics)", image: img("08-Mr.-Prakash-Bokati-Department-of-Physics-197x300-1-150x150.jpg") },
    ],
  },
  {
    title: "Department of Chemistry",
    summary: "Chemistry faculty for theory, lab understanding, and NEB preparation.",
    icon: FlaskConical,
    members: [
      { name: "Mr. Ram Bahadur KC", expertise: "M.Sc. in Chemistry (Chemistry)", image: img("09-Mr.-Ram-Bahadur-KC-Department-of-Chemestry-243x300-1-150x150.jpg") },
      { name: "Prof. Dr. Bhawani Chand Thakuri", expertise: "M.Sc. in Chemistry, Ph.D. (Chemistry)", image: img("10-Prof.-Dr.-Bhawani-Chand-Thakuri-Department-of-Chemestry-293x300-1-150x150.jpg") },
      { name: "Mr. Bishan Singh Airee", expertise: "M.Sc. in Chemistry (Chemistry)", image: img("11-Mr.-Bishan-Singh-Airee-Department-of-Chemeatry-210x300-1-150x150.jpg") },
      { name: "Prof. Dr. Paras Nath Chaudhary", expertise: "M.Sc. in Chemistry, Ph.D. (Chemistry)", image: img("12-Prof.-Dr.-Paras-Nath-Chaudhary-Department-of-Chemestry-214x300-1-150x150.jpg") },
      { name: "Mr. Indra Dev Mishra", expertise: "M.Sc. in Chemistry (Chemistry)", image: img("13-indra-mishra-150x150.png") },
    ],
  },
  {
    title: "Department of Biology",
    summary: "Biology faculty covering botany, zoology, and practical science preparation.",
    icon: Leaf,
    members: [
      { name: "Dr. Karbir Singh Khatri", expertise: "M.Sc. in Botany, Ph.D. (Biology)", image: img("14-Dr.-Karbir-Singh-Khatri-Department-of-Biology-150x150.jpg") },
      { name: "Dr. Man Dev Bhatt", expertise: "M.Sc. in Botany, Ph.D. (Biology)", image: img("15-Mandev-Sir-150x150.jpg") },
      { name: "Dr. Mahadev Bist", expertise: "M.Sc. in Zoology, Ph.D. (Biology)", image: img("16-1627459370357-150x150.jpg") },
      { name: "Mr. Santosh Pandey", expertise: "M.Sc. in Zoology (Biology)", image: img("17-Santosh-Pandey-150x150.jpg") },
    ],
  },
  {
    title: "Department of English",
    summary: "English faculty for language, literature, communication, and senior academic writing.",
    icon: BookOpen,
    members: [
      { name: "Mr. Tribhuwan Kumar Bhatt", expertise: "M.A. in English, Sociology", image: img("18-tribhuwan-kumar-bhatt-150x150.jpg") },
      { name: "Mr. Dhan Raj Bist", expertise: "M.A. in English", image: img("19-IMG_1286-150x150.jpg") },
      { name: "Mr. Sher Bahadur Chand", expertise: "M.A. in English", image: img("20-Sher-Bahadur-Chand-150x150.png") },
      { name: "Mrs. Chandani Pant", expertise: "M.A. in English", image: img("21-chandani-pant-150x150.png") },
      { name: "Mr. Ganesh Joshi", expertise: "M.Ed. in English (English)", image: img("22-Ganesh-sir-150x150.jpg") },
      { name: "Mr. Surya Bahadur Chand", expertise: "M.Ed. in English (English)", image: img("23-sharada-Raishal_9-150x150.jpg") },
    ],
  },
  {
    title: "Department of Nepali",
    summary: "Nepali faculty supporting language depth, literature, and national curriculum mastery.",
    icon: GraduationCap,
    members: [
      { name: "Mr. Tika Datt Dahal", expertise: "M.A., B.Ed. in Nepali, Ph.D. Scholar", image: img("24-Tika-Dahal-150x150.jpg") },
      { name: "Mrs. Pabitra Saud", expertise: "M.Ed. in Nepali", image: img("25-Pabitra-Saud-150x150.png") },
      { name: "Mr. Dhurva Raj Upadhyaya", expertise: "M.Ed. in Nepali", image: img("26-Dhurwa-pandit-150x150.png") },
      { name: "Mrs. Hemanti Awasthi", expertise: "M.Ed. in Nepali", image: img("27-218303969_565835644610718_8871157078881953147_n-150x150.jpg") },
      { name: "Ms. Mohini Bhatt", expertise: "M.Ed. in Nepali", image: img("28-mohini-150x150.jpg") },
    ],
  },
  {
    title: "Department of Management",
    summary: "Management faculty for computer science, accountancy, economics, and social science.",
    icon: BadgeCheck,
    members: [
      { name: "Mr. Ganesh Pd. Chataut", expertise: "M.Sc. in CSIT (Computer Science)", image: img("29-Ganesh-sir-1-150x150.jpg") },
      { name: "Mr. Keshav Raj Joshi", expertise: "MBS (Business Studies / Account)", image: img("30-Keshab-Joshi-150x150.jpg") },
      { name: "Mr. Krishna Bhandari", expertise: "MBS (Account)", image: img("31-krishna-bhandari-150x150.png") },
      { name: "Mr. Yagya Raj Upadhyaya", expertise: "M.A. (Economics)", image: img("32-yagya-upadhyaya-150x150.jpg") },
      { name: "Mr. Jawahar Bist", expertise: "M.A. in Sociology", image: img("33-Jawahar-Bist-150x150.jpg") },
    ],
  },
  {
    title: "Department of Mathematics",
    summary: "Mathematics faculty for conceptual problem solving and senior-level exam readiness.",
    icon: Calculator,
    members: [
      { name: "Prof. Dr. Choodamani Joshi", expertise: "M.Sc., Ph.D. in Mathematics (Math)", image: img("34-Prof.-Dr.-Choodamani-Joshi-Department-of-Mathematics-150x150.jpg") },
      { name: "Dr. Krishna Bahadur Chand", expertise: "M.Sc., Ph.D. in Mathematics (Math)", image: img("35-218861096_1144918956000787_7792019027757243006_n-150x150.jpg") },
      { name: "Dr. Ghan Shyam Pant", expertise: "M.Sc., Ph.D. in Mathematics (Math)", image: img("36-Dr.-Ghanshyam-Pant-Department-of-Mathematics-150x150.jpg") },
      { name: "Mr. Kamal Raj Bhandari", expertise: "M.A. in Mathematics (Math)", image: img("37-Kamal-Raj-Bhandari-150x150.jpg") },
      { name: "Mr. Yagya Raj Pant", expertise: "M.A. in Mathematics (Math)", image: img("38-WhatsApp-Image-2021-07-30-at-3.03.29-PM-150x150.jpeg") },
    ],
  },
];

const totalStaff = departments.reduce((sum, department) => sum + department.members.length, 0);

export default function SecondaryLevelStaffs() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-primary)" }} />
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
        <div className="container relative z-10 py-20 text-center sm:py-24 md:py-32">
          <span className="eyebrow-pill anim-fade-up">
            <Sparkles className="h-3 w-3 text-secondary" />
            FACULTY
          </span>
          <h1
            className="mt-6 font-display font-extrabold text-white anim-fade-up"
            style={{ fontSize: "clamp(2.1rem, 1.4rem + 3.4vw, 4.4rem)", lineHeight: 1.06 }}
          >
            Secondary Level Staffs
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/86 anim-fade-up leading-8">
            Department-wise +2 faculty of {SCHOOL.shortName}, with expertise and real staff images from the official Radiant site.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="eyebrow-pill">
                <BadgeCheck className="h-3 w-3 text-secondary" />
                {totalStaff} Faculty Members
              </span>
              <h2 className="section-title mt-5">Department-Wise Faculty</h2>
              <p className="mt-6 max-w-2xl leading-8 text-[var(--muted-foreground)]">
                Radiant's secondary level faculty is organised by academic department so students can quickly find the right subject experts.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {departments.slice(0, 3).map((department) => {
                const Icon = department.icon;
                return (
                  <div key={department.title} className="soft-card p-5 hover-lift">
                    <Icon className="h-8 w-8 text-primary" />
                    <p className="mt-3 text-2xl font-black text-[var(--color-navy)]">{department.members.length}</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                      {department.title.replace("Department of ", "")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-14 space-y-12">
            {departments.map((department) => {
              const Icon = department.icon;
              return (
                <section key={department.title}>
                  <div className="mb-6 border-b border-slate-200 pb-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
                          {department.members.length} Staffs
                        </p>
                        <h3 className="font-display text-2xl font-black text-[var(--color-navy)] sm:text-3xl">
                          {department.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 max-w-3xl leading-7 text-[var(--muted-foreground)]">{department.summary}</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {department.members.map((member) => (
                      <article key={`${department.title}-${member.name}`} className="soft-card group overflow-hidden border border-slate-100 hover-lift">
                        <div className="aspect-square overflow-hidden bg-slate-100">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5">
                          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.08em] text-primary">
                            {department.title.replace("Department of ", "")}
                          </span>
                          <h4 className="mt-4 font-display text-xl font-bold leading-tight text-[var(--color-navy)]">{member.name}</h4>
                          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                            <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">Expertise</p>
                            <p className="mt-1 text-sm font-bold leading-6 text-[var(--color-navy)]">{member.expertise}</p>
                          </div>
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
    </>
  );
}
