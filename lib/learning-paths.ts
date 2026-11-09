export const learningPathIds = ["arabic-language", "bible-study"] as const;

export type LearningPathId = (typeof learningPathIds)[number];
export type LearningPathTone = "language" | "study";

export type LearningPath = {
  id: LearningPathId;
  tone: LearningPathTone;
  marker: string;
  label: string;
  name: string;
  shortName: string;
  purpose: string;
  summary: string;
  outcomes: readonly string[];
  lessons: readonly { title: string; description: string }[];
  activities: readonly { title: string; description: string }[];
};

export const learningPaths: Record<LearningPathId, LearningPath> = {
  "arabic-language": {
    id: "arabic-language",
    tone: "language",
    marker: "ض",
    label: "المسار A · تعلّم اللغة",
    name: "أتعلّم العربية من خلال مراجع كتابية",
    shortName: "تعلّم العربية",
    purpose: "تطوير مهارات العربية هو الهدف الأساسي، وتُستخدم المراجع الكتابية المرخّصة مادةً للتعلّم اللغوي.",
    summary: "مسار لغوي يربط المفردات والبنية والفهم المقروء والتعبير بأنشطة قصيرة ومراجعة تربوية واضحة.",
    outcomes: [
      "فهم مفردات وتراكيب عربية ضمن سياقها.",
      "استخراج الفكرة الرئيسة والتفاصيل من نص تعليمي.",
      "استخدام ما تعلّمته في جملة أو استجابة عربية أصلية.",
    ],
    lessons: [
      { title: "الكلمة في سياقها", description: "ملاحظة معنى المفردة من القرائن ثم استخدامها في مثال جديد." },
      { title: "ترتيب الحدث", description: "التدرّب على أفعال الماضي وروابط التسلسل دون اقتباس نص مصدر." },
      { title: "قراءة متأنية", description: "تمييز الفكرة الرئيسة والتفاصيل وشرح الدليل اللغوي." },
    ],
    activities: [
      { title: "لاحظ", description: "حدّد نمطًا لغويًا في مادة تعليمية أصلية أو مرخّصة." },
      { title: "تدرّب", description: "أكمل اختيارًا أو ترتيبًا مع تفسير فوري للإجابة." },
      { title: "طبّق", description: "اكتب استجابة قصيرة تُظهر استخدام المهارة." },
    ],
  },
  "bible-study": {
    id: "bible-study",
    tone: "study",
    marker: "◇",
    label: "المسار B · دراسة المحتوى",
    name: "أدرس الكتاب بالعربية مع معلّم سياقي",
    shortName: "دراسة الكتاب",
    purpose: "فهم محتوى الكتاب وسياقه هو الهدف الأساسي، ويقدّم معلّم ذكاء اصطناعي ناطق بالعربية التدريس والحوار داخل منهج معلن.",
    summary: "مسار دراسي يتصوّر معلّمًا ذكيًا يتواصل بالعربية، ويفصل بوضوح بين المصدر والتفسير والشرح التعليمي، ويقيس الاستدلال بالمادة المعتمدة.",
    outcomes: [
      "تحديد الفكرة الرئيسة والسياق ضمن مادة يراجعها المعلّم.",
      "التمييز بين معلومة المصدر والتفسير والشرح التعليمي.",
      "تقديم استدلال واضح مع إحالة إلى المورد المعتمد.",
    ],
    lessons: [
      { title: "السياق قبل الاستنتاج", description: "بناء أسئلة تساعد على قراءة الحدث ضمن موضعه وغرض الدرس." },
      { title: "المصدر والشرح", description: "تمييز طبقات المحتوى ومعرفة صاحب كل قول وحدوده." },
      { title: "استجابة مع دليل", description: "صياغة إجابة تعليمية قصيرة تربط الفكرة بالمورد المعتمد." },
    ],
    activities: [
      { title: "استكشف", description: "راجع هدف الدرس ومعلومات المصدر قبل مناقشة المحتوى." },
      { title: "حلّل", description: "قارن بين ملاحظة من المصدر وشرح تعليمي معلن." },
      { title: "استدل", description: "اختر الدليل الأنسب واشرح علاقته بالسؤال." },
    ],
  },
};

export function isLearningPathId(value: string): value is LearningPathId {
  return learningPathIds.includes(value as LearningPathId);
}
