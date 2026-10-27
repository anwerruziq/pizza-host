'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PageLayout from '../components/PageLayout';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Truck,
  HelpCircle,
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
    },
    {
      zoneAr: 'المنطقة الثانية (وسط العاصمة)',
      zoneEn: "Zone 2 (Central Sana'a)",
      areasAr: 'التحرير، الدائري، شارع الزبيري، عصر، الصافية، باب اليمن',
      areasEn: 'Al-Tahreer, Al-Daeri, Al-Zubairi St, Asr, Al-Safia, Bab Al-Yemen',
      timeAr: '30 - 45 دقيقة',
      timeEn: '30 - 45 mins',
      feeAr: '800 ريال',
      feeEn: '800 YER',
      badgeAr: 'منتظم',
      badgeEn: 'Standard',
    },
    {
      zoneAr: 'المنطقة الثالثة (شمال وغرب صنعاء)',
      zoneEn: "Zone 3 (North & West Sana'a)",
      areasAr: 'الحصبة، الجراف، مذبح، شملان، شارع النصر، المطار',
      areasEn: 'Al-Hasaba, Al-Jaraf, Madhbah, Shamlan, Al-Nasr St, Airport',
      timeAr: '40 - 55 دقيقة',
      timeEn: '40 - 55 mins',
      feeAr: '1,200 ريال',
      feeEn: '1,200 YER',
      badgeAr: 'تغطية موسعة',
      badgeEn: 'Extended',
    },
  ];

  const cateringPackages = [
    {
      titleAr: 'باقة اللمة العائلية',
      titleEn: 'Family Gathering Box',
      pizzasAr: '4 بيتزا كبير + 4 فطائر مشكلة + 4 مشروبات غازية باردة مع خصم 20%',
      pizzasEn: '4 Large Pizzas + 4 Assorted Fatayer + 4 Cold Drinks with 20% discount',
      discountAr: 'خصم 20% خاص',
      discountEn: 'Special 20% Off',
    },
    {
      titleAr: 'باقة الأصدقاء والجمعات',
      titleEn: 'Friends & Party Combo',
      pizzasAr: '6 بيتزا وسط أو كبير + 6 سندوتشات كرسبي وشاورما + مشروبات وإضافات مقرمشة',
      pizzasEn: '6 Medium/Large Pizzas + 6 Crispy & Shawarma Sandwiches + Drinks',
      discountAr: 'توفير مميز + توصيل سريع',
      discountEn: 'Special Savings + Fast Delivery',
    },
    {
      titleAr: 'باقة الشركات والمناسبات الكبرى',
      titleEn: 'Corporate & Events Feast',
      pizzasAr: 'تشكيلة مفتوحة من البيتزا والفطائر والسندوتشات الطازجة مع تغليف فاخر مخصص',
      pizzasEn: 'Open selection of pizzas, fatayer, and fresh sandwiches with premium packaging',
      discountAr: 'خصم خاص للكميات',
      discountEn: 'Bulk Discount',
    },
  ];

  const faqs = [
    {
      qAr: 'ما هي طرق الدفع المتاحة في بيتزا هاوس؟',
      qEn: 'What payment methods do you accept at Pizza House?',
      aAr: 'نقبل الدفع نقداً عند الاستلام، بالإضافة إلى المحافظ الإلكترونية اليمنية (فلوسك، جوال الكريمي، محفظة جيب، ون كاش) والتحويل البنكي المباشر.',
      aEn: 'We accept Cash on Delivery as well as Yemeni digital wallets (Floosak, Kuraimi Jawwal, Jaib, OneCash) and direct bank transfers.',
    },
    {
      qAr: 'هل يتوفر لديكم جلسات عائلية في الفرع؟',
      qEn: 'Do you have private family seating at the branch?',
      aAr: 'نعم، يتوفر قسم عائلي واسع ومريح ومستقل مزود بأعلى درجات الخصوصية والتكييف، بالإضافة إلى قسم الشباب والجلسات الجميلة.',
      aEn: 'Yes, we provide a spacious, fully private, air-conditioned family section in addition to outdoor and single seating.',
    },
    {
      qAr: 'هل يمكنني اختيار الحجم والخصم على الأصناف؟',
      qEn: 'Can I choose size and get discounts on items?',
      aAr: 'نعم! جميع أصناف البيتزا والفطائر والسندوتشات متوفرة بحجمين (متوسط وكبير) مع خصم تلقائي 20% على سعر الصنف.',
      aEn: 'Yes! All pizza, fatayer, and sandwich items are available in Medium and Large sizes with an automatic 20% discount applied.',
    },
    {
      qAr: 'كيف تضمنون وصول الطعام ساخناً أثناء التوصيل؟',
      qEn: 'How do you guarantee food arrives hot during delivery?',
      aAr: 'نستخدم حقائب توصيل حرارية معزولة ومصممة خصيصاً للحفاظ على درجة الحرارة والقرمشة من لحظة خروج الطلب من الفرن وحتى بابك.',
      aEn: 'Our drivers utilize specialized multi-layer thermal bags designed to preserve oven temperature and freshness to your door.',
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMessage.trim()) return;

    const subjects: Record<string, { ar: string; en: string }> = {
      general: { ar: 'استفسار عام عن المنيو أو الخدمات', en: 'General Menu or Service Inquiry' },
      order: { ar: 'متابعة طلب / توصيل', en: 'Order / Delivery Follow-up' },
      catering: { ar: 'حجز مناسبة خاصة / حفل', en: 'Special Event / Party Booking' },
      feedback: { ar: 'اقتراح أو ملاحظة', en: 'Feedback / Suggestion' },
      jobs: { ar: 'توظيف وشراكات', en: 'Jobs / Partnerships' },
    };

    const subjectText = isAr ? subjects[formSubject]?.ar : subjects[formSubject]?.en;

    const text = isAr
      ? `مرحباً بيتزا هاوس،\n\n📌 موضوع الرسالة: ${subjectText}\n👤 الاسم: ${formName || 'غير محدد'}\n📞 رقم الهاتف: ${formPhone || 'غير محدد'}\n\n💬 نص الرسالة:\n${formMessage}`
      : `Hello Pizza House,\n\n📌 Subject: ${subjectText}\n👤 Name: ${formName || 'Not specified'}\n📞 Phone: ${formPhone || 'Not specified'}\n\n💬 Message:\n${formMessage}`;

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
      <section className="relative pt-20 sm:pt-28 pb-14 overflow-hidden bg-[#0A0A0C]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FF7A00]/5 rounded-full blur-[180px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#FF7A00]/15 text-[#FFA133] border border-[#FF7A00]/30 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-ping inline-block"></span>
            <span>{isAr ? 'نستقبل طلباتكم الآن في بيتزا هاوس | توصيل سريع' : 'Now Taking Orders | Fast Delivery'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-lalezar text-white tracking-tight leading-tight">
            {isAr ? 'تواصل معنا في بيتزا هاوس نسعد بخدمتكم دائماً' : 'Contact Pizza House | We Value You'}
          </h1>

          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'سواء كنت ترغب في طلب فوري، حجز طاولة، تنظيم حفلة خاصة، أو الاستفسار عن القائمة والخصومات، فريق بيتزا هاوس متواجد لخدمتك طوال أيام الأسبوع'
              : 'Whether you want a quick order, table reservation, event catering, or have an inquiry, our Pizza House crew is ready 7 days a week'}
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 pt-4">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#FFA133]">&lt; 2 دقيقة</span>
              <span className="block text-xs text-[#A1A1AA] mt-1">{isAr ? 'متوسط سرعة الرد' : 'Avg. Response Time'}</span>
            </div>
            <div className="w-px h-10 bg-[#27272A] hidden sm:block"></div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-white">11:00 AM - 1:30 AM</span>
              <span className="block text-xs text-[#A1A1AA] mt-1">{isAr ? 'ساعات العمل اليومية' : 'Daily Working Hours'}</span>
            </div>
            <div className="w-px h-10 bg-[#27272A] hidden sm:block"></div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#FFA133]">صنعاء</span>
              <span className="block text-xs text-[#A1A1AA] mt-1">{isAr ? 'تغطية توصيل شاملة' : 'Full City Delivery'}</span>
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
            className="p-6 rounded-3xl bg-[#121214] hover:bg-[#1A1A1E] border border-[#27272A] hover:border-[#FF7A00]/50 transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/15 text-[#FFA133] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:text-black transition-all">
                <MessageCircle size={28} />
              </div>
              <span className="text-xs text-[#A1A1AA] font-semibold block mb-1">
                {isAr ? 'واتساب مباشر (خدمة عملاء)' : 'Direct WhatsApp'}
              </span>
              <span className="text-lg font-bold text-white group-hover:text-[#FFA133] transition-colors block">
                {siteSettings.whatsapp}
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-[#27272A] flex items-center justify-between text-xs text-[#FFA133] font-bold">
              <span>{isAr ? 'محادثة فورية' : 'Chat Now'}</span>
              <span>→</span>
            </div>
          </a>

          {/* Phone Direct */}
          <a
            href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`}
            className="p-6 rounded-3xl bg-[#121214] hover:bg-[#1A1A1E] border border-[#27272A] hover:border-[#FF7A00]/50 transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/15 text-[#FFA133] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:text-black transition-all">
                <Phone size={28} />
              </div>
              <span className="text-xs text-[#A1A1AA] font-semibold block mb-1">
                {isAr ? 'اتصال هاتفي مباشر' : 'Direct Phone Call'}
              </span>
              <span className="text-lg font-bold text-white group-hover:text-[#FFA133] transition-colors block">
                {siteSettings.phone}
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-[#27272A] flex items-center justify-between text-xs text-[#FFA133] font-bold">
              <span>{isAr ? 'اتصل الآن' : 'Call Now'}</span>
              <span>→</span>
            </div>
          </a>

          {/* Location */}
          <div className="p-6 rounded-3xl bg-[#121214] border border-[#27272A] shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/15 text-[#FFA133] flex items-center justify-center mb-5">
                <MapPin size={28} />
              </div>
              <span className="text-xs text-[#A1A1AA] font-semibold block mb-1">
                {isAr ? 'موقع الفرع الرئيسي' : 'Main Branch Location'}
              </span>
              <span className="text-sm font-bold text-white leading-relaxed block">
                {isAr ? siteSettings.addressAr : siteSettings.addressEn}
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-[#27272A] flex items-center justify-between text-xs text-[#A1A1AA]">
              <span>{isAr ? 'مواقف سيارات متوفرة' : 'Parking Available'}</span>
              <span>📍</span>
            </div>
          </div>

          {/* Hours */}
          <div className="p-6 rounded-3xl bg-[#121214] border border-[#27272A] shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/15 text-[#FFA133] flex items-center justify-center mb-5">
                <Clock size={28} />
              </div>
              <span className="text-xs text-[#A1A1AA] font-semibold block mb-1">
                {isAr ? 'ساعات العمل والاستقبال' : 'Operating Hours'}
              </span>
              <span className="text-sm font-bold text-white leading-relaxed block">
                {isAr ? siteSettings.openHoursAr : siteSettings.openHoursEn}
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-[#27272A] flex items-center justify-between text-xs text-[#FFA133]">
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
          <div className="lg:col-span-7 bg-[#121214] rounded-3xl p-8 sm:p-10 border border-[#27272A] shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FF7A00]/15 text-[#FFA133] border border-[#FF7A00]/30 mb-3">
                  <Send size={13} />
                  <span>{isAr ? 'نموذج المراسلة والطلب' : 'Message & Order Form'}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-lalezar text-white">
                  {isAr ? 'أرسل لنا استفسارك أو طلبك' : 'Send Us an Inquiry or Order'}
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
                  {isAr
                    ? 'املأ النموذج أدناه وسيتم فتح محادثة مباشرة مع خدمة العملاء لخدمتك فوراً'
                    : 'Fill the form below to initiate an instant direct chat with our customer team'}
                </p>
              </div>

              {isSent && (
                <div className="p-4 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[#FFA133] text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 size={20} className="shrink-0 text-[#FF7A00]" />
                  <span>
                    {isAr
                      ? 'تم تجهيز رسالتك وفتح تطبيق واتساب! شكراً لتواصلك مع بيتزا هاوس.'
                      : 'Your message has been formatted and opened in WhatsApp! Thank you for contacting Pizza House.'}
                  </span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white block">
                      {isAr ? 'الاسم الكريم' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={isAr ? 'مثال: محمد' : 'e.g. Mohammed'}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0A0A0C] border border-[#27272A] text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#FF7A00] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white block">
                      {isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder={isAr ? 'مثال: 777 123 456' : 'e.g. 777 123 456'}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0A0A0C] border border-[#27272A] text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#FF7A00] transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white block">
                    {isAr ? 'موضوع الرسالة / نوع الخدمة' : 'Inquiry Type / Service'}
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#0A0A0C] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#FF7A00] transition-colors cursor-pointer"
                  >
                    <option value="general">{isAr ? 'استفسار عام عن المنيو أو الخدمات' : 'General Menu or Service Inquiry'}</option>
                    <option value="order">{isAr ? 'متابعة طلب حالي أو استفسار توصيل' : 'Order Follow-up / Delivery Status'}</option>
                    <option value="catering">{isAr ? 'حجز مناسبة خاصة / حفل عائلي' : 'Special Event / Party Booking'}</option>
                    <option value="feedback">{isAr ? 'تقديم اقتراح أو ملاحظة على الخدمة' : 'Feedback / Suggestion'}</option>
                    <option value="jobs">{isAr ? 'فرص عمل وشراكات أعمال' : 'Jobs & Business Partnerships'}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white block">
                    {isAr ? 'نص الرسالة أو تفاصيل الطلب' : 'Message or Order Details'} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder={
                      isAr
                        ? 'اكتب استفسارك، أو الأصناف التي تود طلبها مع العنوان...'
                        : 'Write your inquiry or the items you wish to order...'
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-[#0A0A0C] border border-[#27272A] text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#FF7A00] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#FF7A00] hover:bg-[#FFA133] text-black font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#FF7A00]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>{isAr ? 'إرسال المحادثة عبر واتساب مباشرة' : 'Send Directly via WhatsApp'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Experience Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#121214] border border-[#27272A] space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/15 text-[#FFA133] flex items-center justify-center">
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-lalezar text-white">{isAr ? 'تجربة الضيافة في بيتزا هاوس' : 'Dine-in Experience'}</h4>
                  <span className="text-xs text-[#A1A1AA]">{isAr ? 'أجواء عائلية راقية ومميزة' : 'Warm Family Ambiance'}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#D4D4D8]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#FFA133] shrink-0" />
                  <span>{isAr ? 'قسم عائلي مستقل ذو خصوصية تامة وتكييف ممتاز' : 'Private family dining section'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#FFA133] shrink-0" />
                  <span>{isAr ? 'أفران بيتزا وفطائر متطورة ومفتوحة أمام الزوار' : 'Live open ovens view'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#FFA133] shrink-0" />
                  <span>{isAr ? 'خدمة سريعة واحترافية واستقبال بشوش' : 'Attentive service & hospitable staff'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#FFA133] shrink-0" />
                  <span>{isAr ? 'خدمة استلام الطلبات الخارجية السريعة (Takeaway)' : 'Fast takeaway pickup station'}</span>
                </div>
              </div>

              {/* Map Action Button */}
              <a
                href="https://maps.google.com/?q=Sanaa+Yemen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-[#0A0A0C] hover:bg-[#1A1A1E] border border-[#27272A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MapPin size={16} className="text-[#FFA133]" />
                <span>{isAr ? 'فتح الموقع في خرائط Google' : 'Open in Google Maps'}</span>
              </a>
            </div>

            {/* Support Guarantee */}
            <div className="p-7 rounded-3xl bg-[#121214] border border-[#27272A] space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-[#FFA133]" />
                <h4 className="text-2xl font-lalezar text-white">{isAr ? 'ضمان الرضا 100%' : '100% Satisfaction Guarantee'}</h4>
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {isAr
                  ? 'في بيتزا هاوس نهتم بأدق التفاصيل لضمان تجربة لا تُنسى. إذا كان لديك أي ملاحظة على طعامك أو سرعة التوصيل، تواصل معنا فوراً وسنقوم بتعويضك وحل المشكلة على الفور.'
                  : 'At Pizza House we care about every detail. If anything is less than perfect with your order, reach out immediately and we will make it right.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones Table */}
      <section className="py-20 bg-[#0A0A0C] border-y border-[#1C1C20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FF7A00]/15 text-[#FFA133] border border-[#FF7A00]/30">
              <Truck size={14} />
              <span>{isAr ? 'شبكة التوصيل السريع' : 'Fast Delivery Network'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-lalezar text-white tracking-tight">
              {isAr ? 'مناطق وأوقات التوصيل في صنعاء' : "Sana'a Delivery Zones & Times"}
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA]">
              {isAr
                ? 'أسطول متكامل من السائقين المجهزين بحقائب حرارية لضمان وصول البيتزا والفطائر ساخنة إلى بابك'
                : 'A dedicated delivery fleet with thermal gear ensuring your meal arrives hot'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryZones.map((zone, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#121214] border border-[#27272A] hover:border-[#FF7A00]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold border bg-[#FF7A00]/15 text-[#FFA133] border-[#FF7A00]/30">
                    {isAr ? zone.badgeAr : zone.badgeEn}
                  </span>
                  <span className="text-sm font-bold text-white">{isAr ? zone.feeAr : zone.feeEn}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-lalezar text-white">{isAr ? zone.zoneAr : zone.zoneEn}</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{isAr ? zone.areasAr : zone.areasEn}</p>
                </div>

                <div className="pt-4 border-t border-[#27272A] flex items-center justify-between text-xs">
                  <span className="text-[#A1A1AA]">{isAr ? 'المدة التقديرية:' : 'Est. Delivery:'}</span>
                  <span className="font-bold text-[#FFA133] flex items-center gap-1">
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
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FF7A00]/15 text-[#FFA133] border border-[#FF7A00]/30">
              <Sparkles size={14} />
              <span>{isAr ? 'الحفلات والمناسبات' : 'Catering & Gatherings'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-lalezar text-white tracking-tight">
              {isAr ? 'باقات خاصة للجمعات والحفلات الكبرى' : 'Special Packages for Events & Parties'}
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA]">
              {isAr
                ? 'اجعل مناسبتك ذكرى لا تُنسى مع أشهى بيتزا، فطائر، وسندوتشات طازجة مع خصم 20%'
                : 'Make your gathering unforgettable with authentic feasts tailored for groups'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cateringPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#0A0A0C] border border-[#27272A] hover:border-[#FF7A00]/40 transition-all duration-300 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FFA133] flex items-center justify-center font-black text-lg">
                    0{idx + 1}
                  </div>
                  <h3 className="text-2xl font-lalezar text-white">{isAr ? pkg.titleAr : pkg.titleEn}</h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {isAr ? pkg.pizzasAr : pkg.pizzasEn}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#27272A] space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FF7A00]/15 text-[#FFA133] border border-[#FF7A00]/30">
                    {isAr ? pkg.discountAr : pkg.discountEn}
                  </span>
                  <a
                    href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      isAr ? `مرحباً بيتزا هاوس، أود الاستفسار عن ${pkg.titleAr}` : `Hello Pizza House, I want to book ${pkg.titleEn}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#121214] hover:bg-[#FF7A00] hover:text-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#27272A]"
                  >
                    <MessageCircle size={14} />
                    <span>{isAr ? 'طلب هذه الباقة عبر واتساب' : 'Order This Package'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact FAQs */}
      <section className="py-20 bg-[#0A0A0C] border-t border-[#1C1C20]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FF7A00]/15 text-[#FFA133] border border-[#FF7A00]/30">
              <HelpCircle size={14} />
              <span>{isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-lalezar text-white">
              {isAr ? 'الأسئلة الأكثر تكراراً' : 'Most Common Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#121214] border border-[#27272A] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 font-bold text-white hover:text-[#FFA133] transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-lalezar">{isAr ? faq.qAr : faq.qEn}</span>
                    <span
                      className={`w-7 h-7 rounded-full bg-[#1C1C20] flex items-center justify-center text-sm shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FFA133]' : 'text-zinc-400'
                      }`}
                    >
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#A1A1AA] leading-relaxed border-t border-[#27272A] pt-4">
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
