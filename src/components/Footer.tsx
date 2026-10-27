'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Flame, ArrowUp, Phone, MapPin, Clock, MessageCircle } from './icons';

export default function Footer() {
  const { locale, siteSettings, t } = useApp();
  const { navigate } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090B] border-t border-[#2A2A30] text-[#A09D95] text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E63920] to-[#FFB703] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#17171A] rounded-[14px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#E63920]" />
                </div>
              </div>
              <span className="text-2xl font-black text-[#F7F4EF] font-serif">
                Pizza<span className="text-[#E63920]">Zone</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A09D95] leading-relaxed max-w-sm">
              {t.footer.brandDesc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {siteSettings.socials.instagram && (
                <a
                  href={siteSettings.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#17171A] hover:bg-[#E63920] hover:text-white border border-[#2A2A30] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Instagram"
                >
                  <span className="font-bold text-xs">IG</span>
                </a>
              )}
              {siteSettings.socials.tiktok && (
                <a
                  href={siteSettings.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#17171A] hover:bg-[#E63920] hover:text-white border border-[#2A2A30] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="TikTok"
                >
                  <span className="font-bold text-xs">TT</span>
                </a>
              )}
              {siteSettings.socials.facebook && (
                <a
                  href={siteSettings.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#17171A] hover:bg-[#E63920] hover:text-white border border-[#2A2A30] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Facebook"
                >
                  <span className="font-bold text-xs">FB</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#F7F4EF] uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {t.nav.menu}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('offers')}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {t.nav.offers}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-bold text-[#F7F4EF] uppercase tracking-wider">
              {t.footer.hoursTitle} & {locale === 'ar' ? 'العنوان' : 'Location'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FFB703] shrink-0 mt-0.5" />
                <span className="text-[#F7F4EF]">
                  {locale === 'ar' ? siteSettings.openingHoursAr : siteSettings.openingHoursEn}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E63920] shrink-0 mt-0.5" />
                <span>{locale === 'ar' ? siteSettings.addressAr : siteSettings.addressEn}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span dir="ltr">{siteSettings.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#17171A] hover:bg-[#222227] text-white text-xs font-semibold border border-[#2A2A30] transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#FFB703]" />
                <span>{locale === 'ar' ? 'الرجوع إلى الأعلى' : 'Back to Top'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#2A2A30] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6B65]">
          <p>
            {t.footer.copyright} {currentYear} {siteSettings.brandName}.{' '}
            {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <p className="text-[11px]">{t.footer.displayNotice}</p>
        </div>
      </div>
    </footer>
  );
}
