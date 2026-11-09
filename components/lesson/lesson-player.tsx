"use client";

import Link from "next/link";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { DemoLessonDefinition } from "@/lib/lesson-schema";
import { createLessonReducer, initialLessonState } from "@/lib/lesson-state";
import { learningPaths } from "@/lib/learning-paths";
import styles from "./lesson-player.module.css";

type LessonPlayerProps = { lesson: DemoLessonDefinition; courseTitle: string };

const layerStyles = {
  objective: styles.objectiveLayer,
  "source-reference": styles.sourceLayer,
  "educator-guidance": styles.educatorLayer,
};

export function LessonPlayer({ lesson, courseTitle }: LessonPlayerProps) {
  const reducer = useMemo(() => createLessonReducer(lesson), [lesson]);
  const [state, dispatch] = useReducer(reducer, initialLessonState);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLHeadingElement>(null);
  const completionRef = useRef<HTMLDivElement>(null);
  const tutorRef = useRef<HTMLElement>(null);
  const path = learningPaths[lesson.pathId];
  const activity = lesson.activities[state.currentActivityIndex];
  const isActive = state.status !== "not-started" && state.status !== "reset" && state.status !== "completed";
  const completedActivities = state.status === "completed" ? lesson.activities.length : state.currentActivityIndex;
  const progressValue = Math.round((completedActivities / lesson.activities.length) * 100);
  const feedbackVisible = state.classification !== null;

  useEffect(() => {
    if (feedbackVisible) feedbackRef.current?.focus();
  }, [feedbackVisible, state.classification]);

  useEffect(() => {
    if (isActive) activityRef.current?.focus();
  }, [state.currentActivityIndex, isActive]);

  useEffect(() => {
    if (state.status === "completed") completionRef.current?.focus();
  }, [state.status]);

  const revealHint = () => dispatch({ type: "REVEAL_HINT", hintTotal: activity.hints.length });
  const scrollToTutor = () => tutorRef.current?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });

  return (
    <div className={`${styles.lessonRoot} ${styles[path.tone]}`} data-evidence-count={state.evidence.length} data-lesson-status={state.status} data-testid="lesson-player">
      <a className={styles.skipLink} href="#lesson-main">انتقل إلى نشاط الدرس</a>
      <header className={styles.lessonHeader}>
        <Link className={styles.brand} href="/learn" aria-label="نَسَق، لوحة المتعلّم"><span aria-hidden="true">نَ</span><strong>نَسَق</strong><small>مشغّل الدرس التجريبي</small></Link>
        <div className={styles.headerProgress}>
          <span>{state.status === "completed" ? "اكتمل العرض" : `النشاط ${state.currentActivityIndex + 1} من ${lesson.activities.length}`}</span>
          <progress aria-label={`تقدم الدرس: ${progressValue} بالمئة`} max="100" value={progressValue}>{progressValue}%</progress>
          <b>{progressValue}٪</b>
        </div>
        <div className={styles.headerActions}><span>جلسة محلية مؤقتة</span><Link href={`/learn/courses/${lesson.courseId}`}>خروج إلى المقرر</Link></div>
      </header>

      <div className={styles.lessonLayout}>
        <aside className={styles.outline} aria-label="مخطط الدرس">
          <span className={styles.pathBadge}>{path.label}</span>
          <h2>{lesson.title}</h2>
          <p>{lesson.estimatedMinutes} دقيقة تقريبًا · النسخة <bdi dir="ltr">{lesson.fixtureVersion}</bdi></p>
          <ol>
            {lesson.activities.map((item, index) => {
              const complete = index < state.currentActivityIndex || state.status === "completed";
              const current = index === state.currentActivityIndex && state.status !== "completed";
              return <li className={complete ? styles.outlineComplete : current ? styles.outlineCurrent : ""} key={item.id}><span aria-hidden="true">{complete ? "✓" : index + 1}</span><div><strong>{item.title}</strong><small>{complete ? "أُكمل في هذه الجلسة" : current ? "النشاط الحالي" : "لاحقًا"}</small></div></li>;
            })}
          </ol>
          <div className={styles.localNotice}><strong>حالة عرض محلية</strong><p>لا حساب ولا حفظ. تحديث الصفحة أو الخروج يعيد هذه المحاولة.</p></div>
        </aside>

        <main className={styles.lessonMain} id="lesson-main" tabIndex={-1}>
          <nav aria-label="مسار التنقل" className={styles.breadcrumbs}><Link href="/learn/courses">المقررات</Link><span aria-hidden="true">/</span><Link href={`/learn/courses/${lesson.courseId}`}>{courseTitle}</Link><span aria-hidden="true">/</span><span aria-current="page">{lesson.title}</span></nav>

          <section className={styles.contextGrid} aria-label="سياق الدرس وطبقات المحتوى">
            {lesson.blocks.map((block) => <article className={`${styles.contextCard} ${layerStyles[block.layer]}`} id={block.id} key={block.id}><span>{block.label}</span><h2>{block.title}</h2><p>{block.body}</p>{block.provenance && <dl><div><dt>المالك</dt><dd>{block.provenance.owner}</dd></div><div><dt>المراجعة</dt><dd>{block.provenance.reviewedBy}</dd></div><div><dt>الترخيص</dt><dd>{block.provenance.licenseStatus}</dd></div>{block.provenance.sourceReference && <div><dt>معرّف المرجع</dt><dd><bdi dir="ltr">{block.provenance.sourceReference}</bdi></dd></div>}</dl>}</article>)}
          </section>

          {(state.status === "not-started" || state.status === "reset") && <section className={styles.startPanel} aria-labelledby="lesson-title"><span className={styles.pathBadge}>{path.label}</span><h1 id="lesson-title">{lesson.title}</h1><p>{lesson.objectives[0].text}</p><ul><li>ثلاثة أنشطة مترابطة مع تغذية راجعة وتلميحات.</li><li>الإجابات محددة مسبقًا وليست تقييمًا من ذكاء اصطناعي.</li><li>كل الأدلة تبقى داخل هذه الصفحة حتى تحديثها.</li></ul>{state.status === "reset" && <p className={styles.resetMessage} role="status">أُعيد ضبط العرض. لم تُحفظ المحاولة السابقة.</p>}<Button onClick={() => dispatch({ type: "START" })}>ابدأ الدرس التجريبي</Button></section>}

          {isActive && <section className={styles.activitySection} aria-labelledby="activity-title" data-activity-id={activity.id}>
            <header><span>اختيار واحد · محاولات غير محدودة</span><h1 id="activity-title" ref={activityRef} tabIndex={-1}>{activity.prompt}</h1><p>{activity.instruction}</p></header>

            <fieldset className={styles.choices} disabled={state.status === "submitted" && state.classification === "correct"}>
              <legend>اختر إجابة واحدة</legend>
              {activity.choices.map((choice, index) => <label className={state.selectedAnswerId === choice.id ? styles.choiceSelected : ""} key={choice.id}><input checked={state.selectedAnswerId === choice.id} name={`answer-${activity.id}`} onChange={() => dispatch({ type: "SELECT_ANSWER", answerId: choice.id })} type="radio" value={choice.id} /><span aria-hidden="true">{["أ", "ب", "ج"][index]}</span><strong>{choice.label}</strong>{choice.description && <small>{choice.description}</small>}</label>)}
            </fieldset>

            {state.hintCount > 0 && <aside className={styles.hintPanel} aria-live="polite" data-testid="hint-panel"><div><span>تلميح {state.hintCount} من {activity.hints.length}</span><h2>{activity.hints[state.hintCount - 1]}</h2><p>التلميح جزء من المساندة، ويُسجّل عدده في دليل الجلسة فقط.</p></div>{state.hintCount < activity.hints.length && <Button onClick={revealHint} variant="secondary">تلميح أوضح</Button>}</aside>}

            {feedbackVisible && <div className={`${styles.feedbackPanel} ${state.classification === "correct" ? styles.feedbackCorrect : styles.feedbackIncorrect}`} ref={feedbackRef} role="status" tabIndex={-1} data-testid="feedback-panel"><span className={styles.feedbackIcon} aria-hidden="true">{state.classification === "correct" ? "✓" : "!"}</span><div><span>تغذية راجعة تعليمية</span><h2>{state.classification === "correct" ? activity.evaluation.correctHeading : activity.evaluation.incorrectHeading}</h2><p>{state.classification === "correct" ? activity.evaluation.correctExplanation : activity.evaluation.incorrectExplanation}</p>{state.classification === "incorrect" && <p><strong>خطوة علاجية:</strong> {activity.remediation}</p>}<div className={styles.evidenceNote}><strong>دليل جلسة: {activity.evidence.assessedSkill}</strong><span>{activity.evidence.masteryCaveat}</span></div></div></div>}

            <div className={styles.activityActions}>
              <Button disabled={state.hintCount >= activity.hints.length} onClick={revealHint} variant="secondary">{state.hintCount === 0 ? "أرني تلميحًا" : "التلميحات مكتملة"}</Button>
              <div><span>{state.status === "in-progress" ? "اختر إجابة للمتابعة" : state.status === "answer-selected" ? "الإجابة جاهزة للتحقق" : state.status === "retry-available" ? "غيّر الإجابة ثم حاول مجددًا" : "اكتمل النشاط؛ تابع عندما تكون جاهزًا"}</span>{state.status === "submitted" && state.classification === "correct" ? <Button onClick={() => dispatch({ type: "NEXT" })}>{state.currentActivityIndex === lesson.activities.length - 1 ? "اعرض ملخص الإكمال" : "النشاط التالي"}</Button> : <Button disabled={state.status !== "answer-selected"} onClick={() => dispatch({ type: "SUBMIT" })}>تحقّق من الإجابة</Button>}</div>
            </div>
          </section>}

          {state.status === "completed" && <section className={styles.completionPanel} ref={completionRef} tabIndex={-1} data-testid="completion-panel"><span aria-hidden="true">✓</span><p className={styles.completionEyebrow}>اكتمل العرض المحلي</p><h1>أنهيت أنشطة «{lesson.title}»</h1><p>أكملت {lesson.activities.length} أنشطة في هذه الجلسة. هذا إكمال للنموذج فقط، ولا يعني إتقانًا أو تقدّمًا محفوظًا.</p><div className={styles.evidenceSummary}><h2>ملخص دليل الجلسة</h2><ul>{lesson.activities.map((item) => <li key={item.id}><strong>{item.evidence.assessedSkill}</strong><span>{item.evidence.completionMeaning}</span></li>)}</ul><p>سجلات المحاولات: {state.evidence.length} · لا تتضمن اسمًا أو إجابات نصية حرة.</p></div><div className={styles.completionActions}><Button onClick={() => dispatch({ type: "RESET" })} variant="secondary">أعد تشغيل العرض</Button><Link href={`/learn/courses/${lesson.courseId}`}>ارجع إلى المقرر</Link></div></section>}
        </main>

        <aside className={styles.tutorPanel} ref={tutorRef} aria-labelledby="tutor-title">
          <div className={styles.tutorHeading}><span aria-hidden="true">✦</span><div><h2 id="tutor-title">المعلّم السياقي</h2><p>إرشاد مؤلَّف · الذكاء الاصطناعي غير متصل</p></div></div>
          <div className={styles.disclosure}><strong>لا توجد محادثة حية</strong><p>يعرض هذا الجزء إرشادًا حتميًا كتبه فريق المنهج للهدف الحالي.</p></div>
          {isActive ? <><div className={styles.tutorContext}><span>النشاط الحالي</span><h3>{activity.title}</h3><p>{activity.tutorGuidance}</p></div><nav aria-label="مساندة الدرس" className={styles.tutorActions}><button onClick={revealHint} type="button">اكشف التلميح المتاح</button><a href={lesson.pathId === "bible-study" ? "#study-guidance" : "#lang-guidance"}>راجع قاعدة المقرر</a><a href={lesson.pathId === "bible-study" ? "#study-reference" : "#lang-reference"}>راجع بيانات المصدر</a></nav></> : <div className={styles.tutorContext}><span>حدود المساندة</span><h3>ابدأ الدرس لعرض إرشاد النشاط</h3><p>لن يرسل النموذج سؤالًا أو ينشئ إجابة. الإرشاد مرتبط بالنشاط فقط.</p></div>}
        </aside>
      </div>

      {isActive && <nav className={styles.mobileUtility} aria-label="أدوات الدرس للهاتف"><button onClick={revealHint} type="button"><span aria-hidden="true">؟</span> تلميح</button><span>{state.currentActivityIndex + 1} من {lesson.activities.length}</span><button onClick={scrollToTutor} type="button"><span aria-hidden="true">✦</span> الإرشاد</button></nav>}
    </div>
  );
}
