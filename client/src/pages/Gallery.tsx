import { useState } from "react";
import { ASSETS } from "@/const";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  X,
} from "lucide-react";

type GalleryCategory = "all" | "campus" | "learning" | "activities" | "events";

interface GalleryItem {
  id: number;
  src: string;
  category: GalleryCategory;
  title: string;
  desc: string;
}

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    { id: 1, src: "/radiant-gallery/school background.jpg", category: "campus", title: "Radiant School Campus", desc: "The school environment where everyday learning, discipline, and student life come together." },
    { id: 2, src: "/radiant-gallery/img1.jpg", category: "campus", title: "Campus Moment 01", desc: "A selected glimpse from Radiant Secondary School's daily campus life." },
    { id: 3, src: "/radiant-gallery/img2.jpg", category: "campus", title: "Campus Moment 02", desc: "Students and school spaces captured as part of the Radiant learning environment." },
    { id: 4, src: "/radiant-gallery/img3.jpg", category: "campus", title: "Campus Moment 03", desc: "A clean view of school life, movement, and togetherness on campus." },
    { id: 5, src: "/radiant-gallery/img4.jpg", category: "campus", title: "Campus Moment 04", desc: "A memory from the school premises showing the spirit of Radiant." },
    { id: 6, src: "/radiant-gallery/img5.jpg", category: "campus", title: "Campus Moment 05", desc: "Everyday school life presented with a focus on student presence and atmosphere." },
    { id: 7, src: "/radiant-gallery/img6.jpg", category: "campus", title: "Campus Moment 06", desc: "A visual record of Radiant's active and welcoming school setting." },

    { id: 8, src: "/radiant-gallery/img7.jpg", category: "learning", title: "Learning Moment 01", desc: "A classroom-focused memory from Radiant's academic journey." },
    { id: 9, src: "/radiant-gallery/img8.jpg", category: "learning", title: "Learning Moment 02", desc: "Students growing through guided study, participation, and practical learning." },
    { id: 10, src: "/radiant-gallery/img9.jpg", category: "learning", title: "Learning Moment 03", desc: "A thoughtful academic moment from the school gallery collection." },
    { id: 11, src: "/radiant-gallery/img10.jpg", category: "learning", title: "Learning Moment 04", desc: "A snapshot of classroom energy and student engagement." },
    { id: 12, src: "/radiant-gallery/img11.jpg", category: "learning", title: "Learning Moment 05", desc: "Radiant's learning culture shown through focused student activity." },
    { id: 13, src: "/radiant-gallery/img12.jpg", category: "learning", title: "Learning Moment 06", desc: "A school memory connected with academic practice and classroom participation." },
    { id: 14, src: "/radiant-gallery/img13.jpg", category: "learning", title: "Learning Moment 07", desc: "Students participating in a meaningful academic moment at school." },
    { id: 15, src: "/radiant-gallery/img14.jpg", category: "learning", title: "Learning Moment 08", desc: "A gallery image reflecting study, attention, and guided growth." },

    { id: 16, src: "/radiant-gallery/img15.jpg", category: "activities", title: "Activity Moment 01", desc: "A co-curricular memory from Radiant's broader school experience." },
    { id: 17, src: "/radiant-gallery/img16.jpg", category: "activities", title: "Activity Moment 02", desc: "Students taking part in activities that build confidence beyond textbooks." },
    { id: 18, src: "/radiant-gallery/img18.jpg", category: "activities", title: "Activity Moment 03", desc: "A lively school activity captured as part of Radiant's student development." },
    { id: 19, src: "/radiant-gallery/img20.jpg", category: "activities", title: "Activity Moment 04", desc: "Co-curricular participation strengthening teamwork, discipline, and expression." },
    { id: 20, src: "/radiant-gallery/img21.jpg", category: "activities", title: "Activity Moment 05", desc: "A memorable student activity from the Radiant school community." },
    { id: 21, src: "/radiant-gallery/img22.jpg", category: "activities", title: "Activity Moment 06", desc: "A school life image highlighting participation and shared experience." },
    { id: 22, src: "/radiant-gallery/img23.jpg", category: "activities", title: "Activity Moment 07", desc: "An active moment from school programs and student engagement." },

    { id: 23, src: "/radiant-gallery/img25.jpg", category: "events", title: "Event Memory 01", desc: "A special school event preserved in Radiant's photo gallery." },
    { id: 24, src: "/radiant-gallery/img27.jpg", category: "events", title: "Event Memory 02", desc: "A celebration, gathering, or school program moment from Radiant." },
    { id: 25, src: "/radiant-gallery/img29.jpg", category: "events", title: "Event Memory 03", desc: "A community memory showing student presence and school spirit." },
    { id: 26, src: "/radiant-gallery/img30.jpg", category: "events", title: "Event Memory 04", desc: "A selected school event image from the new Radiant gallery set." },
    { id: 27, src: "/radiant-gallery/img31.jpg", category: "events", title: "Event Memory 05", desc: "A captured moment from school programs, celebrations, or assemblies." },
    { id: 28, src: "/radiant-gallery/img32.jpg", category: "events", title: "Event Memory 06", desc: "Radiant's shared school memories presented through real gallery images." },
    { id: 29, src: "/radiant-gallery/img33.jpg", category: "events", title: "Event Memory 07", desc: "A meaningful event memory from the Radiant Secondary School community." },
    { id: 30, src: "/radiant-gallery/img34.jpg", category: "events", title: "Event Memory 08", desc: "A school program moment showing the energy of Radiant students." },
    { id: 31, src: "/radiant-gallery/img35.jpg", category: "events", title: "Event Memory 09", desc: "A final selected memory from the uploaded Radiant gallery collection." },
  ];

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1
    );
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
            <Camera className="h-3 w-3 text-secondary animate-pulse" />
            School Memories
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
            Our <span className="text-shimmer" style={{ backgroundSize: "200% 100%" }}>Gallery</span>
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
            A visual chronicle of academic focus, practical learning, co-curricular activities,
            and campus life at Radiant Secondary School.
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

      {/* Gallery Main Section */}
      <section className="container pt-8 pb-16 md:py-28" data-no-reveal>
        {/* Category Filters */}
        <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-10 sm:mb-14 border-b border-slate-200/60 pb-3 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: "all", label: "All Memories" },
            { id: "campus", label: "Campus Life" },
            { id: "learning", label: "Learning" },
            { id: "activities", label: "Activities" },
            { id: "events", label: "Events" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as GalleryCategory)}
              data-active={filter === tab.id}
              className="subtab"
            >
              <span className="subtab-dot" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="gallery-card group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover-lift transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
              onClick={() => setLightboxIndex(index)}
            >
              {/* Image Container */}
              <div className="gallery-image-wrap relative overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.title}
                  loading={index < 6 ? "eager" : "lazy"}
                  fetchPriority={index < 3 ? "high" : "auto"}
                  decoding="async"
                  className="gallery-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="h-11 w-11 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="h-5 w-5 text-secondary" />
                  </div>
                </div>
                {/* Category Tag */}
                <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider text-primary font-sans shadow-sm">
                  {item.category === "campus" && "Campus"}
                  {item.category === "learning" && "Learning"}
                  {item.category === "activities" && "Activity"}
                  {item.category === "events" && "Event"}
                </span>
              </div>

              {/* Text Area */}
              <div className="p-6 space-y-2">
                <h3 className="font-display font-bold text-base text-primary group-hover:text-secondary transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs font-sans leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Camera className="h-12 w-12 text-slate-300 mx-auto mb-4 animate-bounce" />
            <h3 className="font-display font-bold text-lg text-primary">No memories found</h3>
            <p className="text-slate-400 text-sm font-sans mt-1">
              Try switching filters to view other school life categories.
            </p>
          </div>
        )}
      </section>

      {/* Full Screen Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Controls */}
          <div className="flex items-center justify-between text-white shrink-0 py-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-sans">
                Memories · {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h4 className="font-display font-bold text-lg mt-0.5 text-white">
                {filteredItems[lightboxIndex].title}
              </h4>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Lightbox Center Image & Nav */}
          <div className="flex-1 flex items-center justify-between gap-4 max-h-[75vh]">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition shrink-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Main Image Frame */}
            <div
              className="relative max-w-4xl w-full h-full flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/5 anim-fade-up"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition shrink-0"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Lightbox Bottom Description */}
          <div
            className="text-center text-white shrink-0 py-4 max-w-xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {filteredItems[lightboxIndex].desc}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
