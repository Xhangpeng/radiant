import { useState, useRef } from "react";
import {
  X,
  Printer,
  Download,
  ZoomIn,
  ZoomOut,
  FileText,
  Calendar,
} from "lucide-react";

export interface NoticeDocument {
  id: number;
  title: string;
  category: string;
  date: string;
  refNo: string;
  publishedDate: string;
  content: {
    salutation?: string;
    introduction: string;
    bulletPoints?: string[];
    instructionsTitle?: string;
    instructions?: string[];
    closing?: string;
    signatoryName: string;
    signatoryTitle: string;
    contactEmail?: string;
  };
}

interface NoticeViewerModalProps {
  notice: NoticeDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NoticeViewerModal({
  notice,
  isOpen,
  onClose,
}: NoticeViewerModalProps) {
  if (!isOpen || !notice) return null;

  const [zoom, setZoom] = useState(100);
  const printRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 80));
  };

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    if (printContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${notice.title}</title>
              <style>
                body {
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  padding: 40px;
                  color: #1e293b;
                  background: white;
                }
                .header {
                  text-align: center;
                  border-bottom: 2px solid #1e3a8a;
                  padding-bottom: 20px;
                  margin-bottom: 30px;
                }
                .school-name {
                  font-size: 24px;
                  font-weight: bold;
                  color: #1e3a8a;
                  text-transform: uppercase;
                }
                .school-details {
                  font-size: 12px;
                  color: #64748b;
                }
                .notice-title-box {
                  text-align: center;
                  margin: 20px 0;
                }
                .notice-title {
                  font-size: 18px;
                  font-weight: bold;
                  text-decoration: underline;
                  color: #1e3a8a;
                }
                .meta-info {
                  display: flex;
                  justify-content: space-between;
                  font-size: 13px;
                  margin-bottom: 25px;
                  font-weight: 500;
                }
                .content {
                  line-height: 1.6;
                  font-size: 14px;
                }
                .bullet-list {
                  margin: 15px 0;
                  padding-left: 20px;
                }
                .bullet-list li {
                  margin-bottom: 8px;
                }
                .signature-section {
                  margin-top: 50px;
                  border-top: 1px dashed #cbd5e1;
                  padding-top: 20px;
                }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* Document Viewer Frame */}
      <div
        className="w-full max-w-4xl bg-[#1B3A6B] rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[88vh] sm:h-[85vh] max-h-[88vh] sm:max-h-[85vh] anim-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Toolbar */}
        <div className="bg-[#142C52] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4 border-b border-white/5 shrink-0 select-none">
          <div className="min-w-0 flex items-center gap-2.5 sm:gap-3 text-white">
            <FileText className="h-5 w-5 text-secondary shrink-0" />
            <h3 className="font-display font-bold text-sm sm:text-base text-white truncate max-w-[calc(100vw-132px)] sm:max-w-md">
              {notice.title}
            </h3>
          </div>

          {/* Action Controls */}
          <div className="shrink-0 flex items-center gap-1.5 sm:gap-3 text-white/80">
            {/* Zoom */}
            <div className="hidden sm:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/10">
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:text-white hover:bg-white/5 rounded-full transition"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-xs font-sans font-semibold px-2 min-w-[40px] text-center">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:text-white hover:bg-white/5 rounded-full transition"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 hover:text-white hover:bg-white/10 rounded-full transition border border-white/10 bg-white/5"
              title="Print Notice"
            >
              <Printer className="h-4 w-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-rose-200 rounded-full transition border border-rose-500/30"
              title="Close Viewer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Container containing the Paper Sheet */}
        <div className="flex-1 overflow-auto p-2.5 sm:p-6 md:p-8 flex justify-center bg-slate-900/40">
          {/* Paper Document (solid background enclosing all content) */}
          <div
            ref={printRef}
            className="w-full bg-[#FAF6EE] text-slate-800 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200/40 p-4 sm:p-10 md:p-12 transition-all duration-200 font-sans flex flex-col h-fit"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
              maxWidth: "800px",
              width: zoom !== 100 ? `${10000 / zoom}%` : "100%",
            }}
          >
            {/* School Letterhead */}
            <div className="text-center border-b-2 border-primary/30 pb-4 sm:pb-6 mb-6 sm:mb-8 relative">
              <h2 className="font-display font-extrabold text-base sm:text-2xl md:text-3xl text-primary tracking-wide leading-snug">
                SHREE BHUWANESHWORI SECONDARY SCHOOL
              </h2>
              <p className="text-xs sm:text-sm font-sans font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Bedkot-6, Shishaiya, Kanchanpur, Nepal
              </p>
              <p className="text-[10px] sm:text-xs font-sans text-slate-400 mt-0.5">
                Affiliated to NEB | Govt. Approved Community School
              </p>
              <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-24 h-[2px] bg-secondary" />
            </div>

            {/* Document Metadata (Ref No, Date) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 mb-6 sm:mb-8 pb-3 border-b border-slate-200/50">
              <div>
                <span className="text-slate-400 font-medium">Ref No:</span>{" "}
                {notice.refNo}
              </div>
              <div>
                <span className="text-slate-400 font-medium">Date:</span>{" "}
                {notice.date}
              </div>
            </div>

            {/* Document Subject */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="font-display font-bold text-sm sm:text-xl text-primary inline-block border-b-2 border-primary pb-1 uppercase tracking-wide leading-snug">
                SUBJECT: {notice.title}
              </h1>
            </div>

            {/* Document Content Body */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 font-sans">
              {notice.content.salutation && (
                <p className="font-bold text-slate-800">
                  {notice.content.salutation}
                </p>
              )}

              <p>{notice.content.introduction}</p>

              {/* Bullet Points */}
              {notice.content.bulletPoints && (
                <ul className="list-disc pl-6 space-y-2.5 my-4 text-slate-700">
                  {notice.content.bulletPoints.map((point, idx) => (
                    <li key={idx} className="pl-1">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* Special Instructions */}
              {notice.content.instructions && (
                <div className="mt-6 p-4 sm:p-5 bg-slate-100 rounded-xl border border-slate-200/60">
                  <h4 className="font-bold text-primary mb-3 text-sm sm:text-base uppercase tracking-wider">
                    {notice.content.instructionsTitle || "Important Instructions:"}
                  </h4>
                  <ol className="list-decimal pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
                    {notice.content.instructions.map((inst, idx) => (
                      <li key={idx} className="pl-1">
                        {inst}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {notice.content.closing && (
                <p className="mt-6">{notice.content.closing}</p>
              )}
            </div>

            {/* Signature Section */}
            <div className="mt-12 pt-6 border-t border-slate-200/60 flex flex-col items-end text-right">
              <div className="w-48 text-center">
                {/* Simulated Signature Line */}
                <div className="h-12 flex items-center justify-center text-slate-300 italic font-serif text-sm">
                  Official Stamp & Sign
                </div>
                <div className="border-t border-slate-400 w-full my-2" />
                <h4 className="font-bold text-slate-800 text-sm">
                  {notice.content.signatoryName}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {notice.content.signatoryTitle}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Shree Bhuwaneshwori Sec. School
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-[#142C52] px-4 sm:px-6 py-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 shrink-0 select-none text-[11px] sm:text-xs text-white/50 font-sans">
          <div className="min-w-0 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span className="truncate">Published: {notice.publishedDate}</span>
          </div>
          <div className="uppercase font-bold tracking-wider text-secondary">
            {notice.category}
          </div>
        </div>
      </div>
    </div>
  );
}
