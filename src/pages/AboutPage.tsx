'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import PageLayout from '../components/PageLayout';
import { Flame, Clock, Award, Sparkles, ChefHat, Heart, Pizza, MapPin, MessageCircle } from '../components/icons';
import { useRouter } from '../main';

export default function AboutPage() {
  const { locale, t, siteSettings } = useApp();
  const { navigate } = useRouter();

  const timeline = [
    {
      year: '2018',
      titleAr: 'بداية الحلم',
      titleEn: 'The Dream Begins',
      descAr: 'بدأ الشيف أحمد رحلته في تعلم أسرار البيتزا النابولية الأصلية في إيطاليا، حيث تدرب في أشهر مطاعم نابولي.',
      descEn: 'Chef Ahmed began his journey learning the secrets of authentic Neapolitan pizza in Italy, training in Naples\' most famous restaurants.',
      icon: <Heart size={20} className="text-[#E63920]" />,
    },
    {
      year: '2019',
      titleAr: 'استيراد الفرن الحجري',
      titleEn: 'Importing the Stone Oven',
      descAr: 'تم استيراد فرن حجري إيطالي أصلي يعمل على الحطب بدرجة حرارة تصل إلى 450 درجة مئوية، لتقديم أفضل نتيجة ممكنة.',
      descEn: 'An authentic Italian stone oven fueled by wood was imported, reaching 450°C for the perfect bake.',
      icon: <Flame size={20} className="text-[#FFB703]" />,
    },
    {
      year: '2020',
      titleAr: 'افتتاح PizzaZone',
      titleEn: 'PizzaZone Opens',
      descAr: 'افتتاح أول فرع لـ PizzaZone في قلب صنعاء، مع قائمة متنوعة من البيتزا والمأكولات الإيطالية الفاخرة.',
      descEn: 'The first PizzaZone branch opened in the heart of Sana\'a with a diverse menu of pizzas and premium Italian cuisine.',
      icon: <MapPin size={20} className="text-[#25D366]" />,
    },
    {
      year: '2022',
      titleAr: 'التوسع والابتكار',
      titleEn: 'Growth & Innovation',
      descAr: 'إطلاق مصمم البيتزا التفاعلي وإضافة قسم البرغر الفاخر والحلويات الإيطالية. خدمة توصيل سريعة تغطي جميع أحياء صنعاء.',
      descEn: 'Launched the interactive Pizza Builder, added gourmet burger and Italian dessert sections. Fast delivery covering all Sana\'a districts.',
      icon: <Sparkles size={20} className="text-[#A78BFA]" />,
    },
    {
      year: '2024',
      titleAr: 'جائزة أفضل بيتزا',
      titleEn: 'Best Pizza Award',
      descAr: 'حصلنا على جائزة أفضل بيتزا في اليمن، وتجاوز عدد عملائنا 50,000 عميل سعيد ومتكرر.',
      descEn: 'Won the Best Pizza in Yemen award, surpassing 50,000 happy and returning customers.',
      icon: <Award size={20} className="text-[#F97316]" />,
    },
  ];

  const team = [
    {
      nameAr: 'الشيف أحمد',
      nameEn: 'Chef Ahmed',
      roleAr: 'الشيف التنفيذي ومؤسس PizzaZone',
      roleEn: 'Executive Chef & Founder of PizzaZone',
      descAr: 'تدرب في نابولي - إيطاليا لمدة عامين. خبرة 10 سنوات في المطبخ الإيطالي. يؤمن بأن كل بيتزا يجب أن تكون عملاً فنياً.',
      descEn: 'Trained in Naples, Italy for 2 years. 10 years of Italian cuisine experience. Believes every pizza should be a work of art.',
      icon: <ChefHat size={28} className="text-[#FFB703]" />,
    },
    {
      nameAr: 'سارة محمد',
      nameEn: 'Sarah Mohammed',
      roleAr: 'مديرة الجودة والمكونات',
      roleEn: 'Quality & Ingredients Manager',
      descAr: 'تختار أجود المكونات الطازجة يومياً. خبيرة في الجبن الإيطالي والأعشاب الطبيعية.',
      descEn: 'Selects the finest fresh ingredients daily. Expert in Italian cheeses and natural herbs.',
      icon: <Award size={28} className="text-[#25D366]" />,
    },
    {
      nameAr: 'علي حسين',
      nameEn: 'Ali Hussein',
      roleAr: 'مدير العمليات والتوصيل',
      roleEn: 'Operations & Delivery Manager',
      descAr: 'يضمن وصول طلبك ساخناً وطازجاً خلال 30 دقيقة. يدير فريق توصيل من 15 سائق.',
      descEn: 'Ensures your order arrives hot and fresh within 30 minutes. Manages a delivery team of 15 riders.',
      icon: <Clock size={28} className="text-[#E63920]" />,
    },
  ];

  const values = [
    {
      titleAr: 'جودة بلا تنازل',
      titleEn: 'Uncompromising Quality',
      descAr: 'نستخدم فقط أجود المكونات الطبيعية الطازجة. لا مواد حافظة، لا ألوان صناعية، لا نكهات مضافة. كل شيء طبيعي 100%.',
      descEn: 'We use only the finest fresh natural ingredients. No preservatives, no artificial colors, no added flavors. Everything is 100% natural.',
      icon: <Award size={24} className="text-[#25D366]" />,
      color: '#25D366',
    },
    {
      titleAr: 'عجينة مخمرة 48 ساعة',
      titleEn: '48-Hour Fermented Dough',
      descAr: 'سر نكهتنا المميزة يكمن في تخمير العجينة لمدة 48 ساعة كاملة بالطريقة النابولية الأصلية. هذا يمنح البيتزا قواماً هشاً من الخارج وطرياً من الداخل.',
      descEn: 'The secret of our distinctive flavor lies in fermenting the dough for a full 48 hours the authentic Neapolitan way. This gives the pizza a crispy exterior and soft interior.',
      icon: <Clock size={24} className="text-[#FFB703]" />,
      color: '#FFB703',
    },
    {
      titleAr: 'فرن حطب أصلي',
      titleEn: 'Authentic Wood-Fired Oven',
      descAr: 'فرن حجري إيطالي أصلي يعمل بحطب السنديان. درجة حرارة 450°C تطهو البيتزا في 90 ثانية فقط، محافظةً على الرطوبة والنكهة.',
      descEn: 'An authentic Italian stone oven powered by oak wood. 450°C temperature cooks the pizza in just 90 seconds, preserving moisture and flavor.',
      icon: <Flame size={24} className="text-[#E63920]" />,
      color: '#E63920',
    },
    {
      titleAr: 'خدمة استثنائية',
      titleEn: 'Exceptional Service',
      descAr: 'نؤمن بأن تجربة الطعام تبدأ من الترحيب وتنتهي بالابتسامة. فريقنا مدرب على تقديم أفضل خدمة ممكنة لكل عميل.',
      descEn: 'We believe the dining experience starts with a welcome and ends with a smile. Our team is trained to deliver the best service for every customer.',
      icon: <Heart size={24} className="text-[#A78BFA]" />,
      color: '#A78BFA',
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#E63920]/10 rounded-full blur-[180px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FFB703]/8 rounded-full blur-[140px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#E63920]/15 text-[#E63920] border border-[#E63920]/30">
            <ChefHat size={14} />
            <span>{locale === 'ar' ? 'قصتنا وفلسفتنا' : 'Our Story & Philosophy'}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#F7F4EF] tracking-tight leading-tight">
            {locale === 'ar' ? 'من قلب نابولي إلى صنعاء' : 'From the Heart of Naples to Sana\'a'}
          </h1>
          <p className="text-base sm:text-lg text-[#A09D95] max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'رحلة شغف بدأت بحب البيتزا النابولية الأصلية وانتهت بتأسيس أول مطعم متخصص في البيتزا المخبوزة على الحطب في صنعاء'
              : 'A passion journey that began with love for authentic Neapolitan pizza and led to founding the first specialized wood-fired pizza restaurant in Sana\'a'}
          </p>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF]">
              {locale === 'ar' ? 'قيمنا ومبادئنا' : 'Our Core Values'}
            </h2>
            <p className="text-sm text-[#A09D95] max-w-lg mx-auto">
              {locale === 'ar' ? 'أربعة أركان نبني عليها كل بيتزا وكل تجربة طعام' : 'Four pillars we build every pizza and dining experience upon'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="group p-7 rounded-3xl bg-[#17171A] border border-[#2A2A30] hover:border-white/20 transition-all duration-300 hover:-translate-y-2 space-y-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${v.color}15` }}
                >
                  {v.icon}
                </div>
                <h3 className="text-lg font-black text-white">{locale === 'ar' ? v.titleAr : v.titleEn}</h3>
                <p className="text-xs sm:text-sm text-[#A09D95] leading-relaxed">{locale === 'ar' ? v.descAr : v.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#0D0D0E] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#FFB703]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF]">
              {locale === 'ar' ? 'رحلتنا عبر السنوات' : 'Our Journey Through the Years'}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute start-6 sm:start-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E63920] via-[#FFB703] to-[#25D366]"></div>

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 sm:gap-8">
                  {/* Dot */}
                  <div className="relative z-10 w-12 sm:w-16 h-12 sm:h-16 shrink-0 rounded-2xl bg-[#17171A] border border-[#2A2A30] flex items-center justify-center">
                    {item.icon}
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-6 rounded-2xl bg-[#17171A] border border-[#2A2A30] hover:border-white/15 transition-colors space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-[#FFB703] bg-[#FFB703]/15 px-2.5 py-1 rounded-lg">{item.year}</span>
                      <h3 className="font-bold text-white">{locale === 'ar' ? item.titleAr : item.titleEn}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A09D95] leading-relaxed">{locale === 'ar' ? item.descAr : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF]">
              {locale === 'ar' ? 'فريقنا المبدع' : 'Our Creative Team'}
            </h2>
            <p className="text-sm text-[#A09D95] max-w-lg mx-auto">
              {locale === 'ar' ? 'أشخاص شغوفون يقفون خلف كل بيتزا مثالية تصلك' : 'Passionate people behind every perfect pizza that reaches you'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-[#17171A] border border-[#2A2A30] hover:border-white/20 text-center space-y-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#2A120F] to-[#17171A] border border-white/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  {member.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{locale === 'ar' ? member.nameAr : member.nameEn}</h3>
                  <span className="text-xs font-semibold text-[#FFB703]">{locale === 'ar' ? member.roleAr : member.roleEn}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#A09D95] leading-relaxed">{locale === 'ar' ? member.descAr : member.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers showcase */}
      <section className="py-20 bg-[#0D0D0E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { num: '450°C', labelAr: 'حرارة الفرن', labelEn: 'Oven Temp', color: '#E63920' },
              { num: '48h', labelAr: 'تخمير العجين', labelEn: 'Dough Ferment', color: '#FFB703' },
              { num: '50K+', labelAr: 'عميل سعيد', labelEn: 'Happy Clients', color: '#25D366' },
              { num: '90s', labelAr: 'وقت الطهي', labelEn: 'Bake Time', color: '#A78BFA' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-3xl bg-[#17171A] border border-[#2A2A30]">
                <span className="text-3xl sm:text-4xl font-black" style={{ color: stat.color }}>{stat.num}</span>
                <span className="block text-xs text-[#A09D95] mt-2 font-semibold">{locale === 'ar' ? stat.labelAr : stat.labelEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
