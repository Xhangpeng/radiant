import { useEffect, useState } from "react";
import type { NoticeDocument } from "@/components/NoticeViewerModal";

export type GalleryCategory = "all" | "campus" | "learning" | "activities" | "events";

export interface GalleryItem {
  id: string;
  src: string;
  category: Exclude<GalleryCategory, "all">;
  title: string;
  desc: string;
}

export interface SchoolStaffMember {
  id: string;
  name: string;
  designation: string;
  expertise?: string;
  officialRole: string;
  image: string;
}

export interface SchoolStaffCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  members: SchoolStaffMember[];
}

export interface SecondaryStaffMember {
  id: string;
  name: string;
  expertise: string;
  image: string;
}

export interface SecondaryDepartment {
  id: string;
  title: string;
  summary: string;
  icon: string;
  members: SecondaryStaffMember[];
}

export interface FacultyContent {
  schoolStaffCategories: SchoolStaffCategory[];
  secondaryDepartments: SecondaryDepartment[];
}

export interface SiteContent {
  site: {
    schoolName: string;
    tagline: string;
    location: string;
    contact: string;
    email: string;
    admissionCta: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    highlights: Array<{
      label: string;
      value: string;
      note: string;
    }>;
  };
  gallery: GalleryItem[];
  notices: NoticeDocument[];
  faculty: FacultyContent;
  updatedAt?: string;
}

export const defaultGalleryItems: GalleryItem[] = [
  { id: "gal-1", src: "/radiant-gallery/school background.jpg", category: "campus", title: "Radiant School Campus", desc: "The school environment where everyday learning, discipline, and student life come together." },
  { id: "gal-2", src: "/radiant-gallery/img1.jpg", category: "campus", title: "Campus Moment 01", desc: "A selected glimpse from Radiant Secondary School's daily campus life." },
  { id: "gal-3", src: "/radiant-gallery/img2.jpg", category: "campus", title: "Campus Moment 02", desc: "Students and school spaces captured as part of the Radiant learning environment." },
  { id: "gal-4", src: "/radiant-gallery/img3.jpg", category: "campus", title: "Campus Moment 03", desc: "A clean view of school life, movement, and togetherness on campus." },
  { id: "gal-5", src: "/radiant-gallery/img4.jpg", category: "campus", title: "Campus Moment 04", desc: "A memory from the school premises showing the spirit of Radiant." },
  { id: "gal-6", src: "/radiant-gallery/img5.jpg", category: "campus", title: "Campus Moment 05", desc: "Everyday school life presented with a focus on student presence and atmosphere." },
  { id: "gal-7", src: "/radiant-gallery/img6.jpg", category: "campus", title: "Campus Moment 06", desc: "A visual record of Radiant's active and welcoming school setting." },
  { id: "gal-8", src: "/radiant-gallery/img7.jpg", category: "learning", title: "Learning Moment 01", desc: "A classroom-focused memory from Radiant's academic journey." },
  { id: "gal-9", src: "/radiant-gallery/img8.jpg", category: "learning", title: "Learning Moment 02", desc: "Students growing through guided study, participation, and practical learning." },
  { id: "gal-10", src: "/radiant-gallery/img9.jpg", category: "learning", title: "Learning Moment 03", desc: "A thoughtful academic moment from the school gallery collection." },
  { id: "gal-11", src: "/radiant-gallery/img10.jpg", category: "learning", title: "Learning Moment 04", desc: "A snapshot of classroom energy and student engagement." },
  { id: "gal-12", src: "/radiant-gallery/img11.jpg", category: "learning", title: "Learning Moment 05", desc: "Radiant's learning culture shown through focused student activity." },
  { id: "gal-13", src: "/radiant-gallery/img12.jpg", category: "learning", title: "Learning Moment 06", desc: "A school memory connected with academic practice and classroom participation." },
  { id: "gal-14", src: "/radiant-gallery/img13.jpg", category: "learning", title: "Learning Moment 07", desc: "Students participating in a meaningful academic moment at school." },
  { id: "gal-15", src: "/radiant-gallery/img14.jpg", category: "learning", title: "Learning Moment 08", desc: "A gallery image reflecting study, attention, and guided growth." },
  { id: "gal-16", src: "/radiant-gallery/img15.jpg", category: "activities", title: "Activity Moment 01", desc: "A co-curricular memory from Radiant's broader school experience." },
  { id: "gal-17", src: "/radiant-gallery/img16.jpg", category: "activities", title: "Activity Moment 02", desc: "Students taking part in activities that build confidence beyond textbooks." },
  { id: "gal-18", src: "/radiant-gallery/img18.jpg", category: "activities", title: "Activity Moment 03", desc: "A lively school activity captured as part of Radiant's student development." },
  { id: "gal-19", src: "/radiant-gallery/img20.jpg", category: "activities", title: "Activity Moment 04", desc: "Co-curricular participation strengthening teamwork, discipline, and expression." },
  { id: "gal-20", src: "/radiant-gallery/img21.jpg", category: "activities", title: "Activity Moment 05", desc: "A memorable student activity from the Radiant school community." },
  { id: "gal-21", src: "/radiant-gallery/img22.jpg", category: "activities", title: "Activity Moment 06", desc: "A school life image highlighting participation and shared experience." },
  { id: "gal-22", src: "/radiant-gallery/img23.jpg", category: "activities", title: "Activity Moment 07", desc: "An active moment from school programs and student engagement." },
  { id: "gal-23", src: "/radiant-gallery/img25.jpg", category: "events", title: "Event Memory 01", desc: "A special school event preserved in Radiant's photo gallery." },
  { id: "gal-24", src: "/radiant-gallery/img27.jpg", category: "events", title: "Event Memory 02", desc: "A celebration, gathering, or school program moment from Radiant." },
  { id: "gal-25", src: "/radiant-gallery/img29.jpg", category: "events", title: "Event Memory 03", desc: "A community memory showing student presence and school spirit." },
  { id: "gal-26", src: "/radiant-gallery/img30.jpg", category: "events", title: "Event Memory 04", desc: "A selected school event image from the new Radiant gallery set." },
  { id: "gal-27", src: "/radiant-gallery/img31.jpg", category: "events", title: "Event Memory 05", desc: "A captured moment from school programs, celebrations, or assemblies." },
  { id: "gal-28", src: "/radiant-gallery/img32.jpg", category: "events", title: "Event Memory 06", desc: "Radiant's shared school memories presented through real gallery images." },
  { id: "gal-29", src: "/radiant-gallery/img33.jpg", category: "events", title: "Event Memory 07", desc: "A meaningful event memory from the Radiant Secondary School community." },
  { id: "gal-30", src: "/radiant-gallery/img34.jpg", category: "events", title: "Event Memory 08", desc: "A school program moment showing the energy of Radiant students." },
  { id: "gal-31", src: "/radiant-gallery/img35.jpg", category: "events", title: "Event Memory 09", desc: "A final selected memory from the uploaded Radiant gallery collection." },
];

