"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { InstructionalBlock, LessonActivity } from "@/lib/lesson-schema";
import { getTutorStateContent, getTutorStateDefinition, tutorStateDefinitions, type TutorStateId } from "@/lib/tutor-states";
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
  const sourceReference = source.provenance?.sourceReference;

  useEffect(() => {
    if (mounted.current) {
      panelRef.current?.focus({ preventScroll: true });
      panelRef.current?.scrollIntoView({ block: "center", behavior: "auto" });
    }
    mounted.current = true;
  }, [stateId]);

  const content = getTutorStateContent(stateId, activity, guidance, pathId, source);

  return (
    <div className={styles.root} data-tutor-state={stateId}>
      <div className={styles.heading}><span aria-hidden="true">✦</span><div><h2>المعلّم السياقي</h2><p>عارض حالات حتمي · الذكاء الاصطناعي غير متصل</p></div></div>
      <div className={styles.disclosure}><strong>تجربة واجهة وليست محادثة</strong><p>لا توجد محادثة حية. اختر حالة لمراجعة السلوك المتوقع؛ كل النصوص ثابتة ومؤلَّفة مسبقًا.</p></div>
      <label className={styles.selector}>حالة المعلّم التجريبية<select aria-label="حالة المعلّم التجريبية" onChange={(event) => setStateId(event.target.value as TutorStateId)} value={stateId}>{tutorStateDefinitions.map((state) => <option key={state.id} value={state.id}>{state.label}</option>)}</select></label>

      <div className={`${styles.statePanel} ${styles[definition.tone]}`} ref={panelRef} role="status" tabIndex={-1} data-testid="tutor-state-panel">
        <span>{definition.layerLabel}</span><h3>{content.title}</h3><p>{content.body}</p><small>{content.detail}</small>
        {stateId === "valid-citation" && sourceReference && <div className={styles.citation}><strong>إحالة مصدر</strong><bdi dir="ltr">{sourceReference}</bdi><span>{source.provenance?.owner}</span></div>}
      </div>

      <div className={styles.actions}>
        <Button onClick={onRevealHint} variant="secondary">اكشف تلميح النشاط</Button>
        <Button disabled={stateId === "authored-guidance"} onClick={() => setStateId("authored-guidance")} variant="quiet">العودة إلى إرشاد الدرس</Button>
      </div>
    </div>
  );
}
