'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { sampleCategories, sampleProducts } from '../data/sampleData';
import { formatCurrency } from '../lib/formatters';
import PageLayout from '../components/PageLayout';
import ProductModal from '../components/ProductModal';
import {
  Search, X, Eye, MessageCircle, Pizza, UtensilsCrossed, Sandwich,
  CupSoda, CakeSlice, LayoutGrid, Sparkles, Flame, ArrowLeft, ArrowRight, Clock, Award, Heart, ChefHat, Tag
} from '../components/icons';
import { useRouter } from '../main';

export default function MenuPage() {
  const { locale, siteSettings, t, selectedProduct, setSelectedProduct } = useApp();
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'pizza': return <Pizza className="w-5 h-5" />;
      case 'burgers': return <Sandwich className="w-5 h-5" />;
      case 'appetizers': return <UtensilsCrossed className="w-5 h-5" />;
      case 'drinks': return <CupSoda className="w-5 h-5" />;
      case 'desserts': return <CakeSlice className="w-5 h-5" />;
      default: return <LayoutGrid className="w-5 h-5" />;
    }
  };

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((p) => {
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchAr = p.nameAr.toLowerCase().includes(query) || p.descriptionAr.toLowerCase().includes(query);
        const matchEn = p.nameEn.toLowerCase().includes(query) || p.descriptionEn.toLowerCase().includes(query);
        return matchAr || matchEn;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryCount = (slug: string) => {
    if (slug === 'all') return sampleProducts.length;
    return sampleProducts.filter(p => p.categorySlug === slug).length;
  };

  return (
    <PageLayout>
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E63920]/10 rounded-full blur-[160px]"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FFB703]/8 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#E63920]/15 text-[#E63920] border border-[#E63920]/30">
            <Flame size={14} />
            <span>{locale === 'ar' ? 'مطبخنا الفاخر' : 'Our Premium Kitchen'}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#F7F4EF] tracking-tight leading-tight">
            {locale === 'ar' ? 'قائمة الطعام الكاملة' : 'Full Menu'}
          </h1>
          <p className="text-base sm:text-lg text-[#A09D95] max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'تشكيلة فاخرة من ألذ البيتزا النابولية الأصلية والبرغر المميز والمقبلات الشرقية والغربية والحلويات الإيطالية والمشروبات المنعشة'
              : 'A premium collection of authentic Neapolitan pizzas, gourmet burgers, Eastern & Western appetizers, Italian desserts, and refreshing beverages'}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 pt-4">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#FFB703]">{sampleProducts.length}+</span>
              <span className="block text-xs text-[#A09D95] mt-1">{locale === 'ar' ? 'صنف متوفر' : 'Items Available'}</span>
            </div>
            <div className="w-px h-10 bg-[#2A2A30]"></div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#E63920]">{sampleCategories.length}</span>
              <span className="block text-xs text-[#A09D95] mt-1">{locale === 'ar' ? 'تصنيف' : 'Categories'}</span>
            </div>
            <div className="w-px h-10 bg-[#2A2A30]"></div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#25D366]">450°</span>
              <span className="block text-xs text-[#A09D95] mt-1">{locale === 'ar' ? 'فرن حطب' : 'Wood Oven'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-[#0A0A0C] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + controls */}
          <div className="space-y-6 mb-10">
            <div className="max-w-xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'ar' ? 'ابحث عن طبقك المفضل...' : 'Search for your favorite dish...'}
                className="w-full py-4 px-12 rounded-2xl bg-[#17171A] text-sm text-[#F7F4EF] placeholder-[#6E6B65] border border-[#2A2A30] focus:border-[#E63920] focus:outline-none transition-colors shadow-inner"
              />
              <Search className="w-5 h-5 text-[#A09D95] absolute top-1/2 -translate-y-1/2 start-4 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-[#A09D95] hover:text-white absolute top-1/2 -translate-y-1/2 end-4 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category tabs — horizontal scrollable */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {sampleCategories.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                const name = locale === 'ar' ? cat.nameAr : cat.nameEn;
                const count = getCategoryCount(cat.slug);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap border ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#E63920] to-[#C02E18] text-white border-[#E63920] shadow-lg shadow-[#E63920]/25 scale-[1.03]'
                        : 'bg-[#17171A] text-[#A09D95] border-[#2A2A30] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {getCategoryIcon(cat.slug)}
                    <span>{name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-[#2A2A30]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results */}
          <div className="flex items-center justify-between text-xs text-[#A09D95] mb-6 px-1">
            <span>
              {locale === 'ar'
                ? `عرض ${filteredProducts.length} من أشهى الأطباق`
                : `Showing ${filteredProducts.length} delicious items`}
            </span>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-[#FFB703] hover:underline cursor-pointer"
              >
                {locale === 'ar' ? 'إزالة الفلاتر' : 'Clear Filters'}
              </button>
            )}
          </div>

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const name = locale === 'ar' ? product.nameAr : product.nameEn;
                const description = locale === 'ar' ? product.descriptionAr : product.descriptionEn;
                const badge = locale === 'ar' ? product.badgeAr : product.badgeEn;

                const orderText = locale === 'ar'
                  ? `مرحباً PizzaZone، أود طلب *${name}* بسعر ${formatCurrency(product.basePrice, locale, siteSettings.currencyCode)}.`
                  : `Hello PizzaZone, I would like to order *${name}* for ${formatCurrency(product.basePrice, locale, siteSettings.currencyCode)}.`;

                const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(orderText)}`;

                return (
                  <div
                    key={product.id}
                    className="group bg-[#17171A] hover:bg-[#1E1E22] rounded-3xl border border-[#2A2A30] hover:border-[#E63920]/30 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#E63920]/10 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#241310] via-[#1B1B1E] to-[#141416] p-4 flex items-center justify-center overflow-hidden border border-white/5 mb-4 group-hover:border-white/10 transition-colors">
                      {badge && (
                        <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E63920] text-white shadow-md">
                          {badge}
                        </span>
                      )}
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E67E22]/20 to-[#E63920]/20 flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-500">
                        <div className="w-full h-full rounded-full bg-[#222227] flex items-center justify-center border border-white/10 shadow-inner">
                          {product.categorySlug === 'pizza' ? <Pizza className="w-10 h-10 text-[#FFB703] group-hover:rotate-12 transition-transform" />
                            : product.categorySlug === 'burgers' ? <Sandwich className="w-10 h-10 text-[#FFB703]" />
                            : product.categorySlug === 'appetizers' ? <UtensilsCrossed className="w-10 h-10 text-[#FFB703]" />
                            : product.categorySlug === 'drinks' ? <CupSoda className="w-10 h-10 text-[#FFB703]" />
                            : <CakeSlice className="w-10 h-10 text-[#FFB703]" />}
                        </div>
                      </div>
                      {product.variants && product.variants.length > 0 && (
                        <span className="absolute bottom-2.5 left-3 text-[10px] text-[#A09D95] font-semibold bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                          {product.variants.map((v) => v.code).join(' • ')}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 flex-1">
                      <h3 className="font-black text-lg text-[#F7F4EF] group-hover:text-[#FFB703] transition-colors line-clamp-1">{name}</h3>
                      <p className="text-xs text-[#A09D95] line-clamp-2 leading-relaxed">{description}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#2A2A30] flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#A09D95]">
                          {product.categorySlug === 'pizza'
                            ? (locale === 'ar' ? 'يبدأ من' : 'Starts at')
                            : (locale === 'ar' ? 'السعر' : 'Price')}
                        </span>
                        <span className="text-base font-black text-[#FFB703]">
                          {formatCurrency(product.basePrice, locale, siteSettings.currencyCode)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#E63920] to-[#C02E18] hover:from-[#FF472A] hover:to-[#E63920] text-white text-xs font-bold transition-all shadow-md shadow-[#E63920]/20 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Pizza className="w-3.5 h-3.5" />
                          <span>{product.categorySlug === 'pizza' ? (locale === 'ar' ? 'اختر الحجم والإضافات' : 'Customize') : (locale === 'ar' ? 'طلب فوري' : 'Order')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#17171A] rounded-3xl border border-[#2A2A30] max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E63920]/15 text-[#E63920] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#F7F4EF]">{locale === 'ar' ? 'لا توجد نتائج' : 'No Results Found'}</h3>
              <p className="text-xs text-[#A09D95]">{locale === 'ar' ? 'جرب كلمات بحث مختلفة' : 'Try different search terms'}</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#E63920] hover:bg-[#FF472A] transition-colors cursor-pointer"
              >
                {locale === 'ar' ? 'إزالة الفلاتر' : 'Clear Filters'}
              </button>
            </div>
          )}

          {/* Special Offers Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#2A120F] to-[#17171A] border border-[#FFB703]/30 text-center space-y-5">
            <Sparkles size={40} className="text-[#FFB703] mx-auto animate-pulse" />
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {locale === 'ar' ? 'وجبات عائلية وتوفير حتى 40%!' : 'Family Feasts & Up to 40% Savings!'}
            </h3>
            <p className="text-sm text-[#A09D95] max-w-lg mx-auto leading-relaxed">
              {locale === 'ar'
                ? 'استمتع بأقوى العروض اليومية وباقات الوجبات المتكاملة مع الأصدقاء والعائلة بأسعار مخفضة للغاية'
                : 'Enjoy our best daily deals and complete bundled meals with friends and family at discounted prices'}
            </p>
            <button
              onClick={() => navigate('offers')}
              className="px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-[#FFB703] to-[#E63920] hover:scale-105 transition-all shadow-lg shadow-[#FFB703]/25 cursor-pointer inline-flex items-center gap-2"
            >
              <Tag size={20} />
              <span>{locale === 'ar' ? 'استعرض العروض والخصومات' : 'Explore Special Deals'}</span>
            </button>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </PageLayout>
  );
}
