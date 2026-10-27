'use client';

import React from 'react';
import { useApp } from '../context/AppContext';

export default function TestimonialsSection() {
  const { locale } = useApp();
  const isAr = locale === 'ar';

  const reviews = [
    {
      nameAr: 'محمد العمري',
      nameEn: 'Mohammed Al-Omari',
      roleAr: 'عميل دائم',
      roleEn: 'Regular Customer',
      reviewAr: 'أفضل بيتزا وفطائر في صنعاء بلا منازع، طعم الحطب والجبنة رائع جداً والتوصيل سريع.',
      reviewEn: 'Best wood-fired pizza and fatayer in town. Amazing crust, rich melted cheese, and super fast delivery.',
    },
    {
      nameAr: 'سارة خالد',
      nameEn: 'Sarah Khaled',
      roleAr: 'طلب عائلي',
      roleEn: 'Family Order',
      reviewAr: 'فطيرة سوبر هاوس وبيتزا الدجاج لذيذة جداً، والعجين خفيف وهش. أنصح بها دائماً.',
      reviewEn: 'The Super House pie and chicken pizza are heavenly. Very light dough and generous toppings.',
    },
    {
      nameAr: 'أحمد اليافعي',
      nameEn: 'Ahmed Al-Yafie',
      roleAr: 'عميل معتمد',
      roleEn: 'Verified Client',
      reviewAr: 'الخدمة ممتازة وخصم الـ 20% حقيقي ومميز. السندوتشات والكرسبي مقرمشة وطازجة.',
      reviewEn: 'Great customer service and great value with the 20% discount. Sandwiches are crispy and fresh.',
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-[#0A0A0C] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Signature Bracket Title (from reference) */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center px-6 py-2 rounded-full border border-[#FF7A00] text-[#FF7A00] font-bold text-sm sm:text-base tracking-wide bg-[#121214]/50 backdrop-blur-sm">
            {isAr ? '[ ماذا يقول عملاؤنا؟ ]' : '[ What They Say? ]'}
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#121214] border border-[#222226] p-6 space-y-4 hover:border-[#FF7A00]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C1C20] border border-white/10 flex items-center justify-center font-bold text-sm text-[#FF7A00]">
                  {rev.nameAr.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {isAr ? rev.nameAr : rev.nameEn}
                  </h4>
                  <div className="flex text-[#FF7A00] text-xs">
                    ★★★★★
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                "{isAr ? rev.reviewAr : rev.reviewEn}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
