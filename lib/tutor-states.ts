export type TutorStateId =
  | "grounded-explanation"
  | "progressive-hint"
  | "valid-citation"
  | "insufficient-grounding"
  | "source-unavailable"
  | "educator-review"
  | "corrected-explanation"
  | "tutor-unavailable"
  | "authored-guidance";

export type TutorStateDefinition = {
  id: TutorStateId;
  label: string;
  layerLabel: string;
  tone: "info" | "source" | "warning" | "danger" | "success";
};

export const tutorStateDefinitions: readonly TutorStateDefinition[] = [
  { id: "grounded-explanation", label: "شرح مرتبط بالدرس", layerLabel: "شرح حالة تجريبية", tone: "info" },
  { id: "progressive-hint", label: "تلميح مرحلي", layerLabel: "مساندة مؤلَّفة", tone: "info" },
  { id: "valid-citation", label: "مرجع وإحالة صالحان", layerLabel: "بيانات مصدر", tone: "source" },
  { id: "insufficient-grounding", label: "دليل المصدر غير كافٍ", layerLabel: "حدّ الاستناد", tone: "warning" },
  { id: "source-unavailable", label: "المصدر غير متاح مؤقتًا", layerLabel: "حالة مصدر", tone: "danger" },
  { id: "educator-review", label: "يتطلب مراجعة معلّم", layerLabel: "مراجعة تحريرية", tone: "warning" },
  { id: "corrected-explanation", label: "شرح مصحّح أو متنازع عليه", layerLabel: "إشعار تصحيح", tone: "success" },
  { id: "tutor-unavailable", label: "المعلّم غير متاح", layerLabel: "حالة خدمة", tone: "danger" },
  { id: "authored-guidance", label: "العودة إلى إرشاد الدرس", layerLabel: "إرشاد المقرر", tone: "info" },
] as const;

export function getTutorStateDefinition(id: TutorStateId) {
  return tutorStateDefinitions.find((state) => state.id === id)!;
}
import type { LearningPathId } from "./learning-paths";
import type { InstructionalBlock, LessonActivity } from "./lesson-schema";


export function getTutorStateContent(
  id: TutorStateId,
  activity: LessonActivity,
  guidance: InstructionalBlock,
  pathId: LearningPathId,
  source: InstructionalBlock,
) {
  const sourceReference = source.provenance?.sourceReference;
  switch (id) {
    case "grounded-explanation": return { title: "شرح مرتبط بهدف النشاط", body: activity.tutorGuidance, detail: `الأساس: ${guidance.label} · ${activity.evidence.assessedSkill}` };
    case "progressive-hint": return { title: "ابدأ بأقل قدر من المساعدة", body: activity.hints[0], detail: "هذا التلميح مؤلَّف داخل ملف الدرس ولا يكشف الإجابة الكاملة." };
    case "valid-citation": return sourceReference
      ? { title: "إحالة مرجعية بلا اقتباس", body: source.body, detail: `المرجع: ${sourceReference} · ${source.provenance?.licenseStatus ?? "لا حالة ترخيص متاحة"}` }
      : { title: "بيانات المرجع غير متاحة", body: "لا يمكن عرض إحالة صالحة لأن ملف الدرس لا يحتوي على معرّف مصدر قابل للتحقق.", detail: "لم يُستبدل المرجع بمصدر آخر، ويمكن متابعة الإرشاد المؤلَّف فقط." };
    case "insufficient-grounding": return { title: "لا تكفي البيانات للإجابة", body: pathId === "arabic-language" ? "لا يحتوي الدرس الحالي على مادة معتمدة تجيب عن سؤال تفسيري خارج الهدف اللغوي." : "تحتوي الواجهة على بيانات مرجع وقاعدة مقرر فقط؛ لا يوجد نص مصدر مرخّص يثبت ادعاءً إضافيًا.", detail: "الإجراء الآمن: ارجع إلى الهدف المؤلَّف أو اطلب مراجعة معلّم بدل اختراع إجابة." };
    case "source-unavailable": return { title: "تعذّر عرض المصدر في هذه الحالة", body: "تبقى إجابتك الحالية داخل ذاكرة الصفحة ما دام الدرس مركّبًا، لكن لا يمكن تقديم شرح يعتمد على مصدر غير متاح.", detail: "قد يحتفظ الرجوع في الجلسة بالحالة؛ التحديث الكامل يمسحها، والاستعادة الدائمة تتطلب طبقة حفظ مستقبلية." };
    case "educator-review": return { title: "هذا الشرح يحتاج قرارًا من معلّم", body: "تتجاوز المسألة قاعدة النشاط المحددة أو تحتمل إطارًا تفسيريًا غير معتمد في العرض.", detail: "لم يُعتمد جواب بديل، ولا تُعرض المسألة بوصفها حقيقة مصدرية." };
    case "corrected-explanation": return { title: "سُحب شرح العرض السابق من المراجعة", body: "يوضح التصحيح أن بطاقة المصدر مرجع فقط، وأن إرشاد المقرر ليس اقتباسًا ولا تفسيرًا نهائيًا.", detail: "حالة تصحيح تجريبية · لا تغيّر دليل الدرس أو تقدّمه المؤقت." };
    case "tutor-unavailable": return { title: "المعلّم السياقي غير متاح", body: "لا توجد خدمة ذكاء اصطناعي متصلة أصلًا في هذه المهمة. يمكنك متابعة النشاط والتلميحات المؤلَّفة.", detail: "لم تُفقد إجابتك الحالية أثناء بقاء الصفحة مفتوحة." };
    case "authored-guidance": return { title: guidance.title, body: guidance.body, detail: `${guidance.label} · إعداد فريق المنهج التجريبي` };
  }
}
