import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import type { DemoCourse } from "@/lib/learning-demo";
import { learningPaths } from "@/lib/learning-paths";
import styles from "./course-card.module.css";

export function CourseCard({ course }: { course: DemoCourse }) {
  const path = learningPaths[course.pathId];
  return (
    <Surface as="article" className={`${styles.card} ${styles[path.tone]}`} elevated>
      <div className={styles.top}><Badge tone={path.tone}>{path.label}</Badge><span className={styles.status}>{course.status === "demo" ? "محتوى عرض قابل للاستكشاف" : "تصور غير متاح"}</span></div>
      <h3>{course.title}</h3>
      <p>{course.summary}</p>
      <div className={styles.meta}><span>{course.level}</span><span>{course.effort}</span></div>
      <ul>{course.outcomes.slice(0, 2).map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
      <ButtonLink aria-label={`عرض تفاصيل مقرر ${course.title}`} className={styles.action} href={`/learn/courses/${course.id}`} variant={course.status === "demo" ? "primary" : "secondary"}>{course.status === "demo" ? "عرض تفاصيل المقرر" : "عرض التصور"} <span aria-hidden="true">←</span></ButtonLink>
    </Surface>
  );
}
