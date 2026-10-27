'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Flame, Menu, X, Globe, Phone, Sparkles, MessageCircle } from './icons';

export default function Navbar() {
  const { locale, toggleLocale, t, siteSettings } = useApp();
  const { route, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', href: '#hero', label: t.nav.home },
    { id: 'menu', href: '#menu', label: t.nav.menu },
    { id: 'offers', href: '#offers', label: t.nav.offers, isHot: true },
    { id: 'about', href: '#about', label: t.nav.about },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  const handleLinkClick = (routeId: string) => {
    setMobileMenuOpen(false);
    navigate(routeId as any);
  };

  const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    locale === 'ar'
      ? 'مرحباً PizzaZone، أود الاستفسار عن القائمة والطلب.'
      : 'Hello PizzaZone, I would like to inquire about the menu and place an order.'
  )}`;

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-[#8B1A0B] via-[#E63920] to-[#FFB703] text-white py-1.5 px-4 text-xs font-medium text-center relative z-50 shadow-sm flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>
            {locale === 'ar'
              ? 'أفران حطب بدرجة 450°C | عجين مخمر 48 ساعة | توصيل سريع داخل صنعاء'
              : '450°C Wood-Fired Ovens | 48-Hour Fermented Dough | Fast Delivery in Sana\'a'}
          </span>
        </span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 bg-black/25 hover:bg-black/40 px-2 py-0.5 rounded-full transition-colors text-[11px] font-semibold border border-white/20"
        >
          <Phone className="w-2.5 h-2.5" />
          <span>{siteSettings.phone}</span>
        </a>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-2xl backdrop-blur-md bg-[#0D0D0E]/90 border-b border-[#2A2A30]'
            : 'bg-[#0D0D0E]/60 py-4 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none text-start bg-transparent border-0 p-0"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E63920] to-[#FFB703] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#17171A] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <Flame className="w-6 h-6 text-[#E63920] group-hover:text-[#FFB703] transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FFB703] rounded-full blur-[2px] opacity-75"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#F7F4EF] flex items-center gap-1 font-serif">
                Pizza<span className="text-[#E63920]">Zone</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]"></span>
              </span>
              <span className="text-[10px] text-[#A09D95] font-medium tracking-wider uppercase">
                {locale === 'ar' ? 'بيتزا الحطب النابولية' : 'Authentic Wood-Fired'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = route === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
                    isActive
                      ? 'bg-white/10 text-white font-bold border-white/15 shadow-sm'
                      : link.isHot
                      ? 'text-[#FFB703] hover:text-[#FFA200] hover:bg-white/5 border-transparent font-semibold'
                      : 'text-[#A09D95] hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                >
                  {link.label}
                  {link.isHot && (
                    <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-[#E63920]/20 text-[#E63920] border border-[#E63920]/30 flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      {locale === 'ar' ? 'جديد' : 'NEW'}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Lang Switcher & WhatsApp CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#F7F4EF] bg-[#17171A] hover:bg-[#222227] border border-[#2A2A30] transition-colors focus:outline-none cursor-pointer"
              title={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>{locale === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Direct Order WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] shadow-lg shadow-[#25D366]/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{locale === 'ar' ? 'اطلب واتساب' : 'Order via WhatsApp'}</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#F7F4EF] bg-[#17171A] hover:bg-[#222227] border border-[#2A2A30] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#17171A]/95 backdrop-blur-xl border-b border-[#2A2A30] px-4 pt-3 pb-6 space-y-2 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((link) => {
                const isActive = route === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium border text-start cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-white/15 text-white font-bold border-white/20'
                        : link.isHot
                        ? 'bg-[#E63920]/10 text-[#FFB703] border-[#E63920]/20'
                        : 'bg-[#222227]/60 text-[#F7F4EF] hover:bg-[#222227] border-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isHot && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E63920] text-white">
                        🔥
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-center text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{locale === 'ar' ? 'تواصل معنا عبر واتساب للطلب' : 'Order via WhatsApp'}</span>
              </a>
              <div className="flex items-center justify-between text-xs text-[#A09D95] px-1 pt-1">
                <span>{siteSettings.phone}</span>
                <span>{locale === 'ar' ? 'صنعاء، اليمن' : 'Sana\'a, Yemen'}</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
