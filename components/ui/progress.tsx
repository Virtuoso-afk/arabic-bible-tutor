import styles from "./primitives.module.css";

type ProgressTone = "primary" | "language" | "study" | "milestone";

const toneClasses: Record<ProgressTone, string> = {
  primary: "",
  language: styles.progressLanguage,
  study: styles.progressStudy,
  milestone: styles.progressMilestone,
};

type ProgressIndicatorProps = {
  label: string;
  max?: number;
  tone?: ProgressTone;
  value: number;
};

export function ProgressIndicator({ label, max = 100, tone = "primary", value }: ProgressIndicatorProps) {
  const percent = Math.round((value / max) * 100);
  return (
    <div className={styles.progressGroup}>
      <div className={styles.progressHeader}><span>{label}</span><strong>{percent}%</strong></div>
      <progress aria-label={`${label}: ${percent}%`} className={`${styles.progress} ${toneClasses[tone]}`} max={max} value={value}>{percent}%</progress>
    </div>
  );
}