export const defaultNotices: NoticeDocument[] = [
  {
    id: 1,
    title: "Admission open for academic session 2082 BS",
    category: "notice",
    date: "2082-04-12",
    refNo: "SBSS/ADM/2082/001",
    publishedDate: "Baishakh 12, 2082 BS",
    content: {
      salutation: "To all Parents, Guardians, and Aspiring Students,",
      introduction: "Radiant Secondary School is pleased to announce that online and physical admission registration for the upcoming academic session 2082 B.S. is open.",
      bulletPoints: [
        "ECD & Primary School focuses on foundational cognitive skills, language literacy, and arts.",
        "Lower Secondary introduces computer science, physical sciences, and local social studies.",
        "Secondary School follows the government approved curriculum for the SEE Board Track.",
        "+2 Science and Management streams are open for Grade XI-XII admission.",
      ],
      instructionsTitle: "Admission Procedure & Documents Required:",
      instructions: [
        "Collect the official Admission Form from the administration desk or submit an inquiry online.",
        "Submit the filled form with birth certificate and two passport-sized photos.",
        "Provide transfer certificate and previous school records where applicable.",
      ],
      closing: "For fee structures and scholarships, please contact the admission cell directly.",
      signatoryName: "Surya Bahadur Chand",
      signatoryTitle: "Principal, RSS",
    },
  },
  {
    id: 2,
    title: "First-term examination routine published",
    category: "exam",
    date: "2082-03-28",
    refNo: "SBSS/EXM/2082/045",
    publishedDate: "Ashad 28, 2082 BS",
    content: {
      salutation: "Dear Students, Teachers, and Guardians,",
      introduction: "The First-Term Examination for academic session 2082 B.S. has been scheduled. All students must prepare according to the published routine.",
      bulletPoints: ["Grades 1 to 5: morning oral and written evaluations.", "Grades 6 to 10: written examinations.", "+2 Science and Management: terminal papers."],
      instructionsTitle: "Exam Guidelines:",
      instructions: ["Collect admit cards from class teachers.", "Arrive 20 minutes before exam time.", "Mobile phones and unauthorized papers are prohibited."],
      closing: "Normal classes resume after the examination period.",
      signatoryName: "Examination Committee",
      signatoryTitle: "Radiant Secondary School",
    },
  },
  {
    id: 3,
    title: "Annual cultural programme",
    category: "event",
    date: "2082-03-05",
    refNo: "SBSS/EVE/2082/012",
    publishedDate: "Ashad 05, 2082 BS",
    content: {
      salutation: "To guardians and well-wishers,",
      introduction: "We are pleased to invite the school community to Radiant Annual Programme 2082.",
      bulletPoints: ["Traditional dance performances.", "Drama, poetry, quiz, and debate.", "Science and arts exhibition."],
      instructionsTitle: "Event Details:",
      instructions: ["Venue: school ground.", "Guests are requested to be seated before the opening ceremony.", "Please follow school security guidance."],
      closing: "We look forward to your presence and support.",
      signatoryName: "Surya Bahadur Chand",
      signatoryTitle: "Principal / Festival Coordinator",
    },
  },
  {
    id: 4,
    title: "Inter-house athletics meet results announced",
    category: "event",
    date: "2082-02-18",
    refNo: "SBSS/SPO/2082/008",
    publishedDate: "Jestha 18, 2082 BS",
    content: {
      salutation: "To all students and house captains,",
      introduction: "The Annual Inter-House Athletics Meet 2082 has concluded successfully.",
      bulletPoints: ["Overall champion trophy announced.", "Best athlete awards will be distributed in assembly.", "Certificates will be provided to participating students."],
      instructionsTitle: "Post-Sports Meet Directives:",
      instructions: ["House captains must return sports materials.", "A special assembly will be held for awards."],
      closing: "Congratulations to all participants.",
      signatoryName: "Sports Department",
      signatoryTitle: "Radiant Secondary School",
    },
  },
  {
    id: 5,
    title: "Holiday notice on the occasion of Majdoor Divas",
    category: "notice",
    date: "2082-02-01",
    refNo: "SBSS/ADM/2082/032",
    publishedDate: "Baishakh 18, 2082 BS",
    content: {
      salutation: "To all faculty, staff, and students,",
      introduction: "Radiant Secondary School will remain closed on International Workers' Day.",
      bulletPoints: ["There will be no physical or online classes.", "The administration office will also remain closed."],
      instructionsTitle: "Important Guidelines:",
      instructions: ["Classes resume as per regular timetable on the next working day.", "Students are advised to complete pending assignments."],
      closing: "We wish everyone a peaceful Workers' Day.",
      signatoryName: "Surya Bahadur Chand",
      signatoryTitle: "Principal",
    },
  },
];

