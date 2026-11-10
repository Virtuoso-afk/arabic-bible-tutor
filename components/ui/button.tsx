import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./primitives.module.css";

type ButtonVariant = "primary" | "secondary" | "quiet";

const variantClasses: Record<ButtonVariant, string> = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  quiet: styles.buttonQuiet,
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({ children, className = "", variant = "primary", type = "button", ...props }: ButtonProps) {
  return <button className={`${styles.button} ${variantClasses[variant]} ${className}`} type={type} {...props}>{children}</button>;
}

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
};

export function ButtonLink({ children, className = "", href, variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={`${styles.button} ${variantClasses[variant]} ${className}`} href={href} {...props}>{children}</Link>;
}
