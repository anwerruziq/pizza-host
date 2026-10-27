'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PageLayout from '../components/PageLayout';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  Truck,
  Heart,
  HelpCircle,
  Star,
  ShieldCheck,
  UtensilsCrossed,
} from '../components/icons';
import { useRouter } from '../main';

export default function ContactPage() {
  const { locale, siteSettings, t } = useApp();
  const { navigate } = useRouter();
  const isAr = locale === 'ar';

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('general');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const deliveryZones = [
    {
      zoneAr: 'المنطقة الأولى (المحيط المباشر)',
      zoneEn: 'Zone 1 (Immediate Vicinity)',
      areasAr: 'حدة، السبعين، شارع الستين الجنوبي، الأصبحي، الحي السياسي',
      areasEn: 'Hadda, Al-Sabeen, Southern 60th St, Al-Asbahi, Political District',
      timeAr: '25 - 35 دقيقة',
      timeEn: '25 - 35 mins',
      feeAr: '500 ريال',
      feeEn: '500 YER',
      badgeAr: 'الأسرع',
      badgeEn: 'Fastest',
      color: '#25D366',
    },
    {
      zoneAr: 'المنطقة الثانية (وسط العاصمة)',
      zoneEn: 'Zone 2 (Central Sana\'a)',
      areasAr: 'التحرير، الدائري، شارع الزبيري، عصر، الصافية، باب اليمن',
      areasEn: 'Al-Tahreer, Al-Daeri, Al-Zubairi St, Asr, Al-Safia, Bab Al-Yemen',
      timeAr: '30 - 45 دقيقة',
      timeEn: '30 - 45 mins',
      feeAr: '800 ريال',
      feeEn: '800 YER',
      badgeAr: 'منتظم',
      badgeEn: 'Standard',
      color: '#FFB703',
    },
    {
      zoneAr: 'المنطقة الثالثة (شمال وغرب صنعاء)',
      zoneEn: 'Zone 3 (North & West Sana\'a)',
      areasAr: 'الحصبة، الجراف، مذبح، شملan، شارع النصر، المطار',
      areasEn: 'Al-Hasaba, Al-Jaraf, Madhbah, Shamlan, Al-Nasr St, Airport',
      timeAr: '40 - 55 دقيقة',
      timeEn: '40 - 55 mins',
      feeAr: '1,200 ريال',
      feeEn: '1,200 YER',
      badgeAr: 'تغطية موسعة',
      badgeEn: 'Extended',
      color: '#E63920',
    },
  ];

  const cateringPackages = [
    {
      titleAr: 'باقة أعياد الميلاد والأطفال',
      titleEn: 'Birthday & Kids Party',
      pizzasAr: '6 بيتزا وسط من اختيارك + 3 مقبلات مشكلة + 2 حلويات إيطالية + مشروبات',
      pizzasEn: '6 Medium Pizzas + 3 Mixed Appetizers + 2 Italian Desserts + Drinks',
      discountAr: 'خصم 15% + شموع وزينة مجاناً',
      discountEn: '15% Off + Free Candles & Decor',
      color: '#FFB703',
    },
    {
      titleAr: 'باقة الشركات واجتماعات العمل',
      titleEn: 'Corporate & Office Feast',
      pizzasAr: '12 بيتزا عائلية كبيرة + تشكيلة سلطات إيطالية ومقبلات فاخرة + تغليف فردي راقٍ',
      pizzasEn: '12 Large Family Pizzas + Italian Salads & Starters + Premium Single Packaging',
      discountAr: 'خصم 20% + فواتير ضريبية معتمدة',
      discountEn: '20% Off + Certified Invoices',
      color: '#E63920',
    },
    {
      titleAr: 'باقة الحفلات الكبرى والمناسبات',
      titleEn: 'Grand Gatherings & Events',
      pizzasAr: '25+ بيتزا مخصصة مع شيف ميداني وفرن حطب متنقل للفعاليات الخارجية',
      pizzasEn: '25+ Custom Pizzas with On-site Chef & Mobile Wood-fired Oven',
      discountAr: 'خصم 25% + خدمة تقديم وضيافة متكاملة',
      discountEn: '25% Off + Full Hospitality Crew',
      color: '#25D366',
    },
  ];

  const faqs = [
    {
      qAr: 'ما هي طرق الدفع المتاحة لديكم؟',
      qEn: 'What payment methods do you accept?',
      aAr: 'نقبل الدفع نقداً عند الاستلام، بالإضافة إلى المحافظ الإلكترونية اليمنية (فلوسك، جوال الكريمي، محفظة جيب، ون كاش) والتحويل البنكي المباشر.',
      aEn: 'We accept Cash on Delivery as well as Yemeni digital wallets (Floosak, Kuraimi Jawwal, Jaib, OneCash) and direct bank transfers.',
    },
    {
      qAr: 'هل يتوفر لديكم جلسات عائلية في الفرع؟',
      qEn: 'Do you have private family seating at the restaurant?',
      aAr: 'نعم، يتوفر قسم عائلي واسع ومريح ومستقل مزود بأعلى درجات الخصوصية والتكييف، بالإضافة إلى قسم الشباب والجلسات الخارجية الجميلة.',
      aEn: 'Yes, we provide a spacious, fully private, air-conditioned family section in addition to bachelor and outdoor terrace seating.',
    },
    {
      qAr: 'هل يمكنني حجز طاولة مسبقاً قبل القدوم؟',
      qEn: 'Can I reserve a table in advance?',
      aAr: 'نعم بالتأكيد! يمكنك التواصل معنا عبر الواتساب أو الهاتف لتأكيد حجز طاولتك بالموعد وعدد الأفراد المفضل، خاصة في أوقات الذروة وعطل نهاية الأسبوع.',
      aEn: 'Yes! You can contact us via WhatsApp or phone to reserve your table and specify guest count, especially during peak hours and weekends.',
    },
    {
      qAr: 'كيف تضمنون وصول البيتزا ساخنة أثناء التوصيل؟',
      qEn: 'How do you guarantee pizzas arrive hot during delivery?',
      aAr: 'نستخدم حقائب توصيل حرارية معزولة ومصممة خصيصاً للحفاظ على درجة حرارة البيتزا وقرمشة الحواف من لحظة خروجها من الفرن الحجري وحتى وصولها لباب منزلك.',
      aEn: 'Our drivers utilize specialized multi-layer thermal bags designed to preserve oven temperature and crust crispness from bake to door.',
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMessage.trim()) return;

    const subjects: Record<string, { ar: string; en: string }> = {
      general: { ar: 'استفسار عام', en: 'General Inquiry' },
      order: { ar: 'متابعة طلب / توصيل', en: 'Order / Delivery Follow-up' },
      catering: { ar: 'حجز حفلة أو مناسبة', en: 'Catering / Party Booking' },
      feedback: { ar: 'اقتراح أو ملاحظة', en: 'Feedback / Suggestion' },
      jobs: { ar: 'توظيف وشراكات', en: 'Jobs / Partnerships' },
    };

    const subjectText = isAr ? subjects[formSubject]?.ar : subjects[formSubject]?.en;

    const text = isAr
      ? `مرحباً PizzaZone،\n\n📌 موضوع الرسالة: ${subjectText}\n👤 الاسم: ${formName || 'غير محدد'}\n📞 رقم الهاتف: ${formPhone || 'غير محدد'}\n\n💬 نص الرسالة:\n${formMessage}`
      : `Hello PizzaZone,\n\n📌 Subject: ${subjectText}\n👤 Name: ${formName || 'Not specified'}\n📞 Phone: ${formPhone || 'Not specified'}\n\n💬 Message:\n${formMessage}`;

    const url = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsSent(true);
  };

  const whatsappDirectUrl = `https://wa.me/${siteSettings.whatsapp.replace(
    /[^0-9]/g,
    ''
  )}?text=${encodeURIComponent(t.contact.whatsappPreText)}`;

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 pb-14 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F97316]/10 rounded-full blur-[180px]"></div>
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#E63920]/8 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 shadow-lg shadow-[#25D366]/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping inline-block"></span>
            <span>{isAr ? 'نستقبل طلباتكم الآن | توصيل سريع' : 'Now Taking Orders | Fast Delivery'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#F7F4EF] tracking-tight leading-tight">
            {isAr ? (
              <>
                تواصل معنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FFB703] to-[#E63920]">نسعد بخدمتكم</span>
              </>
            ) : (
              <>
                Contact Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FFB703] to-[#E63920]">We Value You</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#A09D95] max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'سواء كنت ترغب في طلب فوري، حجز طاولة، تنظيم حفلة خاصة، أو تقديم استفسار، فريق PizzaZone متواجد لخدمتك طوال أيام الأسبوع'
              : 'Whether you want a quick order, table reservation, event catering, or have an inquiry, our PizzaZone crew is ready 7 days a week'}
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 pt-4">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#25D366]">&lt; 2 دقيقة</span>
              <span className="block text-xs text-[#A09D95] mt-1">{isAr ? 'متوسط سرعة الرد' : 'Avg. Response Time'}</span>
            </div>
            <div className="w-px h-10 bg-[#2A2A30] hidden sm:block"></div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#FFB703]">11:00 AM - 1:30 AM</span>
              <span className="block text-xs text-[#A09D95] mt-1">{isAr ? 'ساعات العمل اليومية' : 'Daily Working Hours'}</span>
            </div>
            <div className="w-px h-10 bg-[#2A2A30] hidden sm:block"></div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#E63920]">صنعاء</span>
              <span className="block text-xs text-[#A09D95] mt-1">{isAr ? 'تغطية توصيل شاملة' : 'Full City Delivery'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Contact Cards Grid */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* WhatsApp Direct */}
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl bg-[#17171A] hover:bg-[#1C1C20] border border-[#2A2A30] hover:border-[#25D366]/50 transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              <span className="text-xs text-[#A09D95] font-semibold block mb-1">
                {isAr ? 'واتساب مباشر (خدمة عملاء)' : 'Direct WhatsApp'}
              </span>
              <span className="text-lg font-bold text-white group-hover:text-[#25D366] transition-colors block">
                {siteSettings.whatsapp}
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-[#2A2A30] flex items-center justify-between text-xs text-[#25D366] font-bold">
              <span>{isAr ? 'محادثة فورية' : 'Chat Now'}</span>
              <span>→</span>
            </div>
          </a>

          {/* Phone Direct */}
          <a
            href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`}
            className="p-6 rounded-3xl bg-[#17171A] hover:bg-[#1C1C20] border border-[#2A2A30] hover:border-[#FFB703]/50 transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FFB703]/15 text-[#FFB703] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Phone size={28} />
              </div>
              <span className="text-xs text-[#A09D95] font-semibold block mb-1">
                {isAr ? 'اتصال هاتفي مباشر' : 'Direct Phone Call'}
              </span>
              <span className="text-lg font-bold text-white group-hover:text-[#FFB703] transition-colors block">
                {siteSettings.phone}
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-[#2A2A30] flex items-center justify-between text-xs text-[#FFB703] font-bold">
              <span>{isAr ? 'اتصل الآن' : 'Call Now'}</span>
              <span>→</span>
            </div>
          </a>

          {/* Location */}
          <div className="p-6 rounded-3xl bg-[#17171A] border border-[#2A2A30] shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#E63920]/15 text-[#E63920] flex items-center justify-center mb-5">
                <MapPin size={28} />
              </div>
              <span className="text-xs text-[#A09D95] font-semibold block mb-1">
                {isAr ? 'موقع الفرع الرئيسي' : 'Main Branch Location'}
              </span>
              <span className="text-sm font-bold text-white leading-relaxed block">
                {isAr ? siteSettings.addressAr : siteSettings.addressEn}
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-[#2A2A30] flex items-center justify-between text-xs text-[#A09D95]">
              <span>{isAr ? 'مواقف سيارات متوفرة' : 'Parking Available'}</span>
              <span>📍</span>
            </div>
          </div>

          {/* Hours */}
          <div className="p-6 rounded-3xl bg-[#17171A] border border-[#2A2A30] shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#A78BFA]/15 text-[#A78BFA] flex items-center justify-center mb-5">
                <Clock size={28} />
              </div>
              <span className="text-xs text-[#A09D95] font-semibold block mb-1">
                {isAr ? 'ساعات العمل والاستقبال' : 'Operating Hours'}
              </span>
              <span className="text-sm font-bold text-white leading-relaxed block">
                {isAr ? siteSettings.openingHoursAr : siteSettings.openingHoursEn}
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-[#2A2A30] flex items-center justify-between text-xs text-[#25D366]">
              <span>{isAr ? 'طوال أيام الأسبوع' : 'Open 7 Days'}</span>
              <span>✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Form & Restaurant Info Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact & Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#17171A] rounded-3xl p-8 sm:p-10 border border-[#2A2A30] shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E63920]/15 text-[#E63920] border border-[#E63920]/30 mb-3">
                  <Send size={13} />
                  <span>{isAr ? 'نموذج المراسلة والحجز' : 'Message & Booking Form'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isAr ? 'أرسل لنا استفسارك أو حجزك' : 'Send Us an Inquiry or Booking'}
                </h3>
                <p className="text-xs sm:text-sm text-[#A09D95] mt-1">
                  {isAr
                    ? 'املأ النموذج أدناه وسيتم فتح محادثة مباشرة مع خدمة العملاء لخدمتك فوراً'
                    : 'Fill the form below to initiate an instant direct chat with our customer team'}
                </p>
              </div>

              {isSent && (
                <div className="p-4 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 size={20} className="shrink-0" />
                  <span>
                    {isAr
                      ? 'تم تجهيز رسالتك وفتح تطبيق واتساب! شكراً لتواصلك مع PizzaZone.'
                      : 'Your message has been formatted and opened in WhatsApp! Thank you.'}
                  </span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#F7F4EF] block">
                      {isAr ? 'الاسم الكريم' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={isAr ? 'مثال: محمد العمري' : 'e.g. Mohammed'}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0D0D0E] border border-[#2A2A30] text-[#F7F4EF] placeholder-[#A09D95]/50 text-sm focus:outline-none focus:border-[#E63920] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#F7F4EF] block">
                      {isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder={isAr ? 'مثال: 777 123 456' : 'e.g. 777 123 456'}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0D0D0E] border border-[#2A2A30] text-[#F7F4EF] placeholder-[#A09D95]/50 text-sm focus:outline-none focus:border-[#E63920] transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#F7F4EF] block">
                    {isAr ? 'موضوع الرسالة / نوع الخدمة' : 'Inquiry Type / Service'}
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#0D0D0E] border border-[#2A2A30] text-[#F7F4EF] text-sm focus:outline-none focus:border-[#E63920] transition-colors cursor-pointer"
                  >
                    <option value="general">{isAr ? 'استفسار عام عن المنيو أو الخدمات' : 'General Menu or Service Inquiry'}</option>
                    <option value="order">{isAr ? 'متابعة طلب حالي أو استفسار توصيل' : 'Order Follow-up / Delivery Status'}</option>
                    <option value="catering">{isAr ? 'حجز مناسبة خاصة / حفل عيد ميلاد / شركات' : 'Special Event / Birthday / Corporate Booking'}</option>
                    <option value="feedback">{isAr ? 'تقديم اقتراح، شكر، أو ملاحظة على الخدمة' : 'Feedback / Suggestion / Review'}</option>
                    <option value="jobs">{isAr ? 'فرص عمل وشراكات أعمال' : 'Jobs & Business Partnerships'}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#F7F4EF] block">
                    {isAr ? 'نص الرسالة أو تفاصيل الحجز' : 'Message or Reservation Details'} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder={
                      isAr
                        ? 'اكتب استفسارك، أو تاريخ وموعد الحجز، وعدد الأشخاص...'
                        : 'Write your inquiry, or party date, time, and number of guests...'
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-[#0D0D0E] border border-[#2A2A30] text-[#F7F4EF] placeholder-[#A09D95]/50 text-sm focus:outline-none focus:border-[#E63920] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>{isAr ? 'إرسال المحادثة عبر واتساب مباشرة' : 'Send Directly via WhatsApp'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Location & Experience Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Location Card */}
            <div className="p-8 rounded-3xl bg-[#17171A] border border-[#2A2A30] space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E63920]/15 text-[#E63920] flex items-center justify-center">
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{isAr ? 'تجربة الضيافة في الفرع' : 'Dine-in Experience'}</h4>
                  <span className="text-xs text-[#A09D95]">{isAr ? 'أجواء إيطالية دافئة ومميزة' : 'Warm Italian Ambiance'}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#A09D95]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#25D366] shrink-0" />
                  <span>{isAr ? 'قسم عائلي مستقل ذو خصوصية تامة' : 'Private family dining section'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#25D366] shrink-0" />
                  <span>{isAr ? 'فرن حطب إيطالي مفتوح أمام الزوار' : 'Live open wood-fired oven view'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#25D366] shrink-0" />
                  <span>{isAr ? 'موسيقى هادئة وخدمة سريعة واحترافية' : 'Calm music & professional hospitality'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#25D366] shrink-0" />
                  <span>{isAr ? 'خدمة استلام الطلبات الخارجية (Takeaway)' : 'Fast takeaway pickup station'}</span>
                </div>
              </div>

              {/* Map Action Button */}
              <a
                href="https://maps.google.com/?q=Sanaa+Yemen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-[#0D0D0E] hover:bg-[#222227] border border-[#2A2A30] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MapPin size={16} className="text-[#E63920]" />
                <span>{isAr ? 'فتح الموقع في خرائط Google' : 'Open in Google Maps'}</span>
              </a>
            </div>

            {/* Support Guarantee */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-[#17171A] to-[#1F1F24] border border-[#2A2A30] space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-[#FFB703]" />
                <h4 className="text-base font-bold text-white">{isAr ? 'ضمان الرضا 100%' : '100% Satisfaction Guarantee'}</h4>
              </div>
              <p className="text-xs text-[#A09D95] leading-relaxed">
                {isAr
                  ? 'نهتم بأدق التفاصيل لضمان تجربة لا تُنسى. إذا كان لديك أي ملاحظة على طعامك أو سرعة التوصيل، تواصل معنا فوراً وسنقوم بتعويضك وحل المشكلة على الفور.'
                  : 'We care about every detail. If anything is less than perfect with your order or delivery, reach out immediately and we will make it right.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones Table */}
      <section className="py-20 bg-[#121215] border-y border-[#2A2A30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFB703]/15 text-[#FFB703] border border-[#FFB703]/30">
              <Truck size={14} />
              <span>{isAr ? 'شبكة التوصيل السريع' : 'Fast Delivery Network'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF] tracking-tight">
              {isAr ? 'مناطق وأوقات التوصيل في صنعاء' : "Sana'a Delivery Zones & Times"}
            </h2>
            <p className="text-sm sm:text-base text-[#A09D95]">
              {isAr
                ? 'أسطول متكامل من السائقين المجهزين بحقائب حرارية لضمان وصول البيتزا ساخنة إلى بابك'
                : 'A dedicated fleet with thermal gear ensuring your meal arrives steaming hot anywhere in the capital'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryZones.map((zone, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#17171A] border border-[#2A2A30] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-bold border"
                    style={{
                      backgroundColor: `${zone.color}15`,
                      color: zone.color,
                      borderColor: `${zone.color}35`,
                    }}
                  >
                    {isAr ? zone.badgeAr : zone.badgeEn}
                  </span>
                  <span className="text-sm font-bold text-white">{isAr ? zone.feeAr : zone.feeEn}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{isAr ? zone.zoneAr : zone.zoneEn}</h3>
                  <p className="text-xs text-[#A09D95] leading-relaxed">{isAr ? zone.areasAr : zone.areasEn}</p>
                </div>

                <div className="pt-4 border-t border-[#2A2A30] flex items-center justify-between text-xs">
                  <span className="text-[#A09D95]">{isAr ? 'المدة التقديرية:' : 'Est. Delivery:'}</span>
                  <span className="font-bold text-[#FFB703] flex items-center gap-1">
                    <Clock size={13} />
                    <span>{isAr ? zone.timeAr : zone.timeEn}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering & Events Section */}
      <section className="py-20 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E63920]/15 text-[#E63920] border border-[#E63920]/30">
              <Sparkles size={14} />
              <span>{isAr ? 'الحفلات والمناسبات' : 'Catering & Gatherings'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF] tracking-tight">
              {isAr ? 'باقات خاصة للمناسبات والحفلات الكبرى' : 'Special Packages for Events & Parties'}
            </h2>
            <p className="text-sm sm:text-base text-[#A09D95]">
              {isAr
                ? 'اجعل مناسبتك ذكرى لا تُنسى مع أشهى بيتزا نابولية ومقبلات إيطالية تناسب جميع الأذواق'
                : 'Make your gathering unforgettable with authentic Neapolitan feasts tailored for groups'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cateringPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#17171A] border border-[#2A2A30] hover:border-white/20 transition-all duration-300 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg"
                    style={{ backgroundColor: `${pkg.color}20`, color: pkg.color }}
                  >
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white">{isAr ? pkg.titleAr : pkg.titleEn}</h3>
                  <p className="text-xs sm:text-sm text-[#A09D95] leading-relaxed">
                    {isAr ? pkg.pizzasAr : pkg.pizzasEn}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#2A2A30] space-y-3">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${pkg.color}15`, color: pkg.color }}
                  >
                    {isAr ? pkg.discountAr : pkg.discountEn}
                  </span>
                  <a
                    href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      isAr ? `مرحباً PizzaZone، أود الاستفسار عن ${pkg.titleAr}` : `Hello PizzaZone, I want to book ${pkg.titleEn}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#0D0D0E] hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#2A2A30]"
                  >
                    <MessageCircle size={14} />
                    <span>{isAr ? 'احجز هذه الباقة' : 'Book This Package'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact FAQs */}
      <section className="py-20 bg-[#121215] border-t border-[#2A2A30]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#A78BFA]/15 text-[#A78BFA] border border-[#A78BFA]/30">
              <HelpCircle size={14} />
              <span>{isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF]">
              {isAr ? 'الأسئلة الأكثر تكراراً' : 'Most Common Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#17171A] border border-[#2A2A30] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 font-bold text-white hover:text-[#FFB703] transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg">{isAr ? faq.qAr : faq.qEn}</span>
                    <span
                      className={`w-7 h-7 rounded-full bg-[#2A2A30] flex items-center justify-center text-sm shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FFB703]' : ''
                      }`}
                    >
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#A09D95] leading-relaxed border-t border-[#2A2A30]/50 pt-4">
                      {isAr ? faq.aAr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
