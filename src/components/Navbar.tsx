'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Menu, X, Globe, MessageCircle } from './icons';

export default function Navbar() {
  const { locale, toggleLocale, siteSettings } = useApp();
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
    { id: 'home', label: locale === 'ar' ? 'الرئيسية' : 'Home' },
    { id: 'menu', label: locale === 'ar' ? 'المنيو' : 'Menu' },
    { id: 'offers', label: locale === 'ar' ? 'العروض' : 'Offers' },
    { id: 'about', label: locale === 'ar' ? 'من نحن' : 'About' },
    { id: 'contact', label: locale === 'ar' ? 'تواصل معنا' : 'Contact' },
  ];

  const handleLinkClick = (routeId: string) => {
    setMobileMenuOpen(false);
    navigate(routeId as any);
  };

  const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    locale === 'ar'
      ? 'مرحباً بيتزا هاوس، أود طلب وجبة من القائمة.'
      : 'Hello Pizza House, I would like to place an order.'
  )}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#1E1E22] shadow-xl'
          : 'py-5 bg-[#0A0A0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 cursor-pointer text-start bg-transparent border-0 p-0 focus:outline-none"
        >
          <img
            src="/logo.png"
            alt="Pizza House Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
          />
          <span className="text-2xl sm:text-3xl font-lalezar text-white tracking-wide">
            بيتزا <span className="text-[#FF7A00]">هاوس</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
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
            title={locale === 'ar' ? 'English' : 'عربي'}
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#FF7A00] hover:bg-[#FFA133] text-black font-bold text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#FF7A00]/20 flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{locale === 'ar' ? 'اطلب الآن' : 'Order Now'}</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white cursor-pointer focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121214] border-b border-[#222226] px-6 py-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-start text-base font-semibold py-1.5 cursor-pointer ${
                  route === link.id ? 'text-[#FF7A00]' : 'text-[#A1A1AA]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#222226]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#FF7A00] text-black font-bold text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{locale === 'ar' ? 'طلب فوري عبر واتساب' : 'Order on WhatsApp'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
