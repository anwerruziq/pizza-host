'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product, PizzaSizeOption, PizzaToppingOption, ProductVariant } from '../types';
import { formatCurrency } from '../lib/formatters';
import {
  X,
  Flame,
  ShieldAlert,
  Check,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Pizza,
  Clock,
  Star,
  Plus,
  Minus,
  Copy,
  Tag,
  ChefHat
} from './icons';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { locale, siteSettings } = useApp();
  const isAr = locale === 'ar';

  // Selected size state (supports sizeOptions or variants)
  const [selectedSizeCode, setSelectedSizeCode] = useState<string>('M');
  // Selected toppings state (Set of topping IDs)
  const [selectedToppings, setSelectedToppings] = useState<Set<string>>(new Set());
  // Quantity state
  const [quantity, setQuantity] = useState<number>(1);
  // Special notes state
  const [notes, setNotes] = useState<string>('');
  // Copy confirmation state
  const [copied, setCopied] = useState<boolean>(false);

  // Reset or initialize when product changes
  useEffect(() => {
    if (product) {
      // Default to Medium if exists, or first option
      if (product.sizeOptions && product.sizeOptions.length > 0) {
        const defaultSize = product.sizeOptions.find((s) => s.code === 'M') || product.sizeOptions[0];
        setSelectedSizeCode(defaultSize.code);
      } else if (product.variants && product.variants.length > 0) {
        const defaultVar = product.variants.find((v) => v.code === 'M') || product.variants[0];
        setSelectedSizeCode(defaultVar.code);
      } else {
        setSelectedSizeCode('BASE');
      }
      setSelectedToppings(new Set());
      setQuantity(1);
      setNotes('');
      setCopied(false);
    }
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Resolve sizes list
  const sizesList: Array<{
    code: string;
    labelAr: string;
    labelEn: string;
    price: number;
    diameterCm?: number;
    slices?: number;
    servingsAr?: string;
    servingsEn?: string;
  }> = useMemo(() => {
    if (!product) return [];

    if (product.sizeOptions && product.sizeOptions.length > 0) {
      return product.sizeOptions.map((s) => {
        let slices = 6;
        let servingsAr = '1-2 أشخاص';
        let servingsEn = '1-2 People';

        if (s.code === 'M') {
          slices = 8;
          servingsAr = '2-3 أشخاص';
          servingsEn = '2-3 People';
        } else if (s.code === 'L') {
          slices = 10;
          servingsAr = '3-4 أشخاص';
          servingsEn = '3-4 People';
        } else if (s.code === 'XL') {
          slices = 12;
          servingsAr = '5-6 أشخاص (عائلي)';
          servingsEn = '5-6 People (Family)';
        }

        return {
          code: s.code,
          labelAr: s.labelAr,
          labelEn: s.labelEn,
          price: s.price,
          diameterCm: s.diameterCm,
          slices,
          servingsAr,
          servingsEn,
        };
      });
    }

    if (product.variants && product.variants.length > 0) {
      return product.variants.map((v) => ({
        code: v.code,
        labelAr: v.labelAr,
        labelEn: v.labelEn,
        price: v.price,
        diameterCm: v.code === 'S' ? 22 : v.code === 'M' ? 28 : 34,
        slices: v.code === 'S' ? 6 : v.code === 'M' ? 8 : 10,
        servingsAr: v.code === 'S' ? '1-2 أشخاص' : v.code === 'M' ? '2-3 أشخاص' : '3-4 أشخاص',
        servingsEn: v.code === 'S' ? '1-2 People' : v.code === 'M' ? '2-3 People' : '3-4 People',
      }));
    }

    // Single default size if no variants
    return [
      {
        code: 'BASE',
        labelAr: 'الحجم القياسي',
        labelEn: 'Standard Size',
        price: product.basePrice,
        slices: 8,
        servingsAr: 'وجبة فردية',
        servingsEn: 'Single Serving',
      },
    ];
  }, [product]);

  // Current selected size object
  const currentSize = useMemo(() => {
    return sizesList.find((s) => s.code === selectedSizeCode) || sizesList[0];
  }, [sizesList, selectedSizeCode]);

  // Related toppings
  const toppingsList: PizzaToppingOption[] = product?.relatedToppings || [];

  // Price calculations
  const baseSizePrice = currentSize ? currentSize.price : (product?.basePrice || 0);

  const selectedToppingsList = useMemo(() => {
    return toppingsList.filter((t) => selectedToppings.has(t.id));
  }, [toppingsList, selectedToppings]);

  const toppingsTotalPrice = useMemo(() => {
    return selectedToppingsList.reduce((sum, item) => sum + item.price, 0);
  }, [selectedToppingsList]);

  const unitTotal = baseSizePrice + toppingsTotalPrice;
  const grandTotal = unitTotal * quantity;

  if (!product) return null;

  const name = isAr ? product.nameAr : product.nameEn;
  const description = isAr ? product.descriptionAr : product.descriptionEn;
  const badge = isAr ? product.badgeAr : product.badgeEn;
  const allergens = isAr ? product.allergensAr : product.allergensEn;

  // Toggle a topping
  const handleToggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) => {
      const next = new Set(prev);
      if (next.has(toppingId)) {
        next.delete(toppingId);
      } else {
        next.add(toppingId);
      }
      return next;
    });
  };

  // Build formatted WhatsApp message
  const sizeName = isAr ? currentSize?.labelAr : currentSize?.labelEn;
  const sizeSpecs = currentSize?.diameterCm ? ` (${currentSize.diameterCm} سم)` : '';

  let messageLines: string[] = [];
  if (isAr) {
    messageLines = [
      `🍕 *طلب جديد من مطعم PizzaZone*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📌 *الصنف:* ${name}`,
      `📏 *الحجم المختار:* ${sizeName}${sizeSpecs} — ${formatCurrency(baseSizePrice, 'ar', siteSettings.currencyCode)}`,
    ];

    if (selectedToppingsList.length > 0) {
      messageLines.push(`✨ *الإضافات المخصصة المختارة:*`);
      selectedToppingsList.forEach((top) => {
        messageLines.push(`   • ${top.nameAr} (+${formatCurrency(top.price, 'ar', siteSettings.currencyCode)})`);
      });
      messageLines.push(`   *مجموع الإضافات:* +${formatCurrency(toppingsTotalPrice, 'ar', siteSettings.currencyCode)}`);
    } else {
      messageLines.push(`✨ *الإضافات:* بدون إضافات إضافية`);
    }

    messageLines.push(`🔢 *الكمية:* ${quantity} × ${formatCurrency(unitTotal, 'ar', siteSettings.currencyCode)}`);

    if (notes.trim()) {
      messageLines.push(`📝 *ملاحظات خاصة:* ${notes.trim()}`);
    }

    messageLines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    messageLines.push(`💰 *المبلغ الإجمالي:* *${formatCurrency(grandTotal, 'ar', siteSettings.currencyCode)}*`);
    messageLines.push(`📍 *التوصيل:* يرجى تزويدي بالوقت المتوقع للتوصيل.`);
  } else {
    messageLines = [
      `🍕 *New Order from PizzaZone*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📌 *Item:* ${name}`,
      `📏 *Selected Size:* ${sizeName}${sizeSpecs} — ${formatCurrency(baseSizePrice, 'en', siteSettings.currencyCode)}`,
    ];

    if (selectedToppingsList.length > 0) {
      messageLines.push(`✨ *Selected Custom Toppings:*`);
      selectedToppingsList.forEach((top) => {
        messageLines.push(`   • ${top.nameEn} (+${formatCurrency(top.price, 'en', siteSettings.currencyCode)})`);
      });
      messageLines.push(`   *Toppings Total:* +${formatCurrency(toppingsTotalPrice, 'en', siteSettings.currencyCode)}`);
    } else {
      messageLines.push(`✨ *Toppings:* None`);
    }

    messageLines.push(`🔢 *Quantity:* ${quantity} × ${formatCurrency(unitTotal, 'en', siteSettings.currencyCode)}`);

    if (notes.trim()) {
      messageLines.push(`📝 *Special Notes:* ${notes.trim()}`);
    }

    messageLines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    messageLines.push(`💰 *Grand Total:* *${formatCurrency(grandTotal, 'en', siteSettings.currencyCode)}*`);
  }

  const orderSummaryText = messageLines.join('\n');
  const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    orderSummaryText
  )}`;

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(orderSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      {/* Click outside backdrop */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-2xl bg-[#17171A] border border-[#2E2E36] rounded-3xl shadow-2xl overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* ── Modal Header Banner ─────────────────────────────────── */}
        <div className="relative bg-gradient-to-br from-[#33110C] via-[#1E1414] to-[#17171A] p-5 sm:p-7 border-b border-white/10 shrink-0">
          {/* Glowing fire ambience */}
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-[#E63920]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 left-10 w-36 h-36 bg-[#FFB703]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 sm:top-5 sm:left-5 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white transition-all cursor-pointer border border-white/10 hover:rotate-90 duration-200 z-20"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header content */}
          <div className="space-y-3 relative z-10 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              {badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#E63920] text-white shadow-lg shadow-[#E63920]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  {badge}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#222227] text-[#FFB703] border border-[#FFB703]/30">
                <Flame className="w-3.5 h-3.5 text-[#E63920]" />
                {isAr ? 'فرن حطب أصلي 450°' : 'Wood-Fired 450°'}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#222227] text-emerald-400 border border-emerald-500/30">
                <Clock className="w-3.5 h-3.5" />
                {isAr ? '15-20 دقيقة' : '15-20 Mins'}
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-[#F7F4EF] leading-tight">
                {name}
              </h2>
              {isAr && product.nameEn && (
                <p className="text-xs sm:text-sm font-medium text-[#A09D95] tracking-wide">
                  {product.nameEn}
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#C5C2BA] leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
        </div>

        {/* ── Scrollable Body ─────────────────────────────────────── */}
        <div className="p-5 sm:p-7 space-y-7 overflow-y-auto flex-1 custom-scrollbar">
          {/* ── Section 1: Choose Size (اختيار الحجم مع السعر المخصص تحته) ── */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-[#F7F4EF] flex items-center gap-2">
                <Pizza className="w-4 h-4 text-[#E63920]" />
                <span>{isAr ? '١. اختر الحجم المناسب' : '1. Select Pizza Size'}</span>
                <span className="text-xs font-normal text-[#E63920]">{isAr ? '(مطلوب)' : '(Required)'}</span>
              </label>
              <span className="text-xs text-[#A09D95]">
                {isAr ? 'السعر محدد تحت كل حجم' : 'Price shown under each size'}
              </span>
            </div>

            {/* Size Cards Grid */}
            <div className={`grid gap-3 ${sizesList.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'}`}>
              {sizesList.map((sizeItem) => {
                const isSelected = selectedSizeCode === sizeItem.code;
                const sizeLabel = isAr ? sizeItem.labelAr : sizeItem.labelEn;
                const servingsLabel = isAr ? sizeItem.servingsAr : sizeItem.servingsEn;

                return (
                  <button
                    key={sizeItem.code}
                    type="button"
                    onClick={() => setSelectedSizeCode(sizeItem.code)}
                    className={`relative p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between items-center group min-h-[115px] ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#E63920]/20 to-[#1F1717] border-[#E63920] text-white shadow-xl shadow-[#E63920]/20 ring-2 ring-[#E63920]/40 scale-[1.02]'
                        : 'bg-[#202026] hover:bg-[#25252D] border-[#2E2E36] text-[#A09D95] hover:border-[#FFB703]/50 hover:text-white'
                    }`}
                  >
                    {/* Selected badge icon */}
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#E63920] text-white flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}

                    {/* Size code avatar */}
                    <div className="space-y-1">
                      <span
                        className={`inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-[#E63920] text-white' : 'bg-[#2A2A33] text-[#A09D95]'
                        }`}
                      >
                        {sizeItem.code}
                      </span>
                      <h4 className={`text-sm sm:text-base font-black ${isSelected ? 'text-white' : 'text-[#F7F4EF]'}`}>
                        {sizeLabel}
                      </h4>
                      {sizeItem.diameterCm && (
                        <p className="text-[11px] text-[#A09D95]">
                          {sizeItem.diameterCm} سم • {sizeItem.slices} قطع
                        </p>
                      )}
                      {servingsLabel && (
                        <p className="text-[10px] text-[#6E6B65]">
                          {servingsLabel}
                        </p>
                      )}
                    </div>

                    {/* Dedicated Price Under Size */}
                    <div className={`mt-2 pt-2 border-t w-full ${isSelected ? 'border-[#E63920]/30' : 'border-white/5'}`}>
                      <span
                        className={`text-sm sm:text-base font-black block tracking-tight ${
                          isSelected ? 'text-[#FFB703]' : 'text-[#F7F4EF]'
                        }`}
                      >
                        {formatCurrency(sizeItem.price, locale, siteSettings.currencyCode)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Section 2: Related Toppings (إضافات مخصصة للصنف المختار) ── */}
          {toppingsList.length > 0 && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black text-[#F7F4EF] flex items-center gap-2">
                  <ChefHat size={16} className="text-[#FFB703]" />
                  <span>
                    {isAr
                      ? `٢. إضافات خاصة بـ ${name}`
                      : `2. Custom Additions for ${name}`}
                  </span>
                  <span className="text-xs font-normal text-[#A09D95]">{isAr ? '(اختياري)' : '(Optional)'}</span>
                </label>

                {selectedToppings.size > 0 && (
                  <span className="text-xs font-bold text-[#FFB703] bg-[#FFB703]/10 px-2.5 py-0.5 rounded-full border border-[#FFB703]/30">
                    {selectedToppings.size} {isAr ? 'إضافات مختارة' : 'Selected'} (+{formatCurrency(toppingsTotalPrice, locale, siteSettings.currencyCode)})
                  </span>
                )}
              </div>

              <p className="text-xs text-[#A09D95]">
                {isAr
                  ? 'اختر الإضافات اللذيذة التي تزيد طعم بيتزاك تميزاً حسب ذوقك:'
                  : 'Select curated toppings designed specifically to enhance this pizza flavor:'}
              </p>

              {/* Toppings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {toppingsList.map((topping) => {
                  const isChecked = selectedToppings.has(topping.id);
                  const toppingTitle = isAr ? topping.nameAr : topping.nameEn;

                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => handleToggleTopping(topping.id)}
                      className={`p-3 rounded-2xl border text-start transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#E63920]/15 border-[#E63920]/80 text-white shadow-md shadow-[#E63920]/10'
                          : 'bg-[#1C1C22] hover:bg-[#23232A] border-[#2A2A33] text-[#A09D95] hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Custom Checkbox */}
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                            isChecked
                              ? 'bg-[#E63920] border-[#E63920] text-white shadow-sm'
                              : 'bg-[#141418] border-[#3A3A44] text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>

                        <div className="min-w-0">
                          <span className={`text-xs sm:text-sm font-bold block truncate ${isChecked ? 'text-white' : 'text-[#F7F4EF]'}`}>
                            {toppingTitle}
                          </span>
                          {isAr && topping.nameEn && (
                            <span className="text-[10px] text-[#807D75] block truncate">
                              {topping.nameEn}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Topping price tag */}
                      <span
                        className={`text-xs font-black px-2 py-1 rounded-lg shrink-0 ${
                          isChecked
                            ? 'bg-[#FFB703]/20 text-[#FFB703] border border-[#FFB703]/40'
                            : 'bg-[#2A2A33] text-[#C5C2BA]'
                        }`}
                      >
                        +{formatCurrency(topping.price, locale, siteSettings.currencyCode)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Section 3: Special Notes (ملاحظات خاصة للمطبخ) ── */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#F7F4EF] flex items-center justify-between">
              <span>{isAr ? '٣. ملاحظات إضافية للمطبخ (اختياري)' : '3. Special Instructions (Optional)'}</span>
              <span className="text-[11px] text-[#A09D95] font-normal">
                {isAr ? 'مثل: بدون بصل، تحمير مقرمش، صوص على جنب' : 'e.g., extra crispy, no onions, sauce on side'}
              </span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                isAr
                  ? 'اكتب أي طلب خاص لتحضير البيتزا بدقة كما تحب...'
                  : 'Write any specific preparation notes for our chef...'
              }
              className="w-full bg-[#1F1F24] border border-[#2E2E36] focus:border-[#E63920] focus:ring-1 focus:ring-[#E63920] rounded-2xl p-3 text-xs sm:text-sm text-[#F7F4EF] placeholder-[#6E6B65] outline-none transition-all resize-none"
            />
          </div>

          {/* ── Allergens Info ── */}
          {allergens && allergens.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-[#222227]/70 border border-[#2A2A30] flex items-start gap-3 text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-[#F7F4EF]">{isAr ? 'تنبيه مسببات الحساسية:' : 'Allergens:'}</span>
                <p className="text-[#A09D95]">{allergens.join(' • ')}</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Modal Footer: Quantity, Live Price, and WhatsApp Ordering ──── */}
        <div className="p-4 sm:p-6 bg-[#121215] border-t border-[#2A2A33] shrink-0 space-y-4">
          {/* Top row: Quantity stepper + Itemized breakdown preview */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-xs font-bold text-[#A09D95]">
                {isAr ? 'الكمية:' : 'Quantity:'}
              </span>
              <div className="flex items-center bg-[#1F1F24] border border-[#2E2E36] rounded-2xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-xl bg-[#282830] hover:bg-[#353540] disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="تقليل الكمية"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-black text-sm text-[#F7F4EF]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-xl bg-[#282830] hover:bg-[#353540] text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="زيادة الكمية"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Price breakdown pill */}
            <div className="text-xs text-[#A09D95] flex items-center gap-2 bg-[#1A1A20] px-3 py-1.5 rounded-xl border border-white/5 w-full sm:w-auto justify-between sm:justify-end">
              <span>
                {sizeName} ({formatCurrency(baseSizePrice, locale, siteSettings.currencyCode)})
              </span>
              {selectedToppings.size > 0 && (
                <span>+ إضافات ({formatCurrency(toppingsTotalPrice, locale, siteSettings.currencyCode)})</span>
              )}
              {quantity > 1 && <span className="font-bold text-white">× {quantity}</span>}
            </div>
          </div>

          {/* Bottom row: Total price & Order Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {/* Total Price Display */}
            <div className="flex flex-col">
              <span className="text-[11px] text-[#A09D95] font-semibold">
                {isAr ? 'المبلغ الإجمالي النهائي' : 'Grand Total'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-[#FFB703] tracking-tight">
                  {formatCurrency(grandTotal, locale, siteSettings.currencyCode)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Copy order button */}
              <button
                type="button"
                onClick={handleCopyOrder}
                className="p-3 sm:px-4 sm:py-3.5 rounded-2xl bg-[#22222A] hover:bg-[#2C2C36] text-[#A09D95] hover:text-white border border-[#2E2E38] transition-all cursor-pointer flex items-center gap-1.5"
                title={isAr ? 'نسخ تفاصيل الطلب' : 'Copy order details'}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="text-xs font-bold hidden sm:inline">
                  {copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}
                </span>
              </button>

              {/* Direct WhatsApp Order Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 sm:px-7 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] shadow-xl shadow-[#25D366]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer text-center"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{isAr ? 'اطلب الآن عبر واتساب' : 'Order via WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