export const defaultFacultyContent: FacultyContent = {
  schoolStaffCategories: [
    {
      id: "school-leadership",
      title: "School Leadership",
      description: "The leadership team guides academic planning, school culture, guardian coordination, and daily discipline.",
      icon: "BadgeCheck",
      members: [
        { id: "surya-chand", name: "MR. SURYA BDR. CHAND", designation: "PRINCIPAL (SECONDARY)", expertise: "ENGLISH / SOCIAL", officialRole: "PRINCIPAL(SECONDARY)(ENGLISH/SOCIAL)", image: "/radiant-assets/staff-hq/surya-bahadur-chand-principal.jpg" },
        { id: "usha-bista", name: "MRS. USHA BISTA", designation: "V-PRINCIPAL (BASIC)", expertise: "SCIENCE", officialRole: "V-PRINCIPAL(BASIC) (SCIENCE)", image: "/radiant-assets/staff-hq/usha-bista-vice-principal.jpg" },
      ],
    },
    {
      id: "secondary-level-faculty",
      title: "Secondary Level Faculty",
      description: "Subject teachers support senior students with focused instruction, board-level preparation, and academic confidence.",
      icon: "GraduationCap",
      members: [
        { id: "jagadiswori-pant", name: "MRS. JAGADISWORI PANT", designation: "TEACHER (SECONDARY)", expertise: "NEPALI", officialRole: "TEACHER (SECONDARY) (NEPALI)", image: "/radiant-assets/staff-hq/jagadiswori-pant.jpg" },
        { id: "ramesh-pant", name: "MR. RAMESH SINGH PANT", designation: "TEACHER (SECONDARY)", expertise: "MATHS", officialRole: "TEACHER(SECONDARY)(MATHS)", image: "/radiant-assets/staff-hq/ramesh-singh-pant.jpg" },
      ],
    },
    {
      id: "basic-level-faculty",
      title: "Basic Level Faculty",
      description: "The basic level team builds strong foundations in language, mathematics, computer learning, and social awareness.",
      icon: "BookOpen",
      members: [
        { id: "mohan-joshi", name: "MR. MOHAN DEV JOSHI", designation: "TEACHER (BASIC)", expertise: "ENGLISH", officialRole: "TEACHER(BASIC)(ENGLISH)", image: "/radiant-assets/staff-hq/mohan-dev-joshi.jpg" },
        { id: "nirajan-bhatt", name: "MR. NIRAJAN BHATT", designation: "TEACHER (BASIC)", expertise: "COMPUTER", officialRole: "TEACHER(BASIC)(COMPUTER)", image: "/radiant-assets/staff-hq/nirajan-bhatt.jpg" },
        { id: "sunita-karki", name: "MRS. SUNITA KARKI", designation: "TEACHER (BASIC)", expertise: "NEPALI", officialRole: "TEACHER(BASIC)(NEPALI)", image: "/radiant-assets/staff-hq/sunita-karki.jpg" },
        { id: "hari-joshi", name: "MR. HARI DATT JOSHI", designation: "TEACHER (BASIC)", expertise: "COMPUTER", officialRole: "TEACHER(BASIC)(COMPUTER)", image: "/radiant-assets/staff-hq/hari-datt-joshi.jpg" },
        { id: "keshab-joshi", name: "MR. KESHAB RAJ JOSHI", designation: "TEACHER (BASIC)", expertise: "MATH", officialRole: "TEACHER(BASIC)(MATH)", image: "/radiant-assets/staff-hq/keshab-raj-joshi.jpg" },
        { id: "dropati-chand", name: "MRS. DROPATI CHAND", designation: "TEACHER (BASIC)", expertise: "MATH", officialRole: "TEACHER(BASIC)(MATH)", image: "/radiant-assets/staff-hq/dropati-chand.jpg" },
        { id: "birendra-dhami", name: "MR. BIRENDRA BAHADUR DHAMI", designation: "TEACHER (BASIC)", expertise: "ENGLISH / SOCIAL", officialRole: "TEACHER(BASIC)(ENGLISH, SOCIAL)", image: "/radiant-assets/staff-hq/birendra-bahadur-dhami.jpg" },
      ],
    },
    {
      id: "pre-primary-faculty",
      title: "Pre-Primary Faculty",
      description: "Our early-grade teachers create a caring start for young learners through routine, confidence, and guided activities.",
      icon: "Sparkles",
      members: [
        { id: "kalpana-singh", name: "MRS. KALPANA SINGH", designation: "TEACHER (PRE-PRIMARY)", expertise: "GRADE", officialRole: "TEACHER(PRE-PRIMARY)(GRADE)", image: "/radiant-assets/staff-hq/kalpana-singh.jpg" },
        { id: "janaki-singh", name: "MRS. JANAKI SINGH", designation: "TEACHER (PRE-PRIMARY)", expertise: "GRADE", officialRole: "TEACHER(PRE-PRIMARY)(GRADE)", image: "/radiant-assets/staff-hq/janaki-singh.jpg" },
        { id: "janaki-pant", name: "MRS. JANAKI PANT", designation: "TEACHER (PRE-PRIMARY)", expertise: "GRADE", officialRole: "TEACHER(PRE-PRIMARY)(GRADE)", image: "/radiant-assets/staff-hq/janaki-pant.jpg" },
      ],
    },
    {
      id: "administration-support",
      title: "Administration & Support",
      description: "The office, accounts, and campus support team keep the school day organised, responsive, and safe.",
      icon: "Landmark",
      members: [
        { id: "sharda-raishal", name: "MRS. SHARDA RAISHAL", designation: "ACCOUNTANT", officialRole: "ACCOUNTANT", image: "/radiant-assets/staff-hq/sharda-raishal.jpg" },
        { id: "parwati-joshi", name: "MRS. PARWATI JOSHI", designation: "OFFICE ASSISTANT", officialRole: "OFFICE ASSISTANT", image: "/radiant-assets/staff-hq/parwati-joshi.jpg" },
        { id: "nam-bc", name: "MR. NAM BAHADUR BC", designation: "SECURITY GUARD", officialRole: "SECURITY GUARD", image: "/radiant-assets/staff-hq/nam-bahadur-bc.jpg" },
      ],
    },
    {
      id: "teaching-faculty",
      title: "Teaching Faculty",
      description: "Additional teaching staff strengthen classroom routines and support students across regular school programmes.",
      icon: "Users",
      members: [
        { id: "sagar-sunar", name: "MR. SAGAR SUNAR", designation: "TEACHER", officialRole: "TEACHER", image: "/radiant-assets/staff-hq/sagar-sunar.jpg" },
      ],
    },
  ],
  secondaryDepartments: [
    { id: "physics", title: "Department of Physics", summary: "Physics faculty for +2 science, practical concepts, and senior-level academic mentoring.", icon: "Atom", members: [
      { id: "bal-ram-ghimire", name: "Dr. Bal Ram Ghimire", expertise: "M.Sc. in Physics, Ph.D. from US (Physics)", image: "/radiant-assets/secondary-staff-named/bal-ram-ghimire.jpg" },
      { id: "bhawani-datt-joshi", name: "Dr. Bhawani Datt Joshi", expertise: "M.Sc. in Physics, Ph.D. and Post Doc. (Physics)", image: "/radiant-assets/secondary-staff-named/bhawani-datt-joshi.jpg" },
      { id: "ajaya-jha", name: "Dr. Ajaya Kumar Jha", expertise: "M.Sc. in Physics, Ph.D. (Physics)", image: "/radiant-assets/secondary-staff-named/ajaya-kumar-jha.jpg" },
      { id: "dipak-thapa", name: "Mr. Dipak Singh Thapa", expertise: "M.Sc. in Physics (Physics)", image: "/radiant-assets/secondary-staff-named/dipak-singh-thapa.jpg" },
      { id: "krishna-dev-bhatt", name: "Mr. Krishna Dev Bhatt", expertise: "M.Sc. in Physics (Physics)", image: "/radiant-assets/secondary-staff-named/krishna-dev-bhatt.jpg" },
      { id: "mahadev-awasthi", name: "Mr. Mahadev Awasthi", expertise: "M.Sc. in Physics (Physics)", image: "/radiant-assets/secondary-staff-named/mahadev-awasthi.jpg" },
      { id: "prakash-khatri", name: "Mr. Prakash Khatri", expertise: "M.Sc. in Physics (Physics)", image: "/radiant-assets/secondary-staff-named/prakash-khatri.jpg" },
      { id: "prakash-bokati", name: "Mr. Prakash Bokati", expertise: "M.Sc. in Physics (Physics)", image: "/radiant-assets/secondary-staff-named/prakash-bokati.jpg" },
    ] },
    { id: "chemistry", title: "Department of Chemistry", summary: "Chemistry faculty for theory, lab understanding, and NEB preparation.", icon: "FlaskConical", members: [
      { id: "ram-bahadur-kc", name: "Mr. Ram Bahadur KC", expertise: "M.Sc. in Chemistry (Chemistry)", image: "/radiant-assets/secondary-staff-named/ram-bahadur-kc.jpg" },
      { id: "bhawani-chand-thakuri", name: "Prof. Dr. Bhawani Chand Thakuri", expertise: "M.Sc. in Chemistry, Ph.D. (Chemistry)", image: "/radiant-assets/secondary-staff-named/bhawani-chand-thakuri.jpg" },
      { id: "bishan-airee", name: "Mr. Bishan Singh Airee", expertise: "M.Sc. in Chemistry (Chemistry)", image: "/radiant-assets/secondary-staff-named/bishan-singh-airee.jpg" },
      { id: "paras-chaudhary", name: "Prof. Dr. Paras Nath Chaudhary", expertise: "M.Sc. in Chemistry, Ph.D. (Chemistry)", image: "/radiant-assets/secondary-staff-named/paras-nath-chaudhary.jpg" },
      { id: "indra-mishra", name: "Mr. Indra Dev Mishra", expertise: "M.Sc. in Chemistry (Chemistry)", image: "/radiant-assets/secondary-staff-named/indra-dev-mishra.jpg" },
    ] },
    { id: "biology", title: "Department of Biology", summary: "Biology faculty covering botany, zoology, and practical science preparation.", icon: "Leaf", members: [
      { id: "karbir-khatri", name: "Dr. Karbir Singh Khatri", expertise: "M.Sc. in Botany, Ph.D. (Biology)", image: "/radiant-assets/secondary-staff-named/karbir-singh-khatri.jpg" },
      { id: "man-dev-bhatt", name: "Dr. Man Dev Bhatt", expertise: "M.Sc. in Botany, Ph.D. (Biology)", image: "/radiant-assets/secondary-staff-named/man-dev-bhatt.jpg" },
      { id: "mahadev-bist", name: "Dr. Mahadev Bist", expertise: "M.Sc. in Zoology, Ph.D. (Biology)", image: "/radiant-assets/secondary-staff-named/mahadev-bist.jpg" },
      { id: "santosh-pandey", name: "Mr. Santosh Pandey", expertise: "M.Sc. in Zoology (Biology)", image: "/radiant-assets/secondary-staff-named/santosh-pandey.jpg" },
    ] },
    { id: "english", title: "Department of English", summary: "English faculty for language, literature, communication, and senior academic writing.", icon: "BookOpen", members: [
      { id: "tribhuwan-bhatt", name: "Mr. Tribhuwan Kumar Bhatt", expertise: "M.A. in English, Sociology", image: "/radiant-assets/secondary-staff-named/tribhuwan-kumar-bhatt.jpg" },
      { id: "dhan-raj-bist", name: "Mr. Dhan Raj Bist", expertise: "M.A. in English", image: "/radiant-assets/secondary-staff-named/dhan-raj-bist.jpg" },
      { id: "sher-chand", name: "Mr. Sher Bahadur Chand", expertise: "M.A. in English", image: "/radiant-assets/secondary-staff-named/sher-bahadur-chand.jpg" },
      { id: "chandani-pant", name: "Mrs. Chandani Pant", expertise: "M.A. in English", image: "/radiant-assets/secondary-staff-named/chandani-pant.jpg" },
      { id: "ganesh-joshi", name: "Mr. Ganesh Joshi", expertise: "M.Ed. in English (English)", image: "/radiant-assets/secondary-staff-named/ganesh-joshi.jpg" },
      { id: "surya-chand-english", name: "Mr. Surya Bahadur Chand", expertise: "M.Ed. in English (English)", image: "/radiant-assets/staff-hq/surya-bahadur-chand-principal.jpg" },
    ] },
    { id: "nepali", title: "Department of Nepali", summary: "Nepali faculty supporting language depth, literature, and national curriculum mastery.", icon: "GraduationCap", members: [
      { id: "tika-dahal", name: "Mr. Tika Datt Dahal", expertise: "M.A., B.Ed. in Nepali, Ph.D. Scholar", image: "/radiant-assets/secondary-staff-named/tika-datt-dahal.jpg" },
      { id: "pabitra-saud", name: "Mrs. Pabitra Saud", expertise: "M.Ed. in Nepali", image: "/radiant-assets/secondary-staff-named/pabitra-saud.jpg" },
      { id: "dhurva-upadhyaya", name: "Mr. Dhurva Raj Upadhyaya", expertise: "M.Ed. in Nepali", image: "/radiant-assets/secondary-staff-named/dhurva-raj-upadhyaya.jpg" },
      { id: "hemanti-awasthi", name: "Mrs. Hemanti Awasthi", expertise: "M.Ed. in Nepali", image: "/radiant-assets/secondary-staff-named/hemanti-awasthi.jpg" },
      { id: "mohini-bhatt", name: "Ms. Mohini Bhatt", expertise: "M.Ed. in Nepali", image: "/radiant-assets/secondary-staff-named/mohini-bhatt.jpg" },
    ] },
    { id: "management", title: "Department of Management", summary: "Management faculty for computer science, accountancy, economics, and social science.", icon: "BadgeCheck", members: [
      { id: "ganesh-chataut", name: "Mr. Ganesh Pd. Chataut", expertise: "M.Sc. in CSIT (Computer Science)", image: "/radiant-assets/secondary-staff-named/ganesh-pd-chataut.jpg" },
      { id: "keshav-joshi", name: "Mr. Keshav Raj Joshi", expertise: "MBS (Business Studies / Account)", image: "/radiant-assets/staff-hq/keshab-raj-joshi.jpg" },
      { id: "krishna-bhandari", name: "Mr. Krishna Bhandari", expertise: "MBS (Account)", image: "/radiant-assets/secondary-staff-named/krishna-bhandari.jpg" },
      { id: "yagya-upadhyaya", name: "Mr. Yagya Raj Upadhyaya", expertise: "M.A. (Economics)", image: "/radiant-assets/secondary-staff-named/yagya-raj-upadhyaya.jpg" },
      { id: "jawahar-bist", name: "Mr. Jawahar Bist", expertise: "M.A. in Sociology", image: "/radiant-assets/secondary-staff-named/jawahar-bist.jpg" },
    ] },
    { id: "mathematics", title: "Department of Mathematics", summary: "Mathematics faculty for conceptual problem solving and senior-level exam readiness.", icon: "Calculator", members: [
      { id: "choodamani-joshi", name: "Prof. Dr. Choodamani Joshi", expertise: "M.Sc., Ph.D. in Mathematics (Math)", image: "/radiant-assets/secondary-staff-named/choodamani-joshi.jpg" },
      { id: "krishna-bahadur-chand", name: "Dr. Krishna Bahadur Chand", expertise: "M.Sc., Ph.D. in Mathematics (Math)", image: "/radiant-assets/secondary-staff-named/krishna-bahadur-chand.jpg" },
      { id: "ghan-shyam-pant", name: "Dr. Ghan Shyam Pant", expertise: "M.Sc., Ph.D. in Mathematics (Math)", image: "/radiant-assets/secondary-staff-named/ghan-shyam-pant.jpg" },
      { id: "kamal-bhandari", name: "Mr. Kamal Raj Bhandari", expertise: "M.A. in Mathematics (Math)", image: "/radiant-assets/secondary-staff-named/kamal-raj-bhandari.jpg" },
      { id: "yagya-pant", name: "Mr. Yagya Raj Pant", expertise: "M.A. in Mathematics (Math)", image: "/radiant-assets/secondary-staff-named/yagya-raj-pant.png" },
    ] },
  ],
};

