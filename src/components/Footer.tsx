'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Phone, MapPin, Clock } from './icons';

export default function Footer() {
  const { locale, siteSettings } = useApp();
  const { navigate } = useRouter();
  const isAr = locale === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0C] border-t border-[#1C1C20] py-14 text-xs text-[#A1A1AA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Pizza House"
                className="w-9 h-9 object-contain"
              />
              <span className="font-lalezar text-2xl text-white">
                بيتزا <span className="text-[#FF7A00]">هاوس</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#71717A]">
              {isAr
                ? 'أشهى بيتزا حطب، فطائر، وسندوتشات طازجة مع خصم 20%.'
                : 'Authentic wood-fired pizzas, savory pies, and fresh subs with 20% off.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">{isAr ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('menu')}
                  className="hover:text-[#FF7A00] transition-colors cursor-pointer"
                >
                  {isAr ? 'قائمة الطعام' : 'Menu'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('offers')}
                  className="hover:text-[#FF7A00] transition-colors cursor-pointer"
                >
                  {isAr ? 'عروض الخصم 20%' : '20% OFF Deals'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-[#FF7A00] transition-colors cursor-pointer"
                >
                  {isAr ? 'قصتنا وفلسفتنا' : 'Our Story'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-[#FF7A00] transition-colors cursor-pointer"
                >
                  {isAr ? 'تواصل معنا' : 'Contact Us'}
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FF7A00]" />
              <span>{isAr ? 'أوقات العمل' : 'Opening Hours'}</span>
            </h4>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              {isAr ? siteSettings.openHoursAr : siteSettings.openHoursEn}
            </p>
            <p className="text-[11px] text-[#71717A]">
              {isAr ? 'طوال أيام الأسبوع' : 'Open 7 days a week'}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">{isAr ? 'العنوان والطلب' : 'Location & Orders'}</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
                <MapPin className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                <span>{isAr ? siteSettings.addressAr : siteSettings.addressEn}</span>
              </p>
              <p className="flex items-center gap-1.5 text-xs text-white font-semibold">
                <Phone className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                <span>{siteSettings.phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1C1C20] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© {currentYear} {isAr ? 'بيتزا هاوس. جميع الحقوق محفوظة.' : 'Pizza House. All rights reserved.'}</p>
          <div className="flex gap-4">
            <a
              href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF7A00] transition-colors"
            >
              {isAr ? 'طلب عبر واتساب' : 'WhatsApp'}
            </a>
            <span>•</span>
            <span className="text-[#FF7A00] font-semibold">{isAr ? 'خصم 20% متاح الآن' : '20% OFF Active'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
