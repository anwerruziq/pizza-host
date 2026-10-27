'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Specialties from '../components/Specialties';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import { MessageCircle } from '../components/icons';
import QuickSections from '../components/QuickSections';

function PizzeriaApp() {
  const { siteSettings, locale, selectedProduct, setSelectedProduct } = useApp();

  const floatingWhatsAppUrl = `https://wa.me/${siteSettings.whatsapp.replace(
    /[^0-9]/g,
    ''
  )}?text=${encodeURIComponent(
    locale === 'ar'
      ? 'مرحباً PizzaZone! أود الاستفسار عن القائمة والطلب المباشر.'
      : 'Hello PizzaZone! I would like to inquire about the menu and order.'
  )}`;

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-[#F7F4EF] flex flex-col selection:bg-[#E63920] selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Specialties />
        <QuickSections />
      </main>
      <Footer />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 end-6 z-40 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group cursor-pointer border-2 border-white/20"
        title={locale === 'ar' ? 'طلب فوري عبر واتساب' : 'Direct WhatsApp Chat'}
        aria-label="Direct WhatsApp Order"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold ps-0 group-hover:ps-2">
          {locale === 'ar' ? 'اطلب الآن' : 'Order Now'}
        </span>
      </a>
    </div>
  );
}

export default function Home() {
  return <PizzeriaApp />;
}
