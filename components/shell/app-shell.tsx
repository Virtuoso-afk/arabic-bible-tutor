import type { ReactNode } from "react";
import { NavigationItem } from "@/components/ui/navigation-item";
import { BrandLockup } from "./brand-lockup";
import { CoursesIcon, HomeIcon, PathsIcon, ProgressIcon, SettingsIcon } from "./shell-icons";
import styles from "./app-shell.module.css";

type NavigationId = "home" | "courses" | "paths" | "progress" | "settings";

type AppShellProps = {
  activeItem: NavigationId;
  children: ReactNode;
};

const navigation = [
  { id: "home" as const, label: "الرئيسية", href: "/shell-preview", icon: <HomeIcon /> },
  { id: "courses" as const, label: "المقررات", icon: <CoursesIcon /> },
  { id: "paths" as const, label: "مسارات التعلّم", icon: <PathsIcon /> },
  { id: "progress" as const, label: "التقدّم", icon: <ProgressIcon /> },
  { id: "settings" as const, label: "الملف والإعدادات", icon: <SettingsIcon /> },
];

export function AppShell({ activeItem, children }: AppShellProps) {
  return (
    <div className={styles.shellRoot} data-testid="application-shell">
      <a className={styles.skipLink} href="#shell-content">انتقل إلى المحتوى الرئيسي</a>
      <div className={styles.shellGrid}>
        <aside className={styles.sidebar} data-shell-navigation="rail">
          <BrandLockup inverse />
          <nav aria-label="التنقل الرئيسي" className={styles.sidebarNavigation}>
            {navigation.map((item) => <NavigationItem active={item.id === activeItem} href={item.href} icon={item.icon} key={item.id} label={item.label} variant="sidebar" />)}
          </nav>
          <div className={styles.shellNotice}><strong>معاينة البنية</strong><span>الوجهات غير النشطة ستُبنى في مهام لاحقة.</span></div>
        </aside>
        <main className={styles.main} id="shell-content" tabIndex={-1}>{children}</main>
      </div>
      <nav aria-label="التنقل الرئيسي للهاتف" className={styles.mobileNavigation} data-shell-navigation="mobile">
        {navigation.filter((item) => item.id !== "paths").map((item) => <NavigationItem active={item.id === activeItem} href={item.href} icon={item.icon} key={item.id} label={item.label} variant="mobile" />)}
      </nav>
    </div>
  );
}
