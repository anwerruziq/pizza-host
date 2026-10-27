'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import MobileBottomNav from '../components/MobileBottomNav';
import Hero from '../components/Hero';
import Specialties from '../components/Specialties';
import MenuSection from '../components/MenuSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ChefSection from '../components/ChefSection';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import { MessageCircle } from '../components/icons';

function PizzeriaApp() {
  const { siteSettings, locale, selectedProduct, setSelectedProduct } = useApp();

  const floatingWhatsAppUrl = `https://wa.me/${siteSettings.whatsapp.replace(
    /[^0-9]/g,
    ''
  )}?text=${encodeURIComponent(
    locale === 'ar'
      ? 'مرحباً بيتزا هاوس! أود الاستفسار عن القائمة والطلب المباشر.'
      : 'Hello Pizza House! I would like to inquire about the menu and order.'
  )}`;

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#FFFFFF] flex flex-col pb-16 md:pb-0 selection:bg-[#FF7A00] selection:text-white">
      <Navbar />
      <main className="flex-1 space-y-4">
        <Hero />
        <Specialties />
        <MenuSection />
        <TestimonialsSection />
        <ChefSection />
      </main>
      <Footer />

      {/* Mobile Bottom Navigation Bar (sticky at bottom on mobile) */}
      <MobileBottomNav />

      {/* Product Details & Ordering Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Floating WhatsApp Quick Action Button (positioned above mobile nav on mobile) */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 end-4 sm:end-6 z-40 p-3 sm:p-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group cursor-pointer border-2 border-white/20"
        title={locale === 'ar' ? 'طلب فوري عبر واتساب' : 'Direct WhatsApp Chat'}
        aria-label="Direct WhatsApp Order"
      >
        <MessageCircle size={24} />
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
