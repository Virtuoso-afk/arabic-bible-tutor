import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BrandSymbol } from "./brand-symbol";
import styles from "./public-header.module.css";

export function PublicHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link aria-label="نَسَق، الصفحة الرئيسية" className={styles.brand} href="/">
          <BrandSymbol className={styles.mark} />
          <span>نَسَق<small>هوية مبدئية لمنصة تعلّم عربية</small></span>
        </Link>
        <nav aria-label="التنقل الرئيسي" className={styles.navigation}>
          <Link href="/#paths">المسارات</Link>
          <Link href="/#method">منهج التعلّم</Link>
          <Link href="/#future">دورات المستقبل</Link>
        </nav>
        <ButtonLink className={styles.action} href="/#paths" variant="secondary">استكشف المسارين</ButtonLink>
      </Container>
    </header>
  );
}
