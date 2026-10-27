'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { sampleOffers } from '../data/sampleData';
import { formatCurrency } from '../lib/formatters';
import PageLayout from '../components/PageLayout';
import { Tag, Sparkles, MessageCircle, Clock, CheckCircle2, Flame, Award, Heart } from '../components/icons';

export default function OffersPage() {
  const { locale, siteSettings } = useApp();

  const whyChoose = [
    {
      iconEl: <Flame size={24} className="text-[#FF7A00]" />,
      titleAr: 'خصم 20% مستمر',
      titleEn: '20% Everyday OFF',
      descAr: 'خصم مباشر 20% على جميع أنواع البيتزا والفطائر والسندوتشات بحجميها المتوسط والكبير.',
      descEn: 'Direct 20% discount on all pizzas, pies, and sandwiches in Medium and Large sizes.',
      color: '#FF7A00',
    },
    {
      iconEl: <Heart size={24} className="text-[#FFA133]" />,
      titleAr: 'بكجات عائلية مشبعة',
      titleEn: 'Rich Family Combos',
      descAr: 'وجبات عائلية متكاملة تجمع البيتزا، الفطائر، العصائر الطبيعية والمقبلات بتوفير مضاعف.',
      descEn: 'Complete meal feasts combining pizzas, pies, fresh juices, and sides with massive savings.',
      color: '#FFA133',
    },
    {
      iconEl: <Award size={24} className="text-white" />,
      titleAr: 'جودة وطعم لا يُضاهى',
      titleEn: 'Unrivaled Quality',
      descAr: 'مخبوزات طازجة على الحطب يومياً بأجود المكونات الطبيعية ومشروبات طازجة 100%.',
      descEn: 'Freshly wood-fired dough made daily with premium natural ingredients and 100% fresh juices.',
      color: '#FFFFFF',
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-[#0A0A0C] border-b border-[#232328] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A00]/10 rounded-full blur-[160px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 shadow-sm">
            <Tag size={14} />
            <span>{locale === 'ar' ? 'عروض وبكجات حصرية' : 'Exclusive Deals & Bundles'}</span>
          </div>
          <h1 className="font-lalezar text-4xl sm:text-6xl text-white tracking-wide leading-tight">
            {locale === 'ar' ? 'عروض وتوفير بيتزا هاوس' : 'Pizza House Deals & Combos'}
          </h1>
          <p className="text-base sm:text-lg text-[#9E9EA8] max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'وجبات متكاملة وبكجات عائلية تجمع أشهى أصناف البيتزا والفطائر والعصائر بأسعار لا تقبل المنافسة'
              : 'Complete family feasts combining our signature pizzas, pies and juices at unbeatable prices'}
          </p>
        </div>
      </section>

      {/* Why section */}
      <section className="py-12 bg-[#0A0A0C] border-b border-[#232328]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#121214] border border-[#232328] space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center bg-[#FF7A00]/10">
                  {item.iconEl}
                </div>
                <h3 className="font-lalezar text-lg text-white">{locale === 'ar' ? item.titleAr : item.titleEn}</h3>
                <p className="text-xs text-[#9E9EA8] leading-relaxed">{locale === 'ar' ? item.descAr : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers grid */}
      <section className="py-16 bg-[#0A0A0C] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 space-y-2">
            <h2 className="font-lalezar text-3xl sm:text-4xl text-white">
              {locale === 'ar' ? 'البكجات المتوفرة حالياً' : 'Current Active Offers'}
            </h2>
            <p className="text-xs sm:text-sm text-[#9E9EA8]">
              {locale === 'ar' ? 'خصم مباشر وتوفير يصل إلى أكثر من 2,000 ريال' : 'Direct discount and savings over 2,000 YER'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleOffers.map((offer, idx) => {
              const title = locale === 'ar' ? offer.titleAr : offer.titleEn;
              const description = locale === 'ar' ? offer.descriptionAr : offer.descriptionEn;
              const badge = locale === 'ar' ? offer.badgeAr : offer.badgeEn;
              const savings = offer.originalPrice - offer.offerPrice;
              const savingsPercent = Math.round((savings / offer.originalPrice) * 100);

              const orderText = locale === 'ar'
                ? `مرحباً بيتزا هاوس، أود طلب *${title}* بسعر العرض ${formatCurrency(offer.offerPrice, locale, siteSettings.currencyCode)}.`
                : `Hello Pizza House, I would like to order: *${title}* for ${formatCurrency(offer.offerPrice, locale, siteSettings.currencyCode)}.`;

              const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(orderText)}`;
              const isBestDeal = idx === 0;

              return (
                <div
                  key={offer.id}
                  className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                    isBestDeal
                      ? 'bg-[#141417] border-2 border-[#FF7A00] shadow-xl shadow-[#FF7A00]/20'
                      : 'bg-[#121214] border border-[#232328] hover:border-white/20'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-black shadow-md ${
                      isBestDeal ? 'bg-[#FF7A00] text-black' : 'bg-white/10 text-white'
                    }`}>
                      {badge}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#9E9EA8]">
                      <Clock size={14} className="text-[#FF7A00]" />
                      <span>{locale === 'ar' ? 'عرض متاح' : 'Available'}</span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A0C] border border-white/5 mb-4">
                    <img
                      src={offer.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 start-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black bg-[#FF7A00] text-black shadow-lg">
                        -{savingsPercent}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5 flex-1">
                    <h3 className="font-lalezar text-xl sm:text-2xl text-white">{title}</h3>
                    <p className="text-xs sm:text-sm text-[#9E9EA8] leading-relaxed">{description}</p>

                    <div className="pt-2">
                      <div className="flex items-center gap-2 text-xs text-[#FF7A00] font-bold">
                        <CheckCircle2 size={16} />
                        <span>
                          {locale === 'ar'
                            ? `وفرت ${formatCurrency(savings, locale, siteSettings.currencyCode)}`
                            : `You save ${formatCurrency(savings, locale, siteSettings.currencyCode)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#232328] space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-[#7A7A85] line-through font-semibold">
                          {formatCurrency(offer.originalPrice, locale, siteSettings.currencyCode)}
                        </span>
                        <span className="text-2xl font-black text-[#FF7A00]">
                          {formatCurrency(offer.offerPrice, locale, siteSettings.currencyCode)}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30">
                        وفر {savingsPercent}%
                      </span>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-5 rounded-xl font-bold text-xs text-white bg-[#25D366] hover:bg-[#20ba59] flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
                    >
                      <MessageCircle size={16} className="fill-white" />
                      <span>{locale === 'ar' ? 'اطلب العرض عبر واتساب' : 'Claim Offer via WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Notice */}
          <div className="mt-12 p-6 rounded-2xl bg-[#121214] border border-[#232328] text-center space-y-2">
            <p className="text-xs text-[#9E9EA8]">
              {locale === 'ar'
                ? '⚡ جميع الوجبات تحضر طازجة فور طلبك. تتوفر خدمة التوصيل السريع لجميع مناطق صنعاء.'
                : '⚡ All meals freshly prepared upon order. Fast delivery available across Sanaa.'}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
