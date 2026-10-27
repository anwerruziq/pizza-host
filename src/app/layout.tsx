import React from "react";
import "./globals.css";

export const metadata = {
  title: "بيتزا هاوس | Pizza House - أشهى أنواع البيتزا والفطائر والسندوتشات",
  description: "مطعم بيتزا هاوس (Pizza House) - أشهى وأطيب أنواع البيتزا، الفطائر، والسندوتشات الطازجة. تصفح قائمتنا واستفد من عروضنا الخاصة وخصم 20%.",
  keywords: ["بيتزا هاوس", "Pizza House", "مطعم بيتزا", "فطائر", "سندوتشات", "صنعاء", "قائمة طعام"],
  openGraph: {
    title: "بيتزا هاوس | Pizza House",
    description: "أشهى أنواع البيتزا والفطائر والسندوتشات مع خصم 20% وعروض حصرية.",
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
    <html lang="ar" dir="rtl" className="h-full antialiased selection:bg-[#FF7A00] selection:text-white">
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
