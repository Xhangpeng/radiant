import { useState } from "react";
import {
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  School,
  CheckCircle,
  User,
  Users,
  History,
  FileText,
} from "lucide-react";
import { ASSETS } from "@/const";
import { toast } from "sonner";

export default function Apply() {
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    relation: "",
    prevSchool: "",
    seeGpa: "",
    program: "",
    statement: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (
      !form.fullName ||
      !form.gender ||
      !form.dob ||
      !form.phone ||
      !form.address ||
      !form.guardianName ||
      !form.guardianPhone ||
      !form.relation ||
      !form.prevSchool ||
      !form.seeGpa ||
      !form.program
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(
        `Application submitted successfully! Thank you, ${form.fullName}. Our admissions team will review your application for ${form.program} and contact you within 3-5 working days.`
      );
      setForm({
        fullName: "",
        gender: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        guardianName: "",
        guardianPhone: "",
        relation: "",
        prevSchool: "",
        seeGpa: "",
        program: "",
        statement: "",
      });
    }, 1500);
  };

  return (
    <>
      {/* Hero Banner */}
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
            backgroundImage: `url(${ASSETS.campus})`,
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
            Admissions Open
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
            Apply <span className="text-shimmer" style={{ backgroundSize: "200% 100%" }}>Now</span>
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
            Begin your academic journey at Radiant Secondary School. Complete the application form below and our admissions team will be in touch.
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

      {/* Main Form Section */}
      <section className="container py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Admission Highlights */}
          <div className="lg:col-span-4 space-y-8 reveal-left">
            <div className="sticky top-28 space-y-8">
              <div>
                <span className="text-xs font-bold text-secondary tracking-widest uppercase block mb-2">
                  Admissions Open
                </span>
                <h2 className="font-display font-extrabold text-3xl text-primary leading-tight">
                  Admission Highlights
                </h2>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  Join a community dedicated to academic excellence, leadership development, and character building.
                </p>
              </div>

              {/* Highlight Cards */}
              <div className="space-y-4">
                <div className="soft-card p-5 border border-slate-100 flex items-start gap-4">
                  <div className="p-2.5 bg-primary/5 text-secondary border border-secondary/10 rounded-xl shrink-0">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base">Academic Offerings</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Comprehensive courses from Play Group to Grade XII, including +2 Science and Management.
                    </p>
                  </div>
                </div>

                <div className="soft-card p-5 border border-slate-100 flex items-start gap-4">
                  <div className="p-2.5 bg-primary/5 text-secondary border border-secondary/10 rounded-xl shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base">Scholarship Opportunities</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Merit-based scholarships, sports quotas, and financial support for deserving students.
                    </p>
                  </div>
                </div>

                <div className="soft-card p-5 border border-slate-100 flex items-start gap-4">
                  <div className="p-2.5 bg-primary/5 text-secondary border border-secondary/10 rounded-xl shrink-0">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base">Modern Facilities</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Fully equipped science laboratories, computer suites, a rich library, and vast playgrounds.
                    </p>
                  </div>
                </div>

                <div className="soft-card p-5 border border-slate-100 flex items-start gap-4">
                  <div className="p-2.5 bg-primary/5 text-secondary border border-secondary/10 rounded-xl shrink-0">
                    <School className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base">Dedicated Faculty</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Experienced, caring educators who mentor and guide every student individually.
                    </p>
                  </div>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="soft-card p-6 bg-primary text-white relative overflow-hidden rounded-2xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8" />
                <h4 className="font-display font-bold text-lg text-secondary">Need Assistance?</h4>
                <p className="text-white/80 text-xs mt-2 leading-relaxed">
                  If you have any queries regarding the admission process, feel free to call our helpdesk directly.
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/60 block">Direct Helpline</span>
                  <span className="text-sm font-bold text-white font-sans">099-525169</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-section Application Form */}
          <div className="lg:col-span-8">
            <div className="soft-card p-5 sm:p-10 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-gold" />

              <div className="mb-8">
                <span className="text-xs font-bold text-secondary tracking-widest uppercase block mb-2">
                  Application Form
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-primary">
                  Fill your details
                </h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  Complete all required fields below. Ensure all information is accurate for a smooth admission process.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* 01. Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <span className="h-7 w-7 rounded-lg bg-primary/5 text-secondary flex items-center justify-center text-xs font-bold font-sans border border-secondary/10">
                      01
                    </span>
                    <h4 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                      <User className="h-4 w-4 text-secondary" /> Personal Information
                    </h4>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50"
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Gender *
                      </label>
                      <select
                        required
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50 cursor-pointer appearance-none"
                      >
                        <option value="" disabled>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Date of Birth */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={form.dob}
                        onChange={(e) => setForm({ ...form, dob: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+977-98XXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50"
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Permanent Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="MNR, Kanchanpur"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50"
                      />
                    </div>
                  </div>
                </div>

                {/* 02. Guardian Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <span className="h-7 w-7 rounded-lg bg-primary/5 text-secondary flex items-center justify-center text-xs font-bold font-sans border border-secondary/10">
                      02
                    </span>
                    <h4 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                      <Users className="h-4 w-4 text-secondary" /> Guardian Details
                    </h4>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-5">
                    {/* Guardian Name */}
                    <div className="space-y-2 sm:col-span-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Guardian's Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.guardianName}
                        onChange={(e) => setForm({ ...form, guardianName: e.target.value })}
                        placeholder="Parent Name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50"
                      />
                    </div>

                    {/* Guardian Phone */}
                    <div className="space-y-2 sm:col-span-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Guardian's Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.guardianPhone}
                        onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })}
                        placeholder="Guardian Phone"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50"
                      />
                    </div>

                    {/* Relation */}
                    <div className="space-y-2 sm:col-span-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Relation *
                      </label>
                      <select
                        required
                        value={form.relation}
                        onChange={(e) => setForm({ ...form, relation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50 cursor-pointer appearance-none"
                      >
                        <option value="" disabled>Select relation</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Uncle">Uncle</option>
                        <option value="Aunt">Aunt</option>
                        <option value="Legal Guardian">Legal Guardian</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 03. Academic Background */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <span className="h-7 w-7 rounded-lg bg-primary/5 text-secondary flex items-center justify-center text-xs font-bold font-sans border border-secondary/10">
                      03
                    </span>
                    <h4 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                      <History className="h-4 w-4 text-secondary" /> Academic Background
                    </h4>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-5">
                    {/* Previous School */}
                    <div className="space-y-2 sm:col-span-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Previous School *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.prevSchool}
                        onChange={(e) => setForm({ ...form, prevSchool: e.target.value })}
                        placeholder="School Name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50"
                      />
                    </div>

                    {/* SEE GPA */}
                    <div className="space-y-2 sm:col-span-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        SEE GPA / Previous Grade *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.seeGpa}
                        onChange={(e) => setForm({ ...form, seeGpa: e.target.value })}
                        placeholder="e.g., 3.65 or A"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50"
                      />
                    </div>

                    {/* Program of Interest */}
                    <div className="space-y-2 sm:col-span-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Program of Interest *
                      </label>
                      <select
                        required
                        value={form.program}
                        onChange={(e) => setForm({ ...form, program: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50 cursor-pointer appearance-none"
                      >
                        <option value="" disabled>Select program</option>
                        <option value="Early Childhood Development">Early Childhood Development</option>
                        <option value="Primary School (Grade 1 - 5)">Primary School (Grade 1 - 5)</option>
                        <option value="Lower Secondary (Grade 6 - 8)">Lower Secondary (Grade 6 - 8)</option>
                        <option value="Secondary School (Grade 9 - 10)">Secondary School (Grade 9 - 10)</option>
                        <option value="+2 Science Stream">+2 Science Stream</option>
                        <option value="+2 Management Stream">+2 Management Stream</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 04. Personal Statement */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <span className="h-7 w-7 rounded-lg bg-primary/5 text-secondary flex items-center justify-center text-xs font-bold font-sans border border-secondary/10">
                      04
                    </span>
                    <h4 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                      <FileText className="h-4 w-4 text-secondary" /> Personal Statement
                    </h4>
                  </div>

                  {/* Why do you want to join */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                      Why do you want to join Radiant Secondary School?
                    </label>
                    <textarea
                      rows={4}
                      value={form.statement}
                      onChange={(e) => setForm({ ...form, statement: e.target.value })}
                      placeholder="Share your academic goals, interests, and reasons for choosing our school..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-sm bg-slate-50/50 resize-none"
                    />
                  </div>
                </div>

                {/* Terms Disclaimer */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex gap-3 items-start">
                  <input type="checkbox" required id="agree" className="mt-1 h-4 w-4 text-primary focus:ring-secondary border-slate-300 rounded cursor-pointer" />
                  <label htmlFor="agree" className="text-xs text-slate-500 leading-relaxed cursor-pointer font-sans">
                    By submitting, I confirm that the information provided is accurate. Our admissions team will contact you within 3-5 working days to schedule an entrance test or interview.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full justify-center py-3.5 rounded-xl shadow-md shadow-secondary/10 hover:shadow-lg transition duration-300 font-bold"
                >
                  {loading ? (
                    "Submitting Application..."
                  ) : (
                    <>
                      Submit Application <CheckCircle className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
