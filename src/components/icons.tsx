import React from 'react';

// ── Boxicons wrapper components ─────────────────────────────────────
// Each component renders a Boxicons <i> tag with standard Boxicons class rules:
// The base class "bx" is ALWAYS included so font-family is properly applied.

export interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  strokeWidth?: number;
}

function bx(name: string) {
  const Icon: React.FC<IconProps> = ({ size = 24, className = '', style, onClick }) => (
    <i
      className={`bx ${name} ${className}`}
      style={{
        fontSize: `${size}px`,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      onClick={onClick}
      aria-hidden="true"
    />
  );
  Icon.displayName = name;
  return Icon;
}

// 🔥 Fire / Flame
export const Flame = bx('bxs-flame');

// ✨ Sparkles / Stars
export const Sparkles = bx('bxs-star');

// ← → Arrows
export const ArrowLeft = bx('bx-left-arrow-alt');
export const ArrowRight = bx('bx-right-arrow-alt');
export const ArrowUp = bx('bx-up-arrow-alt');

// 👁 Eye
export const Eye = bx('bx-show');

// 💬 WhatsApp / Chat
export const MessageCircle = bx('bxl-whatsapp');

// ✕ Close
export const X = bx('bx-x');

// 🛡 Shield
export const ShieldAlert = bx('bxs-shield');
export const ShieldCheck = bx('bxs-shield');

// ✓ Check
export const Check = bx('bx-check');
export const CheckCircle2 = bx('bx-check-circle');

// 🏷 Tag
export const Tag = bx('bxs-purchase-tag');

// ☰ Menu
export const Menu = bx('bx-menu');

// 🌐 Globe
export const Globe = bx('bx-globe');

// 📞 Phone
export const Phone = bx('bxs-phone');

// 🔍 Search
export const Search = bx('bx-search');

// 🕐 Clock
export const Clock = bx('bx-time-five');

// 📍 Map Pin
export const MapPin = bx('bxs-map');

// 📧 Mail
export const Mail = bx('bxs-envelope');

// ➤ Send
export const Send = bx('bx-send');

// 🏆 Award
export const Award = bx('bxs-award');

// 👨‍🍳 Chef Hat / Dish
export const ChefHat: React.FC<IconProps> = ({ size = 24, className = '', style, onClick }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path d="M19 10a4 4 0 0 0-3.8-3.99A4.5 4.5 0 0 0 6.8 6.01 4 4 0 0 0 5 10c0 1.63.98 3.03 2.39 3.65C7.15 14.24 7 14.85 7 15.5V17h10v-1.5c0-.65-.15-1.26-.39-1.85A4 4 0 0 0 19 10zm-9 9h4v2h-4v-2z" />
  </svg>
);

// ❤ Heart
export const Heart = bx('bxs-heart');

// 🔄 Rotate / Reset
export const RotateCcw = bx('bx-reset');

// + Plus
export const Plus = bx('bx-plus');

// - Minus
export const Minus = bx('bx-minus');

// 🍕 Pizza (Authentic custom SVG Pizza slice that always renders cleanly)
export const Pizza: React.FC<IconProps> = ({ size = 24, className = '', style, onClick }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
    onClick={onClick}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12c0 .41.03.82.08 1.22L12 22l9.92-8.78c.05-.4.08-.81.08-1.22 0-5.52-4.48-10-10-10zm0 3c3.87 0 7 3.13 7 7 0 .14 0 .28-.02.42L12 18.57 5.02 12.42C5 12.28 5 12.14 5 12c0-3.87 3.13-7 7-7zm-1 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
  </svg>
);

// 🍴 Utensils
export const UtensilsCrossed = bx('bx-restaurant');

// 🥪 Sandwich
export const Sandwich = bx('bx-dish');

// 🥤 Cup / Drink
export const CupSoda = bx('bxs-drink');

// 🍰 Cake / Dessert
export const CakeSlice = bx('bxs-cake');

// 📋 Layout Grid
export const LayoutGrid = bx('bx-grid-alt');

// 📦 Package
export const Package = bx('bx-package');

// 🗂 Layers
export const Layers = bx('bx-layer');

// ⚙ Settings
export const Settings = bx('bx-cog');

// 🌡 Thermometer
export const ThermometerSun = bx('bxs-thermometer');

// 🚗 Delivery Truck
export const Truck = bx('bxs-truck');

// ❓ Help Circle
export const HelpCircle = bx('bx-help-circle');

// 📋 Clipboard / List
export const ClipboardList = bx('bx-list-check');

// ⭐ Star
export const Star = bx('bxs-star');

// 📋 Copy
export const Copy = bx('bx-copy');

// 🛍 Shopping Bag
export const ShoppingBag = bx('bxs-shopping-bag');
