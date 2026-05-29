import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Language = "en" | "ne";

interface LanguageContextValue {
  language: Language;
  isNepali: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
}

const STORAGE_KEY = "bhuwaneshwori-language";

const nepalTranslations: Record<string, string> = {
  "Shree Bhuwaneshwori Secondary School": "श्री भुवनेश्वरी माध्यमिक विद्यालय",
  "Bhuwaneshwori Secondary School": "भुवनेश्वरी माध्यमिक विद्यालय",
  "Bhuwaneshwori School": "भुवनेश्वरी विद्यालय",
  "Shree Bhuwaneshwori": "श्री भुवनेश्वरी",
  "BHUWANESHWORI": "भुवनेश्वरी",
  "Secondary School": "माध्यमिक विद्यालय",
  "Secondary School Â· Estd. 2036 BS": "माध्यमिक विद्यालय · स्थापना २०३६ बि.सं.",
  "Secondary School · Estd. 2036 BS": "माध्यमिक विद्यालय · स्थापना २०३६ बि.सं.",
  "DISCIPLINE Â· KNOWLEDGE Â· SERVICE": "अनुशासन · ज्ञान · सेवा",
  "Discipline Â· Knowledge Â· Service": "अनुशासन · ज्ञान · सेवा",
  "Discipline · Knowledge · Service": "अनुशासन · ज्ञान · सेवा",
  "Shishaiya, Bedkot Municipality-6": "शिसैया, बेदकोट नगरपालिका-६",
  "Kanchanpur, Sudurpashchim": "कञ्चनपुर, सुदूरपश्चिम",
  "Bedkot-6, Kanchanpur": "बेदकोट-६, कञ्चनपुर",
  "Bedkot-6": "बेदकोट-६",
  "Bedkot-6 Â· Kanchanpur": "बेदकोट-६ · कञ्चनपुर",
  "Bedkot-6, Shishaiya, Kanchanpur": "बेदकोट-६, शिसैया, कञ्चनपुर",
  "Sudurpashchim Province, Nepal": "सुदूरपश्चिम प्रदेश, नेपाल",
  "Shishaiya, Bedkot-6": "शिसैया, बेदकोट-६",
  "Established 2036 BS": "स्थापना २०३६ बि.सं.",
  "Established": "स्थापना",
  "Estd.": "स्थापना",
  "2036 B.S.": "२०३६ बि.सं.",
  "1979 A.D.": "१९७९ ई.",
  "2036 BS": "२०३६ बि.सं.",
  "2082 BS": "२०८२ बि.सं.",
  "Home": "गृहपृष्ठ",
  "About": "हाम्रो बारेमा",
  "Courses": "पाठ्यक्रम",
  "Gallery": "ग्यालरी",
  "Notices": "सूचना",
  "Contact": "सम्पर्क",
  "Apply Now": "अहिले आवेदन दिनुहोस्",
  "Apply": "आवेदन",
  "Download School App": "विद्यालय एप डाउनलोड गर्नुहोस्",
  "App Installed": "एप इन्स्टल भयो",
  "Open navigation": "नेभिगेसन खोल्नुहोस्",
  "Close navigation": "नेभिगेसन बन्द गर्नुहोस्",
  "Download": "डाउनलोड",
  "Explore": "अन्वेषण",
  "Contact Office Â· Bedkot": "कार्यालय सम्पर्क · बेदकोट",
  "Welcome to": "स्वागत छ",
  "Excellence in Education Since": "देखि शिक्षा उत्कृष्टता",
  "Empowering students of": "का विद्यार्थीहरूलाई",
  "with quality education, disciplined values, and holistic development. A community-rooted school shaping confident, capable, and responsible learners since": "गुणस्तरीय शिक्षा, अनुशासित मूल्य र समग्र विकासद्वारा सक्षम बनाउँदै। समुदायमा जरा गाडेको विद्यालय, जसले स्थापना कालदेखि आत्मविश्वासी, सक्षम र जिम्मेवार विद्यार्थी तयार गर्दै आएको छ",
  "Learn More": "थप जान्नुहोस्",
  "EST. 2036 BS": "स्थापना २०३६ बि.सं.",
  "BEDKOT-6, KANCHANPUR": "बेदकोट-६, कञ्चनपुर",
  "45+ Years": "४५+ वर्ष",
  "Of Quiet Service": "निष्ठापूर्ण सेवाका",
  "About Bhuwaneshwori": "भुवनेश्वरीको बारेमा",
  "A community-rooted school where": "समुदायसँग जोडिएको विद्यालय जहाँ",
  "discipline": "अनुशासन",
  "learning": "सिकाइ",
  "and": "र",
  "grow together.": "सँगसँगै बढ्छन्।",
  "Established in": "स्थापना",
  "Shree Bhuwaneshwori Secondary School was established in 2036 B.S. (1979 A.D.) with a clear promise: to provide dependable, character-rich education for the families of Shishaiya and the wider Bedkot Municipality. What began as a modest village school has grown, over four decades, into a trusted secondary institution where generations of Sudurpashchim students have found their footing.": "श्री भुवनेश्वरी माध्यमिक विद्यालय २०३६ बि.सं. (१९७९ ई.) मा शिसैया र व्यापक बेदकोट नगरपालिकाका परिवारलाई भरपर्दो र चरित्रयुक्त शिक्षा प्रदान गर्ने स्पष्ट उद्देश्यका साथ स्थापना भएको हो। साधारण गाउँ विद्यालयका रूपमा सुरु भएको यो संस्था चार दशकमा सुदूरपश्चिमका पुस्ताहरूले आफ्नो आधार पाएको विश्वसनीय माध्यमिक विद्यालय बनेको छ।",
  "Shree Bhuwaneshwori Secondary School has spent more than four decades guiding the children of Shishaiya and the wider Bedkot Municipality. Our culture combines classroom discipline with the warmth of a close community â€” students learn through lectures, projects, sports, and cultural programmes that build capable, cooperative, and responsible young people.": "श्री भुवनेश्वरी माध्यमिक विद्यालयले चार दशकभन्दा बढी समय शिसैया र बेदकोट नगरपालिकाका बालबालिकालाई मार्गदर्शन गर्दै बिताएको छ। हाम्रो संस्कृतिले कक्षाकोठाको अनुशासनलाई समुदायको आत्मीयतासँग जोड्छ, जहाँ विद्यार्थीहरूले व्याख्यान, परियोजना, खेलकुद र सांस्कृतिक कार्यक्रममार्फत सक्षम, सहयोगी र जिम्मेवार व्यक्ति बन्न सिक्छन्।",
  "Shree Bhuwaneshwori Secondary School has spent more than four decades guiding the children of Shishaiya and the wider Bedkot Municipality. Our culture combines classroom discipline with the warmth of a close community — students learn through lectures, projects, sports, and cultural programmes that build capable, cooperative, and responsible young people.": "श्री भुवनेश्वरी माध्यमिक विद्यालयले चार दशकभन्दा बढी समय शिसैया र बेदकोट नगरपालिकाका बालबालिकालाई मार्गदर्शन गर्दै बिताएको छ। हाम्रो संस्कृतिले कक्षाकोठाको अनुशासनलाई समुदायको आत्मीयतासँग जोड्छ, जहाँ विद्यार्थीहरूले व्याख्यान, परियोजना, खेलकुद र सांस्कृतिक कार्यक्रममार्फत सक्षम, सहयोगी र जिम्मेवार व्यक्ति बन्न सिक्छन्।",
  "The school takes its name and spirit from the goddess Bhuwaneshwori â€” a reminder that knowledge, when offered as service, is its own form of devotion.": "विद्यालयको नाम र भावना देवी भुवनेश्वरीबाट आएको हो, जसले सेवा भावले दिइएको ज्ञान आफैँमा भक्तिको स्वरूप हो भन्ने सम्झाउँछ।",
  "The school takes its name and spirit from the goddess Bhuwaneshwori — a reminder that knowledge, when offered as service, is its own form of devotion.": "विद्यालयको नाम र भावना देवी भुवनेश्वरीबाट आएको हो, जसले सेवा भावले दिइएको ज्ञान आफैँमा भक्तिको स्वरूप हो भन्ने सम्झाउँछ।",
  "Safe, secure campus": "सुरक्षित विद्यालय परिसर",
  "Caring teacherâ€“student bond": "शिक्षक–विद्यार्थीबीच आत्मीय सम्बन्ध",
  "SEE-focused academics": "SEE केन्द्रित अध्ययन",
  "Cultural & sports tradition": "सांस्कृतिक र खेलकुद परम्परा",
  "Read full story": "पूरा कथा पढ्नुहोस्",
  "Why Bhuwaneshwori": "किन भुवनेश्वरी",
  "Why Choose Bhuwaneshwori?": "किन भुवनेश्वरी रोज्ने?",
  "Six everyday commitments that shape the character of every student who walks through our gate.": "हाम्रो ढोकाबाट प्रवेश गर्ने प्रत्येक विद्यार्थीको चरित्र निर्माण गर्ने छ दैनिक प्रतिबद्धताहरू।",
  "Dedicated Faculty": "समर्पित शिक्षक समूह",
  "Experienced teachers who invest in each student's progress, character, and confidence â€” not just exam scores.": "अनुभवी शिक्षकहरू जसले परीक्षाको अंक मात्र होइन, विद्यार्थीको प्रगति, चरित्र र आत्मविश्वासमा लगानी गर्छन्।",
  "Practical Learning": "व्यावहारिक सिकाइ",
  "Projects, presentations, field exposure, and lab work make knowledge usable in real life.": "परियोजना, प्रस्तुति, क्षेत्रीय अनुभव र प्रयोगशालाले ज्ञानलाई वास्तविक जीवनमा उपयोगी बनाउँछ।",
  "SEE Track Record": "SEE नतिजाको इतिहास",
  "Consistent, dependable secondary results across science, mathematics, language, and social sciences.": "विज्ञान, गणित, भाषा र सामाजिक अध्ययनमा लगातार भरपर्दो माध्यमिक नतिजा।",
  "Holistic Development": "समग्र विकास",
  "Sports, music, dance, and cultural programmes that build well-rounded young people.": "खेलकुद, संगीत, नृत्य र सांस्कृतिक कार्यक्रमहरूले बहुआयामिक युवा तयार गर्छन्।",
  "Safe Environment": "सुरक्षित वातावरण",
  "A secure, respectful campus with caring staff watching over every student's wellbeing.": "प्रत्येक विद्यार्थीको हितमा ध्यान दिने कर्मचारीसहित सुरक्षित र सम्मानजनक वातावरण।",
  "Community Partnership": "समुदायसँग सहकार्य",
  "A steady, honest partnership between teachers, students, and guardians â€” every single morning.": "शिक्षक, विद्यार्थी र अभिभावकबीच हरेक दिनको स्थिर र इमानदार सहकार्य।",
  "Academic Levels": "शैक्षिक तहहरू",
  "Programs that meet students where they are.": "विद्यार्थीको अवस्थासँग मेल खाने कार्यक्रमहरू।",
  "From the early grades through the SEE board, our academic ladder is designed to grow alongside each child â€” slowly, surely, and with real teacher attention at every step.": "प्रारम्भिक कक्षादेखि SEE सम्म, हाम्रो शैक्षिक मार्ग प्रत्येक बालबालिकासँगै क्रमिक, स्थिर र शिक्षकको वास्तविक ध्यानसहित बढ्ने गरी तयार गरिएको छ।",
  "Primary Level": "प्राथमिक तह",
  "Grades 1 â€” 5": "कक्षा १ — ५",
  "Foundational literacy, numeracy, and habit-building in a warm, structured environment.": "न्यानो र व्यवस्थित वातावरणमा आधारभूत साक्षरता, संख्याज्ञान र राम्रो बानी निर्माण।",
  "Basic English & Nepali Literacy": "आधारभूत अंग्रेजी र नेपाली साक्षरता",
  "Fun Mathematics Foundations": "रमाइलो गणितीय आधार",
  "Creative Arts & Social Habits": "सिर्जनात्मक कला र सामाजिक बानी",
  "Individual Attention & Care": "व्यक्तिगत ध्यान र हेरचाह",
  "Lower Secondary": "निम्न माध्यमिक",
  "Grades 6 â€” 8": "कक्षा ६ — ८",
  "Strengthening core subjects with hands-on activities, projects, and growing responsibility.": "क्रियाकलाप, परियोजना र जिम्मेवारीको विकासमार्फत मुख्य विषयहरू सुदृढ पार्ने।",
  "Integrated Science & Tech": "एकीकृत विज्ञान र प्रविधि",
  "Advanced Math & Social Studies": "उन्नत गणित र सामाजिक अध्ययन",
  "Language & Writing Workshops": "भाषा र लेखन अभ्यास",
  "Group Projects & Field Trips": "समूह परियोजना र शैक्षिक भ्रमण",
  "Secondary Level": "माध्यमिक तह",
  "Grades 9 â€” 10 Â· SEE": "कक्षा ९ — १० · SEE",
  "Focused, exam-ready preparation across science, mathematics, language, and social studies.": "विज्ञान, गणित, भाषा र सामाजिक अध्ययनमा परीक्षा केन्द्रित तयारी।",
  "Dedicated SEE Prep Classes": "विशेष SEE तयारी कक्षा",
  "Practical Science & Computer Labs": "व्यावहारिक विज्ञान र कम्प्युटर प्रयोगशाला",
  "Mock Exams & Detailed Feedback": "नमूना परीक्षा र विस्तृत प्रतिक्रिया",
  "Career & Stream Counselling": "करियर र विषयधारा परामर्श",
  "Explore Details": "विस्तृत हेर्नुहोस्",
  "Curriculum": "पाठ्यक्रम",
  "Shree Bhuwaneshwori Academic Program": "श्री भुवनेश्वरी शैक्षिक कार्यक्रम",
  "Notices & Events": "सूचना तथा कार्यक्रम",
  "Latest from the school": "विद्यालयका पछिल्ला अपडेट",
  "View all": "सबै हेर्नुहोस्",
  "Admission open for academic session 2082 BS": "शैक्षिक सत्र २०८२ बि.सं. का लागि भर्ना खुला",
  "Forms available at the school office. Limited seats across Grade 1 to Grade 9.": "फाराम विद्यालय कार्यालयमा उपलब्ध छन्। कक्षा १ देखि ९ सम्म सीमित सिट।",
  "First-term examination routine published": "पहिलो त्रैमासिक परीक्षा तालिका प्रकाशित",
  "Routines for all grades have been shared with class teachers and parents.": "सबै कक्षाको तालिका कक्षा शिक्षक र अभिभावकसँग साझा गरिएको छ।",
  "Annual cultural programme â€” Bhuwaneshwori Mahotsav": "वार्षिक सांस्कृतिक कार्यक्रम — भुवनेश्वरी महोत्सव",
  "A full day of music, dance, and student performances. Guardians cordially invited.": "संगीत, नृत्य र विद्यार्थी प्रस्तुतिको पूरा दिन। अभिभावकलाई हार्दिक निमन्त्रणा।",
  "Inter-house athletics meet results announced": "अन्तर सदन एथलेटिक्स प्रतियोगिताको नतिजा सार्वजनिक",
  "Congratulations to Sagarmatha House for retaining the overall championship.": "समग्र च्याम्पियनसिप कायम राखेकोमा सगरमाथा सदनलाई बधाई।",
  "View all notices": "सबै सूचना हेर्नुहोस्",
  "Message Â· Principal": "सन्देश · प्रधानाध्यापक",
  "Message · Principal": "सन्देश · प्रधानाध्यापक",
  "A word from our Principal": "हाम्रो प्रधानाध्यापकको सन्देश",
  "At Shree Bhuwaneshwori, our responsibility is not only to complete a syllabus, but to shape young people who can think clearly, act with discipline, and serve their community with quiet courage.": "श्री भुवनेश्वरीमा हाम्रो जिम्मेवारी पाठ्यक्रम पूरा गर्नु मात्र होइन; स्पष्ट सोच्ने, अनुशासनपूर्वक काम गर्ने र शान्त साहसका साथ समुदायको सेवा गर्ने युवा तयार गर्नु हो।",
  "Read leadership messages": "नेतृत्व सन्देश पढ्नुहोस्",
  "Our Achievement": "हाम्रा उपलब्धि",
  "Our Achievements": "हाम्रा उपलब्धिहरू",
  "Four decades of community impact": "समुदायमा चार दशकको प्रभाव",
  "Each number is a quiet daily commitment from teachers, students, and guardians â€” repeated, year after year.": "प्रत्येक संख्या शिक्षक, विद्यार्थी र अभिभावकको दैनिक प्रतिबद्धताको प्रतिफल हो, वर्षौं वर्ष दोहोरिएको।",
  "Each number is a quiet daily commitment from teachers, students, and guardians — repeated, year after year.": "प्रत्येक संख्या शिक्षक, विद्यार्थी र अभिभावकको दैनिक प्रतिबद्धताको प्रतिफल हो, वर्षौं वर्ष दोहोरिएको।",
  "Students Enrolled": "भर्ना भएका विद्यार्थी",
  "Faculty & Staff": "शिक्षक तथा कर्मचारी",
  "Years of Excellence": "उत्कृष्टताका वर्ष",
  "Years of Service": "सेवाका वर्ष",
  "SEE Success Rate": "SEE सफलता दर",
  "Class Levels": "कक्षा तहहरू",
  "Campus Life": "विद्यालय जीवन",
  "A Living Campus": "जीवन्त विद्यालय परिसर",
  "Glimpses of student life â€” focused classrooms, cultural celebration, and the everyday rhythm of community learning.": "विद्यार्थी जीवनका झलकहरू — केन्द्रित कक्षा, सांस्कृतिक उत्सव र सामुदायिक सिकाइको दैनिक लय।",
  "Glimpses of student life — focused classrooms, cultural celebration, and the everyday rhythm of community learning.": "विद्यार्थी जीवनका झलकहरू — केन्द्रित कक्षा, सांस्कृतिक उत्सव र सामुदायिक सिकाइको दैनिक लय।",
  "Classroom Learning": "कक्षाकोठा सिकाइ",
  "Student Activity": "विद्यार्थी क्रियाकलाप",
  "School Campus": "विद्यालय परिसर",
  "Morning Assembly": "प्रातः सभा",
  "Cultural Programme": "सांस्कृतिक कार्यक्रम",
  "Focused Study": "केन्द्रित अध्ययन",
  "Admission Open Â· 2082 BS": "भर्ना खुला · २०८२ बि.सं.",
  "Admission Open · 2082 BS": "भर्ना खुला · २०८२ बि.सं.",
  "Begin a confident academic journey in Bedkot.": "बेदकोटमा आत्मविश्वासी शैक्षिक यात्रा सुरु गर्नुहोस्।",
  "Visit our campus at": "हाम्रो परिसर",
  "meet our teachers, and learn how Bhuwaneshwori can shape your child's school years with discipline, knowledge, and care.": "मा आउनुहोस्, शिक्षकसँग भेट्नुहोस् र भुवनेश्वरीले तपाईंको बालबालिकाको विद्यालय जीवनलाई अनुशासन, ज्ञान र हेरचाहले कसरी आकार दिन्छ जान्नुहोस्।",
  "Admission Enquiry": "भर्ना सम्बन्धी सोधपुछ",
  "About Us": "हाम्रो बारेमा",
  "A community-rooted secondary school in Shishaiya, Bedkot Municipality-6 â€” shaped by community trust, practical learning, and the belief that students grow best when academics and character move together.": "शिसैया, बेदकोट नगरपालिका-६ मा अवस्थित समुदायसँग जोडिएको माध्यमिक विद्यालय — सामुदायिक विश्वास, व्यावहारिक सिकाइ र अध्ययनसँगै चरित्र बढ्नुपर्छ भन्ने विश्वासबाट आकारिएको।",
  "A community-rooted secondary school in Shishaiya, Bedkot Municipality-6 — shaped by community trust, practical learning, and the belief that students grow best when academics and character move together.": "शिसैया, बेदकोट नगरपालिका-६ मा अवस्थित समुदायसँग जोडिएको माध्यमिक विद्यालय — सामुदायिक विश्वास, व्यावहारिक सिकाइ र अध्ययनसँगै चरित्र बढ्नुपर्छ भन्ने विश्वासबाट आकारिएको।",
  "Our Story": "हाम्रो कथा",
  "Messages": "सन्देशहरू",
  "Section 01": "खण्ड ०१",
  "Section 02": "खण्ड ०२",
  "A Brief History": "संक्षिप्त इतिहास",
  "Built from": "निर्माण भएको",
  "community trust": "सामुदायिक विश्वासबाट",
  ", carried forward by students.": ", विद्यार्थीहरूले अघि बढाएको।",
  "with a clear promise: to provide dependable, character-rich education for the families of Shishaiya and the wider Bedkot Municipality. What began as a modest village school has grown, over four decades, into a trusted secondary institution where generations of Sudurpashchim students have found their footing.": "स्पष्ट उद्देश्यसहित स्थापना भयो: शिसैया र बेदकोट क्षेत्रका परिवारलाई भरपर्दो र चरित्रयुक्त शिक्षा प्रदान गर्ने। साधारण गाउँ विद्यालयका रूपमा सुरु भएको संस्था चार दशकमा सुदूरपश्चिमका पुस्ताहरूले आफ्नो आधार पाएको विश्वसनीय माध्यमिक विद्यालय बनेको छ।",
  "Our school culture combines classroom discipline with the warmth of a close community. Students learn through lectures, projects, presentations, sports, picnics, and cultural programmes that help them become capable, cooperative, and responsible young people. The school takes its name â€” and its spirit â€” from the goddess Bhuwaneshwori, whose presence on our crest reminds us that knowledge, when offered as service, is its own form of devotion.": "हाम्रो विद्यालय संस्कृतिले कक्षाकोठाको अनुशासनलाई नजिकको समुदायको न्यानोपनसँग जोड्छ। विद्यार्थीहरूले व्याख्यान, परियोजना, प्रस्तुति, खेलकुद, पिकनिक र सांस्कृतिक कार्यक्रममार्फत सक्षम, सहयोगी र जिम्मेवार युवा बन्न सिक्छन्। विद्यालयको नाम र भावना देवी भुवनेश्वरीबाट आएको हो, जसले सेवा भावले दिइएको ज्ञान भक्तिको स्वरूप हो भन्ने सम्झाउँछ।",
  "Our school culture combines classroom discipline with the warmth of a close community. Students learn through lectures, projects, presentations, sports, picnics, and cultural programmes that help them become capable, cooperative, and responsible young people. The school takes its name — and its spirit — from the goddess Bhuwaneshwori, whose presence on our crest reminds us that knowledge, when offered as service, is its own form of devotion.": "हाम्रो विद्यालय संस्कृतिले कक्षाकोठाको अनुशासनलाई नजिकको समुदायको न्यानोपनसँग जोड्छ। विद्यार्थीहरूले व्याख्यान, परियोजना, प्रस्तुति, खेलकुद, पिकनिक र सांस्कृतिक कार्यक्रममार्फत सक्षम, सहयोगी र जिम्मेवार युवा बन्न सिक्छन्। विद्यालयको नाम र भावना देवी भुवनेश्वरीबाट आएको हो, जसले सेवा भावले दिइएको ज्ञान भक्तिको स्वरूप हो भन्ने सम्झाउँछ।",
  "Location": "स्थान",
  "Levels": "तहहरू",
  "Grades 1 â€” 10": "कक्षा १ — १०",
  "Shishaiya village â€” a school home for learners across Sudurpashchim Province.": "शिसैया गाउँ — सुदूरपश्चिम प्रदेशभरका विद्यार्थीका लागि विद्यालय घर।",
  "Direction": "दिशा",
  "Vision & Mission": "दृष्टि र मिशन",
  "Our direction is shaped by what we see in daily life: students learning, teachers guiding, and activities that quietly build confidence.": "हाम्रो दिशा दैनिक जीवनमा देखिने कुराबाट बनेको छ: विद्यार्थी सिकिरहेका छन्, शिक्षक मार्गदर्शन गरिरहेका छन् र गतिविधिले आत्मविश्वास बढाइरहेको छ।",
  "Vision": "दृष्टि",
  "To develop confident, capable, and responsible learners who can pursue higher education, serve society, and lead with integrity in a changing world.": "उच्च शिक्षा अघि बढाउन, समाजको सेवा गर्न र बदलिँदो संसारमा इमानदारीपूर्वक नेतृत्व गर्न सक्ने आत्मविश्वासी, सक्षम र जिम्मेवार विद्यार्थी विकास गर्नु।",
  "Mission": "मिशन",
  "To provide quality, student-centred education through dedicated teaching, practical activities, moral guidance, and a steady partnership among school, students, and guardians.": "समर्पित शिक्षण, व्यावहारिक गतिविधि, नैतिक मार्गदर्शन र विद्यालय, विद्यार्थी तथा अभिभावकबीच स्थिर सहकार्यमार्फत गुणस्तरीय विद्यार्थी केन्द्रित शिक्षा प्रदान गर्नु।",
  "Objectives": "उद्देश्यहरू",
  "Guiding Objectives": "मार्गदर्शक उद्देश्यहरू",
  "Goals that connect academic work with the everyday culture visible across our campus.": "शैक्षिक कामलाई विद्यालय परिसरमा देखिने दैनिक संस्कृतिसँग जोड्ने लक्ष्यहरू।",
  "Disciplined Character": "अनुशासित चरित्र",
  "Punctuality, respectful conduct, self-belief, and responsibility â€” without losing warmth or dignity.": "समयपालन, सम्मानजनक व्यवहार, आत्मविश्वास र जिम्मेवारी — आत्मीयता र मर्यादा नगुमाई।",
  "Academic Foundations": "शैक्षिक आधार",
  "Dependable secondary teaching across science, mathematics, language, and social sciences toward SEE success.": "SEE सफलताको दिशामा विज्ञान, गणित, भाषा र सामाजिक अध्ययनमा भरपर्दो माध्यमिक शिक्षण।",
  "Projects, presentations, field exposure, sports, and cultural activities so knowledge becomes usable in real life.": "परियोजना, प्रस्तुति, क्षेत्रीय अनुभव, खेलकुद र सांस्कृतिक गतिविधि ताकि ज्ञान वास्तविक जीवनमा उपयोगी बनोस्।",
  "Care for Every Learner": "प्रत्येक विद्यार्थीको हेरचाह",
  "Close teacherâ€“student relationships so each student is noticed, guided, corrected, and encouraged.": "हरेक विद्यार्थी देखियोस्, मार्गदर्शन पाओस्, सुधारियोस् र प्रोत्साहन पाओस् भन्ने गरी शिक्षक–विद्यार्थी नजिकको सम्बन्ध।",
  "Each number reflects a quiet daily commitment from teachers, students, and guardians.": "प्रत्येक संख्याले शिक्षक, विद्यार्थी र अभिभावकको दैनिक निष्ठापूर्ण प्रतिबद्धता देखाउँछ।",
  "Leadership": "नेतृत्व",
  "From Our Leadership": "हाम्रो नेतृत्वबाट",
  "Words from those who steward Bhuwaneshwori â€” reflecting the values and steady commitment that move the school forward each day.": "भुवनेश्वरीलाई अघि बढाउने व्यक्तिहरूका शब्द — विद्यालयलाई हरेक दिन अघि लैजाने मूल्य र स्थिर प्रतिबद्धताको प्रतिबिम्ब।",
  "Words from those who steward Bhuwaneshwori — reflecting the values and steady commitment that move the school forward each day.": "भुवनेश्वरीलाई अघि बढाउने व्यक्तिहरूका शब्द — विद्यालयलाई हरेक दिन अघि लैजाने मूल्य र स्थिर प्रतिबद्धताको प्रतिबिम्ब।",
  "Principal": "प्रधानाध्यापक",
  "Vice Principal": "उप-प्रधानाध्यापक",
  "Asst. Administrator": "सहायक प्रशासक",
  "Khagendra Bahadur Bhandari": "खगेन्द्र बहादुर भण्डारी",
  "Rajendra Prasad Awasthi": "राजेन्द्र प्रसाद अवस्थी",
  "Sushila Bhatta Joshi": "सुसिला भट्ट जोशी",
  "The strength of our school is built every morning â€” through punctual classrooms, honest feedback, and a steady partnership between teachers, students, and guardians.": "हाम्रो विद्यालयको शक्ति हरेक बिहान बनिन्छ — समयमै सुरु हुने कक्षा, इमानदार प्रतिक्रिया र शिक्षक, विद्यार्थी तथा अभिभावकबीचको स्थिर सहकार्यबाट।",
  "The strength of our school is built every morning — through punctual classrooms, honest feedback, and a steady partnership between teachers, students, and guardians.": "हाम्रो विद्यालयको शक्ति हरेक बिहान बनिन्छ — समयमै सुरु हुने कक्षा, इमानदार प्रतिक्रिया र शिक्षक, विद्यार्थी तथा अभिभावकबीचको स्थिर सहकार्यबाट।",
  "Behind every well-run classroom is a circle of care â€” coordinating staff, guardians, and resources so that learning never stops at our gate.": "हरेक व्यवस्थित कक्षाको पछाडि हेरचाहको घेरा हुन्छ — कर्मचारी, अभिभावक र स्रोतहरूलाई मिलाएर सिकाइ हाम्रो ढोकामै नरोकियोस् भन्ने सुनिश्चितता।",
  "Behind every well-run classroom is a circle of care — coordinating staff, guardians, and resources so that learning never stops at our gate.": "हरेक व्यवस्थित कक्षाको पछाडि हेरचाहको घेरा हुन्छ — कर्मचारी, अभिभावक र स्रोतहरूलाई मिलाएर सिकाइ हाम्रो ढोकामै नरोकियोस् भन्ने सुनिश्चितता।",
  "Academic Offerings": "शैक्षिक कार्यक्रमहरू",
  "Our Courses": "हाम्रा पाठ्यक्रमहरू",
  "Explore our comprehensive educational pathways, spanning from early childhood nurturing to high school board programs. Fully responsive, highly structured, and designed for growth.": "बाल्यकालीन हेरचाहदेखि उच्च माध्यमिक कार्यक्रमसम्म फैलिएका हाम्रा विस्तृत शैक्षिक मार्गहरू अन्वेषण गर्नुहोस्। व्यवस्थित, उत्तरदायी र विकासका लागि तयार।",
  "Academic Programs": "शैक्षिक कार्यक्रम",
  "Educational Pathways": "शैक्षिक मार्गहरू",
  "Filter by academic levels to explore our structured curriculum, core subject matrices, and specialized focus areas. Click on any course to view full details and enrollment criteria.": "संरचित पाठ्यक्रम, मुख्य विषय र विशेष केन्द्रित क्षेत्रहरू हेर्न शैक्षिक तहअनुसार फिल्टर गर्नुहोस्। विस्तृत जानकारी र भर्ना मापदण्ड हेर्न कुनै पनि पाठ्यक्रममा क्लिक गर्नुहोस्।",
  "All Levels": "सबै तह",
  "Early Childhood": "बाल विकास",
  "Primary": "प्राथमिक",
  "Secondary": "माध्यमिक",
  "Higher Secondary": "उच्च माध्यमिक",
  "Early Childhood Education": "बाल विकास शिक्षा",
  "Primary Level (Grades 1 - 5)": "प्राथमिक तह (कक्षा १ - ५)",
  "Lower Secondary Level": "निम्न माध्यमिक तह",
  "Lower Secondary Level (Grades 6 - 8)": "निम्न माध्यमिक तह (कक्षा ६ - ८)",
  "Secondary Level (Grades 9 - 10 Â· SEE)": "माध्यमिक तह (कक्षा ९ - १० · SEE)",
  "Secondary Level (Grades 9 - 10 · SEE)": "माध्यमिक तह (कक्षा ९ - १० · SEE)",
  "+2 Management Program": "+२ व्यवस्थापन कार्यक्रम",
  "Higher Secondary (+2 Management)": "उच्च माध्यमिक (+२ व्यवस्थापन)",
  "4 and above": "४ वर्ष वा माथि",
  "6 - 10": "६ - १० वर्ष",
  "11 - 13": "११ - १३ वर्ष",
  "14 - 16": "१४ - १६ वर्ष",
  "17 - 19": "१७ - १९ वर्ष",
  "Nursery, LKG, and UKG": "नर्सरी, LKG र UKG",
  "Class 1 to 5": "कक्षा १ देखि ५",
  "Class 6 to 8": "कक्षा ६ देखि ८",
  "Class 9 and 10": "कक्षा ९ र १०",
  "XI and XII": "कक्षा ११ र १२",
  "40 Max": "अधिकतम ४०",
  "100 Max": "अधिकतम १००",
  "At our schoolâ€™s Early Childhood Program, children begin their learning journey in a warm, loving environment. We focus on play-based learning, social habits, motor skill development, and basic language/cognitive concepts to build a strong, joyful foundation.": "हाम्रो बाल विकास कार्यक्रममा बालबालिकाले न्यानो र मायालु वातावरणमा सिकाइ यात्रा सुरु गर्छन्। खेलमा आधारित सिकाइ, सामाजिक बानी, मोटर सीप र आधारभूत भाषा/बौद्धिक अवधारणामा जोड दिइन्छ।",
  "At our school’s Early Childhood Program, children begin their learning journey in a warm, loving environment. We focus on play-based learning, social habits, motor skill development, and basic language/cognitive concepts to build a strong, joyful foundation.": "हाम्रो बाल विकास कार्यक्रममा बालबालिकाले न्यानो र मायालु वातावरणमा सिकाइ यात्रा सुरु गर्छन्। खेलमा आधारित सिकाइ, सामाजिक बानी, मोटर सीप र आधारभूत भाषा/बौद्धिक अवधारणामा जोड दिइन्छ।",
  "We provide a highly supportive and engaging environment to primary level students. Our focus is on establishing strong literacy in Nepali and English, core mathematics, environmental curiosity, and moral values that guide everyday behavior.": "हामी प्राथमिक तहका विद्यार्थीलाई अत्यन्त सहयोगी र सक्रिय वातावरण प्रदान गर्छौं। नेपाली र अंग्रेजी साक्षरता, मुख्य गणित, वातावरणीय जिज्ञासा र नैतिक मूल्यमा हाम्रो जोड छ।",
  "At the Lower Secondary Level, students continue to strengthen their academic foundation. We introduce structured laboratory practices, computer technology, integrated social sciences, and collaborative project work to encourage active enquiry.": "निम्न माध्यमिक तहमा विद्यार्थीहरूले आफ्नो शैक्षिक आधार अझ बलियो बनाउँछन्। सक्रिय जिज्ञासा बढाउन प्रयोगशाला अभ्यास, कम्प्युटर प्रविधि, एकीकृत सामाजिक विज्ञान र सामूहिक परियोजना समावेश गरिन्छ।",
  "At the Secondary Level, students engage in a more focused and exam-oriented academic program. This track fully prepares students for the Secondary Education Examination (SEE) board with mock testing, extensive lab sessions, and stream counseling.": "माध्यमिक तहमा विद्यार्थीहरू बढी केन्द्रित र परीक्षा उन्मुख कार्यक्रममा सहभागी हुन्छन्। नमूना परीक्षा, प्रयोगशाला अभ्यास र विषयधारा परामर्शमार्फत SEE का लागि पूर्ण तयारी गराइन्छ।",
  "Our +2 Management program offers a strong academic foundation combined with practical learning to prepare students for the modern business world. Aligned with the National Examinations Board (NEB), we focus on accounting, economics, and business administration.": "हाम्रो +२ व्यवस्थापन कार्यक्रमले आधुनिक व्यवसायिक संसारका लागि विद्यार्थी तयार गर्न बलियो शैक्षिक आधार र व्यावहारिक सिकाइ प्रदान गर्छ। NEB सँग मिलेर लेखा, अर्थशास्त्र र व्यवसाय प्रशासनमा जोड दिइन्छ।",
  "Core Subject Matrix": "मुख्य विषय सूची",
  "Core Focus Area": "मुख्य केन्द्रित क्षेत्र",
  "Nepali & English Alphabet Foundations": "नेपाली र अंग्रेजी वर्णमाला आधार",
  "Fun Numeracy & Shape Identification": "रमाइलो संख्याज्ञान र आकार पहिचान",
  "Creative Arts, Music & Dance": "सिर्जनात्मक कला, संगीत र नृत्य",
  "Social Habits & Emotional Sharing": "सामाजिक बानी र भावनात्मक साझेदारी",
  "Sensory & Fine Motor Play Activities": "संवेदी र सूक्ष्म मोटर खेल गतिविधि",
  "Nepali (à¤¨à¥‡à¤ªà¤¾à¤²à¥€) & English (à¤…à¤‚à¤—à¥à¤°à¥‡à¤œà¥€)": "नेपाली र अंग्रेजी",
  "Nepali & English Languages": "नेपाली र अंग्रेजी भाषा",
  "Compulsory Mathematics (à¤—à¤£à¤¿à¤¤)": "अनिवार्य गणित",
  "Science & Environmental Studies (à¤µà¤¿à¤œà¥à¤žà¤¾à¤¨)": "विज्ञान तथा वातावरण अध्ययन",
  "Science & Environmental Studies": "विज्ञान तथा वातावरण अध्ययन",
  "Social Studies & Local Environment (à¤¸à¤¾à¤®à¤¾à¤œà¤¿à¤•)": "सामाजिक अध्ययन तथा स्थानीय वातावरण",
  "Social Studies & Local Environment": "सामाजिक अध्ययन तथा स्थानीय वातावरण",
  "Creative Arts, Crafts & Physical Ed.": "सिर्जनात्मक कला, हस्तकला र शारीरिक शिक्षा",
  "English & Nepali Languages": "अंग्रेजी र नेपाली भाषा",
  "Compulsory Mathematics": "अनिवार्य गणित",
  "Science & Information Technology": "विज्ञान तथा सूचना प्रविधि",
  "Social Studies & Population Ed.": "सामाजिक अध्ययन तथा जनसंख्या शिक्षा",
  "Moral & Health Education": "नैतिक तथा स्वास्थ्य शिक्षा",
  "Occupation, Business & Tech Ed.": "पेशा, व्यवसाय तथा प्रविधि शिक्षा",
  "Compulsory English & Nepali": "अनिवार्य अंग्रेजी र नेपाली",
  "Compulsory Science & Technology": "अनिवार्य विज्ञान तथा प्रविधि",
  "Compulsory Social Studies": "अनिवार्य सामाजिक अध्ययन",
  "Optional I: Opt. Mathematics": "ऐच्छिक १: ऐच्छिक गणित",
  "Optional II: Computer Science / Health Ed.": "ऐच्छिक २: कम्प्युटर विज्ञान / स्वास्थ्य शिक्षा",
  "Principles of Accounting": "लेखाको सिद्धान्त",
  "Economics & Business Studies": "अर्थशास्त्र तथा व्यवसाय अध्ययन",
  "Business Mathematics / Marketing": "व्यवसाय गणित / बजारशास्त्र",
  "Computer Science / Social Studies": "कम्प्युटर विज्ञान / सामाजिक अध्ययन",
  "Play, Social Habits, Fine Motor Skills, Language": "खेल, सामाजिक बानी, सूक्ष्म मोटर सीप, भाषा",
  "Reading, Writing, Core Math, Basic Science": "पठन, लेखन, मुख्य गणित, आधारभूत विज्ञान",
  "Critical Thinking, Science Labs, Tech Literacy": "आलोचनात्मक सोच, विज्ञान प्रयोगशाला, प्रविधि साक्षरता",
  "SEE Preparation, Advanced Science, Career Guidance": "SEE तयारी, उन्नत विज्ञान, करियर मार्गदर्शन",
  "Financial Literacy, Economics, Management, IT": "वित्तीय साक्षरता, अर्थशास्त्र, व्यवस्थापन, IT",
  "Enroll Now": "भर्ना गर्नुहोस्",
  "View Details": "विवरण हेर्नुहोस्",
  "Capacity": "क्षमता",
  "Target Age:": "लक्षित उमेर:",
  "Years": "वर्ष",
  "Code": "कोड",
  "more subjects": "थप विषय",
  "Curriculum Development Centre (CDC) Standards": "पाठ्यक्रम विकास केन्द्र (CDC) मापदण्ड",
  "Aligned with National Education Standards": "राष्ट्रिय शिक्षा मापदण्डसँग मिलाइएको",
  "Every level of our academic programs strictly follows the curriculum matrices set by the Ministry of Education, Nepal. We combine this standard with custom practical labs, IT exposure, and physical sports to ensure all-round student growth.": "हाम्रा हरेक शैक्षिक तहले नेपाल सरकार शिक्षा मन्त्रालयले तोकेको पाठ्यक्रम पालना गर्छ। व्यावहारिक प्रयोगशाला, IT परिचय र खेलकुदसँग जोडेर विद्यार्थीको सर्वाङ्गीण विकास सुनिश्चित गरिन्छ।",
  "Contact Admissions": "भर्ना शाखामा सम्पर्क",
  "Course Details": "पाठ्यक्रम विवरण",
  "Program Overview": "कार्यक्रम सारांश",
  "Curriculum Subject Matrix": "पाठ्यक्रम विषय सूची",
  "Required Documents": "आवश्यक कागजात",
  "Original Birth Certificate": "जन्मदर्ताको मूल प्रमाणपत्र",
  "Previous Progress Report Card": "अघिल्लो प्रगति रिपोर्ट कार्ड",
  "Transfer Certificate (TC)": "स्थानान्तरण प्रमाणपत्र (TC)",
  "4 copies of passport-size photos": "पासपोर्ट आकारका ४ प्रति फोटो",
  "Admission Deadlines": "भर्ना समयसीमा",
  "Application Opens": "आवेदन खुल्ने मिति",
  "Entrance Examination": "प्रवेश परीक्षा",
  "Admission Inquiry": "भर्ना सोधपुछ",
  "Enroll in": "भर्ना",
  "Target Level:": "लक्षित तह:",
  "Student Name *": "विद्यार्थीको नाम *",
  "Parent / Guardian Name *": "अभिभावकको नाम *",
  "Contact Phone *": "सम्पर्क फोन *",
  "Additional Notes / Queries": "थप टिप्पणी / जिज्ञासा",
  "Submit Enrollment Inquiry": "भर्ना सोधपुछ पठाउनुहोस्",
  "Call Admissions": "भर्ना शाखामा कल गर्नुहोस्",
  "Campus Visit": "विद्यालय भ्रमण",
  "School Memories": "विद्यालय सम्झनाहरू",
  "Our Gallery": "हाम्रो ग्यालरी",
  "A visual chronicle of academic focus, athletic achievements, vibrant cultural heritage, and campus life at Shree Bhuwaneshwori Secondary School.": "शैक्षिक ध्यान, खेलकुद उपलब्धि, जीवन्त सांस्कृतिक सम्पदा र श्री भुवनेश्वरी माध्यमिक विद्यालयको परिसर जीवनका दृश्य सम्झनाहरू।",
  "All Memories": "सबै सम्झना",
  "Campus & Events": "परिसर तथा कार्यक्रम",
  "Academics & Labs": "अध्ययन तथा प्रयोगशाला",
  "Sports & Co-curricular": "खेलकुद तथा सह-क्रियाकलाप",
  "Cultural & Celebrations": "संस्कृति तथा उत्सव",
  "Campus": "परिसर",
  "Academic": "शैक्षिक",
  "Sports": "खेलकुद",
  "Cultural": "सांस्कृतिक",
  "No memories found": "कुनै सम्झना भेटिएन",
  "Try switching filters to view other school life categories.": "विद्यालय जीवनका अन्य श्रेणी हेर्न फिल्टर परिवर्तन गर्नुहोस्।",
  "Memories": "सम्झनाहरू",
  "of": "मध्ये",
  "Main Campus Gateway": "मुख्य विद्यालय प्रवेशद्वार",
  "Annual Day Celebrations": "वार्षिकोत्सव समारोह",
  "Parent-Teacher Conference": "अभिभावक-शिक्षक भेटघाट",
  "Community Outreach": "समुदायसँग सहकार्य",
  "Assembly Ground Morning": "प्रातः सभा मैदान",
  "Interactive Math Session": "अन्तरक्रियात्मक गणित कक्षा",
  "Computer Literacy Lab": "कम्प्युटर साक्षरता प्रयोगशाला",
  "Group Science Discussion": "समूह विज्ञान छलफल",
  "English Reading Hour": "अंग्रेजी पठन समय",
  "Creative Arts Class": "सिर्जनात्मक कला कक्षा",
  "Senior Biology Lab": "वरिष्ठ जीवविज्ञान प्रयोगशाला",
  "NEB Class Presentation": "NEB कक्षा प्रस्तुति",
  "Chemistry Lab Experiment": "रसायन प्रयोगशाला अभ्यास",
  "Interactive Classroom Reading": "अन्तरक्रियात्मक कक्षा पठन",
  "Practical Learning Desk": "व्यावहारिक सिकाइ डेस्क",
  "Annual Football Tournament": "वार्षिक फुटबल प्रतियोगिता",
  "Volleyball Practice": "भलिबल अभ्यास",
  "Table Tennis Finals": "टेबल टेनिस फाइनल",
  "Sprint Athletics Event": "दौड एथलेटिक्स कार्यक्रम",
  "Badminton Tournament": "ब्याडमिन्टन प्रतियोगिता",
  "Interschool Cricket Match": "अन्तर विद्यालय क्रिकेट खेल",
  "Yoga & Mindfulness": "योग र ध्यान",
  "Traditional Dance Performance": "परम्परागत नृत्य प्रस्तुति",
  "Saraswati Puja Celebrations": "सरस्वती पूजा समारोह",
  "School Choir Performance": "विद्यालय कोयर प्रस्तुति",
  "National Day Parade": "राष्ट्रिय दिवस परेड",
  "Welcome arch of Shree Bhuwaneshwori Secondary School, greeting students daily.": "श्री भुवनेश्वरी माध्यमिक विद्यालयको स्वागत प्रवेशद्वार, जसले विद्यार्थीहरूलाई हरेक दिन स्वागत गर्छ।",
  "Distinguished guests and guardians gathering during our annual school assembly.": "विद्यालयको वार्षिक सभामा विशिष्ट अतिथि र अभिभावकहरूको उपस्थिति।",
  "Collaborative session focused on students' holistic growth and development.": "विद्यार्थीको समग्र वृद्धि र विकासमा केन्द्रित सहकार्यात्मक सत्र।",
  "School representatives interacting with local leaders for educational alignment.": "शैक्षिक सहकार्यका लागि स्थानीय नेतृत्वसँग विद्यालय प्रतिनिधिहरूको अन्तरक्रिया।",
  "Students assembling for the morning national anthem and school prayer.": "राष्ट्रिय गान र विद्यालय प्रार्थनाका लागि विद्यार्थीहरूको प्रातः सभा।",
  "Students engaging in hands-on geometry exercises in the primary classroom.": "प्राथमिक कक्षामा विद्यार्थीहरू ज्यामितिका व्यवहारिक अभ्यासमा सहभागी।",
  "Lower secondary students practicing basic coding and keyboard skills.": "निम्न माध्यमिक विद्यार्थीहरू आधारभूत कोडिङ र किबोर्ड सीप अभ्यास गर्दै।",
  "Class 9 students collaborating on physics project models in groups.": "कक्षा ९ का विद्यार्थीहरू समूहमा भौतिक विज्ञान परियोजना मोडेलमा सहकार्य गर्दै।",
  "Nurturing literature appreciation through storytelling and guided reading.": "कथा सुनाइ र मार्गदर्शित पठनमार्फत साहित्यप्रतिको रुचि विकास।",
  "Primary students painting and sketching during their weekly arts module.": "साप्ताहिक कला कक्षामा प्राथमिक विद्यार्थीहरू चित्र बनाउँदै।",
  "Secondary level students observing plant cell slides under microscopes.": "माध्यमिक तहका विद्यार्थीहरू माइक्रोस्कोपमा वनस्पति कोशिका स्लाइड अवलोकन गर्दै।",
  "Secondary students delivering an interactive class project presentation.": "माध्यमिक विद्यार्थीहरू अन्तरक्रियात्मक कक्षा परियोजना प्रस्तुति दिँदै।",
  "Observing chemical reactions under the safe guidance of science faculty.": "विज्ञान शिक्षकको सुरक्षित मार्गदर्शनमा रासायनिक प्रतिक्रिया अवलोकन।",
  "A view of the lively student study circles and collaborative reading desks.": "जीवन्त विद्यार्थी अध्ययन समूह र सहकार्यात्मक पठन डेस्कको दृश्य।",
  "Hands-on academic projects keeping our primary students deeply engaged.": "प्राथमिक विद्यार्थीहरूलाई सक्रिय राख्ने व्यवहारिक शैक्षिक परियोजनाहरू।",
  "The school team competing in the regional inter-school sports cup.": "क्षेत्रीय अन्तर विद्यालय खेलकुद कपमा प्रतिस्पर्धा गर्दै विद्यालय टोली।",
  "Afternoon training session on the newly renovated school sand court.": "नयाँ मर्मत गरिएको विद्यालय बालुवा कोर्टमा दिउँसोको अभ्यास सत्र।",
  "Exciting indoor table tennis championship match between senior houses.": "वरिष्ठ सदनबीच रोमाञ्चक इनडोर टेबल टेनिस च्याम्पियनसिप खेल।",
  "Students participating in the 100m dash during our annual sports meet.": "वार्षिक खेलकुद प्रतियोगितामा १०० मिटर दौडमा सहभागी विद्यार्थीहरू।",
  "Girls' doubles final match, showcasing sportsmanship and focus.": "खेल भावना र एकाग्रता देखाउने छात्रा डबल्स फाइनल खेल।",
  "School cricket captain leading the team on the Bedkot municipal pitch.": "बेदकोट नगरपालिका मैदानमा विद्यालय क्रिकेट कप्तानले टोलीको नेतृत्व गर्दै।",
  "Weekly physical wellness session focusing on posture and breathing.": "शरीरको आसन र श्वासप्रश्वासमा केन्द्रित साप्ताहिक स्वास्थ्य सत्र।",
  "Primary students performing Tharu and Deuda dances on Cultural Day.": "सांस्कृतिक दिवसमा प्राथमिक विद्यार्थीहरू थारू र देउडा नृत्य प्रस्तुत गर्दै।",
  "Offering prayers to the Goddess of Knowledge on the auspicious day of Vasant Panchami.": "वसन्त पञ्चमीको शुभ दिनमा ज्ञानकी देवीप्रति पूजा अर्पण।",
  "The school vocal ensemble performing local folk melodies and patriotic songs.": "विद्यालय गायन समूहले स्थानीय लोकधुन र देशभक्ति गीत प्रस्तुत गर्दै।",
  "Scout troop marching during the Kanchanpur district celebration parade.": "कञ्चनपुर जिल्ला समारोह परेडमा मार्च गर्दै स्काउट टोली।",
  "Official Bulletins": "आधिकारिक सूचना",
  "Notice Board": "सूचना पाटी",
  "Stay updated with official school announcements, holiday circulars, examination routines, and cultural event details straight from our administrative office.": "विद्यालय प्रशासनबाट आएको आधिकारिक घोषणा, बिदा सूचना, परीक्षा तालिका र सांस्कृतिक कार्यक्रम विवरणसँग अपडेट रहनुहोस्।",
  "All Circulars": "सबै परिपत्र",
  "Exams": "परीक्षा",
  "Events": "कार्यक्रम",
  "View Official Document": "आधिकारिक कागजात हेर्नुहोस्",
  "No announcements available in this category. Check back soon.": "यस श्रेणीमा कुनै घोषणा छैन। चाँडै फेरि हेर्नुहोस्।",
  "Academic Calendar 2082": "शैक्षिक पात्रो २०८२",
  "The complete annual academic calendar containing exam routines, holidays, festivals, parent-teacher conferences, and sports meets is available for download.": "परीक्षा तालिका, बिदा, पर्व, अभिभावक-शिक्षक बैठक र खेलकुद कार्यक्रम समेटिएको वार्षिक शैक्षिक पात्रो डाउनलोडका लागि उपलब्ध छ।",
  "Download Calendar PDF": "पात्रो PDF डाउनलोड गर्नुहोस्",
  "Emergency Bulletins?": "आपतकालीन सूचना?",
  "During heavy monsoon rains, extreme weather, or public directives, emergency closure notices will be sent via SMS directly to parents and updated on this board by 6:00 AM.": "भारी वर्षा, प्रतिकूल मौसम वा सरकारी निर्देशनका समयमा आपतकालीन बिदा सूचना SMS मार्फत अभिभावकलाई पठाइनेछ र बिहान ६:०० बजेभित्र यस पाटीमा अपडेट गरिनेछ।",
  "Call School Office": "विद्यालय कार्यालयमा कल गर्नुहोस्",
  "To all Parents, Guardians, and Aspiring Students,": "सबै अभिभावक, संरक्षक र इच्छुक विद्यार्थीहरूलाई,",
  "Dear Students, Teachers, and Guardians,": "प्रिय विद्यार्थी, शिक्षक र अभिभावकहरू,",
  "To the Entire Bedkot Community, Guardians, and Well-wishers,": "सम्पूर्ण बेदकोट समुदाय, अभिभावक र शुभेच्छुकहरूलाई,",
  "To all Students, House Captains, and Physical Instructors,": "सबै विद्यार्थी, सदन कप्तान र शारीरिक शिक्षकहरूलाई,",
  "To all Faculty Members, Administrative Staff, and Students,": "सबै शिक्षक, प्रशासनिक कर्मचारी र विद्यार्थीहरूलाई,",
  "Shree Bhuwaneshwori Secondary School is pleased to announce that the online and physical admission registration for the upcoming academic session 2082 B.S. is officially open from today. We offer quality education, modern labs, and a student-centric environment from Early Childhood (ECD) to Grade 10, as well as +2 Management streams.": "श्री भुवनेश्वरी माध्यमिक विद्यालय आगामी शैक्षिक सत्र २०८२ बि.सं. का लागि अनलाइन तथा प्रत्यक्ष भर्ना दर्ता आजदेखि खुला भएको जानकारी गराउन पाउँदा हर्षित छ। हामी बाल विकासदेखि कक्षा १० तथा +२ व्यवस्थापनसम्म गुणस्तरीय शिक्षा, आधुनिक प्रयोगशाला र विद्यार्थी केन्द्रित वातावरण प्रदान गर्छौं।",
  "ECD & Primary School (Grades 1-5): Focusing on foundational cognitive skills, language literacy, and arts.": "ECD र प्राथमिक तह (कक्षा १-५): आधारभूत बौद्धिक सीप, भाषा साक्षरता र कलामा केन्द्रित।",
  "Lower Secondary (Grades 6-8): Introducing computer science, physical sciences, and local social studies.": "निम्न माध्यमिक (कक्षा ६-८): कम्प्युटर विज्ञान, भौतिक विज्ञान र स्थानीय सामाजिक अध्ययन परिचय।",
  "Secondary School (Grades 9-10): Government approved curriculum specializing in the SEE Board Track.": "माध्यमिक तह (कक्षा ९-१०): SEE बोर्ड ट्र्याकमा केन्द्रित सरकारी स्वीकृत पाठ्यक्रम।",
  "+2 Management Stream (Grades 11-12): Featuring advanced accounting, economics, and business studies.": "+२ व्यवस्थापन (कक्षा ११-१२): उन्नत लेखा, अर्थशास्त्र र व्यवसाय अध्ययन।",
  "Admission Procedure & Documents Required:": "भर्ना प्रक्रिया र आवश्यक कागजात:",
  "Collect the official Admission Form from the school administration desk or submit an inquiry online.": "विद्यालय प्रशासन डेस्कबाट आधिकारिक भर्ना फाराम लिनुहोस् वा अनलाइन सोधपुछ पठाउनुहोस्।",
  "Submit the filled form along with a copy of the student's Birth Certificate and two passport-sized photos.": "भरिएको फारामसँग विद्यार्थीको जन्मदर्ताको प्रतिलिपि र दुई पासपोर्ट आकारका फोटो बुझाउनुहोस्।",
  "Provide the original Transfer Certificate (TC) and previous school's character certificate (Grades 2-10).": "मूल स्थानान्तरण प्रमाणपत्र (TC) र अघिल्लो विद्यालयको चरित्र प्रमाणपत्र (कक्षा २-१०) पेश गर्नुहोस्।",
  "Entrance evaluation exams will be held on a rolling basis every Friday at 10:00 AM.": "प्रवेश मूल्यांकन परीक्षा प्रत्येक शुक्रबार बिहान १०:०० बजे सञ्चालन हुनेछ।",
  "For further details regarding fee structures and scholarships, please visit the administration block or contact the admission cell directly.": "शुल्क संरचना र छात्रवृत्तिबारे थप जानकारीका लागि प्रशासन भवनमा आउनुहोस् वा भर्ना शाखामा सिधै सम्पर्क गर्नुहोस्।",
  "This is to inform everyone concerned that the First-Term Examination for the Academic Session 2082 B.S. has been scheduled to commence from Ashad 15, 2082. All examinations will be conducted in the morning shift to avoid the afternoon monsoon heat.": "शैक्षिक सत्र २०८२ बि.सं. को पहिलो त्रैमासिक परीक्षा असार १५, २०८२ देखि सुरु हुने तालिका तय गरिएको जानकारी गराइन्छ। दिउँसोको वर्षायामको गर्मीबाट बच्न सबै परीक्षा बिहानको सिफ्टमा सञ्चालन हुनेछ।",
  "Grades 1 to 5 (Primary): 7:30 AM to 9:30 AM (Oral evaluations and basic written tests).": "कक्षा १ देखि ५ (प्राथमिक): बिहान ७:३० देखि ९:३० (मौखिक मूल्यांकन र आधारभूत लिखित परीक्षा)।",
  "Grades 6 to 8 (Lower Secondary): 7:30 AM to 10:00 AM (Written exams).": "कक्षा ६ देखि ८ (निम्न माध्यमिक): बिहान ७:३० देखि १०:०० (लिखित परीक्षा)।",
  "Grades 9 to 10 (Secondary SEE): 7:30 AM to 10:30 AM (Full board-standard examinations).": "कक्षा ९ देखि १० (SEE): बिहान ७:३० देखि १०:३० (बोर्ड मापदण्डको पूर्ण परीक्षा)।",
  "+2 Management (NEB): 7:00 AM to 10:00 AM (Comprehensive terminal papers).": "+२ व्यवस्थापन (NEB): बिहान ७:०० देखि १०:०० (समग्र टर्मिनल परीक्षा)।",
  "Crucial Exam Guidelines & Instructions:": "महत्त्वपूर्ण परीक्षा निर्देशन:",
  "All students must collect their official Admit Cards from their respective class teachers by Ashad 12.": "सबै विद्यार्थीले असार १२ भित्र सम्बन्धित कक्षा शिक्षकबाट आधिकारिक प्रवेशपत्र लिनुपर्नेछ।",
  "Students must arrive at the examination hall at least 20 minutes before the scheduled time.": "विद्यार्थीहरू तोकिएको समयभन्दा कम्तीमा २० मिनेट अगाडि परीक्षा हलमा पुग्नुपर्नेछ।",
  "Bringing mobile phones, smartwatches, or any unauthorized paper slips is strictly prohibited.": "मोबाइल फोन, स्मार्टवाच वा अनुमति नभएका कागज ल्याउन कडाइका साथ निषेध गरिएको छ।",
  "Parents are highly encouraged to support their children's revision schedules at home.": "अभिभावकलाई घरमा बालबालिकाको पुनरावृत्ति तालिकामा सहयोग गर्न अनुरोध गरिन्छ।",
  "Regular classes will remain suspended during the examination period. Normal schedule resumes on Ashad 25.": "परीक्षा अवधिमा नियमित कक्षा स्थगित रहनेछ। असार २५ देखि सामान्य तालिका सुरु हुनेछ।",
  "We are thrilled to cordially invite you to our annual cultural festival, 'Bhuwaneshwori Mahotsav 2082'. This event showcases the diverse cultural heritage, artistic talents, and creative expressions of our students through dance, drama, poetry, and scientific exhibitions.": "हाम्रो वार्षिक सांस्कृतिक उत्सव 'भुवनेश्वरी महोत्सव २०८२' मा यहाँहरूलाई हार्दिक निमन्त्रणा गर्न पाउँदा हामी उत्साहित छौं। नृत्य, नाटक, कविता र विज्ञान प्रदर्शनीमार्फत विद्यार्थीहरूको विविध सांस्कृतिक सम्पदा, कलात्मक प्रतिभा र सिर्जनात्मकता प्रस्तुत हुनेछ।",
  "Traditional Dance Performances: Showcasing Tharu, Deuda, and local folk dance forms.": "परम्परागत नृत्य प्रस्तुति: थारू, देउडा र स्थानीय लोकनृत्य।",
  "Drama & Skits: Thought-provoking plays on social awareness and environmental conservation.": "नाटक तथा स्किट: सामाजिक सचेतना र वातावरण संरक्षणसम्बन्धी विचारोत्तेजक प्रस्तुति।",
  "Science & Arts Exhibition: Interactive models and canvas paintings created by junior and senior houses.": "विज्ञान तथा कला प्रदर्शनी: कनिष्ठ र वरिष्ठ सदनहरूले तयार गरेका मोडेल र चित्रकला।",
  "Food & Craft Stalls: Managed entirely by our secondary level students to build entrepreneurship.": "खाना तथा हस्तकला स्टल: उद्यमशीलता विकासका लागि माध्यमिक विद्यार्थीहरूद्वारा सञ्चालन।",
  "Event Details & Security Protocol:": "कार्यक्रम विवरण र सुरक्षा व्यवस्था:",
  "Date & Time: Ashad 20, 2082, starting from 11:00 AM onwards at the main school ground.": "मिति र समय: असार २०, २०८२, बिहान ११:०० बजेदेखि मुख्य विद्यालय मैदानमा।",
  "Entry is free for all parents, guardians, and local residents holding an official school invitation card.": "विद्यालयको आधिकारिक निमन्त्रणा कार्ड भएका अभिभावक, संरक्षक र स्थानीय बासिन्दाका लागि प्रवेश निःशुल्क।",
  "Please park your vehicles in the designated area near the outer gate to ensure a smooth flow of traffic.": "ट्राफिक सहजताका लागि कृपया बाहिरी गेट नजिक तोकिएको स्थानमा सवारी पार्क गर्नुहोस्।",
  "All guests are requested to be seated by 10:45 AM to welcome the chief guest.": "मुख्य अतिथिलाई स्वागत गर्न सबै पाहुनालाई बिहान १०:४५ भित्र आसन ग्रहण गर्न अनुरोध गरिन्छ।",
  "Let us come together to support and encourage our children's creative achievements. We look forward to seeing you!": "हाम्रा बालबालिकाका सिर्जनात्मक उपलब्धिलाई समर्थन र प्रोत्साहन गर्न हामी सबै एकजुट होऔं। तपाईंको उपस्थितिको अपेक्षा गर्दछौं।",
  "Following three days of intense competition, outstanding sportsmanship, and raw athletic display, the Annual Inter-House Athletics Meet 2082 has concluded. We extend our heartiest congratulations to all participants who gave their absolute best on the field.": "तीन दिनको कडा प्रतिस्पर्धा, उत्कृष्ट खेल भावना र एथलेटिक प्रदर्शनपछि वार्षिक अन्तर-सदन एथलेटिक्स मिट २०८२ सम्पन्न भएको छ। मैदानमा आफ्नो उत्कृष्ट प्रयास दिने सबै सहभागीलाई हार्दिक बधाई।",
  "Overall Champion Trophy: Sagarmatha House (Blue House) with a total of 142 points.": "समग्र च्याम्पियन ट्रफी: सगरमाथा सदन (नीलो सदन) कुल १४२ अंकसहित।",
  "Runner-Up Trophy: Laliguras House (Red House) with a total of 128 points.": "उपविजेता ट्रफी: लालिगुराँस सदन (रातो सदन) कुल १२८ अंकसहित।",
  "Best Male Athlete: Master Rohan Chaudhary (Class 10) - 3 Gold Medals (100m, 200m, Long Jump).": "सर्वश्रेष्ठ छात्र खेलाडी: रोहन चौधरी (कक्षा १०) - ३ स्वर्ण पदक (१०० मि., २०० मि., लङ जम्प)।",
  "Best Female Athlete: Miss Aarati Joshi (Class 9) - 2 Gold Medals, 1 Silver (400m, High Jump, Shot Put).": "सर्वश्रेष्ठ छात्रा खेलाडी: आरती जोशी (कक्षा ९) - २ स्वर्ण, १ रजत (४०० मि., हाई जम्प, सट पुट)।",
  "Post-Sports Meet Directives:": "खेलकुदपछि निर्देशन:",
  "House captains must return all athletic gear, flags, and bibs to the PE storeroom by Friday afternoon.": "सदन कप्तानहरूले शुक्रबार दिउँसोसम्म सबै खेल सामग्री, झण्डा र बिब्स PE स्टोरमा फर्काउनुपर्नेछ।",
  "A special assembly will be held on Monday at 8:00 AM to distribute medals, certificates, and trophies.": "सोमबार बिहान ८:०० बजे पदक, प्रमाणपत्र र ट्रफी वितरणका लागि विशेष सभा हुनेछ।",
  "We express sincere gratitude to the local sports club and referees for their fair play supervision.": "निष्पक्ष खेल सुपरिवेक्षणका लागि स्थानीय खेलकुद क्लब र रेफ्रीहरूलाई हार्दिक धन्यवाद।",
  "Keep practicing, stay active, and remember that sportsmanship is the ultimate victory!": "अभ्यास जारी राख्नुहोस्, सक्रिय रहनुहोस् र खेल भावना नै वास्तविक विजय हो भन्ने सम्झनुहोस्।",
  "This is to officially inform you that Shree Bhuwaneshwori Secondary School will remain closed on May 1 (Baishakh 18) on the auspicious occasion of International Workers' Day (Majdoor Divas / Labor Day).": "अन्तर्राष्ट्रिय मजदुर दिवसको अवसरमा मे १ (वैशाख १८) मा श्री भुवनेश्वरी माध्यमिक विद्यालय बन्द रहने औपचारिक जानकारी गराइन्छ।",
  "There will be no physical or online classes conducted on this day.": "यस दिन भौतिक वा अनलाइन कक्षा सञ्चालन हुनेछैन।",
  "The administrative and admission inquiry office will also remain closed.": "प्रशासन तथा भर्ना सोधपुछ कार्यालय पनि बन्द रहनेछ।",
  "All scheduled unit tests or assignments are postponed and will be rescheduled by class teachers.": "तोकिएका युनिट टेस्ट वा असाइनमेन्ट स्थगित गरिएका छन् र कक्षा शिक्षकले नयाँ तालिका दिनेछन्।",
  "Important Guidelines for Teachers & Students:": "शिक्षक र विद्यार्थीका लागि महत्वपूर्ण निर्देशन:",
  "Students are advised to use this mid-week holiday to complete their ongoing science journals and project works.": "विद्यार्थीहरूलाई यो मध्य-सप्ताह बिदा प्रयोग गरी विज्ञान जर्नल र परियोजना कार्य पूरा गर्न सुझाव दिइन्छ।",
  "Classes will resume as per the regular timetable on Baishakh 19, 2082, at 10:00 AM sharp.": "वैशाख १९, २०८२ बिहान १०:०० बजेदेखि नियमित तालिकाअनुसार कक्षा सुरु हुनेछ।",
  "Transport services will operate on their standard morning and afternoon routes from tomorrow.": "भोलिदेखि यातायात सेवा नियमित बिहान र दिउँसोको रुटमा सञ्चालन हुनेछ।",
  "We wish all our dedicated staff and teachers a peaceful and happy Workers' Day!": "हाम्रा सबै समर्पित कर्मचारी र शिक्षकहरूलाई शान्तिपूर्ण र सुखद मजदुर दिवसको शुभकामना।",
  "Devendra Bahadur Singh": "देवेन्द्र बहादुर सिंह",
  "Harish Prasad Bhatta": "हरिश प्रसाद भट्ट",
  "Ramesh Bahadur Rawal": "रमेश बहादुर रावल",
  "Principal / Admission Controller": "प्रधानाध्यापक / भर्ना नियन्त्रक",
  "Examination Committee Chairperson": "परीक्षा समिति अध्यक्ष",
  "Principal / Festival Coordinator": "प्रधानाध्यापक / महोत्सव संयोजक",
  "Sports Department In-Charge": "खेलकुद विभाग प्रमुख",
  "Published:": "प्रकाशित:",
  "Ref No:": "सन्दर्भ नं:",
  "Date:": "मिति:",
  "SUBJECT:": "विषय:",
  "Important Instructions:": "महत्वपूर्ण निर्देशन:",
  "Official Stamp & Sign": "आधिकारिक छाप र हस्ताक्षर",
  "Affiliated to NEB | Govt. Approved Community School": "NEB सम्बद्ध | सरकारबाट स्वीकृत सामुदायिक विद्यालय",
  "Contact Information": "सम्पर्क जानकारी",
  "Get in Touch": "सम्पर्कमा रहनुहोस्",
  "Whether you have questions about admissions, programs, or campus life â€” our team is here to help.": "भर्ना, कार्यक्रम वा विद्यालय जीवनबारे जिज्ञासा छ भने हाम्रो टोली सहयोगका लागि तयार छ।",
  "How to reach us": "हामीलाई कसरी सम्पर्क गर्ने",
  "Multiple ways to connect with Shree Bhuwaneshwori Secondary School.": "श्री भुवनेश्वरी माध्यमिक विद्यालयसँग सम्पर्क गर्ने धेरै तरिका।",
  "Visit Us": "हामीलाई भेट्नुहोस्",
  "Call Us": "कल गर्नुहोस्",
  "Email Us": "इमेल गर्नुहोस्",
  "Office Hours": "कार्यालय समय",
  "Administration Office Desk": "प्रशासन कार्यालय डेस्क",
  "Sun â€“ Fri: 10:00 AM â€“ 4:00 PM": "आइतबार – शुक्रबार: बिहान १०:०० – दिउँसो ४:००",
  "Saturday: Closed": "शनिबार: बन्द",
  "Send a Message": "सन्देश पठाउनुहोस्",
  "Have a question?": "जिज्ञासा छ?",
  "Fill out the form and our team will get back to you within 24 hours. For urgent matters, please call us directly.": "फाराम भर्नुहोस् र हाम्रो टोली २४ घण्टाभित्र सम्पर्कमा आउनेछ। जरुरी विषयमा सिधै फोन गर्नुहोस्।",
  "Full Name *": "पूरा नाम *",
  "Email Address *": "इमेल ठेगाना *",
  "Email Address": "इमेल ठेगाना",
  "Phone Number *": "फोन नम्बर *",
  "Phone Number": "फोन नम्बर",
  "Subject *": "विषय *",
  "Message *": "सन्देश *",
  "Select subject": "विषय छान्नुहोस्",
  "Academic Information": "शैक्षिक जानकारी",
  "Fees & Scholarships": "शुल्क तथा छात्रवृत्ति",
  "General Inquiry": "सामान्य सोधपुछ",
  "Complaint / Feedback": "गुनासो / प्रतिक्रिया",
  "Type your message here...": "यहाँ आफ्नो सन्देश लेख्नुहोस्...",
  "Sending Message...": "सन्देश पठाइँदै...",
  "Send Message": "सन्देश पठाउनुहोस्",
  "Find Us": "हामी कहाँ छौं",
  "Our Location": "हाम्रो स्थान",
  "Shree Bhuwaneshwori Secondary School is located in Bedkot-6, Shishaiya, Kanchanpur, Sudurpashchim Province, Nepal.": "श्री भुवनेश्वरी माध्यमिक विद्यालय बेदकोट-६, शिसैया, कञ्चनपुर, सुदूरपश्चिम प्रदेश, नेपालमा अवस्थित छ।",
  "Admissions Open": "भर्ना खुला",
  "Admission Highlights": "भर्ना विशेषता",
  "Begin your academic journey at Shree Bhuwaneshwori Secondary School. Complete the application form below and our admissions team will be in touch.": "श्री भुवनेश्वरी माध्यमिक विद्यालयमा आफ्नो शैक्षिक यात्रा सुरु गर्नुहोस्। तलको आवेदन फाराम भर्नुहोस्, हाम्रो भर्ना टोली सम्पर्कमा आउनेछ।",
  "Join a community dedicated to academic excellence, leadership development, and character building.": "शैक्षिक उत्कृष्टता, नेतृत्व विकास र चरित्र निर्माणमा समर्पित समुदायमा सामेल हुनुहोस्।",
  "Comprehensive courses from early childhood to +2 Higher Secondary level.": "बाल विकासदेखि +२ उच्च माध्यमिक तहसम्मका व्यापक पाठ्यक्रम।",
  "Scholarship Opportunities": "छात्रवृत्ति अवसर",
  "Merit-based scholarships, sports quotas, and financial support for deserving students.": "योग्य विद्यार्थीका लागि मेरिट छात्रवृत्ति, खेलकुद कोटा र आर्थिक सहयोग।",
  "Modern Facilities": "आधुनिक सुविधा",
  "Fully equipped science laboratories, computer suites, a rich library, and vast playgrounds.": "पूर्ण सुसज्जित विज्ञान प्रयोगशाला, कम्प्युटर कक्ष, समृद्ध पुस्तकालय र विशाल खेलमैदान।",
  "Experienced, caring educators who mentor and guide every student individually.": "हरेक विद्यार्थीलाई व्यक्तिगत रूपमा मार्गदर्शन गर्ने अनुभवी र मायालु शिक्षकहरू।",
  "Need Assistance?": "सहयोग चाहियो?",
  "If you have any queries regarding the admission process, feel free to call our helpdesk directly.": "भर्ना प्रक्रियाबारे कुनै जिज्ञासा भए हाम्रो हेल्पडेस्कमा सिधै फोन गर्नुहोस्।",
  "Direct Helpline": "प्रत्यक्ष हेल्पलाइन",
  "Application Form": "आवेदन फाराम",
  "Fill your details": "आफ्नो विवरण भर्नुहोस्",
  "Complete all required fields below. Ensure all information is accurate for a smooth admission process.": "तलका सबै आवश्यक विवरण भर्नुहोस्। सहज भर्ना प्रक्रियाका लागि सबै जानकारी सही भएको सुनिश्चित गर्नुहोस्।",
  "Personal Information": "व्यक्तिगत जानकारी",
  "Gender *": "लिङ्ग *",
  "Select gender": "लिङ्ग छान्नुहोस्",
  "Male": "पुरुष",
  "Female": "महिला",
  "Other": "अन्य",
  "Date of Birth *": "जन्म मिति *",
  "Permanent Address *": "स्थायी ठेगाना *",
  "Guardian Details": "अभिभावक विवरण",
  "Guardian's Name *": "अभिभावकको नाम *",
  "Guardian's Phone *": "अभिभावकको फोन *",
  "Relation *": "सम्बन्ध *",
  "Select relation": "सम्बन्ध छान्नुहोस्",
  "Father": "बुबा",
  "Mother": "आमा",
  "Uncle": "काका/मामा",
  "Aunt": "काकी/माइजू",
  "Legal Guardian": "कानूनी अभिभावक",
  "Academic Background": "शैक्षिक पृष्ठभूमि",
  "Previous School *": "अघिल्लो विद्यालय *",
  "SEE GPA / Previous Grade *": "SEE GPA / अघिल्लो ग्रेड *",
  "Program of Interest *": "रुचिको कार्यक्रम *",
  "Select program": "कार्यक्रम छान्नुहोस्",
  "Personal Statement": "व्यक्तिगत भनाइ",
  "Why do you want to join Shree Bhuwaneshwori Secondary School?": "तपाईं किन श्री भुवनेश्वरी माध्यमिक विद्यालयमा सामेल हुन चाहनुहुन्छ?",
  "Share your academic goals, interests, and reasons for choosing our school...": "आफ्ना शैक्षिक लक्ष्य, रुचि र हाम्रो विद्यालय रोज्नुको कारण लेख्नुहोस्...",
  "By submitting, I confirm that the information provided is accurate. Our admissions team will contact you within 3-5 working days to schedule an entrance test or interview.": "पेश गर्दा, म दिएको जानकारी सही छ भनी पुष्टि गर्छु। प्रवेश परीक्षा वा अन्तर्वार्ता तय गर्न हाम्रो भर्ना टोली ३-५ कार्यदिवसभित्र सम्पर्क गर्नेछ।",
  "Submitting Application...": "आवेदन पेश हुँदै...",
  "Submit Application": "आवेदन पेश गर्नुहोस्",
  "Newsletter": "समाचारपत्र",
  "Subscribe for school notices, exam routines, and event updates.": "विद्यालय सूचना, परीक्षा तालिका र कार्यक्रम अपडेटका लागि सदस्यता लिनुहोस्।",
  "Your email": "तपाईंको इमेल",
  "Join": "सदस्य बन्नुहोस्",
  "Connect with us": "हामीसँग जोडिनुहोस्",
  "A community-rooted secondary school in Shishaiya, Bedkot â€” delivering quality education within a safe, supportive, and inspiring environment that nurtures curiosity, character, and lifelong learning.": "शिसैया, बेदकोटमा रहेको समुदायसँग जोडिएको माध्यमिक विद्यालय — जिज्ञासा, चरित्र र जीवनभरको सिकाइलाई पोषण गर्ने सुरक्षित, सहयोगी र प्रेरणादायी वातावरणमा गुणस्तरीय शिक्षा प्रदान गर्दै।",
  "A community-rooted secondary school in Shishaiya, Bedkot — delivering quality education within a safe, supportive, and inspiring environment that nurtures curiosity, character, and lifelong learning.": "शिसैया, बेदकोटमा रहेको समुदायसँग जोडिएको माध्यमिक विद्यालय — जिज्ञासा, चरित्र र जीवनभरको सिकाइलाई पोषण गर्ने सुरक्षित, सहयोगी र प्रेरणादायी वातावरणमा गुणस्तरीय शिक्षा प्रदान गर्दै।",
  "All rights reserved.": "सबै अधिकार सुरक्षित।",
  "Subscribed â€” thank you for joining our newsletter.": "सदस्यता सफल — समाचारपत्रमा जोडिनुभएकोमा धन्यवाद।",
  "Subscribed — thank you for joining our newsletter.": "सदस्यता सफल — समाचारपत्रमा जोडिनुभएकोमा धन्यवाद।",
  "Please fill in all required fields.": "कृपया सबै आवश्यक विवरण भर्नुहोस्।",
  "Thank you! Your message has been sent successfully. Our team will get back to you within 24 hours.": "धन्यवाद! तपाईंको सन्देश सफलतापूर्वक पठाइयो। हाम्रो टोली २४ घण्टाभित्र सम्पर्कमा आउनेछ।",
  "Online admission opens soon. Thank you for your interest.": "अनलाइन भर्ना चाँडै खुल्नेछ। तपाईंको रुचिका लागि धन्यवाद।",
  "Thank you for installing our school app!": "विद्यालय एप इन्स्टल गर्नुभएकोमा धन्यवाद!",
  "Install App": "एप इन्स्टल गर्नुहोस्",
  "Later": "पछि",
  "Close banner": "ब्यानर बन्द गर्नुहोस्",
  "Shree Bhuwaneshwori App": "श्री भुवनेश्वरी एप",
  "Install our school app for instant access to notices, schedules, and online admissions.": "सूचना, तालिका र अनलाइन भर्नामा तुरुन्त पहुँचका लागि विद्यालय एप इन्स्टल गर्नुहोस्।",
  "How to install on iPhone / iPad:": "iPhone / iPad मा कसरी इन्स्टल गर्ने:",
  "Tap the": "ट्याप गर्नुहोस्",
  "button in Safari.": "Safari मा बटन।",
  "Scroll down and select": "तल स्क्रोल गरी चयन गर्नुहोस्",
  "Add to Home Screen": "होम स्क्रिनमा थप्नुहोस्",
  "Share": "शेयर",
  "Close modal": "मोडल बन्द गर्नुहोस्",
  "Close Viewer": "भ्युअर बन्द गर्नुहोस्",
  "Print Notice": "सूचना प्रिन्ट गर्नुहोस्",
  "Zoom In": "जुम इन",
  "Zoom Out": "जुम आउट",
  "Jan": "जन",
  "Feb": "फेब",
  "Mar": "मार्च",
  "Apr": "अप्र",
  "May": "मे",
  "Jun": "जुन",
  "Jul": "जुल",
  "Aug": "अग",
  "Sep": "सेप",
  "Oct": "अक्ट",
  "Nov": "नोभ",
  "Dec": "डिस",
  "Admissions": "भर्ना",
  "Examination": "परीक्षा",
  "Notice": "सूचना",
  "notice": "सूचना",
  "exam": "परीक्षा",
  "event": "कार्यक्रम",
  "cultural": "सांस्कृतिक",
  "sports": "खेलकुद",
  "academic": "शैक्षिक",
  "campus": "परिसर",
  "Ref:": "सन्दर्भ:",
  "BS": "बि.सं.",
  "Â·": "·",
  "â€”": "—",
  "â€“": "–",
  "â€œ": "“",
  "â€": "”",
  "âœ“": "✓",
};

