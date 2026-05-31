import { Calendar, MapPin, Phone, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SCHOOL } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    grades: string;
  } | null;
}

export default function EnrollmentModal({
  isOpen,
  onClose,
  course,
}: EnrollmentModalProps) {
  const { t } = useLanguage();
  const [formData, setForm] = useState({
    parentName: "",
    phone: "",
    studentName: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone || !formData.studentName) {
      toast.error(t("Please fill in all required fields."));
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(
        `Success! Enrollment inquiry for ${course.title} has been submitted. Our admissions desk will contact you soon.`
      );
      setForm({ parentName: "", phone: "", studentName: "", notes: "" });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#faf6ee] rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden border border-secondary/10 flex flex-col anim-fade-up">
        {/* Header */}
        <div
          className="relative px-6 py-8 text-white flex flex-col justify-between shrink-0"
          style={{ background: "var(--gradient-primary)" }}
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-2">
            <span className="eyebrow-pill text-xs bg-white/10 border-white/20 text-white">
              <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
              {t("Admission Inquiry")}
            </span>
            <h2
              className="font-display font-extrabold text-2xl tracking-tight text-white mt-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("Enroll in")} {t(course.title)}
            </h2>
            <p className="text-white/85 text-xs font-sans mt-1">
              {t("Target Level:")} {t(course.grades)} | {t("Code")}: {course.id}
            </p>
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-[#faf6ee]">
          <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            {/* Student Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                {t("Student Name *")}
              </label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) =>
                  setForm({ ...formData, studentName: e.target.value })
                }
                placeholder="e.g., Aarav Bhatta"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-xs bg-slate-50/50"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Parent Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                {t("Parent / Guardian Name *")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) =>
                    setForm({ ...formData, parentName: e.target.value })
                  }
                  placeholder="e.g., Ramesh Bhatta"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-xs bg-slate-50/50"
                />
              </div>

              {/* Contact Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                {t("Contact Phone *")}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setForm({ ...formData, phone: e.target.value })
                  }
                  placeholder="e.g., 98XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-xs bg-slate-50/50"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                {t("Additional Notes / Queries")}
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setForm({ ...formData, notes: e.target.value })
                }
                placeholder="Ask about school bus, hostel, fees, uniform, etc."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-secondary transition font-sans text-xs bg-slate-50/50"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold shine w-full justify-center py-3.5 text-xs font-bold rounded-xl mt-4"
            >
              {submitting ? (
                t("Submitting Application...")
              ) : (
                <>
                  {t("Submit Enrollment Inquiry")} <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Support info */}
          <div className="grid sm:grid-cols-2 gap-3 mt-6 text-xs text-slate-600 font-sans">
            <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3">
              <Phone className="h-4 w-4 text-secondary" />
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">{t("Call Admissions")}</span>
                <a href={`tel:${SCHOOL.contact.replace(/\s/g, "")}`} className="text-primary font-bold hover:underline">
                  {SCHOOL.contact}
                </a>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3">
              <MapPin className="h-4 w-4 text-secondary" />
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">{t("Campus Visit")}</span>
                <span className="text-primary font-bold">{t("MNR, Kanchanpur")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
