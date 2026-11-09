import type { DemoLesson } from "@/lib/learning-demo";
import styles from "./course-journey.module.css";

const stateLabels = {
  complete: "مكتملة في العرض",
  current: "المحطة الحالية في العرض",
  future: "محطة مستقبلية",
  review: "مراجعة موصى بها",
} as const;

export function CourseJourney({ lessons }: { lessons: readonly DemoLesson[] }) {
  return (
    <ol aria-label="محطات المقرر التجريبية" className={styles.journey}>
      {lessons.map((lesson, index) => (
        <li className={styles[lesson.state]} data-journey-state={lesson.state} key={lesson.id}>
          <span aria-hidden="true">{lesson.state === "complete" ? "✓" : index + 1}</span>
          <div><strong>{lesson.title}</strong><small>{stateLabels[lesson.state]}</small></div>
        </li>
      ))}
    </ol>
  );
}
