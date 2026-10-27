'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../lib/formatters';
import { Plus } from './icons';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, siteSettings, setSelectedProduct } = useApp();
  const [imgError, setImgError] = useState(false);

  const name = locale === 'ar' ? product.nameAr : product.nameEn;
  const description = locale === 'ar' ? product.descriptionAr : product.descriptionEn;
  const price = product.basePrice;
  const originalPrice = product.originalPrice || Math.round(product.basePrice / 0.8);

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-[#121215] hover:bg-[#16161A] rounded-3xl border border-[#232328] hover:border-[#FF7A00]/50 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70 cursor-pointer overflow-hidden"
    >
      {/* ── Enlarged Circular Dish Image & Glow (Enhanced Size) ── */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto my-2 rounded-full p-2 flex items-center justify-center shrink-0">
        {/* Ambient Warm Glow */}
        <div className="absolute inset-0 rounded-full bg-[#FF7A00]/10 blur-xl group-hover:bg-[#FF7A00]/25 transition-all duration-300 pointer-events-none" />

        {/* Circular Plate */}
        <div className="w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#0A0A0C] shadow-inner flex items-center justify-center p-1.5">
          <img
            src={imgError ? '/logo.png' : product.image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
            loading="lazy"
          />
        </div>

        {/* Discount Badge Pill */}
        {product.hasDiscount && (
          <span className="absolute top-1 start-1 bg-[#FF7A00] text-black text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full shadow-md font-lalezar tracking-wide">
            -20%
          </span>
        )}
      </div>

      {/* ── Title & Description ── */}
      <div className="space-y-1.5 text-center mt-2 flex-1 px-1">
        <h4 className="font-lalezar text-lg sm:text-xl text-white group-hover:text-[#FF7A00] transition-colors line-clamp-1 leading-snug">
          {name}
        </h4>
        <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed min-h-[32px]">
          {description}
        </p>
      </div>

      {/* ── Bottom: Price + Action Button ── */}
      <div className="pt-3 mt-3 border-t border-[#1F1F24] flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base sm:text-lg font-black text-white font-lalezar tracking-tight">
            {formatCurrency(price, locale, siteSettings.currencyCode)}
          </span>
          {product.hasDiscount && (
            <span className="text-xs text-[#71717A] line-through font-medium">
              {formatCurrency(originalPrice, locale, siteSettings.currencyCode)}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="w-8 h-8 rounded-xl bg-[#1E1E24] group-hover:bg-[#FF7A00] text-[#A1A1AA] group-hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          title={locale === 'ar' ? 'طلب' : 'Order'}
          aria-label="Order dish"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