export const defaultSiteContent: SiteContent = {
  site: {
    schoolName: "Radiant Secondary School",
    tagline: "Quality | Confidence | Character",
    location: "Bheemdatt Municipality-18, Mahendranagar",
    contact: "099-525169",
    email: "info@radiantmnr.edu.np",
    admissionCta: "Apply Now",
  },
  home: {
    heroTitle: "A disciplined school community for confident learners.",
    heroSubtitle:
      "Radiant Secondary School combines academic focus, practical exposure, and student care in Mahendranagar.",
    highlights: [
      { label: "Established", value: "2057 B.S.", note: "Serving families since 2000 A.D." },
      { label: "Programs", value: "School +2", note: "Science and Management streams" },
      { label: "Focus", value: "Care", note: "Guided academics and co-curricular growth" },
    ],
  },
  gallery: defaultGalleryItems,
  notices: defaultNotices,
  faculty: defaultFacultyContent,
};

export function mergeContent(content?: Partial<SiteContent>): SiteContent {
  const isLegacyEmptySeed =
    !content?.faculty &&
    Array.isArray(content?.gallery) &&
    content.gallery.length === 0 &&
    Array.isArray(content?.notices) &&
    content.notices.length === 0;

  return {
    ...defaultSiteContent,
    ...content,
    site: { ...defaultSiteContent.site, ...content?.site },
    home: { ...defaultSiteContent.home, ...content?.home },
    gallery:
      Array.isArray(content?.gallery) && !isLegacyEmptySeed
        ? content.gallery
        : defaultGalleryItems,
    notices:
      Array.isArray(content?.notices) && !isLegacyEmptySeed
        ? content.notices
        : defaultNotices,
    faculty: {
      schoolStaffCategories: Array.isArray(content?.faculty?.schoolStaffCategories)
        ? content.faculty.schoolStaffCategories
        : defaultFacultyContent.schoolStaffCategories,
      secondaryDepartments: Array.isArray(content?.faculty?.secondaryDepartments)
        ? content.faculty.secondaryDepartments
        : defaultFacultyContent.secondaryDepartments,
    },
  };
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/content", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (alive && data) setContent(mergeContent(data));
      })
      .catch(() => {
        if (alive) setContent(defaultSiteContent);
      })
      .finally(() => {
        if (alive) setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { content, isLoading };
}
