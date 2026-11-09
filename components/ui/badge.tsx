import type { HTMLAttributes, ReactNode } from "react";
import styles from "./primitives.module.css";

type BadgeTone = "neutral" | "language" | "study" | "milestone" | "success";

const toneClasses: Record<BadgeTone, string> = {
  neutral: styles.badgeNeutral,
  language: styles.badgeLanguage,
  study: styles.badgeStudy,
  milestone: styles.badgeMilestone,
  success: styles.badgeSuccess,
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { children: ReactNode; tone?: BadgeTone };

export function Badge({ children, className = "", tone = "neutral", ...props }: BadgeProps) {
  return <span className={`${styles.badge} ${toneClasses[tone]} ${className}`} {...props}>{children}</span>;
}
