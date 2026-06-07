import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: {
    default: "گروه صنعتی سیمرکو",
    template: "%s | گروه صنعتی سیمرکو",
  },
  description:
    "گروه صنعتی سیمرکو، طراح و سازنده ماشین‌آلات و خطوط تولید صنایع غذایی کنسروی.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        <SiteHeader />
        {children}
         <SiteFooter />
      </body>
    </html>
  );
}