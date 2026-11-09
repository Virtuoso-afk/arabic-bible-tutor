import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/app-shell";
import { CourseJourney } from "@/components/learning/course-journey";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { courses, getCourse } from "@/lib/learning-demo";
import { learningPaths } from "@/lib/learning-paths";
import styles from "./course-detail.module.css";

type CourseDetailProps = { params: Promise<{ courseId: string }> };

export function generateStaticParams() { return courses.map((course) => ({ courseId: course.id })); }

export async function generateMetadata({ params }: CourseDetailProps): Promise<Metadata> {
  const course = getCourse((await params).courseId);
  return course ? { title: `${course.title} — نَسَق`, description: course.summary, robots: { index: false, follow: false } } : {};
}

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const course = getCourse((await params).courseId);
  if (!course) notFound();
  const path = learningPaths[course.pathId];
  const otherPathAnchor = course.pathId === "arabic-language" ? "path-b" : "path-a";
  const otherPath = learningPaths[course.pathId === "arabic-language" ? "bible-study" : "arabic-language"];
  return (
    <AppShell activeItem="courses">
      <Container className={`${styles.page} ${styles[path.tone]}`}>
        <nav aria-label="مسار التنقل" className={styles.breadcrumbs}><Link href="/learn">الرئيسية</Link><span aria-hidden="true">/</span><Link href="/learn/courses">المقررات</Link><span aria-hidden="true">/</span><span aria-current="page">{course.title}</span></nav>
        <header className={styles.hero}>
          <div><Badge tone={path.tone}>{path.label}</Badge><h1>{course.title}</h1><p>{course.summary}</p><div className={styles.meta}><span>{course.level}</span><span>{course.effort}</span></div></div>
          <Surface as="aside" className={`${styles.availability} ${course.status === "demo" ? styles.darkAvailability : ""}`} tone={course.status === "demo" ? "navy" : "soft"}><Badge tone={course.status === "demo" ? "milestone" : "neutral"}>{course.status === "demo" ? "عرض تفاصيل تجريبي" : "تصور مفاهيمي غير متاح"}</Badge><h2>{course.status === "demo" ? "يمكن مراجعة الهيكل فقط" : "لا يوجد مقرر عامل هنا"}</h2><p>{course.status === "demo" ? "الدروس والنتائج أدناه بيانات عرض ثابتة. لا تسجيل أو إكمال أو حفظ تقدّم." : "تعرض الصفحة الفكرة لتقييم نطاق الكتالوج، ولا تعد بمحتوى أو موعد إطلاق."}</p></Surface>
        </header>

        <section aria-labelledby="outcomes-title" className={styles.section}><div className={styles.sectionHeading}><Badge tone={path.tone}>نتائج مقترحة</Badge><h2 id="outcomes-title">ما الذي يستهدفه هذا المثال؟</h2></div><ul className={styles.outcomes}>{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>

        <Surface as="section" aria-labelledby="curriculum-title" className={styles.curriculum}>
          <div className={styles.sectionHeading}><Badge tone={path.tone}>مخطط المقرر</Badge><h2 id="curriculum-title">معاينة الدروس</h2><p>الحالات التالية بيانات عرض دلالية؛ لا تمثل نشاطًا أو إكمالًا حقيقيًا.</p></div>
          <CourseJourney lessons={course.lessons} />
          <div className={styles.lessonList}>{course.lessons.map((lesson, index) => <article id={lesson.id} key={lesson.id}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{lesson.title}</h3><p>{lesson.summary}</p></div><small>{lesson.state === "complete" ? "مكتمل في بيانات العرض" : lesson.state === "current" ? "مثال حالي" : lesson.state === "review" ? "مراجعة موصى بها" : "مثال مستقبلي"}</small></article>)}</div>
        </Surface>

        <div className={styles.notes}><Surface as="section"><Badge>ملاحظة تحريرية</Badge><h2>حدود المحتوى</h2><p>{course.editorialNote}</p></Surface><Surface as="section"><Badge tone="milestone">المصدر والترخيص</Badge><h2>سياسة هذا المثال</h2><p>{course.sourcePolicy}</p></Surface></div>

        <Surface as="section" className={styles.switcher} elevated><div><Badge tone={otherPath.tone}>مسار تعليمي مستقل</Badge><h2>هل تريد استكشاف {otherPath.shortName}؟</h2><p>ينتقل الرابط إلى كتالوج المسار الآخر دون دمج النتائج أو الأدلة.</p></div><div><ButtonLink href={`/learn/courses#${otherPathAnchor}`} variant="secondary">انتقل إلى مقررات المسار الآخر</ButtonLink><ButtonLink href="/learn/courses" variant="quiet">كل المقررات</ButtonLink></div></Surface>
      </Container>
    </AppShell>
  );
}
