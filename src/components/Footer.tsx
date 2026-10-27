'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { ArrowUp, Phone, MapPin, Clock, MessageCircle } from './icons';

export default function Footer() {
  const { locale, siteSettings, t } = useApp();
  const { navigate } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0C] border-t border-[#232328] text-[#9E9EA8] text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Pizza House Logo"
                className="w-12 h-12 rounded-2xl object-contain bg-[#121214] border border-[#232328] p-1"
              />
              <span className="font-lalezar text-2xl text-white tracking-wide">
                بيتزا <span className="text-[#FF7A00]">هاوس</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#9E9EA8] leading-relaxed max-w-sm">
              {locale === 'ar'
                ? 'أشهى بيتزا حطب وفطائر مقرمشة وسندوتشات ساخنة وعصائر طبيعية طازجة. خصم 20% على البيتزا والفطائر والسندوتشات.'
                : 'The finest wood-fired pizza, crispy pies, sizzling sandwiches and fresh juices. 20% OFF on pizzas, pies & sandwiches.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {siteSettings.socials.instagram && (
                <a
                  href={siteSettings.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#121214] hover:bg-[#FF7A00] hover:text-black border border-[#232328] flex items-center justify-center transition-colors cursor-pointer font-bold text-xs"
                  aria-label="Instagram"
                >
                  IG
                </a>
              )}
              {siteSettings.socials.tiktok && (
                <a
                  href={siteSettings.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#121214] hover:bg-[#FF7A00] hover:text-black border border-[#232328] flex items-center justify-center transition-colors cursor-pointer font-bold text-xs"
                  aria-label="TikTok"
                >
                  TT
                </a>
              )}
              {siteSettings.socials.facebook && (
                <a
                  href={siteSettings.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#121214] hover:bg-[#FF7A00] hover:text-black border border-[#232328] flex items-center justify-center transition-colors cursor-pointer font-bold text-xs"
                  aria-label="Facebook"
                >
                  FB
                </a>
              )}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-lalezar text-base text-white tracking-wide">
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('home')}
                  className="hover:text-[#FF7A00] transition-colors cursor-pointer text-start"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('menu')}
                  className="hover:text-[#FF7A00] transition-colors cursor-pointer text-start"
                >
                  {t.nav.menu}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('offers')}
                  className="hover:text-[#FF7A00] transition-colors cursor-pointer text-start"
                >
                  {t.nav.offers}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-[#FF7A00] transition-colors cursor-pointer text-start"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-[#FF7A00] transition-colors cursor-pointer text-start"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-lalezar text-base text-white tracking-wide">
              {locale === 'ar' ? 'ساعات العمل والعنوان' : 'Hours & Location'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <span className="text-white">
                  {locale === 'ar' ? siteSettings.openHoursAr : siteSettings.openHoursEn}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <span>{locale === 'ar' ? siteSettings.addressAr : siteSettings.addressEn}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <span dir="ltr">{siteSettings.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121214] hover:bg-[#FF7A00] hover:text-black text-white text-xs font-bold border border-[#232328] transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'الرجوع إلى الأعلى' : 'Back to Top'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#232328] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7A85]">
          <p>
            © {currentYear} بيتزا هاوس | Pizza House.{' '}
            {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <p className="text-[11px]">
            {locale === 'ar'
              ? 'الصور للتوضيح فقط، قد يختلف الشكل الفعلي.'
              : 'Images are for illustration only, actual appearance may vary.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
