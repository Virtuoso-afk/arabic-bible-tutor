import Link from "next/link";
import styles from "./app-shell.module.css";

type BrandLockupProps = { compact?: boolean; inverse?: boolean };

export function BrandLockup({ compact = false, inverse = false }: BrandLockupProps) {
  return (
    <Link aria-label="نَسَق، معاينة بنية التطبيق" className={`${styles.brand} ${compact ? styles.brandCompact : ""} ${inverse ? styles.brandInverse : ""}`} href="/shell-preview">
      <svg aria-hidden="true" className={styles.brandMark} viewBox="0 0 44 44">
        <path d="M8 28c4-11 12-17 27-17" />
        <path d="M10 34c8-3 16-2 24 3" />
        <circle cx="33" cy="11" r="4" />
        <circle cx="10" cy="34" r="4" />
      </svg>
      <span className={styles.brandText}>نَسَق<small>هوية مبدئية معتمدة للتنفيذ</small></span>
    </Link>
  );
}
