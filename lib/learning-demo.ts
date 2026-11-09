import type { LearningPathId } from "./learning-paths";

export type CourseStatus = "demo" | "concept";
export type JourneyState = "complete" | "current" | "future" | "review";

export type DemoLesson = {
  id: string;
  title: string;
  summary: string;
  state: JourneyState;
};

export type DemoCourse = {
  id: string;
  pathId: LearningPathId;
  title: string;
  summary: string;
  level: string;
  effort: string;
  status: CourseStatus;
  outcomes: readonly string[];
  lessons: readonly DemoLesson[];
  editorialNote: string;
  sourcePolicy: string;
};

export type EvidenceRecord = {
  id: string;
  pathId: LearningPathId;
  dimension: string;
  description: string;
};

export const demoLearner = {
  name: "مريم",
  initials: "مر",
  currentCourseId: "arabic-sequence",
  currentLessonId: "apply-sequence",
  greetingContext: "شخصية تجريبية ثابتة للمراجعة؛ ليست حسابًا حقيقيًا.",
} as const;

export const courses: readonly DemoCourse[] = [
  {
    id: "arabic-sequence",
    pathId: "arabic-language",
    title: "من الفهم إلى التعبير",
    summary: "مقرر لغوي قصير يدرّب على المفردات، بنية الجملة، وترتيب الأحداث في أمثلة عربية أصلية.",
    level: "تمهيدي متقدم",
    effort: "٥ دروس · ١٠–١٥ دقيقة للدرس",
    status: "demo",
    outcomes: ["فهم روابط التسلسل", "استخدام أفعال الماضي", "صياغة استجابة عربية قصيرة"],
    lessons: [
      { id: "notice-vocabulary", title: "لاحظ مفردات الحدث", summary: "تحديد كلمات الزمن والفعل في أمثلة أصلية.", state: "complete" },
      { id: "build-structure", title: "ابنِ الجملة", summary: "ترتيب عناصر جملة عربية واضحة.", state: "complete" },
      { id: "apply-sequence", title: "رتّب الأحداث", summary: "تطبيق أفعال الماضي وروابط التسلسل.", state: "current" },
      { id: "review-understanding", title: "راجع الفهم", summary: "مراجعة موصى بها بناءً على أدلة النموذج.", state: "review" },
      { id: "express-summary", title: "عبّر بإيجاز", summary: "كتابة ملخص عربي أصلي من جملتين.", state: "future" },
    ],
    editorialNote: "أمثلة لغوية أصلية تحتاج إلى مراجعة معلّم عربي قبل اعتماد المنهج.",
    sourcePolicy: "أي مرجع كتابي مستقبلي يتطلب ترخيصًا وإسنادًا موثقين؛ لا يتضمن هذا العرض نصًا مقتبسًا.",
  },
  {
    id: "arabic-reading-foundations",
    pathId: "arabic-language",
    title: "أساس القراءة السياقية",
    summary: "تصور لمقرر يدرّب على الفكرة الرئيسة والقرائن والمفردة في السياق.",
    level: "قيد التحقق",
    effort: "مثال مفاهيمي · غير متاح للتعلّم",
    status: "concept",
    outcomes: ["تمييز الفكرة الرئيسة", "استخدام القرائن", "شرح اختيار لغوي"],
    lessons: [
      { id: "main-idea", title: "الفكرة الرئيسة", summary: "مثال أولي يحتاج مراجعة تربوية.", state: "future" },
      { id: "context-clues", title: "قرائن السياق", summary: "مثال أولي يحتاج مادة مرخّصة.", state: "future" },
    ],
    editorialNote: "هذا تصور كتالوج فقط، وليس مقررًا متاحًا أو وعدًا بالإطلاق.",
    sourcePolicy: "لا مادة مصدرية مرفقة بهذا التصور.",
  },
  {
    id: "context-and-evidence",
    pathId: "bible-study",
    title: "السياق والدليل",
    summary: "مقرر دراسي تجريبي يعرّف طبقات المصدر والشرح، ويدرّب على الاستدلال ضمن منهج معلن.",
    level: "مدخل إلى الدراسة",
    effort: "٤ دروس · ١٢–١٨ دقيقة للدرس",
    status: "demo",
    outcomes: ["تمييز المصدر عن الشرح", "وصف السياق", "ربط الإجابة بدليل معتمد"],
    lessons: [
      { id: "source-first", title: "ابدأ بالمصدر", summary: "مراجعة معلومات المورد قبل الاستنتاج.", state: "complete" },
      { id: "context-map", title: "خريطة السياق", summary: "تحديد الشخصيات والبنية والغرض التعليمي.", state: "current" },
      { id: "layer-language", title: "لغة الطبقات", summary: "تمييز الملاحظة والتفسير والإرشاد.", state: "future" },
      { id: "evidence-response", title: "استجابة مع دليل", summary: "صياغة إجابة تعليمية مع إحالة واضحة.", state: "future" },
    ],
    editorialNote: "المحتوى الأصلي هنا هيكل تعليمي يحتاج إلى مالك منهج ومراجعين مؤهلين.",
    sourcePolicy: "لا يعرض هذا النموذج ترجمة كتابية أو يدّعي حقوق استخدامها.",
  },
  {
    id: "themes-and-structure",
    pathId: "bible-study",
    title: "الموضوع والبنية",
    summary: "تصور مستقبلي لدراسة موضوع مقرر مع تتبع بنية المصدر وإحالاته.",
    level: "قيد التحقق",
    effort: "مثال مفاهيمي · غير متاح للتعلّم",
    status: "concept",
    outcomes: ["تتبع موضوع مقرر", "وصف بنية المصدر", "تمييز الملاحظة من التفسير"],
    lessons: [
      { id: "theme-question", title: "سؤال الموضوع", summary: "مثال يحتاج تحديد المنهج والمصادر.", state: "future" },
      { id: "structure-review", title: "مراجعة البنية", summary: "مثال يحتاج مراجعة مختصين.", state: "future" },
    ],
    editorialNote: "هذا تصور فقط؛ لم تُعتمد مادته أو منظوره المؤسسي.",
    sourcePolicy: "لا مادة مصدرية مرفقة بهذا التصور.",
  },
] as const;

