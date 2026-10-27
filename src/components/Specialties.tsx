'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { sampleProducts } from '../data/sampleData';
import { formatCurrency } from '../lib/formatters';
import { Plus } from './icons';

export default function Specialties() {
  const { locale, siteSettings, setSelectedProduct } = useApp();
  const isAr = locale === 'ar';

  // 3 Signature delivered items
  const bestDelivered = [
    sampleProducts.find((p) => p.id === 'prod-pizza-1') || sampleProducts[0],
    sampleProducts.find((p) => p.id === 'prod-fatayer-1') || sampleProducts[8] || sampleProducts[1],
    sampleProducts.find((p) => p.id === 'prod-sandwich-2') || sampleProducts[18] || sampleProducts[2],
  ];

  return (
    <section id="specialties" className="py-16 md:py-24 bg-[#0A0A0C] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Signature Bracket Title */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-6 py-2 rounded-full border border-[#FF7A00] text-[#FF7A00] font-bold text-sm sm:text-base tracking-wide bg-[#121214]/50 backdrop-blur-sm shadow-md shadow-[#FF7A00]/10">
            {isAr ? '[ الأكثر طلباً وتوصيلاً ]' : '[ Our Best Delivered ]'}
          </div>
        </div>

        {/* 3 Horizontal Capsule Cards (Alternating Layout) */}
        <div className="space-y-6 sm:space-y-8">
          {bestDelivered.map((dish, index) => {
            const isReversed = index % 2 === 1;
            const price = dish.basePrice;
            const originalPrice = dish.originalPrice || Math.round(dish.basePrice / 0.8);

            return (
              <div
                key={dish.id}
                className="relative rounded-3xl bg-[#121215] border border-[#232328] hover:border-[#FF7A00]/40 transition-all duration-300 p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden group"
              >
                <div
                  className={`flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 ${
                    isReversed ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Dish Image (Large circular / glowing) */}
                  <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[#FF7A00]/10 blur-2xl group-hover:bg-[#FF7A00]/25 transition-all duration-500 pointer-events-none" />
                    <img
                      src={dish.image}
                      alt={isAr ? dish.nameAr : dish.nameEn}
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-4 text-start">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 font-lalezar">
                        {isAr ? 'خصم 20%' : '20% OFF'}
                      </span>
                      <span className="text-xs text-[#A1A1AA]">
                        {isAr ? 'حجمين: وسط وكبير' : 'Medium & Large'}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-lalezar text-white tracking-wide">
                      {isAr ? dish.nameAr : dish.nameEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-lg">
                      {isAr ? dish.descriptionAr : dish.descriptionEn}
                    </p>

                    {/* Price Tag */}
                    <div className="flex items-baseline gap-3 pt-1">
                      <span className="text-2xl sm:text-3xl font-black text-white font-lalezar">
                        {formatCurrency(price, locale, siteSettings.currencyCode)}
                      </span>
                      <span className="text-sm line-through text-[#71717A]">
                        {formatCurrency(originalPrice, locale, siteSettings.currencyCode)}
                      </span>
                    </div>

                    {/* Actions: "اطلب الآن" button + plus button */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setSelectedProduct(dish)}
                        className="px-6 py-2.5 rounded-full bg-[#FF7A00] hover:bg-[#FFA133] text-black font-bold text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#FF7A00]/20 cursor-pointer"
                      >
                        {isAr ? 'اطلب الآن' : 'Order Now'}
                      </button>

                      <button
                        onClick={() => setSelectedProduct(dish)}
                        className="w-10 h-10 rounded-full border border-[#27272A] hover:border-[#FF7A00] bg-[#1A1A1E] text-white flex items-center justify-center transition-colors cursor-pointer"
                        title={isAr ? 'اختيار الحجم والإضافات' : 'Select Size & Extras'}
                        aria-label="View options"
                      >
                        <Plus size={18} className="text-[#FF7A00]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
