'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../main';
import { Home, UtensilsCrossed, Gift, Info, Phone } from './icons';

export default function MobileBottomNav() {
  const { locale } = useApp();
  const { route, navigate } = useRouter();
  const isAr = locale === 'ar';

  const tabs = [
    {
      id: 'home',
      labelAr: 'الرئيسية',
      labelEn: 'Home',
      Icon: Home,
    },
    {
      id: 'menu',
      labelAr: 'القائمة',
      labelEn: 'Menu',
      Icon: UtensilsCrossed,
    },
    {
      id: 'offers',
      labelAr: 'العروض',
      labelEn: 'Offers',
      Icon: Gift,
    },
    {
      id: 'about',
      labelAr: 'من نحن',
      labelEn: 'About',
      Icon: Info,
    },
    {
      id: 'contact',
      labelAr: 'تواصل',
      labelEn: 'Contact',
      Icon: Phone,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0C0C0F]/95 backdrop-blur-xl border-t border-[#1F1F24] shadow-[0_-8px_20px_rgba(0,0,0,0.5)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = route === tab.id;
          const IconComp = tab.Icon;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id as any)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 cursor-pointer relative ${
                isActive ? 'text-[#FF7A00]' : 'text-[#71717A] hover:text-[#A1A1AA]'
              }`}
            >
              {/* Active top indicator bar (matching reference design) */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-[#FF7A00] rounded-full shadow-[0_1px_6px_rgba(255,122,0,0.6)]" />
              )}
              <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                <IconComp size={22} />
              </div>
              <span
                className={`text-[10px] mt-1 transition-all ${
                  isActive ? 'font-black text-[#FF7A00]' : 'font-medium text-[#8E8E93]'
                }`}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
