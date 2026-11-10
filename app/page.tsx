import type { Metadata } from "next";
import { LearningJourney } from "@/components/public/learning-journey";
import { PathCard } from "@/components/public/path-card";
import { PublicHeader } from "@/components/public/public-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { learningPaths } from "@/lib/learning-paths";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "نَسَق — تعلّم عربي منظّم",
  description: "معاينة لمنصة عربية تجمع التعلّم المنظّم والتمارين والمساندة السياقية ضمن مسارين تعليميين مستقلين.",
};

const methodSteps = [
  { number: "١", title: "هدف واضح", description: "تعرف النتيجة التعليمية قبل أن تبدأ." },
  { number: "٢", title: "ممارسة ذات معنى", description: "تنجز نشاطًا مرتبطًا بالمهارة أو الفكرة." },
  { number: "٣", title: "دليل تقدّم", description: "تفهم ما أظهرته المحاولة وما يحتاج مراجعة." },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <PublicHeader />

      <Container className={styles.hero}>
        <div className={styles.heroCopy}>
          <Badge tone="milestone">تعلّم عربي منظّم · بمساندة سياقية مسؤولة</Badge>
          <h1>تقدّمٌ له معنى.<br /><em>وتعلّمٌ يبقى معك.</em></h1>
          <p className={styles.lead}>دروس قصيرة وعميقة، تمارين تفاعلية، وأدلة عرض تشرح ما أظهرته المحاولة دون ادعاء إتقان. ابدأ بتطوير العربية أو دراسة الكتاب بالعربية ضمن مسارين مستقلين.</p>
          <div className={styles.heroActions}>
            <ButtonLink href="#paths">استكشف المسارين <span aria-hidden="true">←</span></ButtonLink>
            <ButtonLink href="#method" variant="secondary">تعرّف إلى منهج التعلّم</ButtonLink>
          </div>
          <p className={styles.demoNote}><span aria-hidden="true">◌</span> عرض تجريبي للمراجعة فقط؛ لا حسابات أو تسجيل أو ذكاء اصطناعي فعّال في هذه المرحلة.</p>
        </div>
        <LearningJourney />
      </Container>

      <section className={styles.paths} id="paths">
        <Container>
          <div className={styles.sectionHeading}>
            <div><Badge tone="milestone">مساران · منصة واحدة</Badge><h2>اختر النتيجة التي تريدها</h2></div>
            <p>تظل المناهج والتقييمات والتقدّم منفصلة، بينما تشترك التجربة في الوضوح والأدوات التعليمية.</p>
          </div>
          <div className={styles.pathGrid}>
            <PathCard path={learningPaths["arabic-language"]} />
            <PathCard path={learningPaths["bible-study"]} />
          </div>
        </Container>
      </section>

      <section className={styles.method} id="method">
        <Container className={styles.methodGrid}>
          <div className={styles.methodCopy}><Badge tone="milestone">دورة تعلّم هادئة</Badge><h2>اعرف ما ستتعلّمه، جرّبه، ثم أثبته.</h2><p>تظهر المساندة في اللحظة التي تحتاجها، داخل هدف ومورد ونشاط واضح. الحوار لا يحل محل الدرس أو التمرين.</p></div>
          <ol className={styles.methodSteps}>
            {methodSteps.map((step) => <li key={step.number}><b>{step.number}</b><span><strong>{step.title}</strong><small>{step.description}</small></span></li>)}
          </ol>
        </Container>
      </section>

      <section id="future"><Container className={styles.future}>
        <span aria-hidden="true" className={styles.futureMark}>+</span>
        <div><Badge tone="milestone">بنية تمتد إلى ما بعد المسار الأول</Badge><h2>مقررات جديدة، بلغة بصرية واحدة.</h2><p>صُممت البطاقات والرحلات والتمارين لتخدم لغات وموضوعات مستقبلية دون ربط هوية المنصة بمادة واحدة.</p></div>
        <span className={styles.futureStatus}>قريبًا · بعد التحقق التربوي</span>
      </Container></section>

      <footer className={styles.footer}><Container className={styles.footerInner}><span>نَسَق · هوية مبدئية قيد التحقق</span><span>محتوى تجريبي أصلي · دون خدمات فعّالة</span></Container></footer>
    </main>
  );
}
