'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageCircle, MapPin, Clock, Mail, Send, CheckCircle2 } from './icons';

export default function ContactSection() {
  const { locale, siteSettings, t } = useApp();
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMessage.trim()) return;

    // Build WhatsApp message URL
    const text =
      locale === 'ar'
        ? `مرحباً PizzaZone،\nاسمي: ${formName || 'زبون'}\nرقم الهاتف: ${formPhone || 'غير محدد'}\n\nالرسالة / الاستفسار:\n${formMessage}`
        : `Hello PizzaZone,\nName: ${formName || 'Customer'}\nPhone: ${formPhone || 'Not specified'}\n\nMessage / Inquiry:\n${formMessage}`;

    const url = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsSent(true);
  };

  const whatsappDirectUrl = `https://wa.me/${siteSettings.whatsapp.replace(
    /[^0-9]/g,
    ''
  )}?text=${encodeURIComponent(t.contact.whatsappPreText)}`;

  return (
    <section id="contact" className="py-24 bg-[#0A0A0C] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#E63920]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E63920]/15 text-[#E63920] border border-[#E63920]/30 shadow-md">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.contact.pageTitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF] tracking-tight">
            {locale === 'ar' ? 'نسعد بزيارتكم واستقبال طلباتكم' : 'We Welcome Your Visit & Inquiries'}
          </h2>
          <p className="text-sm sm:text-base text-[#A09D95]">
            {t.contact.pageSubtitle}
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* WhatsApp Direct */}
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl bg-[#17171A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-[#25D366]/50 transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-[#A09D95] font-semibold block mb-1">
                {t.contact.whatsappLabel}
              </span>
              <span className="text-base font-bold text-white group-hover:text-[#25D366] transition-colors">
                {siteSettings.whatsapp}
              </span>
            </div>
          </a>

          {/* Phone Direct */}
          <a
            href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`}
            className="p-6 rounded-3xl bg-[#17171A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-[#FFB703]/50 transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFB703]/15 text-[#FFB703] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-[#A09D95] font-semibold block mb-1">
                {t.contact.phoneLabel}
              </span>
              <span className="text-base font-bold text-white group-hover:text-[#FFB703] transition-colors">
                {siteSettings.phone}
              </span>
            </div>
          </a>

          {/* Location */}
          <div className="p-6 rounded-3xl bg-[#17171A] border border-[#2A2A30] shadow-lg flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#E63920]/15 text-[#E63920] flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-[#A09D95] font-semibold block mb-1">
                {t.contact.addressLabel}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                {locale === 'ar' ? siteSettings.addressAr : siteSettings.addressEn}
              </span>
            </div>
          </div>

          {/* Hours */}
          <div className="p-6 rounded-3xl bg-[#17171A] border border-[#2A2A30] shadow-lg flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-[#A09D95] font-semibold block mb-1">
                {t.contact.hoursLabel}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                {locale === 'ar' ? siteSettings.openingHoursAr : siteSettings.openingHoursEn}
              </span>
            </div>
          </div>
        </div>

        {/* Message Form & Map Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Inquiry Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#17171A] p-7 rounded-3xl border border-[#2A2A30] shadow-xl space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#F7F4EF]">
                {locale === 'ar' ? 'أرسل لنا رسالة أو استفسار' : 'Send Us a Quick Message'}
              </h3>
              <p className="text-xs text-[#A09D95]">
                {locale === 'ar'
                  ? 'سيتم تحويل رسالتك مباشرة إلى فريق خدمة العملاء عبر الواتساب'
                  : 'Your message will be sent directly to our customer care team via WhatsApp'}
              </p>
            </div>

            {isSent && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'تم فتح تطبيق الواتساب لإرسال رسالتك بنجاح!'
                    : 'WhatsApp opened to send your message!'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#A09D95] block mb-1">
                    {locale === 'ar' ? 'الاسم الكريم' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={locale === 'ar' ? 'مثال: محمد الأهدل' : 'e.g. John Doe'}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#222227] text-xs sm:text-sm text-white placeholder-[#6E6B65] border border-[#2A2A30] focus:border-[#E63920] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#A09D95] block mb-1">
                    {locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+967 77..."
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#222227] text-xs sm:text-sm text-white placeholder-[#6E6B65] border border-[#2A2A30] focus:border-[#E63920] focus:outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#A09D95] block mb-1">
                  {locale === 'ar' ? 'الرسالة أو الطلب الخاص' : 'Message or Custom Request'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder={
                    locale === 'ar'
                      ? 'أود الاستفسار عن حجز طاولة، أو تفاصيل مكونات معينة...'
                      : 'I would like to ask about a reservation, or specific ingredients...'
                  }
                  className="w-full py-2.5 px-3.5 rounded-xl bg-[#222227] text-xs sm:text-sm text-white placeholder-[#6E6B65] border border-[#2A2A30] focus:border-[#E63920] focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#E63920] to-[#C02E18] hover:from-[#FF472A] hover:to-[#E63920] shadow-lg shadow-[#E63920]/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{locale === 'ar' ? 'إرسال عبر الواتساب' : 'Send via WhatsApp'}</span>
              </button>
            </form>
          </div>

          {/* Location Map View (6 cols) */}
          <div className="lg:col-span-6 bg-[#17171A] p-7 rounded-3xl border border-[#2A2A30] shadow-xl space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#F7F4EF]">{t.contact.findOnMap}</h3>
              <p className="text-xs text-[#A09D95]">
                {locale === 'ar'
                  ? 'موقعنا في قلب العاصمة صنعاء، شارع الزبيري - تقاطع حدة'
                  : 'Conveniently located in the heart of Sana\'a, Al-Zubairi St - Hadda Intersection'}
              </p>
            </div>

            {/* Embedded Google Map */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#2A2A30] bg-[#121214]">
              <iframe
                title="PizzaZone Restaurant Location"
                src={siteSettings.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter invert-[88%] hue-rotate-180 brightness-90 contrast-90"
              ></iframe>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs text-[#A09D95]">
              <span>{locale === 'ar' ? 'مواقف سيارات متوفرة مجاناً' : 'Free Valet & Customer Parking'}</span>
              <a
                href="https://maps.google.com/?q=Sanaa+Yemen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFB703] hover:underline font-semibold"
              >
                {locale === 'ar' ? 'فتح في خرائط Google' : 'Open in Google Maps'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
