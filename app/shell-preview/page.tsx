import type { Metadata } from "next";
import { AppShell } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FormField } from "@/components/ui/form-field";
import { ProgressIndicator } from "@/components/ui/progress";
import { Surface } from "@/components/ui/surface";
import styles from "./shell-preview.module.css";

export const metadata: Metadata = {
  title: "نَسَق — معاينة بنية التطبيق",
  description: "معاينة تطويرية لبنية التطبيق المتجاوبة ونظام التصميم المعتمد.",
  robots: { index: false, follow: false },
};

export default function ShellPreviewPage() {
  return (
    <AppShell activeItem="home">
      <Container className={styles.content}>
        <header className={styles.header}>
          <div>
            <Badge tone="milestone">معاينة تطويرية · Mission 01A-1</Badge>
            <h1>بنية التطبيق المشتركة</h1>
            <p>هذه الصفحة تختبر الرموز والمكوّنات والتنقل المتجاوب فقط. لا تمثل لوحة متعلّم مكتملة ولا تحفظ أي بيانات.</p>
          </div>
          <div className={styles.headerMeta}><span>العرض الحالي</span><strong><bdi dir="ltr">Shell v0.1</bdi></strong></div>
        </header>

        <section aria-labelledby="shell-foundations" className={styles.section}>
          <div className={styles.sectionHeading}><div><span>أساس قابل لإعادة الاستخدام</span><h2 id="shell-foundations">سطوح واضحة ومسارات منفصلة</h2></div><p>تستخدم جميع المكوّنات أدوارًا دلالية بدل ألوان موزعة داخل الشيفرة.</p></div>
          <div className={styles.foundationGrid}>
            <Surface as="article" className={styles.featureSurface} elevated>
              <Badge tone="language">المسار A · تعلّم العربية</Badge>
              <h3>نمط سطح التعلّم</h3>
              <p>بطاقة نموذجية لاختبار التسلسل الطباعي والمساحة وحالة الإجراء، دون تقديم درس فعلي.</p>
              <ProgressIndicator label="مثال تقدّم لغوي" tone="language" value={68} />
              <ButtonLink href="#component-form">انتقل إلى نموذج التحكم <span aria-hidden="true">←</span></ButtonLink>
            </Surface>

            <Surface as="article" className={styles.featureSurface} elevated>
              <Badge tone="study">المسار B · دراسة الكتاب</Badge>
              <h3>فصل بصري دون فصل المنتج</h3>
              <p>يظل الإطار واحدًا، بينما تتغير تسمية المسار ولونه ومقاييس التقدّم الخاصة به.</p>
              <ProgressIndicator label="مثال تقدّم دراسي" tone="study" value={31} />
              <div className={styles.badgeRow}><Badge>حالة محايدة</Badge><Badge tone="success">متاح</Badge></div>
            </Surface>

            <Surface as="article" className={styles.navySurface} tone="navy">
              <Badge tone="milestone">محطة حالية</Badge>
              <h3>سطح العلامة الداكن</h3>
              <p>اللون الكحلي مخصص للهوية والتركيز. لا يمثل وضعًا داكنًا كاملًا.</p>
              <div className={styles.stationRow} aria-label="نموذج محطات"><span className={styles.completeStation}>✓</span><i /><span className={styles.currentStation}>٢</span><i /><span>٣</span></div>
            </Surface>
          </div>
        </section>

        <Surface as="section" aria-labelledby="component-form-title" className={styles.formSurface} id="component-form">
          <div><span className={styles.kicker}>نمط التحكم</span><h2 id="component-form-title">حقل عربي مع محتوى ثنائي الاتجاه</h2><p>يختبر الحقل التسمية والتلميح والتركيز وقراءة رقم درس مختلط مثل <bdi dir="ltr">Lesson A-01</bdi>.</p></div>
          <form className={styles.form}>
            <FormField id="learning-goal" label="هدف التعلّم" hint="هذا إدخال محلي للمعاينة ولا يُحفظ." placeholder="مثال: أريد تحسين الفهم المقروء" />
            <div className={styles.formActions}><Button disabled>الحفظ غير متاح في المعاينة</Button><ButtonLink href="#shell-foundations" variant="secondary">العودة إلى المكوّنات</ButtonLink></div>
          </form>
        </Surface>

        <footer className={styles.footer}><span>نَسَق · هوية مبدئية معتمدة للتنفيذ</span><span>بنية فقط · دون صفحات أو خدمات مكتملة</span></footer>
      </Container>
    </AppShell>
  );
}
