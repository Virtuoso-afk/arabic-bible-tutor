import type { Metadata } from "next";
import { AppShell } from "@/components/shell/app-shell";
import { CourseCard } from "@/components/learning/course-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { courses } from "@/lib/learning-demo";
import { learningPaths } from "@/lib/learning-paths";
import styles from "./courses.module.css";

export const metadata: Metadata = { title: "استكشاف المقررات التجريبية — نَسَق", robots: { index: false, follow: false } };

export default function CourseDiscoveryPage() {
  const languageCourses = courses.filter((course) => course.pathId === "arabic-language");
  const studyCourses = courses.filter((course) => course.pathId === "bible-study");
  return (
    <AppShell activeItem="courses">
      <Container className={styles.page}>
        <header className={styles.header}><div><Badge tone="milestone">كتالوج تجريبي ثابت</Badge><h1>استكشف المقررات</h1><p>تصف البطاقات أمثلة محلية فقط. “عرض قابل للاستكشاف” يعني وجود صفحة تفاصيل، ولا يعني أن المقرر متاح للتسجيل أو التعلّم الفعلي.</p></div><ButtonLink href="/learn" variant="secondary">العودة إلى لوحة العرض</ButtonLink></header>
        <nav aria-label="انتقل إلى مسار في الكتالوج" className={styles.pathNav} id="learning-paths"><a href="#path-a">المسار A · تعلّم العربية</a><a href="#path-b">المسار B · دراسة الكتاب</a><a href="#future-subjects">موضوعات مستقبلية</a></nav>

        <section aria-labelledby="path-a-title" className={styles.pathSection} id="path-a">
          <div className={styles.sectionHeading}><div><Badge tone="language">{learningPaths["arabic-language"].label}</Badge><h2 id="path-a-title">مقررات اكتساب اللغة العربية</h2></div><p>{learningPaths["arabic-language"].purpose}</p></div>
          <div className={styles.grid}>{languageCourses.map((course) => <CourseCard course={course} key={course.id} />)}</div>
        </section>

        <section aria-labelledby="path-b-title" className={styles.pathSection} id="path-b">
          <div className={styles.sectionHeading}><div><Badge tone="study">{learningPaths["bible-study"].label}</Badge><h2 id="path-b-title">مقررات دراسة الكتاب بالعربية</h2></div><p>{learningPaths["bible-study"].purpose}</p></div>
          <div className={styles.grid}>{studyCourses.map((course) => <CourseCard course={course} key={course.id} />)}</div>
        </section>

        <Surface as="section" aria-labelledby="future-title" className={styles.empty} id="future-subjects" tone="soft"><span aria-hidden="true">+</span><div><Badge>حالة فارغة صادقة</Badge><h2 id="future-title">لا توجد موضوعات مستقبلية معتمدة بعد</h2><p>البنية تدعم مواد أخرى لاحقًا، لكن لا توجد مقررات أو مواعيد إطلاق يمكن عرضها الآن.</p></div></Surface>
      </Container>
    </AppShell>
  );
}
