'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { sampleCategories, sampleProducts } from '../data/sampleData';
import ProductCard from './ProductCard';

export default function MenuSection() {
  const { locale } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('pizza');
  const isAr = locale === 'ar';

  const categories = [
    { slug: 'all', nameAr: 'الكل', nameEn: 'All' },
    { slug: 'pizza', nameAr: 'البيتزا', nameEn: 'Pizza' },
    { slug: 'fatayer', nameAr: 'الفطائر', nameEn: 'Fatayer' },
    { slug: 'sandwiches', nameAr: 'السندوتشات', nameEn: 'Sandwiches' },
    { slug: 'drinks', nameAr: 'المشروبات', nameEn: 'Drinks' },
    { slug: 'additions', nameAr: 'الإضافات', nameEn: 'Extras' },
  ];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return sampleProducts.slice(0, 18);
    return sampleProducts.filter((p) => p.categorySlug === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#0A0A0C] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Signature Bracket Title (from reference) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center px-6 py-2 rounded-full border border-[#FF7A00] text-[#FF7A00] font-bold text-sm sm:text-base tracking-wide bg-[#121214]/50 backdrop-blur-sm">
            {isAr ? '[ اختر من قائمتنا ]' : '[ Choose Our Menu ]'}
          </div>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF7A00] text-black font-bold shadow-md shadow-[#FF7A00]/25'
                    : 'bg-[#121214] text-[#A1A1AA] hover:text-white border border-[#222226] hover:border-zinc-700'
                }`}
              >
                {isAr ? cat.nameAr : cat.nameEn}
              </button>
            );
          })}
        </div>

        {/* 3 Columns Grid of Minimal Dish Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
