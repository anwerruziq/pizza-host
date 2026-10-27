'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../lib/formatters';
import { Pizza, Sparkles, Tag, UtensilsCrossed, CupSoda, Sandwich } from './icons';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, siteSettings, setSelectedProduct } = useApp();
  const [imgError, setImgError] = useState(false);

  const name = locale === 'ar' ? product.nameAr : product.nameEn;
  const description = locale === 'ar' ? product.descriptionAr : product.descriptionEn;
  const isMultiSize = ['pizza', 'fatayer', 'sandwiches'].includes(product.categorySlug);

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-[#121214] hover:bg-[#161619] rounded-2xl border border-[#232328] hover:border-[#FF7A00]/50 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0A0A0C] border border-white/5 mb-3.5 flex items-center justify-center">
        {/* Real Image */}
        <img
          src={imgError ? '/logo.png' : product.image}
          alt={name}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imgError ? 'object-contain p-6 opacity-70' : ''
          }`}
          loading="lazy"
        />

        {/* Discount Sticker (ملصق الخصم) */}
        {product.hasDiscount ? (
          <div className="absolute top-2.5 start-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black tracking-wide bg-[#FF7A00] text-black shadow-lg shadow-[#FF7A00]/30 transform -rotate-3 border border-yellow-300/40">
              <Tag className="w-3 h-3 text-black fill-black" />
              <span>-20% خصم</span>
            </span>
          </div>
        ) : (
          <div className="absolute top-2.5 start-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/10 text-[#D1D1DB] backdrop-blur-md border border-white/10">
              {locale === 'ar' ? 'سعر أساسي' : 'Standard'}
            </span>
          </div>
        )}

        {/* Multi-Size Indicator */}
        {isMultiSize && (
          <span className="absolute bottom-2.5 end-2.5 z-10 text-[10px] font-bold bg-black/75 text-[#FFA133] px-2 py-0.5 rounded-md backdrop-blur-md border border-[#FF7A00]/30">
            {locale === 'ar' ? 'حجمين: متوسط • كبير' : '2 Sizes: Med • Lrg'}
          </span>
        )}

        {/* Extra Badge if present */}
        {product.badgeAr && (
          <span className="absolute top-2.5 end-2.5 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/80 text-white border border-white/10">
            {locale === 'ar' ? product.badgeAr : product.badgeEn}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1.5 flex-1">
        <h3 className="font-lalezar text-lg sm:text-xl text-white group-hover:text-[#FF7A00] transition-colors leading-snug line-clamp-1">
          {name}
        </h3>
        <p className="text-xs text-[#9E9EA8] line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Pricing and Action Footer */}
      <div className="pt-3 mt-3 border-t border-[#232328] flex items-center justify-between gap-2">
        {/* Price Display */}
        <div className="flex flex-col">
          {product.hasDiscount ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#7A7A85] line-through font-semibold">
                  {formatCurrency(product.originalPrice || product.basePrice, locale, siteSettings.currencyCode)}
                </span>
                <span className="text-[9px] text-[#FF7A00] font-bold bg-[#FF7A00]/10 px-1 rounded">
                  {locale === 'ar' ? 'وفر 20%' : 'Save 20%'}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-black text-white group-hover:text-[#FF7A00] transition-colors">
                  {formatCurrency(product.basePrice, locale, siteSettings.currencyCode)}
                </span>
                {isMultiSize && (
                  <span className="text-[10px] text-[#9E9EA8]">
                    ({locale === 'ar' ? 'متوسط' : 'Med'})
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <span className="text-[10px] text-[#9E9EA8]">
                {locale === 'ar' ? 'السعر' : 'Price'}
              </span>
              <span className="text-base sm:text-lg font-black text-white">
                {formatCurrency(product.basePrice, locale, siteSettings.currencyCode)}
              </span>
            </>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="px-3 py-1.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA133] text-black font-black text-xs transition-all shadow-md shadow-[#FF7A00]/20 flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
        >
          {isMultiSize ? (
            <span>{locale === 'ar' ? 'اختيار الحجم' : 'Select Size'}</span>
          ) : (
            <span>{locale === 'ar' ? 'طلب فوري' : 'Order Now'}</span>
          )}
        </button>
      </div>
    </div>
  );
}
