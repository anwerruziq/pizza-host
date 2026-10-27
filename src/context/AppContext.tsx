'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, SiteSettings, Product } from '../types';
import { defaultSiteSettings } from '../data/sampleData';
import { getDictionary } from '../lib/translations';

interface AppContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: ReturnType<typeof getDictionary>;
  siteSettings: SiteSettings;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');
  const [siteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pizzazone_locale') as Locale | null;
      if (saved && (saved === 'ar' || saved === 'en')) {
        setLocaleState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  // Update HTML dir and lang attributes when locale changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', locale);
    root.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
    try {
      localStorage.setItem('pizzazone_locale', locale);
    } catch {
      // ignore
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = getDictionary(locale);

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        t,
        siteSettings,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
