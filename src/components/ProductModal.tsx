import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product, PizzaSizeOption, PizzaToppingOption } from '../types';
import { formatCurrency } from '../lib/formatters';
import {
  X,
  Flame,
  ShieldAlert,
  Check,
  MessageCircle,
  Sparkles,
  Pizza,
  Clock,
  Plus,
  Minus,
  Copy,
  Tag,
  ChefHat
} from './icons';

interface ProductModalProps {
  product?: Product | null;
  onClose?: () => void;
}

export default function ProductModal({ product: propProduct, onClose: propOnClose }: ProductModalProps = {}) {
  const { locale, siteSettings, selectedProduct, setSelectedProduct } = useApp();
  const product = propProduct !== undefined ? propProduct : selectedProduct;
  const onClose = propOnClose ?? (() => setSelectedProduct(null));
  const isAr = locale === 'ar';

  // Selected size code (defaults to 'M' for medium)
  const [selectedSizeCode, setSelectedSizeCode] = useState<string>('M');
  // Selected toppings (Set of topping IDs)
  const [selectedToppings, setSelectedToppings] = useState<Set<string>>(new Set());
  // Quantity
  const [quantity, setQuantity] = useState<number>(1);
  // Special notes
  const [notes, setNotes] = useState<string>('');
  // Copy confirmation
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      if (product.sizeOptions && product.sizeOptions.length > 0) {
        setSelectedSizeCode('M');
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
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const hasSizes = Boolean(product?.sizeOptions && product.sizeOptions.length > 0);
  const sizesList: PizzaSizeOption[] = product?.sizeOptions || [];

  const currentSize = useMemo(() => {
    if (!product || !hasSizes) return null;
    return sizesList.find((s) => s.code === selectedSizeCode) || sizesList[0];
  }, [product, hasSizes, sizesList, selectedSizeCode]);

  const toppingsList: PizzaToppingOption[] = product?.relatedToppings || [];

  const selectedToppingsList = useMemo(() => {
    return toppingsList.filter((t) => selectedToppings.has(t.id));
  }, [toppingsList, selectedToppings]);

  const toppingsTotalPrice = useMemo(() => {
    return selectedToppingsList.reduce((sum, item) => sum + item.price, 0);
  }, [selectedToppingsList]);

  if (!product) return null;

  // Pricing calculations
  const basePrice = currentSize ? currentSize.price : product.basePrice;
  const baseOriginalPrice = currentSize ? (currentSize.originalPrice || currentSize.price) : (product.originalPrice || product.basePrice);

  const unitTotal = basePrice + toppingsTotalPrice;
  const grandTotal = unitTotal * quantity;

  // Toggle topping
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

  const name = isAr ? product.nameAr : product.nameEn;
  const description = isAr ? product.descriptionAr : product.descriptionEn;
  const sizeLabel = currentSize ? (isAr ? currentSize.labelAr : currentSize.labelEn) : '';

  // WhatsApp order text
  let messageLines: string[] = [];
  if (isAr) {
    messageLines = [
      `🍕 *طلب جديد من بيتزا هاوس (Pizza House)*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📌 *الصنف:* ${name}`,
    ];
    if (hasSizes && currentSize) {
      messageLines.push(`📏 *الحجم:* ${sizeLabel} — ${formatCurrency(basePrice, 'ar', siteSettings.currencyCode)} (خصم 20%)`);
    } else {
      messageLines.push(`💰 *السعر:* ${formatCurrency(basePrice, 'ar', siteSettings.currencyCode)}`);
    }

    if (selectedToppingsList.length > 0) {
      messageLines.push(`✨ *الإضافات المختارة:*`);
      selectedToppingsList.forEach((top) => {
        messageLines.push(`   • ${top.nameAr} (+${formatCurrency(top.price, 'ar', siteSettings.currencyCode)})`);
      });
      messageLines.push(`   *مجموع الإضافات:* +${formatCurrency(toppingsTotalPrice, 'ar', siteSettings.currencyCode)}`);
    }

    messageLines.push(`🔢 *الكمية:* ${quantity}`);
    if (notes.trim()) {
      messageLines.push(`📝 *ملاحظات خاصة:* ${notes.trim()}`);
    }
    messageLines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    messageLines.push(`💰 *الإجمالي النهائي:* *${formatCurrency(grandTotal, 'ar', siteSettings.currencyCode)}*`);
  } else {
    messageLines = [
      `🍕 *New Order from Pizza House*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📌 *Item:* ${name}`,
    ];
    if (hasSizes && currentSize) {
      messageLines.push(`📏 *Size:* ${sizeLabel} — ${formatCurrency(basePrice, 'en', siteSettings.currencyCode)} (20% OFF)`);
    } else {
      messageLines.push(`💰 *Price:* ${formatCurrency(basePrice, 'en', siteSettings.currencyCode)}`);
    }

    if (selectedToppingsList.length > 0) {
      messageLines.push(`✨ *Additions:*`);
      selectedToppingsList.forEach((top) => {
        messageLines.push(`   • ${top.nameEn} (+${formatCurrency(top.price, 'en', siteSettings.currencyCode)})`);
      });
    }

    messageLines.push(`🔢 *Quantity:* ${quantity}`);
    if (notes.trim()) {
      messageLines.push(`📝 *Notes:* ${notes.trim()}`);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      {/* Click outside backdrop */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-2xl bg-[#121214] border border-[#26262B] rounded-3xl shadow-2xl overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* ── Modal Header / Product Showcase Banner ── */}
        <div className="relative bg-[#0A0A0C] p-5 sm:p-6 border-b border-[#26262B] shrink-0 overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FF7A00]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2.5 rounded-full bg-[#18181B] hover:bg-[#222227] text-white/80 hover:text-white transition-all cursor-pointer border border-[#26262B] hover:rotate-90 duration-200 z-20"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
            {/* Dish Image */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#18181B] border border-[#26262B] p-2 flex items-center justify-center shrink-0 shadow-xl overflow-hidden">
              <img
                src={product.image}
                alt={name}
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to logo if image load fails
                  (e.target as HTMLImageElement).src = '/logo.png';
                }}
              />
              {product.hasDiscount && (
                <div className="absolute top-1 right-1 discount-sticker">
                  -20%
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-2 flex-1 text-center sm:text-start">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {product.hasDiscount && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-[#FF7A00] text-black font-heading shadow-md shadow-[#FF7A00]/20">
                    <Tag className="w-3 h-3 text-black" />
                    {isAr ? 'عرض خاص خصم 20%' : '20% OFF Deal'}
                  </span>
                )}
                {product.badgeAr && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#18181B] text-[#FF7A00] border border-[#FF7A00]/30">
                    <Sparkles className="w-3 h-3" />
                    {isAr ? product.badgeAr : product.badgeEn}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading leading-tight">
                {name}
              </h2>
              {isAr && product.nameEn && (
                <p className="text-xs text-[#A1A1AA] font-medium tracking-wide">
                  {product.nameEn}
                </p>
              )}
              <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* ── Section 1: Choose Size (إذا كان الصنف من الفطائر أو البيتزا أو السندوتشات بحجمين) ── */}
          {hasSizes && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2 font-heading tracking-wide">
                  <Pizza className="w-4 h-4 text-[#FF7A00]" />
                  <span>{isAr ? '١. اختر الحجم (متوسط أو كبير +30%)' : '1. Select Size (Medium or Large +30%)'}</span>
                </label>
                <span className="text-xs text-[#FF7A00] font-bold">
                  {isAr ? 'خصم 20% ساري' : '20% OFF Applied'}
                </span>
              </div>

              {/* 2 Size Cards: Medium & Large */}
              <div className="grid grid-cols-2 gap-3.5">
                {sizesList.map((sizeItem) => {
                  const isSelected = selectedSizeCode === sizeItem.code;
                  const label = isAr ? sizeItem.labelAr : sizeItem.labelEn;
                  const origPrice = sizeItem.originalPrice || sizeItem.price;

                  return (
                    <button
                      key={sizeItem.code}
                      type="button"
                      onClick={() => setSelectedSizeCode(sizeItem.code)}
                      className={`relative p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between items-center group min-h-[120px] ${
                        isSelected
                          ? 'bg-[#18181B] border-[#FF7A00] text-white shadow-xl shadow-[#FF7A00]/20 ring-2 ring-[#FF7A00]/50 scale-[1.02]'
                          : 'bg-[#141416] hover:bg-[#1A1A1E] border-[#26262B] text-[#D4D4D8] hover:border-[#FF7A00]/40'
                      }`}
                    >
                      {/* Check badge */}
                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#FF7A00] text-black flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}

                      {/* Discount sticker on card */}
                      <div className="discount-sticker absolute top-2.5 left-2.5">
                        -20%
                      </div>

                      <div className="space-y-1 mt-3">
                        <span className="inline-block text-[11px] font-black uppercase px-2 py-0.5 rounded-md bg-[#26262B] text-[#D4D4D8]">
                          {sizeItem.code === 'M' ? (isAr ? 'حجم متوسط' : 'Medium Size') : (isAr ? 'حجم كبير' : 'Large Size')}
                        </span>
                        <h4 className="text-base font-black text-white font-heading">
                          {label}
                        </h4>
                        <p className="text-[11px] text-[#A1A1AA]">
                          {sizeItem.code === 'M' ? (isAr ? 'السعر الأصلي الموحد' : 'Standard Unified') : (isAr ? 'زيادة 30% بالحجم' : '+30% Bigger Portion')}
                        </p>
                      </div>

                      {/* Price Section with Discount Sticker Look */}
                      <div className="mt-3 pt-2.5 border-t border-[#26262B] w-full flex items-baseline justify-center gap-2">
                        {/* Struck-through original price */}
                        <span className="text-xs text-[#71717A] line-through font-bold">
                          {formatCurrency(origPrice, locale, siteSettings.currencyCode)}
                        </span>
                        {/* Discounted price */}
                        <span className="text-base sm:text-lg font-black text-[#FF7A00] font-heading">
                          {formatCurrency(sizeItem.price, locale, siteSettings.currencyCode)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Section 2: Related Toppings / Additions ── */}
          {toppingsList.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2 font-heading tracking-wide">
                  <ChefHat className="w-4 h-4 text-[#FF7A00]" />
                  <span>{isAr ? '٢. إضافات مقرمشة وصلصات (اختياري)' : '2. Extra Sauces & Dips (Optional)'}</span>
                </label>
                {selectedToppings.size > 0 && (
                  <span className="text-xs font-bold text-[#FF7A00] bg-[#FF7A00]/10 px-2.5 py-0.5 rounded-full border border-[#FF7A00]/30 font-heading">
                    {selectedToppings.size} {isAr ? 'مختارة' : 'Selected'} (+{formatCurrency(toppingsTotalPrice, locale, siteSettings.currencyCode)})
                  </span>
                )}
              </div>

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
                          ? 'bg-[#FF7A00]/15 border-[#FF7A00] text-white shadow-md shadow-[#FF7A00]/10'
                          : 'bg-[#141416] hover:bg-[#1A1A1E] border-[#26262B] text-[#D4D4D8] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Checkbox */}
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                            isChecked
                              ? 'bg-[#FF7A00] border-[#FF7A00] text-black shadow-sm'
                              : 'bg-[#0A0A0C] border-[#3F3F46] text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className={`text-xs sm:text-sm font-bold block truncate ${isChecked ? 'text-white' : 'text-[#D4D4D8]'}`}>
                          {toppingTitle}
                        </span>
                      </div>

                      {/* Topping price tag */}
                      <span className="text-xs font-bold text-[#FF7A00] bg-[#18181B] px-2.5 py-1 rounded-lg border border-[#26262B] font-heading">
                        +{formatCurrency(topping.price, locale, siteSettings.currencyCode)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Section 3: Special Notes ── */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white flex items-center justify-between">
              <span className="font-heading">{isAr ? '٣. ملاحظات خاصة للمطبخ' : '3. Kitchen Notes'}</span>
              <span className="text-[11px] text-[#A1A1AA] font-normal">
                {isAr ? 'مثال: صوص زيادة، بدون بصل، تحمير مقرمش' : 'e.g., extra crispy, sauce on side'}
              </span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                isAr
                  ? 'اكتب أي ملاحظة خاصة لتحضير طلبك كما تحب...'
                  : 'Write any special preparation notes...'
              }
              className="w-full bg-[#141416] border border-[#26262B] focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#71717A] outline-none transition-all"
            />
          </div>
        </div>

        {/* ── Modal Footer: Quantity, Live Price, and Order CTA ── */}
        <div className="p-4 sm:p-5 bg-[#0A0A0C] border-t border-[#26262B] shrink-0 space-y-3.5">
          {/* Quantity stepper + summary */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#A1A1AA] font-heading">
                {isAr ? 'الكمية:' : 'Quantity:'}
              </span>
              <div className="flex items-center bg-[#141416] border border-[#26262B] rounded-2xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-xl bg-[#1E1E22] hover:bg-[#282830] disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="تقليل الكمية"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-black text-sm text-white font-heading">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-xl bg-[#1E1E22] hover:bg-[#282830] text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="زيادة الكمية"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Price breakdown pill */}
            <div className="text-xs text-[#A1A1AA] flex items-center gap-2 bg-[#141416] px-3 py-1.5 rounded-xl border border-[#26262B]">
              {product.hasDiscount && (
                <span className="line-through text-[#71717A] text-[11px]">
                  {formatCurrency(baseOriginalPrice * quantity, locale, siteSettings.currencyCode)}
                </span>
              )}
              <span className="font-bold text-[#FF7A00] font-heading">
                {formatCurrency(grandTotal, locale, siteSettings.currencyCode)}
              </span>
            </div>
          </div>

          {/* Bottom row: Total price and WhatsApp action */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#A1A1AA] font-medium">
                {isAr ? 'الإجمالي بعد الخصم 20%' : 'Total with 20% Discount'}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#FF7A00] font-heading tracking-wide">
                {formatCurrency(grandTotal, locale, siteSettings.currencyCode)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy order button */}
              <button
                type="button"
                onClick={handleCopyOrder}
                className="p-3 sm:px-4 sm:py-3.5 rounded-2xl bg-[#18181B] hover:bg-[#222227] text-[#D4D4D8] hover:text-white border border-[#26262B] transition-all cursor-pointer flex items-center gap-1.5"
                title={isAr ? 'نسخ تفاصيل الطلب' : 'Copy order'}
              >
                {copied ? <Check className="w-4 h-4 text-[#FF7A00]" /> : <Copy className="w-4 h-4" />}
                <span className="text-xs font-bold hidden sm:inline">
                  {copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}
                </span>
              </button>

              {/* Direct WhatsApp Order CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 sm:px-7 rounded-2xl font-black text-sm text-black bg-gradient-to-r from-[#FF7A00] to-[#FFA133] hover:from-[#FFA133] hover:to-[#FF7A00] shadow-xl shadow-[#FF7A00]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-center font-heading tracking-wide"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'اطلب الآن عبر واتساب' : 'Order via WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
