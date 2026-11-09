import type { Metadata } from "next";
import Link from "next/link";
import { PathProgressCard } from "@/components/learning/path-progress-card";
import { AppShell } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { achievements, evidenceRecords, getCourse, pathProgress, reviewSuggestions } from "@/lib/learning-demo";
import { getLessonForCourse } from "@/lib/lesson-fixtures";
import { lessonRoute } from "@/lib/lesson-schema";
import { learningPaths } from "@/lib/learning-paths";
import styles from "./progress.module.css";

export const metadata: Metadata = { title: "التقدّم التجريبي — نَسَق", robots: { index: false, follow: false } };

export default function ProgressPage() {
  return (
    <AppShell activeItem="progress">
      <Container className={styles.page}>
        <header className={styles.header}>
          <div><Badge tone="milestone">عرض ثابت · ليس سجل متعلّم</Badge><h1>التقدّم والأدلة</h1><p>تشرح هذه الصفحة كيف قد يظهر التقدّم من بيانات نموذجية مسمّاة. محاولات الدروس التفاعلية مؤقتة ولا تصل إلى هنا.</p></div>
          <ButtonLink href="/learn/courses" variant="secondary">استكشف المقررات</ButtonLink>
        </header>

        <Surface as="section" className={styles.provenance} tone="navy" aria-labelledby="provenance-title">
          <Badge tone="milestone">مصدر البيانات</Badge><div><h2 id="provenance-title">ملف عرض ثابت، منفصل عن جلسة الدرس</h2><p>الإكمال وأدلة المهارة أدناه مشتقة فقط من <bdi dir="ltr">learning-demo.ts</bdi>. لا حساب، ولا تاريخ فعلي، ولا مزامنة، ولا ادعاء إتقان.</p></div>
        </Surface>

        <section aria-labelledby="paths-title" className={styles.section}>
          <div className={styles.sectionHeading}><div><Badge>مساران مستقلان</Badge><h2 id="paths-title">الإكمال لا يساوي الكفاءة</h2></div><p>الإكمال يعدّ دروس العرض المعلّمة كمكتملة. مؤشرات المهارة تعدّ سجلات دليل مسمّاة مقابل هدف توضيحي، ولا تمنح شهادة أو رتبة.</p></div>
          <div className={styles.pathGrid}>{pathProgress.map((progress) => <PathProgressCard key={progress.pathId} progress={progress} />)}</div>
        </section>

        <section aria-labelledby="evidence-title" className={styles.section}>
          <div className={styles.sectionHeading}><div><Badge tone="milestone">أدلة قابلة للتتبّع</Badge><h2 id="evidence-title">سجلات العرض المسمّاة</h2></div><p>كل سجل مرتبط بمسار واحد فقط. لا تظهر إجابات الجلسة المؤقتة ولا بيانات شخصية.</p></div>
          <div className={styles.evidenceColumns}>{pathProgress.map((progress) => {
            const path = learningPaths[progress.pathId];
            const records = evidenceRecords.filter((record) => record.pathId === progress.pathId);
            return <Surface as="article" className={`${styles.evidenceGroup} ${styles[path.tone]}`} key={progress.pathId}><Badge tone={path.tone}>{path.label}</Badge><h3>{path.shortName}</h3><ul>{records.map((record) => <li key={record.id}><code dir="ltr">{record.id}</code><div><strong>{record.dimension}</strong><span>{record.description}</span></div></li>)}</ul></Surface>;
          })}</div>
        </section>

        <section aria-labelledby="achievements-title" className={styles.section}>
          <div className={styles.sectionHeading}><div><Badge tone="milestone">أمثلة خاصة</Badge><h2 id="achievements-title">إنجازات مستندة إلى دليل العرض</h2></div><p>هذه المعايير توضيحية ولم تُمنح إلى حساب. لا سلاسل أيام، ولا ترتيب عام، ولا خسارة.</p></div>
          <div className={styles.achievementGrid}>{achievements.map((achievement) => {
            const path = learningPaths[achievement.pathId];
            return <Surface as="article" className={`${styles.achievement} ${styles[path.tone]}`} data-achievement-id={achievement.id} data-evidence-ids={achievement.evidenceIds.join(" ")} key={achievement.id}><div><Badge tone={path.tone}>{path.shortName}</Badge><Badge tone="neutral">حالة عرض غير ممنوحة</Badge></div><span aria-hidden="true">✦</span><h3>{achievement.title}</h3><p>{achievement.description}</p><dl><dt>المعيار الصريح</dt><dd>{achievement.criterion}</dd><dt>الأدلة المسماة</dt><dd>{achievement.evidenceIds.map((id) => <code dir="ltr" key={id}>{id}</code>)}</dd></dl></Surface>;
          })}</div>
        </section>

        <section aria-labelledby="review-title" className={styles.section}>
          <div className={styles.sectionHeading}><div><Badge>مراجعة بلا عقوبة</Badge><h2 id="review-title">اقتراحات مع سبب واضح</h2></div><p>يمكن تأجيل أي مراجعة. لا موعد نهائي أو فقدان إنجاز.</p></div>
          <div className={styles.reviewGrid}>{reviewSuggestions.map((suggestion) => {
            const lesson = getLessonForCourse(suggestion.courseId)!;
            const course = getCourse(suggestion.courseId)!;
            return <Surface as="article" key={suggestion.courseId}><h3>{suggestion.title}</h3><p>{suggestion.description}</p><ButtonLink href={lessonRoute(lesson)} variant="secondary">افتح درس {course.title}</ButtonLink></Surface>;
          })}</div>
        </section>

        <div className={styles.states}>
          <Surface as="section" tone="soft"><Badge>حالة فارغة</Badge><h2>لا توجد أدلة جلسة محفوظة</h2><p>هذا متوقع: أنشطة 01A-4 تبقى في الذاكرة أثناء فتح الدرس فقط.</p></Surface>
          <Surface as="section" tone="soft"><Badge>غير متاح بعد</Badge><h2>لا سجل زمني أو شهادات</h2><p>يتطلب التاريخ الفعلي والمزامنة طبقة حسابات وخصوصية وتخزين لم تُنفّذ.</p></Surface>
        </div>

        <footer className={styles.footer}><Link href="/learn">العودة إلى لوحة العرض</Link><span>لا تُحفظ أي بيانات من هذه الصفحة</span></footer>
      </Container>
    </AppShell>
  );
}
