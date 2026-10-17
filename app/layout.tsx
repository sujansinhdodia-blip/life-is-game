// ============================================================
//  app/layout.tsx — Root Layout (Server Component)
// ============================================================
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://life-is-game.vercel.app"),
  title: {
    default: "A Message For Gautami | From Sujan",
    template: "%s | Sujan & Gautami",
  },
  description:
    "A heartfelt letter, cherished memories, and an honest question from the heart for Gautami, built with love by Sujan.",
  keywords: [
    "Gautami",
    "Sujan",
    "Sujan and Gautami",
    "Love Letter",
    "Proposal Website",
    "Heartfelt Apology",
    "Memories",
  ],
  authors: [{ name: "Sujan" }],
  creator: "Sujan",
  publisher: "Sujan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "A Message For Gautami | From Sujan",
    description:
      "A heartfelt letter, cherished memories, and an honest question from the heart.",
    url: "https://life-is-game.vercel.app",
    siteName: "A Message For Gautami",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/WhatsApp Image 2026-10-16 at 3.04.11 AM (1).jpeg",
        width: 1200,
        height: 630,
        alt: "A Message For Gautami - Moments That Matter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Message For Gautami | From Sujan",
    description:
      "A heartfelt letter, cherished memories, and an honest question from the heart.",
    images: ["/images/WhatsApp Image 2026-10-16 at 3.04.11 AM (1).jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "A Message For Gautami",
  url: "https://life-is-game.vercel.app",
  description:
    "A heartfelt letter, cherished memories, and an honest question from the heart for Gautami, built with love by Sujan.",
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: "Sujan",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