const forwardPairs = Object.entries(nepalTranslations).sort(
  ([a], [b]) => b.length - a.length,
);
const originalTextNodes = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyReplacement(value: string, from: string, to: string) {
  if (/^[A-Za-z]{1,3}$/.test(from)) {
    return value.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, "g"), to);
  }
  return value.split(from).join(to);
}

function replaceText(value: string, language: Language) {
  if (!value || !value.trim()) return value;
  if (language === "en") return value;
  return forwardPairs.reduce((next, [from, to]) => {
    if (!next.includes(from)) return next;
    return applyReplacement(next, from, to);
  }, value);
}

function shouldSkip(element: Element | null) {
  return Boolean(
    element?.closest(
      "[data-no-translate], script, style, noscript, code, pre, svg",
    ),
  );
}

function translateTree(root: HTMLElement, language: Language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (!shouldSkip(node.parentElement)) textNodes.push(node);
  }

  textNodes.forEach((node) => {
    if (!originalTextNodes.has(node)) {
      originalTextNodes.set(node, node.nodeValue || "");
    }

    const original = originalTextNodes.get(node) || "";
    if (/^[\d\s+%.,-]+$/.test(original)) return;
    const next = language === "ne" ? replaceText(original, language) : original;
    if (next !== node.nodeValue) node.nodeValue = next;
  });

  root
    .querySelectorAll<HTMLElement>("[placeholder], [aria-label], [title]")
    .forEach((element) => {
      if (shouldSkip(element)) return;
      ["placeholder", "aria-label", "title"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (!value) return;

        let originals = originalAttributes.get(element);
        if (!originals) {
          originals = new Map<string, string>();
          originalAttributes.set(element, originals);
        }
        if (!originals.has(attribute)) originals.set(attribute, value);

        const original = originals.get(attribute) || value;
        const next =
          language === "ne" ? replaceText(original, language) : original;
        if (next !== value) element.setAttribute(attribute, next);
      });
    });
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const href = window.location.href;
    if (href.includes("lang=ne")) {
      localStorage.setItem(STORAGE_KEY, "ne");
      return "ne";
    }
    if (href.includes("lang=en")) {
      localStorage.setItem(STORAGE_KEY, "en");
      return "en";
    }
    return localStorage.getItem(STORAGE_KEY) === "ne" ? "ne" : "en";
  });

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      isNepali: language === "ne",
      setLanguage,
      toggleLanguage: () => setLanguage(language === "ne" ? "en" : "ne"),
      t: (text: string) => replaceText(text, language),
    }),
    [language],
  );

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    document.documentElement.lang = language === "ne" ? "ne" : "en";
    document.body.classList.toggle("nepali-mode", language === "ne");

    let frame = 0;
    const scheduleTranslate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => translateTree(root, language));
    };

    scheduleTranslate();

    const observer = new MutationObserver(scheduleTranslate);
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title"],
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