export const evidenceRecords: readonly EvidenceRecord[] = [
  { id: "lang-vocab-1", pathId: "arabic-language", dimension: "المفردات", description: "عرّفت معنى مفردة من قرينتين في مثال أصلي." },
  { id: "lang-vocab-2", pathId: "arabic-language", dimension: "المفردات", description: "استخدمت مفردة زمنية في جملة جديدة." },
  { id: "lang-structure-1", pathId: "arabic-language", dimension: "البنية", description: "رتّبت عناصر جملة ماضية ترتيبًا صحيحًا." },
  { id: "lang-reading-1", pathId: "arabic-language", dimension: "الفهم المقروء", description: "حددت الفكرة الرئيسة في مثال تعليمي." },
  { id: "study-source-1", pathId: "bible-study", dimension: "تمييز المصدر", description: "فرّقت بين معلومة المصدر والشرح التعليمي." },
  { id: "study-context-1", pathId: "bible-study", dimension: "السياق", description: "راجعت سياق المورد قبل اختيار الاستنتاج." },
  { id: "study-evidence-1", pathId: "bible-study", dimension: "الاستدلال", description: "ربطت استجابة تعليمية بإحالة إلى المورد المعتمد." },
] as const;

export const pathProgress = [
  {
    pathId: "arabic-language" as const,
    courseId: "arabic-sequence",
    completion: { completedLessons: 2, totalLessons: 5 },
    skills: [
      { label: "المفردات", targetEvidenceCount: 4, evidenceIds: ["lang-vocab-1", "lang-vocab-2"] },
      { label: "البنية", targetEvidenceCount: 4, evidenceIds: ["lang-structure-1"] },
      { label: "الفهم المقروء", targetEvidenceCount: 4, evidenceIds: ["lang-reading-1"] },
    ],
  },
  {
    pathId: "bible-study" as const,
    courseId: "context-and-evidence",
    completion: { completedLessons: 1, totalLessons: 4 },
    skills: [
      { label: "السياق", targetEvidenceCount: 4, evidenceIds: ["study-context-1"] },
      { label: "تمييز المصدر", targetEvidenceCount: 4, evidenceIds: ["study-source-1"] },
      { label: "الاستدلال", targetEvidenceCount: 4, evidenceIds: ["study-evidence-1"] },
    ],
  },
] as const;

export type PathProgressFixture = (typeof pathProgress)[number];

export const achievements = [
  {
    id: "careful-reader",
    pathId: "bible-study" as const,
    title: "قارئ متأنٍ",
    description: "راجع المصدر وسياقه قبل اختيار الاستنتاج في مثال العرض.",
    evidenceIds: ["study-source-1", "study-context-1"],
  },
] as const;

export const reviewRecommendation = {
  title: "راجع روابط التسلسل",
  description: "مراجعة مقترحة لأن سجل العرض يحتوي دليل بنية واحدًا فقط. يمكن تأجيلها دون عقوبة.",
  courseId: "arabic-sequence",
  lessonId: "apply-sequence",
} as const;

export function getCourse(courseId: string) {
  return courses.find((course) => course.id === courseId);
}
