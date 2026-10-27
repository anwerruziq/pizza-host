'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { sampleOffers } from '../data/sampleData';
import { formatCurrency } from '../lib/formatters';
import { Tag, Sparkles, MessageCircle, Clock, CheckCircle2 } from './icons';

export default function OffersSection() {
  const { locale, siteSettings, t } = useApp();

  return (
    <section id="offers" className="py-24 bg-[#0A0A0C] relative overflow-hidden">
      {/* Background radial lights */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#FFB703]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFB703]/15 text-[#FFB703] border border-[#FFB703]/30 shadow-md">
            <Tag className="w-3.5 h-3.5" />
            <span>{t.specialOfferBanner.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF] tracking-tight">
            {locale === 'ar' ? 'عروض وتوفير العائلة والأصدقاء' : 'Exclusive Combos & Deals'}
          </h2>
          <p className="text-sm sm:text-base text-[#A09D95]">
            {locale === 'ar'
              ? 'وجبات متكاملة بأسعار مخفضة لتستمتع بأشهى النكهات مع أحبائك'
              : 'Complete feasts at irresistible bundle prices to share with loved ones'}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleOffers.map((offer, idx) => {
            const title = locale === 'ar' ? offer.titleAr : offer.titleEn;
            const description = locale === 'ar' ? offer.descriptionAr : offer.descriptionEn;
            const badge = locale === 'ar' ? offer.badgeAr : offer.badgeEn;
            const savings = offer.originalPrice - offer.offerPrice;

            const orderText =
              locale === 'ar'
                ? `مرحباً PizzaZone، أود طلب *${title}* بسعر العرض ${formatCurrency(
                    offer.offerPrice,
                    locale,
                    siteSettings.currencyCode
                  )}.`
                : `Hello PizzaZone, I would like to order the special deal: *${title}* for ${formatCurrency(
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
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                  isBestDeal
                    ? 'bg-gradient-to-b from-[#2A120F] to-[#17171A] border-2 border-[#E63920] shadow-2xl shadow-[#E63920]/20'
                    : 'bg-[#17171A] border border-[#2A2A30] hover:border-white/20'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${
                      isBestDeal
                        ? 'bg-[#E63920] text-white animate-pulse'
                        : 'bg-[#FFB703] text-black'
                    }`}
                  >
                    {badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#A09D95]">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{locale === 'ar' ? 'عرض سارٍ' : 'Limited Time'}</span>
                  </div>
                </div>

                {/* Offer Content */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-[#F7F4EF]">{title}</h3>
                  <p className="text-xs sm:text-sm text-[#A09D95] leading-relaxed">
                    {description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {locale === 'ar'
                        ? `وفرت ${formatCurrency(savings, locale, siteSettings.currencyCode)} من السعر الأصلي`
                        : `You save ${formatCurrency(savings, locale, siteSettings.currencyCode)}`}
                    </span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-5 border-t border-[#2A2A30] space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-[#6E6B65] line-through">
                        {formatCurrency(offer.originalPrice, locale, siteSettings.currencyCode)}
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-[#FFB703]">
                        {formatCurrency(offer.offerPrice, locale, siteSettings.currencyCode)}
                      </span>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm text-center flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] shadow-lg cursor-pointer ${
                      isBestDeal
                        ? 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-[#25D366]/20'
                        : 'bg-[#222227] hover:bg-[#25D366] text-white border border-white/10 hover:border-[#25D366]'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'اطلب العرض عبر واتساب' : 'Claim Offer via WhatsApp'}</span>
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
