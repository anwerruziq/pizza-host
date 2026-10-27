'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useApp } from '../context/AppContext';
import { MessageCircle } from './icons';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { siteSettings, locale } = useApp();

  const floatingWhatsAppUrl = `https://wa.me/${siteSettings.whatsapp.replace(
    /[^0-9]/g,
    ''
  )}?text=${encodeURIComponent(
    locale === 'ar'
      ? 'مرحباً بيتزا هاوس! أود الاستفسار عن القائمة والطلب المباشر.'
      : 'Hello Pizza House! I would like to inquire about the menu and order.'
  )}`;

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#FFFFFF] flex flex-col selection:bg-[#FF7A00] selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 end-6 z-40 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group cursor-pointer border-2 border-white/20"
        title={locale === 'ar' ? 'طلب فوري عبر واتساب' : 'Direct WhatsApp Chat'}
        aria-label="Direct WhatsApp Order"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
