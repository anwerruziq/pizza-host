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
      className="group relative bg-[#121214] hover:bg-[#16161A] rounded-2xl border border-[#222226] hover:border-[#FF7A00]/50 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 cursor-pointer overflow-hidden"
    >
      {/* Centered Circular Dish Image (from reference) */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto my-2 rounded-full p-1.5 flex items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-[#FF7A00]/10 blur-xl group-hover:bg-[#FF7A00]/25 transition-all duration-300 pointer-events-none" />
        <div className="w-full h-full rounded-full overflow-hidden border border-white/5 bg-[#0A0A0C] flex items-center justify-center">
          <img
            src={imgError ? '/logo.png' : product.image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Small discount pill if discounted */}
        {product.hasDiscount && (
          <span className="absolute -top-1 -start-1 bg-[#FF7A00] text-black text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm font-lalezar">
            -20%
          </span>
        )}
      </div>

      {/* Title & Short Description */}
      <div className="space-y-1 text-center mt-2 flex-1">
        <h4 className="font-lalezar text-base sm:text-lg text-white group-hover:text-[#FF7A00] transition-colors line-clamp-1">
          {name}
        </h4>
        <p className="text-[11px] text-[#A1A1AA] line-clamp-1 leading-normal">
          {description}
        </p>
      </div>

      {/* Bottom: Price + Small Action Button */}
      <div className="pt-3 mt-3 border-t border-[#1E1E22] flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm sm:text-base font-black text-white font-lalezar">
            {formatCurrency(price, locale, siteSettings.currencyCode)}
          </span>
          {product.hasDiscount && (
            <span className="text-[10px] text-[#71717A] line-through">
              {formatCurrency(originalPrice, locale, siteSettings.currencyCode)}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="w-7 h-7 rounded-lg bg-[#1E1E24] group-hover:bg-[#FF7A00] text-[#A1A1AA] group-hover:text-black flex items-center justify-center transition-all cursor-pointer"
          title={locale === 'ar' ? 'طلب' : 'Order'}
          aria-label="Order dish"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
