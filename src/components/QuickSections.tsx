'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Pizza, ChefHat, Tag, MapPin, Flame, ArrowRight, ArrowLeft, Sparkles, Award, MessageCircle } from './icons';

export default function QuickSections() {
  const { locale } = useApp();
  const { navigate } = useRouter();
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const sections = [
    {
      id: 'menu',
      icon: <Pizza size={32} className="text-[#FFB703]" />,
      titleAr: 'قائمة الطعام',
      titleEn: 'Our Menu',
      descAr: 'اكتشف تشكيلتنا الواسعة من البيتزا النابولية، البرغر الفاخر، المقبلات الشهية، والمشروبات المنعشة. أكثر من 30 صنف بانتظارك.',
      descEn: 'Discover our wide selection of Neapolitan pizzas, gourmet burgers, appetizers, and refreshing drinks. Over 30 items await you.',
      color: '#FFB703',
      gradient: 'from-[#FFB703]/20 to-[#E63920]/10',
    },
    {
      id: 'offers',
      icon: <Tag size={32} className="text-[#25D366]" />,
      titleAr: 'العروض والخصومات',
      titleEn: 'Deals & Offers',
      descAr: 'عروض حصرية ووجبات عائلية بأسعار مخفضة! وفّر أكثر واستمتع بأشهى النكهات مع أحبائك. عروض محدودة المدة.',
      descEn: 'Exclusive deals and family bundles at reduced prices! Save more and enjoy delicious flavors with loved ones. Limited time offers.',
      color: '#25D366',
      gradient: 'from-[#25D366]/20 to-[#128C7E]/10',
    },
    {
      id: 'about',
      icon: <Award size={32} className="text-[#A78BFA]" />,
      titleAr: 'قصتنا',
      titleEn: 'Our Story',
      descAr: 'رحلة شغف بدأت من قلب نابولي إلى صنعاء. تعرف على فلسفتنا، فريقنا، وسر العجينة المخمرة 48 ساعة.',
      descEn: 'A passion journey from the heart of Naples to Sana\'a. Learn about our philosophy, team, and the secret of 48-hour fermented dough.',
      color: '#A78BFA',
      gradient: 'from-[#A78BFA]/20 to-[#7C3AED]/10',
    },
    {
      id: 'contact',
      icon: <MapPin size={32} className="text-[#F97316]" />,
      titleAr: 'تواصل معنا',
      titleEn: 'Contact Us',
      descAr: 'زورونا في صنعاء أو تواصلوا معنا عبر الواتساب والهاتف. نسعد بخدمتكم وتلقي استفساراتكم وملاحظاتكم.',
      descEn: 'Visit us in Sana\'a or reach out via WhatsApp and phone. We\'re happy to serve you and receive your inquiries.',
      color: '#F97316',
      gradient: 'from-[#F97316]/20 to-[#EA580C]/10',
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0C] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E63920]/5 rounded-full blur-[200px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E63920]/15 text-[#E63920] border border-[#E63920]/30">
            <Sparkles size={14} />
            <span>{locale === 'ar' ? 'استكشف أقسامنا' : 'Explore Our Sections'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F7F4EF] tracking-tight">
            {locale === 'ar' ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need in One Place'}
          </h2>
          <p className="text-sm sm:text-base text-[#A09D95] max-w-lg mx-auto">
            {locale === 'ar'
              ? 'تنقل بين أقسامنا المتنوعة واستمتع بأشهى النكهات والعروض الحصرية وخدمة التوصيل'
              : 'Navigate through our sections and enjoy authentic flavors, exclusive deals, and fast delivery'}
          </p>
        </div>

        {/* Section cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => navigate(section.id as any)}
              className={`group relative text-start p-7 rounded-3xl bg-gradient-to-br ${section.gradient} border border-[#2A2A30] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden`}
            >
              {/* Hover glow */}
              <div
                className="absolute -top-16 -end-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: section.color }}
              ></div>

              <div className="relative z-10 space-y-5">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${section.color}15` }}
                >
                  {section.icon}
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#F7F4EF] group-hover:text-white transition-colors">
                    {locale === 'ar' ? section.titleAr : section.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A09D95] leading-relaxed line-clamp-3">
                    {locale === 'ar' ? section.descAr : section.descEn}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-bold transition-colors" style={{ color: section.color }}>
                  <span>{locale === 'ar' ? 'استعرض القسم' : 'Explore Section'}</span>
                  <Arrow size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
