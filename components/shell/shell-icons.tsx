import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function ShellIcon({ children, ...props }: IconProps) {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>{children}</svg>;
}

export function HomeIcon(props: IconProps) {
  return <ShellIcon {...props}><path d="m4 11 8-7 8 7v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></ShellIcon>;
}

export function CoursesIcon(props: IconProps) {
  return <ShellIcon {...props}><path d="M5 5.5h11a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2V5.5Zm0 0V4h10a3 3 0 0 1 3 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /><path d="M8.5 9.5h6M8.5 13h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></ShellIcon>;
}

export function PathsIcon(props: IconProps) {
  return <ShellIcon {...props}><path d="M5 19c3.3 0 3.2-4 6.2-4s3 3 7.8 3M7 17.5c1-2.4 1.5-7.5 5-7.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /><circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="1.7" /></ShellIcon>;
}

export function ProgressIcon(props: IconProps) {
  return <ShellIcon {...props}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" /><path d="M12 8v4l3 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></ShellIcon>;
}

export function SettingsIcon(props: IconProps) {
  return <ShellIcon {...props}><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" /><path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M18 6l-1.5 1.5M7.5 16.5 6 18M18 18l-1.5-1.5M7.5 7.5 6 6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></ShellIcon>;
}
