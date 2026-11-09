import { BrandMark } from "@/components/brand-mark";
import { BookIcon, ChatIcon, PathIcon, SparkIcon } from "@/components/icons";
import { LearningVisual } from "@/components/learning-visual";
import { PreviewCard } from "@/components/preview-card";

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <a className="brand" href="#main-content" aria-label="مدار، انتقل إلى المحتوى الرئيسي">
          <BrandMark />
          <span className="brand__name">مدار</span>
          <span className="brand__provisional">اسم مبدئي</span>
        </a>
        <a className="quiet-link" href="#preview">استكشف التصوّر</a>
      </header>

      <section className="hero shell" id="main-content">
        <div className="hero__copy">
          <div className="eyebrow"><SparkIcon /> تجربة تعليمية قيد التشكّل</div>
          <h1>مساحة تعلّم عربية<br /><span>تنمو مع فضولك.</span></h1>
          <p className="hero__lead">
            دروس واضحة، موارد موثوقة، ومساندة ذكية تساعد المتعلّم على الفهم
            والتأمل—بالعربية، وبإيقاع يناسبه.
          </p>
          <div className="hero__actions">
            <a className="primary-link" href="#experience">شاهد كيف تعمل الفكرة <span aria-hidden="true">←</span></a>
            <span className="demo-note"><span aria-hidden="true" /> نموذج استكشافي، لا توجد خدمات فعّالة بعد</span>
          </div>
        </div>
        <div className="hero__art">
          <div className="hero-card hero-card--back" aria-hidden="true" />
          <div className="hero-card">
            <div className="hero-card__header">
              <span className="hero-card__symbol"><BookIcon /></span>
              <div><small>مسار تجريبي</small><strong>اقرأ · افهم · ناقش</strong></div>
            </div>
            <div className="arabic-sample" aria-label="نموذج نص تعليمي غير مقتبس">
              <span>سؤال اليوم</span>
              <p>كيف تتغيّر قراءتنا للنص عندما ننتبه إلى السياق والكلمات؟</p>
            </div>
            <div className="progress-row">
              <span>خطوتك الحالية</span><strong>١ من ٣</strong>
              <div><i /></div>
            </div>
          </div>
          <span className="floating-chip floating-chip--one"><SparkIcon /> شرح يناسب مستواك</span>
          <span className="floating-chip floating-chip--two"><PathIcon /> تقدّم واضح</span>
        </div>
      </section>

      <section className="principles shell" aria-label="مبادئ التجربة">
        <div><strong>عربي أولًا</strong><span>لغة وتصميم واتجاه طبيعي</span></div>
        <div><strong>تعلّم موجّه</strong><span>خطوات صغيرة ذات هدف واضح</span></div>
        <div><strong>ذكاء مسؤول</strong><span>مساندة شفافة تحت إشراف المنهج</span></div>
      </section>

      <section className="experience shell" id="experience">
        <div className="section-copy">
          <p className="section-kicker">تجربة مرنة من البداية</p>
          <h2>المحتوى يحدّد المسار،<br />والمنصة تدعم التعلّم.</h2>
          <p>
            صُمّمت البنية لتخدم مقررات وموضوعات متعددة. يبدأ كل مسار بمورد
            مرخّص، ثم يقدّم أنشطة وأسئلة ومساندة يمكن للمعلم والمنهج ضبطها.
          </p>
          <ol className="compact-steps">
            <li><span>١</span><div><strong>اختر مسارًا</strong><small>هدف واضح ومستوى مناسب</small></div></li>
            <li><span>٢</span><div><strong>تعلّم بالممارسة</strong><small>قراءة وأسئلة وأنشطة قصيرة</small></div></li>
            <li><span>٣</span><div><strong>راجع تقدّمك</strong><small>ملاحظات مفهومة وخطوة تالية</small></div></li>
          </ol>
        </div>
        <LearningVisual />
      </section>

      <section className="preview-section" id="preview">
        <div className="shell">
          <div className="section-heading">
            <div><p className="section-kicker">لمحة عن المنتج</p><h2>أداتان، ورحلة تعلّم واحدة</h2></div>
            <p>هذه واجهات تصوّرية لتوضيح الاتجاه، ولا تدّعي وجود وظائف مكتملة.</p>
          </div>
          <div className="preview-grid">
            <PreviewCard
              eyebrow="مسار منظّم"
              title="دروس موجّهة"
              description="وحدات قصيرة تربط الهدف بالمورد والنشاط، وتمنح المتعلّم خطوة تالية واضحة."
              icon={<BookIcon />}
              steps={["تمهيد وسياق", "قراءة أو مشاهدة", "نشاط ومراجعة"]}
              tone="sage"
            />
            <PreviewCard
              eyebrow="مساندة ضمن السياق"
              title="معلّم ذكي"
              description="حوار تعليمي مقيد بالمادة المعتمدة، يشرح ويسأل ويصرّح بحدود إجاباته."
              icon={<ChatIcon />}
              steps={["اسأل بلغتك", "احصل على شرح متدرّج", "ارجع إلى المورد"]}
              tone="clay"
            />
          </div>
        </div>
      </section>

      <section className="closing shell">
        <BrandMark />
        <p className="section-kicker">البداية، لا النهاية</p>
        <h2>نبني أساسًا بسيطًا<br />لتجارب تعليمية أعمق.</h2>
        <p>النسخة الحالية عرض للاتجاه البصري والمعماري. ستُختبر فرضيات المنهج مع معلّمين ومتعلّمين قبل بناء الوظائف التالية.</p>
        <span className="closing__badge">الإصدار الاستكشافي · 00A</span>
      </section>

      <footer className="site-footer shell">
        <span>مدار · هوية مبدئية لمنصة تعلّم عربية</span>
        <span>صُمّم للوصول والوضوح والثقة</span>
      </footer>
    </main>
  );
}
