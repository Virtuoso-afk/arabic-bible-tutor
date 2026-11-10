import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./navigation-item.module.css";

type NavigationItemProps = {
  active?: boolean;
  disabledLabel?: string;
  href?: string;
  icon: ReactNode;
  label: string;
  variant: "sidebar" | "mobile";
};

export function NavigationItem({ active = false, disabledLabel = "قريبًا", href, icon, label, variant }: NavigationItemProps) {
  const className = `${styles.item} ${styles[variant]} ${active ? styles.active : ""}`;
  const content = <>{icon}<span className={styles.label}>{label}</span>{!href && variant === "sidebar" && <span className={styles.status}>{disabledLabel}</span>}</>;

  if (!href) return <span aria-disabled="true" className={className}>{content}</span>;
  return <Link aria-current={active ? "page" : undefined} aria-label={label} className={className} href={href}>{content}</Link>;
}
