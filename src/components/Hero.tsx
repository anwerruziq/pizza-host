'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { ArrowLeft, ArrowRight, ArrowUpRight } from './icons';

export default function Hero() {
  const { locale } = useApp();
  const { navigate } = useRouter();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative pt-8 pb-20 md:py-24 overflow-hidden bg-[#0A0A0C]">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 end-1/4 w-[450px] h-[450px] bg-[#FF7A00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle, CTA & Floating Discount Pill (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-start">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-lalezar text-white leading-[1.08] tracking-tight">
                {isAr ? (
                  <>
                    تذوّق أشهى <br />
                    <span className="text-[#FF7A00]">بيتزا على الحطب</span> <br />
                    في بيتزا هاوس
                  </>
                ) : (
                  <>
                    Experience the <br />
                    <span className="text-[#FF7A00]">True Taste</span> <br />
                    of Pizza House
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#A1A1AA] max-w-lg leading-relaxed">
                {isAr
                  ? 'عجينة طازجة يومياً، أجبان فاخرة، ومخبوزة بأفران الحطب 450°C لتستمتع بأشهى طعم مع خصم 20% فوري.'
                  : 'Daily fresh dough, premium cheeses, and wood-fired stone oven perfection with instant 20% discount.'}
              </p>
            </div>

            {/* Simple Primary Button */}
            <div className="pt-1">
              <button
                onClick={() => navigate('menu')}
                className="px-7 py-3 rounded-full bg-[#FF7A00] hover:bg-[#FFA133] text-black font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#FF7A00]/25 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{isAr ? 'استكشف المنيو' : 'Explore Menu'}</span>
                <Arrow className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Pill Card (Exact style from reference design) */}
            <div className="pt-4 max-w-md">
              <div className="bg-[#121214] border border-[#222226] rounded-full p-2.5 sm:p-3 flex items-center justify-between shadow-2xl backdrop-blur-md">
                {/* Left Part: Avatars & Text */}
                <div className="flex items-center gap-3 ps-3">
                  <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
                    <span className="inline-block h-8 w-8 rounded-full ring-2 ring-[#121214] bg-[#FF7A00] text-black font-bold text-xs flex items-center justify-center">
                      ★
                    </span>
                    <span className="inline-block h-8 w-8 rounded-full ring-2 ring-[#121214] bg-zinc-700 text-white font-bold text-[10px] flex items-center justify-center">
                      50k
                    </span>
                    <span className="inline-block h-8 w-8 rounded-full ring-2 ring-[#121214] bg-[#FFA133] text-black font-bold text-[10px] flex items-center justify-center">
                      ✓
                    </span>
                  </div>
                  <div className="flex flex-col text-start">
                    <span className="text-xs font-bold text-white">
                      {isAr ? 'أشهى الأطباق والخصومات' : 'Great Food & Discounts'}
                    </span>
                    <span className="text-[10px] text-[#A1A1AA]">
                      {isAr ? 'أكثر من 50,000 عميل سعيد' : 'Over 50,000 happy customers'}
                    </span>
                  </div>
                </div>

                {/* Divider notch */}
                <div className="h-8 w-px bg-[#27272A] mx-2 hidden sm:block" />

                {/* Right Part: Discount Badge + Round Food Image */}
                <div className="flex items-center gap-3 pe-2">
                  <div className="text-end">
                    <span className="text-base font-black text-[#FF7A00] block leading-none font-lalezar">
                      20%
                    </span>
                    <span className="text-[9px] text-[#A1A1AA] uppercase tracking-wider block">
                      {isAr ? 'خصم متاح' : 'OFF NOW'}
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-full overflow-hidden border border-[#FF7A00]/50 bg-black shrink-0">
                    <img
                      src="/menu/البيتزا/بيتزا هاوس  2300.png"
                      alt="Pizza House"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Round Dish Plate (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            {/* Ambient Radial Spotlight */}
            <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-[#FF7A00]/25 to-transparent blur-3xl pointer-events-none" />

            {/* Circular Plate Container */}
            <div className="relative w-72 sm:w-96 md:w-[420px] aspect-square rounded-full flex items-center justify-center p-4">
              <div className="w-full h-full rounded-full border border-white/5 bg-[#121214]/60 p-6 flex items-center justify-center shadow-2xl backdrop-blur-sm group">
                <img
                  src="/menu/البيتزا/بيتزا هاوس  2300.png"
                  alt="بيتزا هاوس Special"
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] group-hover:scale-105 group-hover:rotate-3 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
