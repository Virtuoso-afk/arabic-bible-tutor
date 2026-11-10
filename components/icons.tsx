import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function PathIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 18.5c3.5 0 3.2-4 6.5-4s3 3 7.5 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="5" cy="18.5" r="2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 17c1-2.2 1.5-7 5-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 3.5c.7 4.5 2.8 6.6 7.5 7.3-4.7.8-6.8 2.9-7.5 7.7-.8-4.8-2.9-6.9-7.5-7.7C9.1 10.1 11.2 8 12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M19.2 3.5c.2 1.5.9 2.2 2.3 2.5-1.4.2-2.1 1-2.3 2.4C19 7 18.3 6.2 17 6c1.3-.3 2-1 2.2-2.5Z" fill="currentColor" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 6.7C10.4 5.2 8.2 4.5 5 4.5v13c3.2 0 5.4.7 7 2.2m0-13c1.6-1.5 3.8-2.2 7-2.2v13c-3.2 0-5.4.7-7 2.2m0-13v13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 17.5 3.8 21l4.1-1.8c1.2.5 2.5.8 4.1.8 5 0 9-3.6 9-8s-4-8-9-8-9 3.6-9 8c0 2.1.7 4 2 5.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12h8M8 8.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
