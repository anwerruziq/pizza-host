'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { sampleCategories, sampleProducts } from '../data/sampleData';
import ProductCard from './ProductCard';
import {
  Search,
  X,
  Pizza,
  UtensilsCrossed,
  Sandwich,
  CupSoda,
  LayoutGrid,
  Sparkles,
  Flame,
  Tag,
} from './icons';

export default function MenuSection() {
  const { locale, siteSettings, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Icon mapping for Pizza House categories
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'pizza':
        return <Pizza className="w-4 h-4" />;
      case 'fatayer':
        return <Sparkles className="w-4 h-4" />;
      case 'sandwiches':
        return <Sandwich className="w-4 h-4" />;
      case 'drinks':
        return <CupSoda className="w-4 h-4" />;
      case 'additions':
        return <UtensilsCrossed className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchAr = p.nameAr.toLowerCase().includes(query) || p.descriptionAr.toLowerCase().includes(query);
        const matchEn = p.nameEn.toLowerCase().includes(query) || p.descriptionEn.toLowerCase().includes(query);
        return matchAr || matchEn;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 sm:py-24 bg-[#0A0A0C] relative overflow-hidden">
      {/* Background subtle orange ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF7A00]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 shadow-sm">
            <Tag className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'خصم 20% على البيتزا والفطائر والسندوتشات' : '20% OFF Pizzas, Pies & Sandwiches'}</span>
          </div>
          <h2 className="font-lalezar text-3xl sm:text-5xl text-white tracking-wide">
            {locale === 'ar' ? 'قائمة أطباق بيتزا هاوس' : 'Pizza House Menu'}
          </h2>
          <p className="text-sm sm:text-base text-[#9E9EA8]">
            {locale === 'ar'
              ? 'أشهى الأصناف المحضرة طازجة بعناية مع خيارات الحجم المتوسط والكبير بأسعار مميزة'
              : 'Freshly prepared dishes with Medium & Large size choices at special discount prices'}
          </p>
        </div>

        {/* Filter Controls: Search & Categories */}
        <div className="space-y-6 mb-10">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'ابحث في القائمة (مثال: دجاج، شاورما، هاوس)...' : 'Search dishes (e.g. Chicken, House)...'}
              className="w-full py-3.5 px-11 rounded-2xl bg-[#121214] text-sm text-white placeholder-[#7A7A85] border border-[#232328] focus:border-[#FF7A00] focus:outline-none transition-colors shadow-inner"
            />
            <Search className="w-4 h-4 text-[#9E9EA8] absolute top-1/2 -translate-y-1/2 start-4 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-[#9E9EA8] hover:text-white absolute top-1/2 -translate-y-1/2 end-3.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {sampleCategories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const name = locale === 'ar' ? cat.nameAr : cat.nameEn;
              const count = cat.slug === 'all' 
                ? sampleProducts.length 
                : sampleProducts.filter(p => p.categorySlug === cat.slug).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap border ${
                    isSelected
                      ? 'bg-[#FF7A00] text-black border-[#FF7A00] shadow-lg shadow-[#FF7A00]/20 scale-[1.03]'
                      : 'bg-[#121214] text-[#9E9EA8] border-[#232328] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {getCategoryIcon(cat.slug)}
                  <span>{name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${isSelected ? 'bg-black/20 text-black' : 'bg-white/5 text-[#7A7A85]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between text-xs text-[#9E9EA8] mb-6 px-1">
          <span>
            {locale === 'ar'
              ? `عرض ${filteredProducts.length} صنف متاح في القائمة`
              : `Showing ${filteredProducts.length} items`}
          </span>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-[#FF7A00] hover:underline cursor-pointer font-bold"
            >
              {locale === 'ar' ? 'عرض كل الأصناف' : 'Show All Items'}
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search Results */
          <div className="text-center py-16 px-4 bg-[#121214] rounded-2xl border border-[#232328] max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-lalezar text-xl text-white">
              {locale === 'ar' ? 'لم يتم العثور على أطباق مطابقة' : 'No matching dishes found'}
            </h3>
            <p className="text-xs text-[#9E9EA8]">
              {locale === 'ar' ? 'جرب البحث بكلمة أخرى أو اختر قسماً آخر' : 'Try searching for something else or switch category'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#FF7A00] hover:bg-[#FFA133] transition-colors cursor-pointer"
            >
              {locale === 'ar' ? 'عرض القائمة كاملة' : 'View Full Menu'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
