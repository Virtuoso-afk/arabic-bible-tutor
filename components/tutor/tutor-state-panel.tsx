"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { InstructionalBlock, LessonActivity } from "@/lib/lesson-schema";
import { getTutorStateDefinition, tutorStateDefinitions, type TutorStateId } from "@/lib/tutor-states";
import type { LearningPathId } from "@/lib/learning-paths";
import styles from "./tutor-state-panel.module.css";

type TutorStatePanelProps = {
  activity: LessonActivity;
  guidance: InstructionalBlock;
  onRevealHint: () => void;
  pathId: LearningPathId;
  source: InstructionalBlock;
};

export function TutorStatePanel({ activity, guidance, onRevealHint, pathId, source }: TutorStatePanelProps) {
  const [stateId, setStateId] = useState<TutorStateId>("grounded-explanation");
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const definition = getTutorStateDefinition(stateId);
  const sourceReference = source.provenance?.sourceReference ?? "Reference metadata unavailable";

  useEffect(() => {
    if (mounted.current) panelRef.current?.focus();
    mounted.current = true;
  }, [stateId]);

  const content = (() => {
    switch (stateId) {
      case "grounded-explanation": return { title: "شرح مرتبط بهدف النشاط", body: activity.tutorGuidance, detail: `الأساس: ${guidance.label} · ${activity.evidence.assessedSkill}` };
      case "progressive-hint": return { title: "ابدأ بأقل قدر من المساعدة", body: activity.hints[0], detail: "هذا التلميح مؤلَّف داخل ملف الدرس ولا يكشف الإجابة الكاملة." };
      case "valid-citation": return { title: "إحالة مرجعية بلا اقتباس", body: source.body, detail: `المرجع: ${sourceReference} · ${source.provenance?.licenseStatus ?? "لا حالة ترخيص متاحة"}` };
      case "insufficient-grounding": return { title: "لا تكفي البيانات للإجابة", body: pathId === "arabic-language" ? "لا يحتوي الدرس الحالي على مادة معتمدة تجيب عن سؤال تفسيري خارج الهدف اللغوي." : "تحتوي الواجهة على بيانات مرجع وقاعدة مقرر فقط؛ لا يوجد نص مصدر مرخّص يثبت ادعاءً إضافيًا.", detail: "الإجراء الآمن: ارجع إلى الهدف المؤلَّف أو اطلب مراجعة معلّم بدل اختراع إجابة." };
      case "source-unavailable": return { title: "تعذّر عرض المصدر في هذه الحالة", body: "تبقى إجابتك الحالية داخل ذاكرة الصفحة ما دام الدرس مفتوحًا، لكن لا يمكن تقديم شرح يعتمد على مصدر غير متاح.", detail: "التحديث أو الخروج يمسح المحاولة؛ الاستعادة الدائمة تتطلب طبقة حفظ مستقبلية." };
      case "educator-review": return { title: "هذا الشرح يحتاج قرارًا من معلّم", body: "تتجاوز المسألة قاعدة النشاط المحددة أو تحتمل إطارًا تفسيريًا غير معتمد في العرض.", detail: "لم يُعتمد جواب بديل، ولا تُعرض المسألة بوصفها حقيقة مصدرية." };
      case "corrected-explanation": return { title: "سُحب شرح العرض السابق من المراجعة", body: "يوضح التصحيح أن بطاقة المصدر مرجع فقط، وأن إرشاد المقرر ليس اقتباسًا ولا تفسيرًا نهائيًا.", detail: "حالة تصحيح تجريبية · لا تغيّر دليل الدرس أو تقدّمه المؤقت." };
      case "tutor-unavailable": return { title: "المعلّم السياقي غير متاح", body: "لا توجد خدمة ذكاء اصطناعي متصلة أصلًا في هذه المهمة. يمكنك متابعة النشاط والتلميحات المؤلَّفة.", detail: "لم تُفقد إجابتك الحالية أثناء بقاء الصفحة مفتوحة." };
      case "authored-guidance": return { title: guidance.title, body: guidance.body, detail: `${guidance.label} · إعداد فريق المنهج التجريبي` };
    }
  })();

  return (
    <div className={styles.root} data-tutor-state={stateId}>
      <div className={styles.heading}><span aria-hidden="true">✦</span><div><h2>المعلّم السياقي</h2><p>عارض حالات حتمي · الذكاء الاصطناعي غير متصل</p></div></div>
      <div className={styles.disclosure}><strong>تجربة واجهة وليست محادثة</strong><p>لا توجد محادثة حية. اختر حالة لمراجعة السلوك المتوقع؛ كل النصوص ثابتة ومؤلَّفة مسبقًا.</p></div>
      <label className={styles.selector}>حالة المعلّم التجريبية<select aria-label="حالة المعلّم التجريبية" onChange={(event) => setStateId(event.target.value as TutorStateId)} value={stateId}>{tutorStateDefinitions.map((state) => <option key={state.id} value={state.id}>{state.label}</option>)}</select></label>

      <div className={`${styles.statePanel} ${styles[definition.tone]}`} ref={panelRef} role="status" tabIndex={-1} data-testid="tutor-state-panel">
        <span>{definition.layerLabel}</span><h3>{content.title}</h3><p>{content.body}</p><small>{content.detail}</small>
        {stateId === "valid-citation" && <div className={styles.citation}><strong>إحالة مصدر</strong><bdi dir="ltr">{sourceReference}</bdi><span>{source.provenance?.owner}</span></div>}
      </div>

      <div className={styles.actions}>
        <Button onClick={onRevealHint} variant="secondary">اكشف تلميح النشاط</Button>
        <Button disabled={stateId === "authored-guidance"} onClick={() => setStateId("authored-guidance")} variant="quiet">العودة إلى إرشاد الدرس</Button>
      </div>
    </div>
  );
}
