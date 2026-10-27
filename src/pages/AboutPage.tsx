'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import PageLayout from '../components/PageLayout';
import { Flame, Clock, Award, Sparkles, ChefHat, Heart, MapPin } from '../components/icons';
import { useRouter } from '../main';

export default function AboutPage() {
  const { locale } = useApp();
  const { navigate } = useRouter();

  const timeline = [
    {
      year: '2019',
      titleAr: 'انطلاقة الفكرة',
      titleEn: 'Idea Conception',
      descAr: 'بدأت الفكرة بتقديم تجربة طعام فريدة تجمع بين أشهى وصفات البيتزا، الفطائر الشرقية المميزة، والسندوتشات الطازجة.',
      descEn: 'The idea began with creating a unique dining experience combining premium pizza, savory fatayer, and fresh sandwiches.',
      icon: <Heart size={20} className="text-[#FFA133]" />,
    },
    {
      year: '2020',
      titleAr: 'افتتاح بيتزا هاوس',
      titleEn: 'Pizza House Grand Opening',
      descAr: 'افتتاح أول فرع لـ بيتزا هاوس (Pizza House) مع أفران متطورة وقائمة أطباق غنية تضم أكثر من 70 صنفاً محبباً.',
      descEn: 'Opening the first Pizza House branch equipped with modern ovens and an extensive menu of over 70 beloved items.',
      icon: <Flame size={20} className="text-[#FFA133]" />,
    },
    {
      year: '2022',
      titleAr: 'تطوير القائمة والأحجام',
      titleEn: 'Menu & Size Expansion',
      descAr: 'إضافة أحجام متعددة (متوسط وكبير) وإطلاق تشكيلة السندوتشات والفطائر الخاصة بالجبن واللحوم الطازجة.',
      descEn: 'Added flexible sizing (Medium & Large) and launched signature fatayer and gourmet sandwich collections.',
      icon: <Sparkles size={20} className="text-[#FFA133]" />,
    },
    {
      year: '2024',
      titleAr: 'الريادة وثقة العملاء',
      titleEn: 'Leadership & Customer Trust',
      descAr: 'أكثر من 50,000 عميل سعيد، وتقديم عروض مستمرة وتخفيضات 20% لتكون بيتزا هاوس الخيار الأول دائماً.',
      descEn: 'Over 50,000 satisfied customers with ongoing special offers and 20% discounts making Pizza House the premier choice.',
      icon: <Award size={20} className="text-[#FFA133]" />,
    },
  ];

  const team = [
    {
      nameAr: 'الشيف أحمد',
      nameEn: 'Chef Ahmed',
      roleAr: 'كبير الطهاة ومطور الوصفات',
      roleEn: 'Head Chef & Recipe Developer',
      descAr: 'خبرة أكثر من 12 عاماً في تحضير العجائن الإيطالية والفطائر الشهية وفق أعلى معايير الجودة والنكهة.',
      descEn: 'Over 12 years of expertise crafting artisanal doughs and savory pies to the highest standards.',
      icon: <ChefHat size={28} className="text-[#FFA133]" />,
    },
    {
      nameAr: 'سارة محمد',
      nameEn: 'Sarah Mohammed',
      roleAr: 'مسؤولة الجودة والمكونات الطازجة',
      roleEn: 'Quality & Fresh Ingredients Lead',
      descAr: 'تشرف يومياً على انتقاء أجود أنواع الأجبان واللحوم والخضار الطازجة بدون أي مواد حافظة.',
      descEn: 'Daily inspection ensuring premium cheeses, fresh meats, and crisp vegetables with zero preservatives.',
      icon: <Award size={28} className="text-[#FFA133]" />,
    },
    {
      nameAr: 'علي حسين',
      nameEn: 'Ali Hussein',
      roleAr: 'مدير العمليات والتوصيل السريع',
      roleEn: 'Operations & Fast Delivery Manager',
      descAr: 'يحرص على تجهيز طلبك بدقة وتوصيله ساخناً وطازجاً في أسرع وقت ممكن.',
      descEn: 'Ensures every order is prepared accurately and delivered piping hot in the shortest possible time.',
      icon: <Clock size={28} className="text-[#FFA133]" />,
    },
  ];

  const values = [
    {
      titleAr: 'مكونات طازجة 100%',
      titleEn: '100% Fresh Ingredients',
      descAr: 'نختار لحومنا وخضرواتنا وأجباننا بعناية يومية فائقة لنضمن لك ولعائلتك وجبة صحية ولذيذة في كل مرة.',
      descEn: 'Carefully chosen meats, veggies, and cheeses every single day to ensure a healthy and delicious meal.',
      icon: <Award size={24} className="text-[#FFA133]" />,
    },
    {
      titleAr: 'عجينة يومية طازجة',
      titleEn: 'Daily Handcrafted Dough',
      descAr: 'تُعجن وتُخمر عجينتنا يومياً بخلطة بيتزا هاوس الخاصة، لتمنحك قرمشة مثالية وطراوة لا تقاوم.',
      descEn: 'Kneaded and proofed daily with Pizza House signature blend for an irresistible crunch and fluffiness.',
      icon: <Clock size={24} className="text-[#FFA133]" />,
    },
    {
      titleAr: 'خبز متقن وحرارة مثالية',
      titleEn: 'Oven-Baked to Perfection',
      descAr: 'أفران حرارية مخصصة تضمن تسوية متجانسة وذوباناً كاملاً للجبنة مع احتفاظ المكونات بكامل نكهتها.',
      descEn: 'Specialized high-heat ovens ensuring uniform bake and perfectly melted mozzarella.',
      icon: <Flame size={24} className="text-[#FFA133]" />,
    },
    {
      titleAr: 'خدمة سريعة ومتقنة',
      titleEn: 'Fast & Attentive Service',
      descAr: 'رضاكم هو أولويتنا القصوى، من لحظة استقبال طلبكم عبر واتساب وحتى وصوله ساخناً إلى بابكم.',
      descEn: 'Your satisfaction is our top priority from your first WhatsApp message to delivery at your door.',
      icon: <Heart size={24} className="text-[#FFA133]" />,
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#0A0A0C]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#FF7A00]/5 rounded-full blur-[160px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#FF7A00]/15 text-[#FFA133] border border-[#FF7A00]/30">
            <ChefHat size={14} />
            <span>{locale === 'ar' ? 'قصتنا وفلسفتنا' : 'Our Story & Philosophy'}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-lalezar text-white tracking-tight leading-tight">
            {locale === 'ar' ? 'بيتزا هاوس | قصة شغف بالطعم الأصيل' : 'Pizza House | A Passion for Authentic Flavor'}
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'رحلة تميز بدأت بتقديم أشهى أصناف البيتزا، الفطائر، والسندوتشات بمكونات طازجة 100% وأسعار تنافسية تلائم الجميع.'
              : 'A journey of excellence serving delicious pizza, fatayer, and sandwiches with 100% fresh ingredients.'}
          </p>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20 bg-[#121214] border-y border-[#1C1C20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-lalezar text-white">
              {locale === 'ar' ? 'قيم ومبادئ بيتزا هاوس' : 'Our Core Values'}
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto">
              {locale === 'ar' ? 'أربعة أركان أساسية تضمن لك تجربة طعام لا تُنسى في كل طلب' : 'Four core pillars ensuring an unforgettable meal every time'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="group p-7 rounded-3xl bg-[#0A0A0C] border border-[#27272A] hover:border-[#FF7A00]/40 transition-all duration-300 hover:-translate-y-2 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:text-black transition-all">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-lalezar text-white">{locale === 'ar' ? v.titleAr : v.titleEn}</h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{locale === 'ar' ? v.descAr : v.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#0A0A0C] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-lalezar text-white">
              {locale === 'ar' ? 'رحلتنا ومحطات النجاح' : 'Our Journey Through the Years'}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line in orange */}
            <div className="absolute start-6 sm:start-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF7A00] via-[#FFA133] to-[#FF7A00]/20"></div>

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 sm:gap-8">
                  {/* Dot */}
                  <div className="relative z-10 w-12 sm:w-16 h-12 sm:h-16 shrink-0 rounded-2xl bg-[#121214] border border-[#FF7A00]/40 flex items-center justify-center text-[#FFA133] shadow-lg">
                    {item.icon}
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-6 rounded-2xl bg-[#121214] border border-[#27272A] hover:border-[#FF7A00]/40 transition-colors space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-black bg-[#FF7A00] px-2.5 py-1 rounded-lg">{item.year}</span>
                      <h3 className="font-lalezar text-xl text-white">{locale === 'ar' ? item.titleAr : item.titleEn}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{locale === 'ar' ? item.descAr : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#121214] border-t border-[#1C1C20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-lalezar text-white">
              {locale === 'ar' ? 'فريق العمل في بيتزا هاوس' : 'Our Dedicated Team'}
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto">
              {locale === 'ar' ? 'نخبة من الطهاة والمشرفين الشغوفين بتقديم أشهى الأطباق لك' : 'Passionate culinary professionals serving you every day'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-[#0A0A0C] border border-[#27272A] hover:border-[#FF7A00]/40 text-center space-y-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-20 h-20 rounded-3xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:text-black transition-all">
                  {member.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-lalezar text-white">{locale === 'ar' ? member.nameAr : member.nameEn}</h3>
                  <span className="text-xs font-semibold text-[#FFA133]">{locale === 'ar' ? member.roleAr : member.roleEn}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{locale === 'ar' ? member.descAr : member.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers showcase */}
      <section className="py-20 bg-[#0A0A0C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { num: '70+', labelAr: 'صنف في القائمة', labelEn: 'Menu Items' },
              { num: '20%', labelAr: 'خصم مستمر', labelEn: 'Ongoing Discount' },
              { num: '50K+', labelAr: 'عميل سعيد', labelEn: 'Happy Customers' },
              { num: '100%', labelAr: 'طازج وطبيعي', labelEn: 'Fresh & Natural' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-3xl bg-[#121214] border border-[#27272A]">
                <span className="text-3xl sm:text-4xl font-black text-[#FFA133]">{stat.num}</span>
                <span className="block text-xs text-[#A1A1AA] mt-2 font-semibold">{locale === 'ar' ? stat.labelAr : stat.labelEn}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('menu')}
              className="px-8 py-3.5 rounded-2xl bg-[#FF7A00] hover:bg-[#FFA133] text-black font-black text-sm transition-all shadow-lg shadow-[#FF7A00]/25 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {locale === 'ar' ? 'تصفح قائمة الطعام الآن' : 'Browse Menu Now'}
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
