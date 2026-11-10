import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./primitives.module.css";

type SurfaceTone = "raised" | "soft" | "navy";

const toneClasses: Record<SurfaceTone, string> = {
  raised: "",
  soft: styles.surfaceSoft,
  navy: styles.surfaceNavy,
};

type SurfaceProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  tone?: SurfaceTone;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Surface<T extends ElementType = "div">({ as, children, className = "", elevated = false, tone = "raised", ...props }: SurfaceProps<T>) {
  const Component = as ?? "div";
  return <Component className={`${styles.surface} ${toneClasses[tone]} ${elevated ? styles.surfaceElevated : ""} ${className}`} {...props}>{children}</Component>;
}
