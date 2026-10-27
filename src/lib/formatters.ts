import { Locale } from '../types';

/**
 * Format monetary amounts in integer YER or configured currency
 * In Arabic: "4,500 ر.ي"
 * In English: "4,500 YER"
 */
export function formatCurrency(amount: number, locale: Locale = 'ar', currencyCode: string = 'YER'): string {
  // Ensure we round to exact integer minor units
  const cleanAmount = Math.round(amount);
  const formattedNumber = new Intl.NumberFormat(locale === 'ar' ? 'ar-YE' : 'en-US', {
    useGrouping: true,
  }).format(cleanAmount);

  if (locale === 'ar') {
    return `${formattedNumber} ر.ي`;
  }
  return `${formattedNumber} ${currencyCode}`;
}

export function formatNumber(num: number, locale: Locale = 'ar'): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-YE' : 'en-US').format(num);
}

export function formatDate(dateStr: string, locale: Locale = 'ar'): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
}
