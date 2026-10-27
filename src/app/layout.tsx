import React from "react";
import "./globals.css";

export const metadata = {
  title: "PizzaZone | بيتزا نابولية أصلية مخبوزة على الحطب",
  description: "مطعم بيتزا نابولية فاخرة في صنعاء. عجينة مخمرة 48 ساعة، ومخبوزة بأفران الحطب 450 درجة مئوية. تصفح قائمتنا واستمتع بمصمم البيتزا التفاعلي.",
  keywords: ["بيتزا", "PizzaZone", "مطعم بيتزا", "بيتزا نابولية", "صنعاء", "قائمة طعام بيتزا", "ابنِ بيتزاك", "Pizza Restaurant Sanaa"],
  openGraph: {
    title: "PizzaZone | بيتزا نابولية أصلية مخبوزة على الحطب",
    description: "أشهى أنواع البيتزا الإيطالية المخبوزة على الحطب مع مصمم بيتزا تفاعلي ساحر.",
    locale: "ar_YE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased selection:bg-[#E63920] selection:text-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0D0D0E] text-[#F7F4EF]">
        {children}
      </body>
    </html>
  );
}
