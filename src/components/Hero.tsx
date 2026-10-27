import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Flame, Sparkles, ChefHat, Clock, Award, ArrowLeft, ArrowRight, Tag, MessageCircle } from './icons';

export default function Hero() {
  const { locale, siteSettings } = useApp();
  const { navigate } = useRouter();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-[#0A0A0C]"
    >
      {/* Background Ambience & Glowing Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A00]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#FFA133]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#EA580C]/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Subtle radial grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#26262B_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141416] border border-[#FF7A00]/40 shadow-xl text-xs sm:text-sm font-bold text-[#FF7A00]">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF7A00] animate-ping" />
              <Tag className="w-4 h-4 text-[#FF7A00]" />
              <span className="font-heading tracking-wide">
                {locale === 'ar' ? 'عرض خاص: خصم 20% على البيتزا والفطائر والسندوتشات' : 'Special Offer: 20% OFF Pizzas, Pies & Sandwiches'}
              </span>
            </div>

            {/* Headline with Lalezar font */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#FFFFFF] leading-[1.1] font-heading">
              {locale === 'ar' ? (
                <>
                  أهلاً بك في <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFA133] to-[#FFFFFF]">
                    بيتزا هاوس
                  </span>{' '}
                  الأصلية
                </>
              ) : (
                <>
                  Welcome to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFA133] to-[#FFFFFF]">
                    Pizza House
                  </span>{' '}
                  Specialty
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#D4D4D8] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {locale === 'ar'
                ? 'استمتع بأشهى تشكيلة من البيتزا الإيطالية والفطائر المورقة والسندوتشات المقرمشة والمشروبات الطازجة، مخبوزة على الحطب بعناية وبأفضل الأسعار مع خصم 20% فوري!'
                : 'Enjoy our signature wood-fired pizzas, stuffed savory pies, crispy sandwiches and fresh juices with an instant 20% discount!'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('menu')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-black bg-gradient-to-r from-[#FF7A00] to-[#FFA133] hover:from-[#FFA133] hover:to-[#FF7A00] shadow-xl shadow-[#FF7A00]/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-base font-heading tracking-wide"
              >
                <span>{locale === 'ar' ? 'استعرض قائمة الطعام' : 'Explore Menu'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('offers')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-[#FFFFFF] bg-[#141416] hover:bg-[#1E1E22] border border-[#FF7A00]/40 hover:border-[#FF7A00] shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <Tag className="w-4 h-4 text-[#FF7A00]" />
                <span>{locale === 'ar' ? 'عروض الخصم 20%' : '20% OFF Deals'}</span>
              </button>
            </div>

            {/* Trust Highlights Grid */}
            <div className="pt-8 border-t border-[#26262B] grid grid-cols-3 gap-3 sm:gap-6 text-center lg:text-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#FF7A00]">
                  <Tag className="w-5 h-5" />
                  <span className="font-heading text-2xl text-[#FFFFFF]">-20%</span>
                </div>
                <span className="text-xs text-[#A1A1AA] leading-tight">
                  {locale === 'ar' ? 'خصم على البيتزا والفطائر' : 'Discount on Pizza & Pies'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#FF7A00]">
                  <Flame className="w-5 h-5" />
                  <span className="font-heading text-2xl text-[#FFFFFF]">450°C</span>
                </div>
                <span className="text-xs text-[#A1A1AA] leading-tight">
                  {locale === 'ar' ? 'فرن حطب بركاني' : 'Volcanic Wood Oven'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-white">
                  <Award className="w-5 h-5 text-[#FF7A00]" />
                  <span className="font-heading text-2xl text-[#FFFFFF]">70+</span>
                </div>
                <span className="text-xs text-[#A1A1AA] leading-tight">
                  {locale === 'ar' ? 'صنف شهي ومتنوع' : 'Delicious Menu Items'}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card (5 cols) featuring Pizza House Logo */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Flame Ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#FF7A00]/30 via-transparent to-transparent blur-3xl animate-pulse" />

            {/* Visual Logo Card */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-[#121214] border border-[#26262B] p-7 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center group overflow-hidden">
              {/* Radial gradient inside */}
              <div className="absolute inset-0 bg-radial-gradient opacity-90 pointer-events-none" />

              {/* Pizza House Official Logo */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="بيتزا هاوس Pizza House"
                  className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(255,122,0,0.35)]"
                />
              </div>

              {/* Floating Discount Badge */}
              <div className="absolute -bottom-2 -left-2 bg-[#18181B] border border-[#FF7A00]/40 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-[#FF7A00] flex items-center justify-center text-black font-black text-sm">
                  %
                </div>
                <div className="flex flex-col text-start">
                  <span className="text-xs font-black text-white font-heading">
                    {locale === 'ar' ? 'خصم 20% متاح الآن' : '20% OFF Active'}
                  </span>
                  <span className="text-[10px] text-[#A1A1AA]">
                    {locale === 'ar' ? 'على البيتزا والفطائر والسندوتشات' : 'Pizza, Fatayer & Subs'}
                  </span>
                </div>
              </div>

              {/* Floating Rating Badge */}
              <div className="absolute -top-2 -right-2 bg-[#18181B] border border-[#26262B] px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 backdrop-blur-md">
                <span className="text-[#FF7A00] text-sm font-bold">★★★★★</span>
                <span className="text-xs font-black text-white font-heading">4.9 / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
