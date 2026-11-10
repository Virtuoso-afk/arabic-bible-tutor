import type { Metadata } from "next";
import { AppShell } from "@/components/shell/app-shell";
import { CourseJourney } from "@/components/learning/course-journey";
import { PathProgressCard } from "@/components/learning/path-progress-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { achievements, demoLearner, evidenceRecords, getCourse, pathProgress, reviewRecommendation } from "@/lib/learning-demo";
import { getLesson, getLessonForCourse } from "@/lib/lesson-fixtures";
import { lessonRoute } from "@/lib/lesson-schema";
import styles from "./dashboard.module.css";

export const metadata: Metadata = { title: "لوحة المتعلّم التجريبية — نَسَق", robots: { index: false, follow: false } };

export default function LearnerDashboardPage() {
  const course = getCourse(demoLearner.currentCourseId)!;
  const currentLesson = course.lessons.find((lesson) => lesson.id === demoLearner.currentLessonId)!;
  const interactiveLesson = getLesson(course.id, currentLesson.id)!;
  const reviewLesson = getLessonForCourse(reviewRecommendation.courseId)!;
  const achievement = achievements[0];
  const completedLessons = pathProgress.reduce((total, progress) => total + progress.completion.completedLessons, 0);

  return (
    <AppShell activeItem="home">
      <Container className={styles.page}>
        <header className={styles.header}>
          <div><Badge tone="milestone">بيانات عرض ثابتة · لا تُحفظ</Badge><h1>مرحبًا، {demoLearner.name}</h1><p>{demoLearner.greetingContext}</p></div>
          <span aria-label="صورة رمزية تجريبية" className={styles.avatar}>{demoLearner.initials}</span>
        </header>

        <div className={styles.layout}>
          <section aria-label="التعلّم الحالي" className={styles.primary}>
            <Surface as="article" className={styles.continueCard} tone="navy">
              <div className={styles.continueMeta}><Badge tone="language">مسار تعلّم العربية</Badge><span>الدرس ٣ من ٥ · عرض فقط</span></div>
              <h2>{currentLesson.title}</h2><p>{currentLesson.summary} لا توجد إجابة محفوظة أو جلسة فعلية.</p>
              <div className={styles.continueBottom}><ButtonLink href={lessonRoute(interactiveLesson)} variant="secondary">ابدأ الدرس التفاعلي <span aria-hidden="true">←</span></ButtonLink><span>المقرر: {course.title}</span></div>
            </Surface>

            <Surface as="section" aria-labelledby="journey-title" className={styles.journeyCard}>
              <div className={styles.cardHeading}><div><span>رحلة المقرر التجريبية</span><h2 id="journey-title">{course.title}</h2></div><Badge tone="neutral">٢ من ٥ دروس مكتملة في العرض</Badge></div>
              <CourseJourney lessons={course.lessons} />
              <div className={styles.journeyNote}><span aria-hidden="true">✦</span><p><strong>المحطة الحالية:</strong> {currentLesson.title}. المحطة الموصى بمراجعتها مميّزة بنص وحالة مستقلين عن الإكمال.</p></div>
            </Surface>

            <section aria-labelledby="progress-title"><div className={styles.sectionHeading}><div><Badge tone="milestone">تقدّم منفصل لكل مسار</Badge><h2 id="progress-title">أدلة العرض لا تُدمج في نتيجة واحدة</h2></div><ButtonLink href="/learn/courses" variant="quiet">استكشف المقررات</ButtonLink></div><div className={styles.progressGrid}>{pathProgress.map((progress) => <PathProgressCard key={progress.pathId} progress={progress} />)}</div></section>
          </section>

          <aside aria-label="ملخصات العرض" className={styles.side}>
            <Surface as="section" className={styles.sideCard}>
              <Badge tone="milestone">مراجعة موصى بها في العرض</Badge><h2>{reviewRecommendation.title}</h2><p>{reviewRecommendation.description}</p><ButtonLink href={lessonRoute(reviewLesson)} variant="secondary">افتح تمرين المراجعة</ButtonLink>
            </Surface>
            <Surface as="section" className={styles.achievement} data-evidence-ids={achievement.evidenceIds.join(" ")} tone="navy">
              <span aria-hidden="true" className={styles.achievementMark}>✦</span><Badge tone="milestone">مثال إنجاز قائم على دليلين</Badge><h2>{achievement.title}</h2><p>{achievement.description}</p><small>إنجاز خاص داخل العرض · لا ترتيب ولا مكافأة عشوائية</small>
            </Surface>
            <Surface as="section" className={styles.evidenceCard}>
              <Badge>ملخص بيانات العرض</Badge><div><strong>{evidenceRecords.length}</strong><span>سجلات دليل نموذجية</span></div><div><strong>{completedLessons}</strong><span>دروس معلّمة كمكتملة</span></div><p>هذه أرقام مشتقة من ملف العرض وليست نشاط مستخدم.</p>
            </Surface>
            <Surface as="section" className={styles.emptyState} tone="soft"><Badge>حالة فارغة</Badge><h2>لا توجد تنبيهات فعلية</h2><p>لا حساب أو مزامنة أو مواعيد في هذا العرض.</p></Surface>
          </aside>
        </div>
      </Container>
    </AppShell>
  );
}
