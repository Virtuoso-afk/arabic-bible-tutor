import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدار — مساحة تعلّم عربية",
  description:
    "تصوّر أولي لمنصة تعليمية عربية تجمع الدروس الموجّهة والمساندة الذكية في تجربة واضحة وآمنة.",
};

export const viewport: Viewport = {
  themeColor: "#f6f3eb",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
