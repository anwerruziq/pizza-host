'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Pizza, Tag, MapPin, ArrowRight, ArrowLeft, Sparkles, Award } from './icons';

export default function QuickSections() {
  const { locale } = useApp();
  const { navigate } = useRouter();
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const sections = [
    {
      id: 'menu',
      icon: <Pizza size={32} className="text-[#FFA133]" />,
      titleAr: 'قائمة الطعام',
      titleEn: 'Our Menu',
      descAr: 'استكشف قائمتنا الكاملة: البيتزا اللذيذة، الفطائر الطازجة، السندوتشات الشهية، المشروبات والإضافات مع خصم 20%.',
      descEn: 'Explore our full menu: delicious pizza, fresh fatayer, savory sandwiches, drinks, and extras with 20% off.',
      badgeAr: 'خصم 20%',
      badgeEn: '20% OFF',
    },
    {
      id: 'offers',
      icon: <Tag size={32} className="text-[#FFA133]" />,
      titleAr: 'العروض والخصومات',
      titleEn: 'Deals & Offers',
      descAr: 'عروض حصرية ووجبات عائلية بأسعار مخفضة! وفّر أكثر واستمتع بأشهى النكهات مع عائلتك وأصدقائك.',
      descEn: 'Exclusive deals and family bundles at reduced prices! Save more and enjoy delicious flavors.',
      badgeAr: 'عروض حصرية',
      badgeEn: 'Special Deals',
    },
    {
      id: 'about',
      icon: <Award size={32} className="text-[#FFA133]" />,
      titleAr: 'قصتنا ومبادئنا',
      titleEn: 'Our Story',
      descAr: 'رحلة شغف في بيتزا هاوس. تعرف على سر الخلطات الخاصة والعجينة الطازجة والمكونات الطبيعية 100%.',
      descEn: 'A journey of passion at Pizza House. Discover our secret recipes, fresh dough, and 100% natural ingredients.',
      badgeAr: 'عجينة طازجة',
      badgeEn: 'Fresh Dough',
    },
    {
      id: 'contact',
      icon: <MapPin size={32} className="text-[#FFA133]" />,
      titleAr: 'تواصل معنا والطلب',
      titleEn: 'Contact & Order',
      descAr: 'زورونا أو تواصلوا معنا للطلب المباشر السريع عبر واتساب مع خدمة توصيل سريعة لجميع أحياء المدينة.',
      descEn: 'Visit us or reach out for fast direct orders via WhatsApp with quick delivery across the city.',
      badgeAr: 'توصيل سريع',
      badgeEn: 'Fast Delivery',
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0C] relative overflow-hidden border-t border-[#1C1C20]">
      {/* Background glow in orange */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF7A00]/5 rounded-full blur-[200px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#FF7A00]/15 text-[#FFA133] border border-[#FF7A00]/30">
            <Sparkles size={14} />
            <span>{locale === 'ar' ? 'استكشف بيتزا هاوس' : 'Explore Pizza House'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-lalezar text-white tracking-tight">
            {locale === 'ar' ? 'كل ما تشتهيه في مكان واحد' : 'Everything You Crave in One Place'}
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-lg mx-auto">
            {locale === 'ar'
              ? 'تصفح قائمتنا الكاملة، استفد من عروضنا الخاصة، واطلب مباشرة بكل سهولة'
              : 'Browse our full menu, take advantage of special offers, and order directly with ease'}
          </p>
        </div>

        {/* Section cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => navigate(section.id as any)}
              className="group relative text-start p-7 rounded-3xl bg-[#121214] border border-[#27272A] hover:border-[#FF7A00]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF7A00]/10 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle top corner glow */}
              <div className="absolute -top-16 -end-16 w-36 h-36 bg-[#FF7A00]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF7A00] text-[#FFA133] group-hover:text-black transition-all duration-300">
                    {section.icon}
                  </div>
                  {/* Badge */}
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#1C1C20] text-[#FFA133] border border-[#27272A]">
                    {locale === 'ar' ? section.badgeAr : section.badgeEn}
                  </span>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-lalezar text-white group-hover:text-[#FFA133] transition-colors">
                    {locale === 'ar' ? section.titleAr : section.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-3">
                    {locale === 'ar' ? section.descAr : section.descEn}
                  </p>
                </div>
              </div>

              {/* CTA link */}
              <div className="relative z-10 pt-5 mt-4 border-t border-[#1C1C20] flex items-center gap-2 text-sm font-bold text-[#FFA133] group-hover:text-white transition-colors">
                <span>{locale === 'ar' ? 'استعراض القسم' : 'Explore Section'}</span>
                <Arrow size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
