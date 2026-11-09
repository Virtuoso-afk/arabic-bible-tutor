import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/public/public-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { isLearningPathId, learningPathIds, learningPaths } from "@/lib/learning-paths";
import styles from "./path-entry.module.css";

type PathEntryProps = { params: Promise<{ pathId: string }> };

export function generateStaticParams() {
  return learningPathIds.map((pathId) => ({ pathId }));
}

export async function generateMetadata({ params }: PathEntryProps): Promise<Metadata> {
  const { pathId } = await params;
  if (!isLearningPathId(pathId)) return {};
  const path = learningPaths[pathId];
  return { title: `${path.shortName} — نَسَق`, description: path.purpose };
}

export default async function PathEntryPage({ params }: PathEntryProps) {
  const { pathId } = await params;
  if (!isLearningPathId(pathId)) notFound();
  const path = learningPaths[pathId];
  const alternative = learningPaths[path.id === "arabic-language" ? "bible-study" : "arabic-language"];

  return (
    <main className={`${styles.page} ${styles[path.tone]}`}>
      <PublicHeader />
      <Container className={styles.content}>
        <nav aria-label="مسار التنقل" className={styles.breadcrumbs}>
          <Link href="/">الرئيسية</Link><span aria-hidden="true">/</span><Link href="/#paths">المسارات</Link><span aria-hidden="true">/</span><span aria-current="page">{path.shortName}</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <Badge tone={path.tone}>{path.label}</Badge>
            <h1>{path.name}</h1>
            <p className={styles.purpose}>{path.purpose}</p>
            <p>{path.summary}</p>
            <div className={styles.actions}><ButtonLink href="#outcomes">راجع النتائج المتوقعة <span aria-hidden="true">↓</span></ButtonLink><ButtonLink href="/#paths" variant="secondary">العودة إلى المسارين</ButtonLink></div>
          </div>
          <Surface as="aside" className={styles.demoPanel} tone="navy">
            <span aria-hidden="true" className={styles.heroMarker}>{path.marker}</span>
            <Badge tone="milestone">عرض تجريبي</Badge>
            <h2>ما الذي يمكنك استكشافه الآن؟</h2>
            <p>يمكنك مراجعة الهدف والنتائج والموضوعات والأنشطة المقترحة. لا يوجد تسجيل أو حفظ تقدّم أو معلّم ذكي فعّال.</p>
            <ul><li>محتوى توضيحي أصلي</li><li>لا اقتباسات كتابية</li><li>لا ادعاء بإتقان أو إكمال</li></ul>
          </Surface>
        </section>

        <section aria-labelledby="outcomes-title" className={styles.outcomes} id="outcomes">
          <div className={styles.sectionIntro}><Badge tone={path.tone}>نتائج المسار</Badge><h2 id="outcomes-title">ما الذي يستهدفه هذا المسار؟</h2><p>هذه أمثلة تعريفية تحتاج إلى مراجعة المعلّم وتحديد المستوى قبل اعتماد منهج فعلي.</p></div>
          <ol className={styles.outcomeGrid}>{path.outcomes.map((outcome, index) => <li key={outcome}><b>{index + 1}</b><span>{outcome}</span></li>)}</ol>
        </section>

        <section aria-labelledby="lessons-title" className={styles.learningGrid}>
          <div>
            <div className={styles.sectionIntro}><Badge tone={path.tone}>موضوعات نموذجية</Badge><h2 id="lessons-title">أمثلة لدروس محتملة</h2></div>
            <div className={styles.cardStack}>{path.lessons.map((lesson, index) => <Surface as="article" className={styles.infoCard} key={lesson.title}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{lesson.title}</h3><p>{lesson.description}</p></div></Surface>)}</div>
          </div>
          <div>
            <div className={styles.sectionIntro}><Badge tone={path.tone}>نشاط المتعلّم</Badge><h2>كيف تبدو الممارسة؟</h2></div>
            <div className={styles.cardStack}>{path.activities.map((activity, index) => <Surface as="article" className={styles.infoCard} key={activity.title}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{activity.title}</h3><p>{activity.description}</p></div></Surface>)}</div>
          </div>
        </section>

        <Surface as="section" className={styles.switcher} elevated>
          <div><Badge tone={alternative.tone}>المسار الآخر</Badge><h2>هل تبحث عن نتيجة تعليمية مختلفة؟</h2><p>{alternative.purpose}</p></div>
          <ButtonLink aria-label={`انتقل إلى ${alternative.shortName}`} href={`/learn/paths/${alternative.id}`} variant="secondary">استكشف {alternative.shortName} <span aria-hidden="true">←</span></ButtonLink>
        </Surface>
      </Container>
      <footer className={styles.footer}><Container><Link href="/">العودة إلى الصفحة الرئيسية</Link><span>عرض تعريفي · لا تسجيل ولا حفظ بيانات</span></Container></footer>
    </main>
  );
}
