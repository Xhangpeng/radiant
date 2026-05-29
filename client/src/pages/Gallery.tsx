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

type GalleryCategory = "all" | "campus" | "academic" | "sports" | "cultural";

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
    // Campus & Events (including Cover images)
    {
      id: 1,
      src: "/manus-storage/COVER_GAL_1ef80383.jpg",
      category: "campus",
      title: "Main Campus Gateway",
      desc: "Welcome arch of Shree Bhuwaneshwori Secondary School, greeting students daily.",
    },
    {
      id: 2,
      src: "/manus-storage/COVER_GAL1_06481d62.jpg",
      category: "campus",
      title: "Annual Day Celebrations",
      desc: "Distinguished guests and guardians gathering during our annual school assembly.",
    },
    {
      id: 3,
      src: "/manus-storage/COVER_GAL2_707e74c6.jpg",
      category: "campus",
      title: "Parent-Teacher Conference",
      desc: "Collaborative session focused on students' holistic growth and development.",
    },
    {
      id: 4,
      src: "/manus-storage/COVER_GAL3_552965d9.jpg",
      category: "campus",
      title: "Community Outreach",
      desc: "School representatives interacting with local leaders for educational alignment.",
    },
    {
      id: 5,
      src: "/manus-storage/COVER_GAL4_d7a71d54.jpg",
      category: "campus",
      title: "Assembly Ground Morning",
      desc: "Students assembling for the morning national anthem and school prayer.",
    },

    // Academics & Labs
    {
      id: 6,
      src: "/manus-storage/GAL1_3e9e7f22.jpg",
      category: "academic",
      title: "Interactive Math Session",
      desc: "Students engaging in hands-on geometry exercises in the primary classroom.",
    },
    {
      id: 7,
      src: "/manus-storage/GAL2_920b1ef6.jpg",
      category: "academic",
      title: "Computer Literacy Lab",
      desc: "Lower secondary students practicing basic coding and keyboard skills.",
    },
    {
      id: 8,
      src: "/manus-storage/GAL3_baf6c138.jpg",
      category: "academic",
      title: "Group Science Discussion",
      desc: "Class 9 students collaborating on physics project models in groups.",
    },
    {
      id: 9,
      src: "/manus-storage/GAL4_e5c15a3b.jpg",
      category: "academic",
      title: "English Reading Hour",
      desc: "Nurturing literature appreciation through storytelling and guided reading.",
    },
    {
      id: 10,
      src: "/manus-storage/GAL5_812e05c7.jpg",
      category: "academic",
      title: "Creative Arts Class",
      desc: "Primary students painting and sketching during their weekly arts module.",
    },
    {
      id: 11,
      src: "/manus-storage/GAL10_78761516.jpg",
      category: "academic",
      title: "Senior Biology Lab",
      desc: "Secondary level students observing plant cell slides under microscopes.",
    },
    {
      id: 12,
      src: "/manus-storage/GAL11_a95d675b.jpg",
      category: "academic",
      title: "NEB Class Presentation",
      desc: "Secondary students delivering an interactive class project presentation.",
    },
    {
      id: 13,
      src: "/manus-storage/GAL16_81b24861.jpg",
      category: "academic",
      title: "Chemistry Lab Experiment",
      desc: "Observing chemical reactions under the safe guidance of science faculty.",
    },
    // Real Uploaded Additions
    {
      id: 14,
      src: "/manus-storage/GAL14_9a5105b1.jpg",
      category: "academic",
      title: "Interactive Classroom Reading",
      desc: "A view of the lively student study circles and collaborative reading desks.",
    },
    {
      id: 15,
      src: "/manus-storage/GAL12_749cffd7.jpg",
      category: "academic",
      title: "Practical Learning Desk",
      desc: "Hands-on academic projects keeping our primary students deeply engaged.",
    },

    // Sports & Co-curricular
    {
      id: 16,
      src: "/manus-storage/GAL6_be9902c0.jpg",
      category: "sports",
      title: "Annual Football Tournament",
      desc: "The school team competing in the regional inter-school sports cup.",
    },
    {
      id: 17,
      src: "/manus-storage/GAL7_fd43468f.jpg",
      category: "sports",
      title: "Volleyball Practice",
      desc: "Afternoon training session on the newly renovated school sand court.",
    },
    {
      id: 18,
      src: "/manus-storage/GAL8_55e2cb51.jpg",
      category: "sports",
      title: "Table Tennis Finals",
      desc: "Exciting indoor table tennis championship match between senior houses.",
    },
    {
      id: 19,
      src: "/manus-storage/GAL9_6b505f5a.jpg",
      category: "sports",
      title: "Sprint Athletics Event",
      desc: "Students participating in the 100m dash during our annual sports meet.",
    },
    {
      id: 20,
      src: "/manus-storage/GAL12_749cffd7.jpg",
      category: "sports",
      title: "Badminton Tournament",
      desc: "Girls' doubles final match, showcasing sportsmanship and focus.",
    },
    {
      id: 21,
      src: "/manus-storage/GAL13_55850aa8.jpg",
      category: "sports",
      title: "Interschool Cricket Match",
      desc: "School cricket captain leading the team on the Bedkot municipal pitch.",
    },
    {
      id: 22,
      src: "/manus-storage/GAL14_9a5105b1.jpg",
      category: "sports",
      title: "Yoga & Mindfulness",
      desc: "Weekly physical wellness session focusing on posture and breathing.",
    },

    // Cultural & Celebrations
    {
      id: 23,
      src: "/manus-storage/GAL15_8d8cbb12.jpg",
      category: "cultural",
      title: "Traditional Dance Performance",
      desc: "Primary students performing Tharu and Deuda dances on Cultural Day.",
    },
    {
      id: 24,
      src: "/manus-storage/GAL17_3e50cff8.jpg",
      category: "cultural",
      title: "Saraswati Puja Celebrations",
      desc: "Offering prayers to the Goddess of Knowledge on the auspicious day of Vasant Panchami.",
    },
    {
      id: 25,
      src: "/manus-storage/GAL18_f6e01e88.jpg",
      category: "cultural",
      title: "School Choir Performance",
      desc: "The school vocal ensemble performing local folk melodies and patriotic songs.",
    },
    {
      id: 26,
      src: "/manus-storage/GAL19_70f0e1cd.jpg",
      category: "cultural",
      title: "National Day Parade",
      desc: "Scout troop marching during the Kanchanpur district celebration parade.",
    },
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
            A visual chronicle of academic focus, athletic achievements, vibrant cultural heritage,
            and campus life at Shree Bhuwaneshwori Secondary School.
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
      <section className="container py-20 md:py-28">
        {/* Category Filters */}
        <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-10 sm:mb-14 border-b border-slate-200/60 pb-3 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: "all", label: "All Memories" },
            { id: "campus", label: "Campus & Events" },
            { id: "academic", label: "Academics & Labs" },
            { id: "sports", label: "Sports & Co-curricular" },
            { id: "cultural", label: "Cultural & Celebrations" },
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
                  {item.category === "academic" && "Academic"}
                  {item.category === "sports" && "Sports"}
                  {item.category === "cultural" && "Cultural"}
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
