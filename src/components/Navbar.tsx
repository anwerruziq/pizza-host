'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Globe, MessageCircle, MapPin, Clock, Truck } from './icons';

export default function Navbar() {
  const { locale, toggleLocale, siteSettings } = useApp();
  const { route, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const isAr = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: isAr ? 'الرئيسية' : 'Home' },
    { id: 'menu', label: isAr ? 'المنيو' : 'Menu' },
    { id: 'offers', label: isAr ? 'العروض' : 'Offers' },
    { id: 'about', label: isAr ? 'من نحن' : 'About' },
    { id: 'contact', label: isAr ? 'تواصل معنا' : 'Contact' },
  ];

  const handleLinkClick = (routeId: string) => {
    navigate(routeId as any);
  };

  const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    isAr
      ? 'مرحباً بيتزا هاوس، أود طلب وجبة من القائمة.'
      : 'Hello Pizza House, I would like to place an order.'
  )}`;

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* ── Mobile Top Announcement Bar (matching reference design) ── */}
      <div className="md:hidden bg-[#070709] border-b border-[#18181C] text-[10px] text-[#A1A1AA] py-1.5 px-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {/* Location */}
          <div className="flex items-center gap-1 text-[#E4E4E7]">
            <MapPin size={12} className="text-[#FF7A00]" />
            <span className="font-semibold">{isAr ? 'حدة - صنعاء' : 'Hadda - Sana\'a'}</span>
          </div>

          {/* Working Hours */}
          <div className="flex items-center gap-1 text-[9.5px]">
            <Clock size={11} className="text-[#FF7A00]" />
            <span>{isAr ? '11 ص - 2 فجراً' : '11 AM - 2 AM'}</span>
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-1 text-[#FF7A00] font-bold">
            <Truck size={12} />
            <span>{isAr ? 'توصيل سريع' : 'Fast Delivery'}</span>
          </div>
        </div>
      </div>

      {/* ── Main Navbar Container ── */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#1E1E22] shadow-xl py-2 md:py-3'
            : 'bg-[#0A0A0C] py-2.5 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* ── Mobile Floating Pill Navbar (exact reference look) ── */}
          <div className="md:hidden">
            <div className="bg-[#121215]/95 backdrop-blur-lg border border-[#232328] rounded-full px-3 py-1.5 flex items-center justify-between shadow-lg shadow-black/40">
              {/* Brand Logo & Name */}
              <button
                onClick={() => handleLinkClick('home')}
                className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FF7A00]/40 bg-[#0A0A0C] flex items-center justify-center p-0.5">
                  <img
                    src="/logo.png"
                    alt="Pizza House"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-lalezar text-white tracking-wide">
                  بيتزا <span className="text-[#FF7A00]">هاوس</span>
                </span>
              </button>

              {/* Action Buttons: Language toggle + Red/Orange Pill Order Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLocale}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                  title={isAr ? 'English' : 'عربي'}
                  aria-label="Toggle language"
                >
                  <Globe size={15} />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-[#FF7A00] hover:bg-[#FFA133] text-black font-bold text-xs transition-all duration-200 active:scale-95 shadow-md shadow-[#FF7A00]/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>{isAr ? 'اطلب الآن' : 'Order Now'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Desktop Navbar (hidden on mobile) ── */}
          <div className="hidden md:flex items-center justify-between">
            {/* Brand Logo */}
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 cursor-pointer text-start bg-transparent border-0 p-0 focus:outline-none group"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden border border-[#FF7A00]/30 bg-[#121214] flex items-center justify-center p-1 group-hover:border-[#FF7A00] transition-colors">
                <img
                  src="/logo.png"
                  alt="Pizza House Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl sm:text-3xl font-lalezar text-white tracking-wide">
                بيتزا <span className="text-[#FF7A00]">هاوس</span>
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = route === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-sm font-semibold transition-colors cursor-pointer relative py-1 ${
                      isActive ? 'text-[#FF7A00]' : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF7A00] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Button & Language Switcher */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLocale}
                className="p-2 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                title={isAr ? 'English' : 'عربي'}
                aria-label="Toggle language"
              >
                <Globe size={18} />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#FF7A00] hover:bg-[#FFA133] text-black font-bold text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#FF7A00]/20 flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle size={17} />
                <span>{isAr ? 'اطلب الآن' : 'Order Now'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
