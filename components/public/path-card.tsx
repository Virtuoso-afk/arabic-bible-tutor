import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import type { LearningPath } from "@/lib/learning-paths";
import styles from "./path-card.module.css";

export function PathCard({ path }: { path: LearningPath }) {
  return (
    <Surface as="article" className={`${styles.card} ${styles[path.tone]}`} elevated>
      <div aria-hidden="true" className={styles.marker}>{path.marker}</div>
      <Badge tone={path.tone}>{path.label}</Badge>
      <h3>{path.name}</h3>
      <p>{path.summary}</p>
      <ul>{path.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
      <ButtonLink aria-label={`استكشف ${path.shortName}`} className={styles.action} href={`/learn/paths/${path.id}`} variant="quiet">استكشف المسار <span aria-hidden="true">←</span></ButtonLink>
    </Surface>
  );
}
