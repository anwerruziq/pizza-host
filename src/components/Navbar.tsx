import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Flame, Menu, X, Globe, Phone, Sparkles, MessageCircle, Tag } from './icons';

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
    { id: 'home', href: '#hero', label: locale === 'ar' ? 'الرئيسية' : 'Home' },
    { id: 'menu', href: '#menu', label: locale === 'ar' ? 'قائمة الطعام' : 'Menu' },
    { id: 'offers', href: '#offers', label: locale === 'ar' ? 'عروض الخصم 20%' : '20% Deals', isDiscount: true },
    { id: 'about', href: '#about', label: locale === 'ar' ? 'من نحن' : 'About' },
    { id: 'contact', href: '#contact', label: locale === 'ar' ? 'تواصل معنا' : 'Contact' },
  ];

  const handleLinkClick = (routeId: string) => {
    setMobileMenuOpen(false);
    navigate(routeId as any);
  };

  const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    locale === 'ar'
      ? 'مرحباً بيتزا هاوس، أود الاستفسار عن القائمة وطلب وجبة.'
      : 'Hello Pizza House, I would like to inquire about the menu and order.'
  )}`;

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-[#000000] via-[#FF7A00] to-[#000000] text-white py-1.5 px-4 text-xs font-bold text-center relative z-50 shadow-md flex items-center justify-center gap-3 border-b border-[#FF7A00]/20">
        <span className="inline-flex items-center gap-1.5 font-heading text-sm tracking-wide">
          <Tag className="w-4 h-4 text-white animate-pulse" />
          <span>
            {locale === 'ar'
              ? '🔥 عرض خاص: خصم 20% على جميع البيتزا والفطائر والسندوتشات! أفران حطب 450°C'
              : '🔥 Special Offer: 20% OFF on all Pizzas, Fatayer & Sandwiches! Wood-fired 450°C'}
          </span>
        </span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 bg-black/50 hover:bg-black px-2.5 py-0.5 rounded-full transition-colors text-[11px] font-bold border border-white/20 text-[#FFFFFF]"
        >
          <Phone className="w-3 h-3 text-[#FF7A00]" />
          <span>{siteSettings.phone}</span>
        </a>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-2.5 shadow-2xl backdrop-blur-md bg-[#0A0A0C]/95 border-b border-[#26262B]'
            : 'bg-[#0A0A0C]/80 py-3.5 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none text-start bg-transparent border-0 p-0"
          >
            <div className="relative w-12 h-12 rounded-2xl bg-[#141416] p-1 border border-[#FF7A00]/40 shadow-lg group-hover:scale-105 group-hover:border-[#FF7A00] transition-all duration-300 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="بيتزا هاوس Pizza House"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-[#FFFFFF] font-heading tracking-wide flex items-center gap-1">
                بيتزا <span className="text-[#FF7A00]">هاوس</span>
              </span>
              <span className="text-[10px] text-[#A1A1AA] font-bold tracking-widest uppercase">
                PIZZA HOUSE • WOOD-FIRED
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = route === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
                    isActive
                      ? 'bg-[#FF7A00] text-black font-black border-[#FF7A00] shadow-md shadow-[#FF7A00]/25'
                      : link.isDiscount
                      ? 'bg-[#18181B] text-[#FF7A00] border-[#FF7A00]/40 hover:bg-[#FF7A00]/15 hover:border-[#FF7A00]'
                      : 'text-[#D4D4D8] hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isDiscount && (
                    <span className="px-1.5 py-0.2 text-[10px] font-black rounded-md bg-[#FF7A00] text-black shadow-sm">
                      -20%
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#FFFFFF] bg-[#141416] hover:bg-[#1E1E22] border border-[#26262B] hover:border-[#FF7A00]/50 transition-colors focus:outline-none cursor-pointer"
              title={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>{locale === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Direct Order WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] shadow-lg shadow-[#25D366]/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{locale === 'ar' ? 'اطلب واتساب' : 'Order via WhatsApp'}</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#FFFFFF] bg-[#141416] hover:bg-[#1E1E22] border border-[#26262B] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121214]/98 backdrop-blur-xl border-b border-[#26262B] px-4 pt-3 pb-6 space-y-2 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((link) => {
                const isActive = route === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold border text-start cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-[#FF7A00] text-black border-[#FF7A00]'
                        : link.isDiscount
                        ? 'bg-[#FF7A00]/15 text-[#FF7A00] border-[#FF7A00]/30'
                        : 'bg-[#18181B] text-[#FFFFFF] hover:bg-[#202026] border-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isDiscount && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#FF7A00] text-black">
                        -20%
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
                <span>{locale === 'ar' ? 'اطلب فوري عبر واتساب' : 'Order via WhatsApp'}</span>
              </a>
              <div className="flex items-center justify-between text-xs text-[#A1A1AA] px-1 pt-1">
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
