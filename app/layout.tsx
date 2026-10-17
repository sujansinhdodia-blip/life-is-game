// ============================================================
//  app/layout.tsx — Root Layout (Server Component)
// ============================================================
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Message From My Heart",
  description: "A heartfelt apology and love letter, built just for you.",
  robots: { index: false, follow: false }, // keep it private
  openGraph: {
    title: "A Message From My Heart",
    description: "Something I built just for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0a0008" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
