'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { sampleOffers } from '../data/sampleData';
import { formatCurrency } from '../lib/formatters';
import { Tag, MessageCircle, Clock, CheckCircle2 } from './icons';

export default function OffersSection() {
  const { locale, siteSettings } = useApp();

  return (
    <section id="offers" className="py-20 sm:py-24 bg-[#0A0A0C] relative overflow-hidden border-b border-[#232328]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#FF7A00]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 shadow-sm">
            <Tag className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'عروض وتوفير حصري' : 'Exclusive Deals & Savings'}</span>
          </div>
          <h2 className="font-lalezar text-3xl sm:text-5xl text-white tracking-wide">
            {locale === 'ar' ? 'بكجات وعروض بيتزا هاوس' : 'Pizza House Bundles & Combos'}
          </h2>
          <p className="text-sm sm:text-base text-[#9E9EA8]">
            {locale === 'ar'
              ? 'وجبات متكاملة وتوفير مضاعف للعائلة والأصدقاء بأفضل الأسعار'
              : 'Complete meal bundles with maximum savings for family & friends'}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleOffers.map((offer, idx) => {
            const title = locale === 'ar' ? offer.titleAr : offer.titleEn;
            const description = locale === 'ar' ? offer.descriptionAr : offer.descriptionEn;
            const badge = locale === 'ar' ? offer.badgeAr : offer.badgeEn;
            const savings = offer.originalPrice - offer.offerPrice;

            const orderText =
              locale === 'ar'
                ? `مرحباً بيتزا هاوس، أود طلب *${title}* بسعر العرض ${formatCurrency(
                    offer.offerPrice,
                    locale,
                    siteSettings.currencyCode
                  )}.`
                : `Hello Pizza House, I would like to order: *${title}* for ${formatCurrency(
                    offer.offerPrice,
                    locale,
                    siteSettings.currencyCode
                  )}.`;

            const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(
              /[^0-9]/g,
              ''
            )}?text=${encodeURIComponent(orderText)}`;

            const isBestDeal = idx === 0;

            return (
              <div
                key={offer.id}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  isBestDeal
                    ? 'bg-[#141417] border-2 border-[#FF7A00] shadow-xl shadow-[#FF7A00]/15'
                    : 'bg-[#121214] border border-[#232328] hover:border-white/20'
                }`}
              >
                {/* Top Badge & Timer */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-black shadow-md ${
                      isBestDeal
                        ? 'bg-[#FF7A00] text-black'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#9E9EA8]">
                    <Clock className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span>{locale === 'ar' ? 'عرض متاح' : 'Available'}</span>
                  </div>
                </div>

                {/* Offer Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A0C] border border-white/5 mb-4">
                  <img
                    src={offer.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 start-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black bg-[#FF7A00] text-black shadow-lg">
                      {locale === 'ar' ? `توفير ${formatCurrency(savings, locale, siteSettings.currencyCode)}` : `Save ${formatCurrency(savings, locale, siteSettings.currencyCode)}`}
                    </span>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="space-y-2 mb-5 flex-1">
                  <h3 className="font-lalezar text-xl sm:text-2xl text-white leading-snug">{title}</h3>
                  <p className="text-xs sm:text-sm text-[#9E9EA8] leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Pricing & Order CTA */}
                <div className="pt-4 border-t border-[#232328] flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#7A7A85] line-through font-semibold">
                      {formatCurrency(offer.originalPrice, locale, siteSettings.currencyCode)}
                    </span>
                    <span className="text-xl font-black text-[#FF7A00]">
                      {formatCurrency(offer.offerPrice, locale, siteSettings.currencyCode)}
                    </span>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{locale === 'ar' ? 'اطلب العرض واتساب' : 'Order Deal'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
