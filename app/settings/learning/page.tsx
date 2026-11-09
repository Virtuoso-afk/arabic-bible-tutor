import type { Metadata } from "next";
import { AppShell } from "@/components/shell/app-shell";
import { Container } from "@/components/ui/container";
import { PreferencesDemo } from "@/components/settings/preferences-demo";

export const metadata: Metadata = { title: "الملف وتفضيلات العرض — نَسَق", robots: { index: false, follow: false } };

export default function LearningSettingsPage() {
  return <AppShell activeItem="settings"><Container><PreferencesDemo /></Container></AppShell>;
}
