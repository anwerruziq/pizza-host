'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { sampleOffers } from '../data/sampleData';
import { formatCurrency } from '../lib/formatters';
import PageLayout from '../components/PageLayout';
import { Tag, Sparkles, MessageCircle, Clock, CheckCircle2, Flame, Award, Heart } from '../components/icons';
import { useRouter } from '../main';

export default function OffersPage() {
  const { locale, siteSettings } = useApp();
  const { navigate } = useRouter();

  const whyChoose = [
    {
      iconEl: <Flame size={24} className="text-[#E63920]" />,
      titleAr: 'عروض يومية متجددة',
      titleEn: 'Daily Fresh Deals',
      descAr: 'نقدم عروضاً جديدة كل يوم لتستمتع بأفضل الأسعار. تابعنا لتكون أول من يعلم بالعروض الجديدة.',
      descEn: 'We offer new deals every day for the best prices. Follow us to be the first to know about new offers.',
      color: '#E63920',
    },
    {
      iconEl: <Heart size={24} className="text-[#FFB703]" />,
      titleAr: 'وجبات عائلية',
      titleEn: 'Family Bundles',
      descAr: 'وجبات كبيرة تكفي العائلة بأكملها بسعر مناسب. اجمع أحبائك حول طاولة PizzaZone.',
      descEn: 'Large meals for the whole family at great prices. Gather your loved ones around the PizzaZone table.',
      color: '#FFB703',
    },
    {
      iconEl: <Award size={24} className="text-[#25D366]" />,
      titleAr: 'توفير حقيقي',
      titleEn: 'Real Savings',
      descAr: 'وفّر حتى 40% من السعر الأصلي مع عروضنا الحصرية. كل ريال يُحسب!',
      descEn: 'Save up to 40% off the original price with our exclusive offers. Every penny counts!',
      color: '#25D366',
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FFB703]/10 rounded-full blur-[180px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#FFB703]/15 text-[#FFB703] border border-[#FFB703]/30 animate-pulse">
            <Tag size={14} />
            <span>{locale === 'ar' ? 'عروض حصرية' : 'Exclusive Deals'}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#F7F4EF] tracking-tight leading-tight">
            {locale === 'ar' ? 'عروض وخصومات لا تُقاوم' : 'Irresistible Deals & Offers'}
          </h1>
          <p className="text-base sm:text-lg text-[#A09D95] max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'وجبات متكاملة بأسعار مخفضة لتستمتع بأشهى النكهات مع عائلتك وأصدقائك. عروض محدودة الكمية!'
              : 'Complete feasts at discounted prices to enjoy the finest flavors with family and friends. Limited quantity offers!'}
          </p>
        </div>
      </section>

      {/* Why section */}
      <section className="py-16 bg-[#0A0A0C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#17171A] border border-[#2A2A30] space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                  {item.iconEl}
                </div>
                <h3 className="font-bold text-white text-sm">{locale === 'ar' ? item.titleAr : item.titleEn}</h3>
                <p className="text-xs text-[#A09D95] leading-relaxed">{locale === 'ar' ? item.descAr : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers grid */}
      <section className="py-20 bg-[#0D0D0E] relative overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#FFB703]/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF]">
              {locale === 'ar' ? 'العروض المتوفرة حالياً' : 'Currently Available Offers'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleOffers.map((offer, idx) => {
              const title = locale === 'ar' ? offer.titleAr : offer.titleEn;
              const description = locale === 'ar' ? offer.descriptionAr : offer.descriptionEn;
              const badge = locale === 'ar' ? offer.badgeAr : offer.badgeEn;
              const savings = offer.originalPrice - offer.offerPrice;
              const savingsPercent = Math.round((savings / offer.originalPrice) * 100);

              const orderText = locale === 'ar'
                ? `مرحباً PizzaZone، أود طلب *${title}* بسعر العرض ${formatCurrency(offer.offerPrice, locale, siteSettings.currencyCode)}.`
                : `Hello PizzaZone, I would like to order: *${title}* for ${formatCurrency(offer.offerPrice, locale, siteSettings.currencyCode)}.`;

              const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(orderText)}`;
              const isBestDeal = idx === 0;

              return (
                <div
                  key={offer.id}
                  className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                    isBestDeal
                      ? 'bg-gradient-to-b from-[#2A120F] to-[#17171A] border-2 border-[#E63920] shadow-2xl shadow-[#E63920]/20'
                      : 'bg-[#17171A] border border-[#2A2A30] hover:border-white/20'
                  }`}
                >
                  {/* Best deal ribbon */}
                  {isBestDeal && (
                    <div className="absolute -top-3 start-6 px-4 py-1 rounded-full text-[10px] font-black bg-gradient-to-r from-[#E63920] to-[#FFB703] text-white shadow-lg">
                      {locale === 'ar' ? '⭐ الأكثر طلباً' : '⭐ Most Popular'}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-4 pt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${
                      isBestDeal ? 'bg-[#E63920] text-white' : 'bg-[#FFB703] text-black'
                    }`}>
                      {badge}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#A09D95]">
                      <Clock size={14} className="text-amber-400" />
                      <span>{locale === 'ar' ? 'عرض سارٍ' : 'Limited Time'}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <h3 className="text-xl sm:text-2xl font-black text-[#F7F4EF]">{title}</h3>
                    <p className="text-xs sm:text-sm text-[#A09D95] leading-relaxed">{description}</p>

                    <div className="pt-2 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 size={16} />
                        <span>
                          {locale === 'ar'
                            ? `وفرت ${formatCurrency(savings, locale, siteSettings.currencyCode)} (${savingsPercent}%)`
                            : `You save ${formatCurrency(savings, locale, siteSettings.currencyCode)} (${savingsPercent}%)`}
                        </span>
                      </div>
                    </div>
                  </div>

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
                      <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        -{savingsPercent}%
                      </span>
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
                      <MessageCircle size={16} />
                      <span>{locale === 'ar' ? 'اطلب العرض عبر واتساب' : 'Claim Offer via WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notice */}
          <div className="mt-12 p-6 rounded-2xl bg-[#17171A] border border-[#2A2A30] text-center space-y-2">
            <p className="text-xs text-[#A09D95]">
              {locale === 'ar'
                ? '⚡ العروض محدودة المدة والكمية. الأسعار لا تشمل التوصيل. للاستفسار تواصل معنا عبر الواتساب.'
                : '⚡ Offers are limited in time and quantity. Prices exclude delivery. For inquiries, contact us via WhatsApp.'}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
