import type { HTMLAttributes, ReactNode } from "react";
import styles from "./primitives.module.css";

type ContainerProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export function Container({ children, className = "", ...props }: ContainerProps) {
  return <div className={`${styles.container} ${className}`} {...props}>{children}</div>;
}
