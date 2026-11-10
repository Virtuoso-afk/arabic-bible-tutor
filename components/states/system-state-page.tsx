import type { ReactNode } from "react";
import { PublicHeader } from "@/components/public/public-header";
import { Container } from "@/components/ui/container";
import styles from "./system-states.module.css";

type SystemStatePageProps = {
  actions?: ReactNode;
  description: string;
  detail?: string;
  eyebrow: string;
  marker: string;
  role?: "alert" | "status";
  title: string;
};

export function SystemStatePage({ actions, description, detail, eyebrow, marker, role, title }: SystemStatePageProps) {
  return (
    <main className={styles.page}>
      <PublicHeader />
      <Container className={styles.stateContainer}>
        <section aria-labelledby="system-state-title" className={styles.stateCard} role={role}>
          <span aria-hidden="true" className={styles.marker}>{marker}</span>
          <div className={styles.copy}><p className={styles.eyebrow}>{eyebrow}</p><h1 id="system-state-title">{title}</h1><p>{description}</p>{detail && <small>{detail}</small>}{actions && <div className={styles.actions}>{actions}</div>}</div>
        </section>
      </Container>
    </main>
  );
}
