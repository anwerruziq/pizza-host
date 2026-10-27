'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { sampleProducts } from '../data/sampleData';
import ProductCard from './ProductCard';
import { Sparkles, ArrowLeft, ArrowRight, Flame } from './icons';

export default function Specialties() {
  const { locale, t } = useApp();
  const { navigate } = useRouter();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Select top signature dishes from Pizza House
  const featuredDishes = sampleProducts.filter((p) => p.isFeatured).slice(0, 4);

  const goToMenu = () => {
    navigate('menu');
  };

  return (
    <section id="specialties" className="py-20 sm:py-24 bg-[#0A0A0C] relative overflow-hidden border-b border-[#232328]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 shadow-sm">
              <Flame className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'توصيات الشيف الخاصة' : "Chef's Recommendations"}</span>
            </div>
            <h2 className="font-lalezar text-3xl sm:text-5xl text-white tracking-wide">
              {locale === 'ar' ? 'أطباق مميزة في بيتزا هاوس' : 'Pizza House Signatures'}
            </h2>
            <p className="text-sm sm:text-base text-[#9E9EA8] max-w-xl">
              {locale === 'ar'
                ? 'أكثر الأصناف طلباً وإعجاباً من قبل زبائننا الكرام، مشمولة بخصم 20% ومتوفرة بحجمين'
                : 'Our most-loved dishes freshly baked, available with 20% discount in Medium & Large sizes'}
            </p>
          </div>

          <button
            onClick={goToMenu}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-black bg-[#FF7A00] hover:bg-[#FFA133] transition-all cursor-pointer shadow-lg shadow-[#FF7A00]/20 active:scale-95 group"
          >
            <span>{locale === 'ar' ? 'تصفح كل القائمة (72 صنف)' : 'View All Menu (72 items)'}</span>
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Featured Grid using clean ProductCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDishes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
