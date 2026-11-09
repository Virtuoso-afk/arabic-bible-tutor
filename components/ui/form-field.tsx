import type { InputHTMLAttributes } from "react";
import styles from "./primitives.module.css";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  hint?: string;
  id: string;
  label: string;
};

export function FormField({ error, hint, id, label, ...props }: FormFieldProps) {
  const descriptionId = hint || error ? `${id}-description` : undefined;
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={descriptionId} aria-invalid={error ? true : undefined} {...props} />
      {(hint || error) && <span className={`${styles.fieldHint} ${error ? styles.fieldError : ""}`} id={descriptionId}>{error ?? hint}</span>}
    </div>
  );
}
