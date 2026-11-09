"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import styles from "./preferences-demo.module.css";

type TextSize = "standard" | "large" | "largest";
type ReadingSpacing = "comfortable" | "relaxed";

const defaults = { textSize: "standard" as TextSize, spacing: "comfortable" as ReadingSpacing, contrast: false, reduceMotion: false };

export function PreferencesDemo() {
  const [textSize, setTextSize] = useState<TextSize>(defaults.textSize);
  const [spacing, setSpacing] = useState<ReadingSpacing>(defaults.spacing);
  const [contrast, setContrast] = useState(defaults.contrast);
  const [reduceMotion, setReduceMotion] = useState(defaults.reduceMotion);
  const [announcement, setAnnouncement] = useState("الإعدادات الافتراضية مستخدمة.");
  const statusRef = useRef<HTMLParagraphElement>(null);

  const announce = (message: string, moveFocus = false) => {
    setAnnouncement(message);
    if (moveFocus) {
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const reset = () => {
    setTextSize(defaults.textSize);
    setSpacing(defaults.spacing);
    setContrast(defaults.contrast);
    setReduceMotion(defaults.reduceMotion);
    announce("أُعيدت تفضيلات العرض المؤقتة إلى القيم الافتراضية.", true);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}><div><Badge tone="milestone">ملف عرض غير مسجّل الدخول</Badge><h1>الملف وتفضيلات القراءة</h1><p>تؤثر عناصر التحكم المفعّلة في معاينة هذه الصفحة فقط. لا تُحفظ بعد التحديث أو الانتقال، ولا يوجد حساب حقيقي.</p></div><ButtonLink href="/learn" variant="secondary">العودة إلى لوحة العرض</ButtonLink></header>

      <div className={styles.layout}>
        <div className={styles.main}>
          <Surface as="section" className={styles.profile} aria-labelledby="profile-title">
            <span aria-hidden="true" className={styles.avatar}>مر</span><div><Badge>هوية مثال ثابتة</Badge><h2 id="profile-title">مريم — شخصية مراجعة</h2><p>اسم وصورة رمزية تجريبيان لشرح التكوين. لا جلسة دخول أو بريد أو ملف متعلّم.</p></div>
          </Surface>

          <Surface as="section" aria-labelledby="preferences-title" className={styles.preferences}>
            <div className={styles.sectionHeading}><div><Badge tone="milestone">تعمل مؤقتًا</Badge><h2 id="preferences-title">تفضيلات عرض قابلة للتجربة</h2></div><Button onClick={reset} variant="quiet">إعادة الضبط</Button></div>

            <fieldset><legend>حجم نص معاينة القراءة</legend><p>يغيّر النص داخل المعاينة أدناه.</p><div className={styles.segmented}>{(["standard", "large", "largest"] as const).map((size, index) => <label key={size}><input checked={textSize === size} name="text-size" onChange={() => { setTextSize(size); announce(`تغيّر حجم نص المعاينة إلى ${["قياسي", "كبير", "كبير جدًا"][index]}.`); }} type="radio" /><span>{["قياسي", "كبير", "كبير جدًا"][index]}</span></label>)}</div></fieldset>

            <fieldset><legend>راحة السطور</legend><p>تزيد المسافة بين السطور داخل معاينة القراءة.</p><div className={styles.segmented}>{(["comfortable", "relaxed"] as const).map((value, index) => <label key={value}><input checked={spacing === value} name="reading-spacing" onChange={() => { setSpacing(value); announce(`تغيّرت راحة السطور إلى ${["مريحة", "أوسع"][index]}.`); }} type="radio" /><span>{["مريحة", "أوسع"][index]}</span></label>)}</div></fieldset>

            <div className={styles.toggleRow}><div><strong>تباين أوضح للمعاينة</strong><p>يرفع تباين حدود وألوان مساحة المثال فقط.</p></div><label className={styles.switch}><input aria-label="تباين أوضح للمعاينة" checked={contrast} onChange={(event) => { setContrast(event.target.checked); announce(event.target.checked ? "فُعّل التباين الأوضح في المعاينة." : "أُلغي التباين الأوضح في المعاينة."); }} type="checkbox" /><span aria-hidden="true" /></label></div>
            <div className={styles.toggleRow}><div><strong>تقليل حركة المثال</strong><p>يوقف مؤشر الحركة التجريبي. تفضيل نظام التشغيل يظل محترمًا دائمًا.</p></div><label className={styles.switch}><input aria-label="تقليل حركة المثال" checked={reduceMotion} onChange={(event) => { setReduceMotion(event.target.checked); announce(event.target.checked ? "توقفت حركة المثال." : "سُمح بحركة المثال ما لم يمنعها النظام."); }} type="checkbox" /><span aria-hidden="true" /></label></div>

            <p className={styles.announcement} ref={statusRef} role="status" tabIndex={-1}>{announcement}</p>
          </Surface>

          <Surface as="section" aria-labelledby="future-title" className={styles.future} tone="soft">
            <Badge>ميزات حساب مستقبلية غير متاحة</Badge><h2 id="future-title">لا تعديل للهوية أو مزامنة</h2><div><label>البريد الإلكتروني<input disabled placeholder="يتطلب حسابًا حقيقيًا" type="email" /></label><label>كلمة المرور<input disabled placeholder="غير متاحة في العرض" type="password" /></label></div><p>تغيير الهوية، المزامنة بين الأجهزة، وحفظ التفضيلات تتطلب مصادقة وسياسة خصوصية وطبقة تخزين مستقبلية.</p>
          </Surface>
        </div>

        <aside className={styles.side} aria-label="معاينة التفضيلات ومعلومات اللغة">
          <Surface as="section" className={`${styles.preview} ${styles[`size-${textSize}`]} ${styles[`spacing-${spacing}`]} ${contrast ? styles.highContrast : ""} ${reduceMotion ? styles.motionReduced : ""}`} aria-labelledby="preview-title">
            <Badge tone="language">معاينة مباشرة</Badge><h2 id="preview-title">قراءة عربية مريحة</h2><p>هذه فقرة أصلية لمعاينة حجم النص والمسافة والتباين. يتغيّر عرضها فورًا ولا تُحفظ تفضيلاتها.</p><div className={styles.motionSample}><span aria-hidden="true" /><strong>مؤشر حركة هادئ</strong></div>
          </Surface>
          <Surface as="section"><Badge>معلومات اللغة</Badge><h2>العربية هي لغة الواجهة</h2><dl><div><dt>الاتجاه</dt><dd>من اليمين إلى اليسار</dd></div><div><dt>السجل</dt><dd>العربية الفصحى الحديثة في أمثلة العرض</dd></div><div><dt>المراجع المختلطة</dt><dd><bdi dir="ltr">Luke 10:25–37</bdi> مع عزل اتجاهي</dd></div></dl><p>اختيار لغة واجهة أخرى أو دعم الترجمة الصوتية غير متاح بعد.</p></Surface>
          <Surface as="section" tone="navy"><Badge tone="milestone">حدود الجلسة</Badge><h2>إعدادات هذه الصفحة مؤقتة</h2><p>التحديث يعيد القيم الافتراضية. لا نستخدم <bdi dir="ltr">localStorage</bdi> أو ملفات تعريف الارتباط أو قاعدة بيانات.</p></Surface>
        </aside>
      </div>
    </div>
  );
}
