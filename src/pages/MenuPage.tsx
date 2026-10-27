'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { sampleCategories, sampleProducts } from '../data/sampleData';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
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
} from '../components/icons';

export default function MenuPage() {
  const { locale, selectedProduct } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'pizza':
        return <Pizza className="w-5 h-5" />;
      case 'fatayer':
        return <Sparkles className="w-5 h-5" />;
      case 'sandwiches':
        return <Sandwich className="w-5 h-5" />;
      case 'drinks':
        return <CupSoda className="w-5 h-5" />;
      case 'additions':
        return <UtensilsCrossed className="w-5 h-5" />;
      default:
        return <LayoutGrid className="w-5 h-5" />;
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
    return sampleProducts.filter((p) => p.categorySlug === slug).length;
  };

  return (
    <PageLayout>
      {/* Hero Banner */}
      <section className="relative py-16 sm:py-24 bg-[#0A0A0C] border-b border-[#232328] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A00]/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 shadow-sm">
            <Tag className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'خصم 20% مباشر على البيتزا والفطائر والسندوتشات' : 'Direct 20% OFF on Pizzas, Pies & Sandwiches'}</span>
          </div>
          <h1 className="font-lalezar text-4xl sm:text-6xl text-white tracking-wide leading-tight">
            {locale === 'ar' ? 'قائمة طعام بيتزا هاوس' : 'Pizza House Complete Menu'}
          </h1>
          <p className="text-base sm:text-lg text-[#9E9EA8] max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'تذوق ألذ بيتزا حطب وفطائر مقرمشة وسندوتشات ساخنة وعصائر طبيعية طازجة وإضافات مميزة'
              : 'Taste the best wood-fired pizzas, crispy pies, sizzling sandwiches, fresh natural juices and signature sides'}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 pt-4">
            <div className="text-center">
              <span className="font-lalezar text-2xl sm:text-3xl text-[#FF7A00]">{sampleProducts.length}</span>
              <span className="block text-xs text-[#9E9EA8] mt-0.5">{locale === 'ar' ? 'صنفاً شهياً' : 'Items'}</span>
            </div>
            <div className="w-px h-8 bg-[#232328]"></div>
            <div className="text-center">
              <span className="font-lalezar text-2xl sm:text-3xl text-white">5</span>
              <span className="block text-xs text-[#9E9EA8] mt-0.5">{locale === 'ar' ? 'أقسام رئيسية' : 'Categories'}</span>
            </div>
            <div className="w-px h-8 bg-[#232328]"></div>
            <div className="text-center">
              <span className="font-lalezar text-2xl sm:text-3xl text-[#FF7A00]">20%</span>
              <span className="block text-xs text-[#9E9EA8] mt-0.5">{locale === 'ar' ? 'خصم فوري' : 'Instant Discount'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-[#0A0A0C] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Tabs */}
          <div className="space-y-6 mb-10">
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'ar' ? 'ابحث عن أي طبق في القائمة...' : 'Search for any item...'}
                className="w-full py-3.5 px-12 rounded-2xl bg-[#121214] text-sm text-white placeholder-[#7A7A85] border border-[#232328] focus:border-[#FF7A00] focus:outline-none transition-colors shadow-inner"
              />
              <Search className="w-5 h-5 text-[#9E9EA8] absolute top-1/2 -translate-y-1/2 start-4 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-[#9E9EA8] hover:text-white absolute top-1/2 -translate-y-1/2 end-4 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {sampleCategories.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                const name = locale === 'ar' ? cat.nameAr : cat.nameEn;
                const count = getCategoryCount(cat.slug);

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap border ${
                      isSelected
                        ? 'bg-[#FF7A00] text-black border-[#FF7A00] shadow-lg shadow-[#FF7A00]/25 scale-[1.03]'
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

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-[#9E9EA8] mb-6 px-1">
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
                className="text-[#FF7A00] hover:underline cursor-pointer font-bold"
              >
                {locale === 'ar' ? 'عرض كل الأصناف' : 'Clear Filters'}
              </button>
            )}
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#121214] rounded-2xl border border-[#232328] max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-lalezar text-xl text-white">
                {locale === 'ar' ? 'لا توجد نتائج مطابقة' : 'No Results Found'}
              </h3>
              <p className="text-xs text-[#9E9EA8]">
                {locale === 'ar' ? 'جرب البحث باسم طبق آخر أو تصفح كل الأقسام' : 'Try searching for something else'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#FF7A00] hover:bg-[#FFA133] transition-colors cursor-pointer"
              >
                {locale === 'ar' ? 'إعادة تعيين البحث' : 'Reset Search'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Selected Product Modal */}
      {selectedProduct && <ProductModal />}
    </PageLayout>
  );
}
