'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { sampleCategories, sampleProducts } from '../data/sampleData';
import { Product } from '../types';
import { formatCurrency } from '../lib/formatters';
import {
  Search,
  X,
  Eye,
  MessageCircle,
  Pizza,
  UtensilsCrossed,
  Sandwich,
  CupSoda,
  CakeSlice,
  LayoutGrid,
  Sparkles,
  Flame,
} from './icons';

export default function MenuSection() {
  const { locale, siteSettings, t, setSelectedProduct } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Icon mapping for categories
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'pizza':
        return <Pizza className="w-4 h-4" />;
      case 'burgers':
        return <Sandwich className="w-4 h-4" />;
      case 'appetizers':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'drinks':
        return <CupSoda className="w-4 h-4" />;
      case 'desserts':
        return <CakeSlice className="w-4 h-4" />;
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
    <section id="menu" className="py-24 bg-[#0D0D0E] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#E63920]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E63920]/15 text-[#E63920] border border-[#E63920]/30">
            <Flame className="w-3.5 h-3.5" />
            <span>{t.categories.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF] tracking-tight">
            {t.menu.pageTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#A09D95]">
            {t.menu.pageSubtitle}
          </p>
        </div>

        {/* Filter Controls: Search & Categories */}
        <div className="space-y-6 mb-12">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.menu.searchPlaceholder}
              className="w-full py-3.5 px-11 rounded-2xl bg-[#17171A] text-sm text-[#F7F4EF] placeholder-[#6E6B65] border border-[#2A2A30] focus:border-[#E63920] focus:outline-none transition-colors shadow-inner"
            />
            <Search className="w-4 h-4 text-[#A09D95] absolute top-1/2 -translate-y-1/2 start-4 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-[#A09D95] hover:text-white absolute top-1/2 -translate-y-1/2 end-3.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {sampleCategories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const name = locale === 'ar' ? cat.nameAr : cat.nameEn;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#E63920] to-[#C02E18] text-white border-[#E63920] shadow-lg shadow-[#E63920]/25 scale-[1.03]'
                      : 'bg-[#17171A] text-[#A09D95] border-[#2A2A30] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {getCategoryIcon(cat.slug)}
                  <span>{name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#A09D95] mb-6 px-1">
          <span>
            {locale === 'ar'
              ? `عرض ${filteredProducts.length} من أشهى الأطباق`
              : `Showing ${filteredProducts.length} delicious items`}
          </span>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-[#FFB703] hover:underline cursor-pointer"
            >
              {t.menu.clearFilters}
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const name = locale === 'ar' ? product.nameAr : product.nameEn;
              const description = locale === 'ar' ? product.descriptionAr : product.descriptionEn;
              const badge = locale === 'ar' ? product.badgeAr : product.badgeEn;

              const orderText =
                locale === 'ar'
                  ? `مرحباً PizzaZone، أود طلب *${name}* بسعر ${formatCurrency(
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
                  className="group bg-[#17171A] hover:bg-[#1E1E22] rounded-3xl border border-[#2A2A30] hover:border-[#E63920]/30 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#E63920]/10 hover:-translate-y-1"
                >
                  {/* Card Visual Header */}
                  <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#241310] via-[#1B1B1E] to-[#141416] p-4 flex items-center justify-center overflow-hidden border border-white/5 mb-4 group-hover:border-white/10 transition-colors">
                    {/* Badge */}
                    {badge && (
                      <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E63920] text-white shadow-md">
                        {badge}
                      </span>
                    )}

                    {/* Food Graphic Fallback */}
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E67E22]/20 to-[#E63920]/20 flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-500">
                      <div className="w-full h-full rounded-full bg-[#222227] flex items-center justify-center border border-white/10 shadow-inner">
                        {product.categorySlug === 'pizza' ? (
                          <Pizza className="w-10 h-10 text-[#FFB703] group-hover:rotate-12 transition-transform" />
                        ) : product.categorySlug === 'burgers' ? (
                          <Sandwich className="w-10 h-10 text-[#FFB703]" />
                        ) : product.categorySlug === 'appetizers' ? (
                          <UtensilsCrossed className="w-10 h-10 text-[#FFB703]" />
                        ) : product.categorySlug === 'drinks' ? (
                          <CupSoda className="w-10 h-10 text-[#FFB703]" />
                        ) : (
                          <CakeSlice className="w-10 h-10 text-[#FFB703]" />
                        )}
                      </div>
                    </div>

                    {/* Sizes available tag if variants exist */}
                    {product.variants && product.variants.length > 0 && (
                      <span className="absolute bottom-2.5 left-3 text-[10px] text-[#A09D95] font-semibold bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        {product.variants.map((v) => v.code).join(' • ')}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="space-y-2 flex-1">
                    <h3 className="font-black text-lg text-[#F7F4EF] group-hover:text-[#FFB703] transition-colors line-clamp-1">
                      {name}
                    </h3>
                    <p className="text-xs text-[#A09D95] line-clamp-2 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Pricing & Footer Actions */}
                  <div className="pt-4 mt-4 border-t border-[#2A2A30] flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#A09D95]">
                        {product.variants && product.variants.length > 0
                          ? locale === 'ar'
                            ? 'يبدأ من'
                            : 'Starts at'
                          : locale === 'ar'
                          ? 'السعر'
                          : 'Price'}
                      </span>
                      <span className="text-base font-black text-[#FFB703]">
                        {formatCurrency(product.basePrice, locale, siteSettings.currencyCode)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E63920] to-[#C02E18] hover:from-[#FF472A] hover:to-[#E63920] text-white text-xs font-bold transition-all shadow-md shadow-[#E63920]/20 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Pizza className="w-3.5 h-3.5" />
                        <span>{product.categorySlug === 'pizza' ? (locale === 'ar' ? 'اختر الحجم والإضافات' : 'Customize') : (locale === 'ar' ? 'طلب وتفاصيل' : 'Details')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search Results */
          <div className="text-center py-16 px-4 bg-[#17171A] rounded-3xl border border-[#2A2A30] max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E63920]/15 text-[#E63920] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F7F4EF]">{t.menu.noResultsTitle}</h3>
            <p className="text-xs text-[#A09D95]">{t.menu.noResultsDesc}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#E63920] hover:bg-[#FF472A] transition-colors cursor-pointer"
            >
              {t.menu.clearFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
