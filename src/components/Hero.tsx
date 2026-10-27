'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Flame, Sparkles, ChefHat, Clock, Award, ArrowLeft, ArrowRight, Heart, Tag } from './icons';

export default function Hero() {
  const { locale, t } = useApp();
  const { navigate } = useRouter();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24"
    >
      {/* Background Ambience & Glowing Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E63920]/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#FFB703]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#8B1A0B]/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Subtle radial grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#2A2A30_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17171A] border border-[#E63920]/30 shadow-lg text-xs sm:text-sm font-semibold text-[#FFB703]">
              <span className="flex h-2 w-2 rounded-full bg-[#E63920] animate-ping"></span>
              <Flame className="w-4 h-4 text-[#E63920] fill-[#E63920]" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F7F4EF] leading-[1.15]">
              {locale === 'ar' ? (
                <>
                  بيتزا طازجة <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63920] via-[#FF6B4A] to-[#FFB703]">
                    بطعم لا يُنسى
                  </span>{' '}
                  على الحطب
                </>
              ) : (
                <>
                  Authentic Pizza <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63920] via-[#FF6B4A] to-[#FFB703]">
                    Crafted with Fire
                  </span>{' '}
                  & Passion
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#A09D95] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('menu')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-[#E63920] to-[#C02E18] hover:from-[#FF472A] hover:to-[#E63920] shadow-xl shadow-[#E63920]/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <span>{t.hero.ctaMenu}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('offers')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-[#FFB703] bg-[#17171A] hover:bg-[#222227] border border-[#FFB703]/30 hover:border-[#FFB703] shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <Tag className="w-4 h-4 text-[#FFB703]" />
                <span>{locale === 'ar' ? 'العروض والخصومات' : 'Special Deals'}</span>
              </button>
            </div>

            {/* Trust Highlights Grid */}
            <div className="pt-8 border-t border-[#2A2A30] grid grid-cols-3 gap-3 sm:gap-6 text-center lg:text-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#FFB703]">
                  <Clock className="w-4 h-4" />
                  <span className="font-black text-lg sm:text-xl text-[#F7F4EF]">48h</span>
                </div>
                <span className="text-xs text-[#A09D95] leading-tight">
                  {locale === 'ar' ? 'تخمير طبيعي بطيء' : 'Cold Fermented Dough'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#E63920]">
                  <Flame className="w-4 h-4 fill-current" />
                  <span className="font-black text-lg sm:text-xl text-[#F7F4EF]">450°C</span>
                </div>
                <span className="text-xs text-[#A09D95] leading-tight">
                  {locale === 'ar' ? 'حرارة الحطب الحجري' : 'Volcanic Wood Oven'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-emerald-400">
                  <Award className="w-4 h-4" />
                  <span className="font-black text-lg sm:text-xl text-[#F7F4EF]">100%</span>
                </div>
                <span className="text-xs text-[#A09D95] leading-tight">
                  {locale === 'ar' ? 'مكونات إيطالية أصيلة' : 'Authentic Ingredients'}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Flame Ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#E63920]/30 via-[#FFB703]/20 to-transparent blur-2xl animate-pulse"></div>

            {/* Visual Pizza Hero Mockup */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-[#17171A]/90 border border-white/10 p-6 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center group overflow-hidden">
              {/* Wood oven brick pattern background */}
              <div className="absolute inset-0 bg-radial-gradient opacity-80 pointer-events-none"></div>

              {/* Pizza Visual SVG */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3">
                {/* Crust shadow */}
                <div className="absolute inset-0 rounded-full bg-black/60 blur-xl translate-y-4"></div>

                {/* Wood-fired Crust Outer */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#D9822B] via-[#9E4D15] to-[#5C2908] p-3 shadow-inner relative flex items-center justify-center border-4 border-[#8B3E0C]">
                  {/* Blister char marks */}
                  <span className="absolute top-4 left-12 w-3 h-2 bg-[#261104] rounded-full blur-[0.5px] opacity-80"></span>
                  <span className="absolute bottom-6 right-14 w-4 h-2.5 bg-[#261104] rounded-full blur-[0.5px] opacity-85"></span>
                  <span className="absolute top-1/2 right-2 w-3 h-3 bg-[#261104] rounded-full blur-[0.5px] opacity-90"></span>
                  <span className="absolute top-8 right-16 w-2.5 h-2 bg-[#261104] rounded-full blur-[0.5px] opacity-75"></span>

                  {/* Sauce & Cheese Layer */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFD166] via-[#FFE29A] to-[#F4A261] relative shadow-inner p-4 overflow-hidden border border-[#D97706]/40 flex items-center justify-center">
                    {/* San Marzano Sauce patches */}
                    <div className="absolute inset-2 rounded-full bg-[#C1121F]/80 mix-blend-multiply blur-[2px] opacity-70"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#E63920_15%,transparent_60%)] opacity-60"></div>

                    {/* Pepperoni Slices */}
                    <div className="absolute top-8 left-14 w-11 h-11 rounded-full bg-gradient-to-br from-[#A51D1D] to-[#6E1111] border border-[#520C0C] shadow-md flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#E57373]/30"></span>
                    </div>
                    <div className="absolute top-12 right-12 w-12 h-12 rounded-full bg-gradient-to-br from-[#A51D1D] to-[#6E1111] border border-[#520C0C] shadow-md flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]/30"></span>
                    </div>
                    <div className="absolute bottom-10 left-16 w-12 h-12 rounded-full bg-gradient-to-br from-[#A51D1D] to-[#6E1111] border border-[#520C0C] shadow-md flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#E57373]/30"></span>
                    </div>
                    <div className="absolute bottom-12 right-16 w-11 h-11 rounded-full bg-gradient-to-br from-[#A51D1D] to-[#6E1111] border border-[#520C0C] shadow-md flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#E57373]/30"></span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-[#A51D1D] to-[#6E1111] border border-[#520C0C] shadow-lg flex items-center justify-center">
                      <span className="w-3 h-3 rounded-full bg-[#E57373]/30"></span>
                    </div>

                    {/* Fresh Basil leaves */}
                    <div className="absolute top-16 left-28 w-5 h-7 bg-emerald-600 rounded-[50%_0_50%_0] rotate-45 shadow-sm border border-emerald-400/40"></div>
                    <div className="absolute bottom-20 right-28 w-6 h-8 bg-emerald-600 rounded-[0_50%_0_50%] -rotate-12 shadow-sm border border-emerald-400/40"></div>
                    <div className="absolute top-28 right-16 w-5 h-6 bg-emerald-600 rounded-[50%_0_50%_0] rotate-90 shadow-sm border border-emerald-400/40"></div>

                    {/* Black Olives */}
                    <div className="absolute top-24 left-10 w-4 h-4 rounded-full bg-[#1A1A1A] border-2 border-[#4A4A4A]"></div>
                    <div className="absolute bottom-24 right-10 w-4 h-4 rounded-full bg-[#1A1A1A] border-2 border-[#4A4A4A]"></div>
                    <div className="absolute top-36 left-28 w-4 h-4 rounded-full bg-[#1A1A1A] border-2 border-[#4A4A4A]"></div>

                    {/* Oregano specks */}
                    <span className="absolute top-10 left-20 w-1 h-1 bg-emerald-800 rounded-full"></span>
                    <span className="absolute bottom-14 left-24 w-1 h-1 bg-emerald-800 rounded-full"></span>
                    <span className="absolute top-20 right-24 w-1 h-1 bg-emerald-800 rounded-full"></span>
                  </div>
                </div>
              </div>

              {/* Floating Chef Badge */}
              <div className="absolute -bottom-2 -left-2 bg-[#222227]/95 border border-[#2A2A30] px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-[#E63920]/20 flex items-center justify-center text-[#E63920]">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">
                    {locale === 'ar' ? 'وصفة نابولي الأصلية' : 'Authentic Neapolitan'}
                  </span>
                  <span className="text-[10px] text-[#A09D95]">
                    {locale === 'ar' ? 'طهاة محترفون' : 'Master Pizzaiolos'}
                  </span>
                </div>
              </div>

              {/* Floating Rating Badge */}
              <div className="absolute -top-2 -right-2 bg-[#222227]/95 border border-[#2A2A30] px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 backdrop-blur-md">
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className="text-xs font-bold text-white">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
