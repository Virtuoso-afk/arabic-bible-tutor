import { Badge } from "@/components/ui/badge";
import { ProgressIndicator } from "@/components/ui/progress";
import { Surface } from "@/components/ui/surface";
import type { PathProgressFixture } from "@/lib/learning-demo";
import { learningPaths } from "@/lib/learning-paths";
import styles from "./path-progress-card.module.css";

export function PathProgressCard({ progress }: { progress: PathProgressFixture }) {
  const path = learningPaths[progress.pathId];
  const completion = progress.completion;
  return (
    <Surface as="article" className={`${styles.card} ${styles[path.tone]}`}>
      <div className={styles.heading}><span aria-hidden="true" className={styles.marker}>{path.marker}</span><div><Badge tone={path.tone}>{path.label}</Badge><h3>{path.shortName}</h3></div></div>
      <ProgressIndicator label={`إكمال المقرر التجريبي: ${completion.completedLessons} من ${completion.totalLessons} دروس`} max={completion.totalLessons} tone={path.tone} value={completion.completedLessons} />
      <div className={styles.skills}>
        {progress.skills.map((skill) => <ProgressIndicator key={skill.label} label={`${skill.label}: ${skill.evidenceIds.length} من ${skill.targetEvidenceCount} أدلة نموذجية`} max={skill.targetEvidenceCount} tone={path.tone} value={skill.evidenceIds.length} />)}
      </div>
      <p>الإكمال يقيس الدروس في العرض فقط. الأدلة أمثلة مستقلة ولا تمثل حكمًا بإتقان فعلي.</p>
    </Surface>
  );
}
