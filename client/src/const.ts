export const SCHOOL = {
  name: "Radiant Secondary School",
  shortName: "Radiant School",
  motto: "Quality | Confidence | Character",
  tagline: "QUALITY | CONFIDENCE | CHARACTER",
  established: "2057 B.S.",
  establishedAd: "2000 A.D.",
  location: "Bheemdatt Municipality-18, Mahendranagar",
  district: "Kanchanpur, Sudurpashchim",
  contact: "099-525169",
  email: "info@radiantmnr.edu.np",
  logo: "/radiant-assets/logoradiant.png",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253.86113492145594!2d80.18101131263133!3d28.956699579781564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a1ac0461e0542b%3A0x8a980f34da804f5!2z4KSw4KWH4KSh4KS_4KSv4KSo4KWN4KSfIOCkruCkvuCkp-CljeCkr-CkruCkv-CklSDgpLXgpL_gpKbgpY3gpK_gpL7gpLLgpK8!5e1!3m2!1sen!2snp!4v1780212234540!5m2!1sen!2snp",
};

export const ASSETS = {
  hero: "/radiant-gallery/school background.jpg",
  classroom: "/radiant-gallery/img29.jpg",
  campus: "/radiant-gallery/school background.jpg",
  principal: "/manus-storage/GAL15_8d8cbb12.jpg",
  vp: "/manus-storage/GAL17_3e50cff8.jpg",
  admin: "/manus-storage/GAL9_6b505f5a.jpg",
  activity: "/radiant-gallery/img15.jpg",
  activity2: "/radiant-gallery/img20.jpg",
  activity3: "/radiant-gallery/img23.jpg",
  event: "/radiant-gallery/img25.jpg",
  notice: "/manus-storage/NOTICEIMAGE_bfef4898.jpg",
};

export type NavItem = {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
  children?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: "/", icon: "Home" },
  {
    label: "ABOUT US",
    href: "/about",
    icon: "Info",
  },
  {
    label: "FACULTY",
    href: "#",
    icon: "Users",
    children: [
      { label: "SECONDARY LEVEL STAFFS", href: "/secondary-level-staffs" },
      { label: "SCHOOL STAFFS", href: "/school-staffs" },
    ],
  },
  {
    label: "COURSES",
    href: "/courses",
    icon: "BookOpen",
    children: [
      { label: "+2", href: "/courses#plus-two" },
      { label: "SCHOOL", href: "/courses#school" },
    ],
  },
  {
    label: "NOTICE",
    href: "/notices",
    icon: "Bell",
  },
  { label: "GALLERY", href: "/gallery", icon: "Camera" },
  { label: "CONTACT", href: "/contact", icon: "Phone" },
];

export const LEADERSHIP = {
  principal: {
    name: "Surya Bahadur Chand",
    role: "Principal",
    image: ASSETS.principal,
    quote:
      "I warmly welcome you to the RSS family. Our commitment is to lead with enthusiasm, work closely with parents, and provide a safe, productive learning environment where every child can grow with confidence.",
  },
  vicePrincipal: {
    name: "Academic Coordinator",
    role: "Academic Team",
    image: ASSETS.vp,
    quote:
      "The strength of our school is built every morning through punctual classrooms, honest feedback, and a steady partnership between teachers, students, and guardians.",
  },
  administrator: {
    name: "Administration Office",
    role: "RSS Administration",
    image: ASSETS.admin,
    quote:
      "Behind every well-run classroom is a circle of care, coordinating staff, guardians, and resources so that learning never stops at our gate.",
  },
};
