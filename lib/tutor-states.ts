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
