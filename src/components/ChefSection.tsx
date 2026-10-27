'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';

export default function ChefSection() {
  const { locale, siteSettings } = useApp();
  const { navigate } = useRouter();
  const isAr = locale === 'ar';

  return (
    <section className="py-20 md:py-24 bg-[#0A0A0C] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Signature Bracket Title (from reference) */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center px-6 py-2 rounded-full border border-[#FF7A00] text-[#FF7A00] font-bold text-sm sm:text-base tracking-wide bg-[#121214]/50 backdrop-blur-sm">
            {isAr ? '[ طهاتنا وسر النكهة ]' : '[ Meet Our Chefs ]'}
          </div>
        </div>

        {/* Clean Split Capsule Card */}
        <div className="rounded-3xl bg-[#121214] border border-[#222226] p-8 md:p-12 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Visual Icon / Chef Representation */}
            <div className="md:col-span-5 flex items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#FF7A00]/20 via-[#1A1A1E] to-black border border-white/10 flex items-center justify-center shadow-inner overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Pizza House Chef"
                  className="w-32 h-32 object-contain filter drop-shadow-[0_10px_20px_rgba(255,122,0,0.3)]"
                />
              </div>
            </div>

            {/* Concise Story Copy */}
            <div className="md:col-span-7 space-y-4 text-start">
              <h3 className="text-2xl sm:text-3xl font-lalezar text-white">
                {isAr ? 'شغف وإتقان في كل وجبة' : 'Passion & Craft in Every Meal'}
              </h3>

              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                {isAr
                  ? 'يقف طهاتنا وراء كل قرص بيتزا وفطيرة طازجة تخرج من الفرن. نعتمد على العجن اليومي الطبيعي، واستخدام أجود الأجبان واللحوم والخضار الطازجة لتجربة طعام أصيلة ترضي ذوقك.'
                  : 'Our skilled chefs craft every pizza and pie with genuine passion, using daily fresh dough and top quality natural ingredients for an unforgettable taste.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigate('contact')}
                  className="px-6 py-2.5 rounded-full border border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-black font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                >
                  {isAr ? 'تواصل معنا وزيارة الفرع' : 'Visit Our Branch'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
