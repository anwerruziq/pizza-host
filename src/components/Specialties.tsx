'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { sampleProducts } from '../data/sampleData';
import { formatCurrency } from '../lib/formatters';
import { Flame, Sparkles, ArrowLeft, ArrowRight, Eye, MessageCircle } from './icons';

export default function Specialties() {
  const { locale, siteSettings, t, setSelectedProduct } = useApp();
  const { navigate } = useRouter();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Filter featured pizzas
  const featuredPizzas = sampleProducts.filter((p) => p.isFeatured && p.categorySlug === 'pizza');

  const goToMenu = () => {
    navigate('menu');
  };

  return (
    <section id="specialties" className="py-20 bg-[#0D0D0E] relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E63920]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E63920]/15 text-[#E63920] border border-[#E63920]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.specialties.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF] tracking-tight">
              {t.specialties.title}
            </h2>
            <p className="text-sm sm:text-base text-[#A09D95] max-w-xl">
              {t.specialties.subtitle}
            </p>
          </div>

          <button
            onClick={goToMenu}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#FFB703] bg-[#17171A] hover:bg-[#222227] border border-[#FFB703]/30 hover:border-[#FFB703] transition-all cursor-pointer group"
          >
            <span>{t.specialties.viewAll}</span>
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPizzas.map((product) => {
            const name = locale === 'ar' ? product.nameAr : product.nameEn;
            const description = locale === 'ar' ? product.descriptionAr : product.descriptionEn;
            const badge = locale === 'ar' ? product.badgeAr : product.badgeEn;

            const orderText =
              locale === 'ar'
                ? `مرحباً PizzaZone، أود طلب بيتزا *${name}* بسعر ${formatCurrency(
                    product.basePrice,
                    locale,
                    siteSettings.currencyCode
                  )}.`
                : `Hello PizzaZone, I would like to order *${name}* for ${formatCurrency(
                    product.basePrice,
                    locale,
                    siteSettings.currencyCode
                  )}.`;

            const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(
              /[^0-9]/g,
              ''
            )}?text=${encodeURIComponent(orderText)}`;

            return (
              <div
                key={product.id}
                className="group relative bg-[#17171A] hover:bg-[#1E1E22] rounded-3xl border border-[#2A2A30] hover:border-[#E63920]/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#E63920]/10 hover:-translate-y-1.5"
              >
                {/* Visual Pizza Graphic Header */}
                <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#241310] via-[#1B1B1E] to-[#121214] p-4 flex items-center justify-center overflow-hidden border border-white/5 mb-4 group-hover:border-[#E63920]/20 transition-colors">
                  {/* Fire glow inside */}
                  <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Badge */}
                  {badge && (
                    <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E63920] text-white shadow-md">
                      {badge}
                    </span>
                  )}

                  {/* Circular Pizza Illustration */}
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#E67E22] to-[#B95B11] p-1.5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 flex items-center justify-center border-2 border-[#8B3E0C]">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F1C40F] via-[#F39C12] to-[#E74C3C] p-2 flex items-center justify-center relative overflow-hidden">
                      <Flame className="w-8 h-8 text-[#E63920] opacity-80 animate-pulse" />
                      <span className="absolute top-2 left-4 w-3 h-3 rounded-full bg-[#A51D1D] opacity-90"></span>
                      <span className="absolute bottom-3 right-4 w-3.5 h-3.5 rounded-full bg-[#A51D1D] opacity-90"></span>
                      <span className="absolute top-4 right-3 w-2.5 h-2.5 rounded-full bg-[#1A1A1A]"></span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-black text-lg text-[#F7F4EF] group-hover:text-[#FFB703] transition-colors line-clamp-1">
                      {name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#A09D95] line-clamp-2 leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Price and Action Buttons */}
                <div className="pt-4 mt-4 border-t border-[#2A2A30] flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#A09D95]">
                      {locale === 'ar' ? 'يبدأ من' : 'Starts at'}
                    </span>
                    <span className="text-base font-black text-[#FFB703]">
                      {formatCurrency(product.basePrice, locale, siteSettings.currencyCode)}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E63920] to-[#C02E18] hover:from-[#FF472A] hover:to-[#E63920] text-white text-xs font-bold transition-all shadow-md shadow-[#E63920]/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{locale === 'ar' ? 'اختر الحجم والإضافات' : 'Select Size & Toppings'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
