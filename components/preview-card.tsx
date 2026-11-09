import type { ReactNode } from "react";

type PreviewCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  steps: string[];
  tone: "sage" | "clay";
};

export function PreviewCard({
  eyebrow,
  title,
  description,
  icon,
  steps,
  tone,
}: PreviewCardProps) {
  return (
    <article className={`preview-card preview-card--${tone}`}>
      <div className="preview-card__topline">
        <span className="preview-card__icon">{icon}</span>
        <span className="preview-card__status">معاينة فقط</span>
      </div>
      <p className="preview-card__eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p className="preview-card__description">{description}</p>
      <ul aria-label={`مراحل ${title}`}>
        {steps.map((step, index) => (
          <li key={step}>
            <span>{index + 1}</span>
            {step}
          </li>
        ))}
      </ul>
      <div className="preview-card__disabled" aria-disabled="true">
        متاح في مرحلة لاحقة
      </div>
    </article>
  );
}
