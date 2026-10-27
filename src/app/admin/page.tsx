'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '../../context/AppContext';
import { sampleProducts, sampleCategories, sampleOffers } from '../../data/sampleData';
import { Product } from '../../types';
import { formatCurrency } from '../../lib/formatters';
import {
  ShieldCheck,
  Package,
  Layers,
  Tag,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Search,
  Eye,
  Plus,
  Flame,
  Settings,
  Globe,
} from '../../components/icons';

const Link = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

function AdminContent() {
  const { locale, toggleLocale, siteSettings, t } = useApp();
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'offers' | 'settings'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleProductAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, isAvailable: !p.isAvailable };
          showToast(
            updated.isAvailable
              ? locale === 'ar'
                ? `تم تفعيل الصنف (${p.nameAr}) بنجاح`
                : `Item (${p.nameEn}) enabled`
              : locale === 'ar'
              ? `تم تعطيل الصنف (${p.nameAr}) مؤقتاً`
              : `Item (${p.nameEn}) disabled`
          );
          return updated;
        }
        return p;
      })
    );
  };

  const filtered = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F7F4EF]">
      {/* Admin Header */}
      <header className="bg-[#121214] border-b border-[#2A2A30] py-4 px-6 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-xl bg-[#17171A] hover:bg-[#222227] text-[#A09D95] hover:text-white transition-colors border border-[#2A2A30] flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{locale === 'ar' ? 'العودة للمطعم' : 'Back to Restaurant'}</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E63920]/20 text-[#E63920] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-black text-white">{t.admin.title}</h1>
              <span className="text-[10px] text-[#A09D95] block">{t.admin.subtitle}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#17171A] hover:bg-[#222227] border border-[#2A2A30] text-white cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>{locale === 'ar' ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 end-6 z-50 bg-[#E63920] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#17171A] border border-[#2A2A30] space-y-1">
            <span className="text-xs text-[#A09D95]">{t.admin.statProducts}</span>
            <span className="text-2xl font-black text-white block">{products.length}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#17171A] border border-[#2A2A30] space-y-1">
            <span className="text-xs text-[#A09D95]">{t.admin.statCategories}</span>
            <span className="text-2xl font-black text-[#FFB703] block">
              {sampleCategories.length}
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-[#17171A] border border-[#2A2A30] space-y-1">
            <span className="text-xs text-[#A09D95]">{t.admin.statOffers}</span>
            <span className="text-2xl font-black text-emerald-400 block">
              {sampleOffers.length}
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-[#17171A] border border-[#2A2A30] space-y-1">
            <span className="text-xs text-[#A09D95]">{t.admin.statUnavailable}</span>
            <span className="text-2xl font-black text-[#E63920] block">
              {products.filter((p) => !p.isAvailable).length}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-[#2A2A30] pb-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#E63920] text-white shadow-md'
                : 'text-[#A09D95] hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{t.admin.products}</span>
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'bg-[#E63920] text-white shadow-md'
                : 'text-[#A09D95] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.admin.categories}</span>
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'offers'
                ? 'bg-[#E63920] text-white shadow-md'
                : 'text-[#A09D95] hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>{t.admin.offers}</span>
          </button>
        </div>

        {/* Products Management Table */}
        {activeTab === 'products' && (
          <div className="bg-[#17171A] rounded-3xl border border-[#2A2A30] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={locale === 'ar' ? 'بحث عن صنف...' : 'Search items...'}
                  className="w-full py-2.5 px-9 rounded-xl bg-[#222227] text-xs text-white border border-[#2A2A30] focus:border-[#E63920] focus:outline-none"
                />
                <Search className="w-4 h-4 text-[#A09D95] absolute top-1/2 -translate-y-1/2 start-3" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-[#2A2A30] text-[#A09D95]">
                    <th className="py-3 px-3 text-start font-bold">#</th>
                    <th className="py-3 px-3 text-start font-bold">
                      {locale === 'ar' ? 'الصنف' : 'Item Name'}
                    </th>
                    <th className="py-3 px-3 text-start font-bold">
                      {locale === 'ar' ? 'التصنيف' : 'Category'}
                    </th>
                    <th className="py-3 px-3 text-start font-bold">
                      {locale === 'ar' ? 'السعر' : 'Price'}
                    </th>
                    <th className="py-3 px-3 text-start font-bold">
                      {locale === 'ar' ? 'الحالة' : 'Status'}
                    </th>
                    <th className="py-3 px-3 text-end font-bold">
                      {locale === 'ar' ? 'الإجراء' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A30]">
                  {filtered.map((item, idx) => {
                    const name = locale === 'ar' ? item.nameAr : item.nameEn;
                    return (
                      <tr key={item.id} className="hover:bg-[#1E1E22]">
                        <td className="py-3 px-3 text-[#A09D95]">{idx + 1}</td>
                        <td className="py-3 px-3 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <span>{name}</span>
                            {item.isFeatured && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#E63920]/20 text-[#E63920] font-black">
                                STAR
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-[#A09D95]">{item.categorySlug}</td>
                        <td className="py-3 px-3 font-black text-[#FFB703]">
                          {formatCurrency(item.basePrice, locale, siteSettings.currencyCode)}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                              item.isAvailable
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/15 text-red-400 border border-red-500/30'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.isAvailable ? 'bg-emerald-400' : 'bg-red-400'
                              }`}
                            ></span>
                            {item.isAvailable ? t.menu.available : t.menu.unavailable}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-end">
                          <button
                            onClick={() => toggleProductAvailability(item.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                              item.isAvailable
                                ? 'bg-[#222227] hover:bg-red-950 text-red-400 border border-red-500/20'
                                : 'bg-[#222227] hover:bg-emerald-950 text-emerald-400 border border-emerald-500/20'
                            }`}
                          >
                            {item.isAvailable
                              ? locale === 'ar'
                                ? 'تعطيل الصنف'
                                : 'Disable'
                              : locale === 'ar'
                              ? 'تفعيل الصنف'
                              : 'Enable'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleCategories.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-[#17171A] border border-[#2A2A30] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    {locale === 'ar' ? c.nameAr : c.nameEn}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-[#222227] text-xs text-[#FFB703] font-bold">
                    {c.itemCount} {locale === 'ar' ? 'صنف' : 'items'}
                  </span>
                </div>
                <p className="text-xs text-[#A09D95]">
                  {locale === 'ar' ? c.descriptionAr : c.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sampleOffers.map((o) => (
              <div
                key={o.id}
                className="p-6 rounded-3xl bg-[#17171A] border border-[#2A2A30] space-y-3"
              >
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E63920] text-white">
                  {locale === 'ar' ? o.badgeAr : o.badgeEn}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {locale === 'ar' ? o.titleAr : o.titleEn}
                </h3>
                <p className="text-xs text-[#A09D95]">
                  {locale === 'ar' ? o.descriptionAr : o.descriptionEn}
                </p>
                <div className="pt-2 flex items-baseline justify-between border-t border-[#2A2A30]">
                  <span className="text-xs line-through text-[#6E6B65]">
                    {formatCurrency(o.originalPrice, locale, siteSettings.currencyCode)}
                  </span>
                  <span className="text-lg font-black text-[#FFB703]">
                    {formatCurrency(o.offerPrice, locale, siteSettings.currencyCode)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AppProvider>
      <AdminContent />
    </AppProvider>
  );
}
