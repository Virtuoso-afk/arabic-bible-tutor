import type { Metadata, Viewport } from "next";
import { ConnectivityNotice } from "@/components/states/connectivity-notice";
import "./globals.css";

export const metadata: Metadata = {
  title: "نَسَق — منصة تعلّم عربية",
  description:
    "منصة عربية تجمع التعلّم المنظّم والتمارين والمساندة السياقية المسؤولة.",
};

export const viewport: Viewport = {
  themeColor: "#f3f6fa",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="ar" dir="rtl">
      <body><ConnectivityNotice />{children}</body>
    </html>
  );
}
