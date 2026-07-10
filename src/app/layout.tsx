import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Cinzel,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import { PWARegister } from "@/components/layout/PWARegister";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Эзоза & Амирхан — Үйлену тойы",
  description:
    "Біздің ең бақытты күнімізге куә болып, қуанышымызды бірге бөлісуге шақырамыз. Эзоза мен Амирханның шаңырақ көтеру тойына шақыру.",
  keywords: ["үйлену тойы", "шақыру", "Қазақстан", "той", "wedding", "invitation"],
  authors: [{ name: "Эзоза & Амирхан" }],
  openGraph: {
    title: "Эзоза & Амирхан — Үйлену тойы",
    description: "Біздің ең бақытты күнімізге куә болып, қуанышымызды бірге бөлісуге шақырамыз",
    type: "website",
    locale: "kk_KZ",
    siteName: "Эзоза & Амирхан Wedding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Эзоза & Амирхан — Үйлену тойы",
    description: "Біздің ең бақытты күнімізге куә болып, қуанышымызды бірге бөлісуге шақырамыз",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FFFBF7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Эзоза & Амирхан — Үйлену тойы",
              startDate: "2026-11-11T17:00:00+05:00",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: '"SUGDIYONA" мейрамханасы',
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Жаңабазар қорғаны",
                  addressLocality: "Шымкент",
                  addressCountry: "KZ",
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${cinzel.variable} ${montserrat.variable} ${playfair.variable} antialiased`}
      >
        {children}
        <PWARegister />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              color: "#0D352D",
              border: "1px solid rgba(201, 154, 61, 0.35)",
              fontFamily: "var(--font-montserrat)",
            },
          }}
        />
      </body>
    </html>
  );
}
