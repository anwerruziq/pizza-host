'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Clock, Award, Sparkles, ChefHat } from './icons';

export default function AboutSection() {
  const { locale, t } = useApp();

  return (
    <section id="about" className="py-24 bg-[#0D0D0E] relative overflow-hidden">
      {/* Background radial warmth */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#E63920]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Story Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E63920]/15 text-[#E63920] border border-[#E63920]/30 shadow-md">
              <ChefHat className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'فلسفتنا في الطهي' : 'Our Craft & Heritage'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#F7F4EF] tracking-tight leading-tight">
              {t.about.storyTitle}
            </h2>

            <p className="text-sm sm:text-base text-[#A09D95] leading-relaxed">
              {t.about.storyP1}
            </p>

            <p className="text-sm sm:text-base text-[#A09D95] leading-relaxed">
              {t.about.storyP2}
            </p>

            {/* 3 Pillars */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#17171A] border border-[#2A2A30] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#FFB703]/15 text-[#FFB703] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#F7F4EF]">
                  {t.about.pillars.doughTitle}
                </h4>
                <p className="text-xs text-[#A09D95] leading-normal">
                  {t.about.pillars.doughDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#17171A] border border-[#2A2A30] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#E63920]/15 text-[#E63920] flex items-center justify-center">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <h4 className="font-bold text-sm text-[#F7F4EF]">
                  {t.about.pillars.ovenTitle}
                </h4>
                <p className="text-xs text-[#A09D95] leading-normal">
                  {t.about.pillars.ovenDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#17171A] border border-[#2A2A30] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#F7F4EF]">
                  {t.about.pillars.ingredientsTitle}
                </h4>
                <p className="text-xs text-[#A09D95] leading-normal">
                  {t.about.pillars.ingredientsDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#2E100B] via-[#1A1818] to-[#121214] p-8 border border-[#E63920]/30 shadow-2xl space-y-6 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFB703]/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#FFB703] uppercase tracking-wider">
                  {locale === 'ar' ? 'أرقامنا تفخر بزبائننا' : 'Our Milestone Numbers'}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {locale === 'ar' ? 'فن البيتزا النابولية بالأرقام' : 'Pizza Mastery by the Numbers'}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#121214]/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#A09D95] block">
                      {locale === 'ar' ? 'درجة حرارة الفرن الحجري' : 'Stone Oven Temperature'}
                    </span>
                    <span className="text-2xl font-black text-[#E63920]">450°C</span>
                  </div>
                  <Flame className="w-8 h-8 text-[#E63920] animate-pulse" />
                </div>

                <div className="p-4 rounded-2xl bg-[#121214]/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#A09D95] block">
                      {locale === 'ar' ? 'مدة نضج البيتزا بالفرن' : 'Baking Time Per Pizza'}
                    </span>
                    <span className="text-2xl font-black text-[#FFB703]">90 ثانية</span>
                  </div>
                  <Clock className="w-8 h-8 text-[#FFB703]" />
                </div>

                <div className="p-4 rounded-2xl bg-[#121214]/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#A09D95] block">
                      {locale === 'ar' ? 'محتوى المواد الحافظة' : 'Preservatives & Additives'}
                    </span>
                    <span className="text-2xl font-black text-emerald-400">0% طبيعي</span>
                  </div>
                  <Award className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
