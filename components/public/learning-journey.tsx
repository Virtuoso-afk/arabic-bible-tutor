import styles from "./learning-journey.module.css";

const stations = ["لاحظ", "تدرّب", "طبّق", "أثبت"];

export function LearningJourney() {
  return (
    <div aria-labelledby="journey-title" className={styles.journey} id="journey">
      <div className={styles.top}>
        <div><span>نموذج رحلة تعليمية</span><strong id="journey-title">من الفهم إلى الاستخدام</strong></div>
        <span className={styles.progress}>٣ من ٤</span>
      </div>
      <svg aria-label="مسار تعلّم من أربع محطات: لاحظ، تدرّب، طبّق، أثبت" className={styles.route} role="img" viewBox="0 0 620 190">
        <path d="M565 34 C470 34 480 150 360 150 S210 42 65 112" />
        <circle className={styles.done} cx="565" cy="34" r="18" />
        <circle className={styles.done} cx="410" cy="142" r="18" />
        <circle className={styles.current} cx="255" cy="105" r="22" />
        <circle className={styles.future} cx="65" cy="112" r="17" />
        <path className={styles.tick} d="m558 34 5 5 10-12" />
        <path className={styles.tick} d="m403 142 5 5 10-12" />
      </svg>
      <ol className={styles.labels}>
        {stations.map((station, index) => <li className={index === 2 ? styles.active : ""} key={station}><b>{index + 1}</b>{station}</li>)}
      </ol>
      <div className={styles.callout}><span aria-hidden="true">✓</span><div><small>مثال على دليل التعلّم</small><strong>ميّزت بين الملاحظة والتفسير</strong></div><em>عرض توضيحي</em></div>
    </div>
  );
}
