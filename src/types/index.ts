export type Locale = 'ar' | 'en';

export interface Translation {
  name: string;
  description?: string;
}

export interface Category {
  id: string;
  slug: string;
  iconName: string;
  sortOrder: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  itemCount?: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  code: 'S' | 'M' | 'L';
  labelAr: string;
  labelEn: string;
  price: number; // Stored as integer (e.g. 4500 YER)
  sortOrder: number;
  isActive: boolean;
}

export interface PizzaSizeOption {
  id: string;
  code: 'S' | 'M' | 'L' | 'XL';
  labelAr: string;
  labelEn: string;
  diameterCm: number;
  price: number;
}

export interface PizzaToppingOption {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  categorySlug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  basePrice: number; // Stored in integer YER
  isAvailable: boolean;
  isFeatured: boolean;
  status: 'published' | 'draft';
  sortOrder: number;
  allergensAr?: string[];
  allergensEn?: string[];
  variants?: ProductVariant[];
  badgeAr?: string;
  badgeEn?: string;
  sizeOptions?: PizzaSizeOption[];
  relatedToppings?: PizzaToppingOption[];
}

export interface PizzaSize {
  id: string;
  code: 'S' | 'M' | 'L';
  labelAr: string;
  labelEn: string;
  basePrice: number; // Integer YER
  diameterCm: number;
  scaleFactor: number; // Visual scale for visualization (0.8, 1.0, 1.15)
  sortOrder: number;
  isActive: boolean;
}

export interface Ingredient {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  icon: string;
  color: string;
  unitPrice: number; // Integer YER
  maxQuantity: number;
  isAvailable: boolean;
  isIncludedByDefault: boolean;
  sortOrder: number;
  category: 'sauce' | 'cheese' | 'meat' | 'veg' | 'seasoning';
}

export interface SelectedTopping {
  ingredientId: string;
  quantity: number;
}

export interface BuilderState {
  size: PizzaSize;
  crustType: 'classic' | 'thin' | 'stuffed';
  sauce: 'tomato' | 'bbq' | 'white' | 'none';
  cheeseLevel: 'none' | 'normal' | 'extra';
  toppings: Record<string, number>; // ingredientId -> quantity
  isBaking: boolean;
  isBaked: boolean;
}

export interface Offer {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  originalPrice: number; // Integer YER
  offerPrice: number; // Integer YER
  badgeAr: string;
  badgeEn: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  linkedProductId?: string;
}

export interface ContentBlock {
  id: string;
  key: string;
  type: 'hero' | 'about' | 'contact' | 'promo' | 'story';
  sortOrder: number;
  isEnabled: boolean;
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  bodyAr?: string;
  bodyEn?: string;
  buttonLabelAr?: string;
  buttonLabelEn?: string;
  mediaUrl?: string;
}

export interface ThemeConfig {
  primaryColor: string; // e.g. #E63920
  secondaryColor: string; // e.g. #FFB703
  bgColor: string; // e.g. #0F0F11
  surfaceColor: string; // e.g. #1B1B1E
  textColor: string; // e.g. #F7F4EF
  brandName: string; // e.g. PizzaZone
  buttonRadius: 'sm' | 'md' | 'lg' | 'full';
  heroTaglineAr: string;
  heroTaglineEn: string;
}

export interface SiteSettings {
  brandName: string;
  currencyCode: string;
  currencySymbolAr: string;
  currencySymbolEn: string;
  phone: string;
  whatsapp: string;
  email: string;
  addressAr: string;
  addressEn: string;
  openingHoursAr: string;
  openingHoursEn: string;
  mapEmbedUrl: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  theme: ThemeConfig;
  sectionsVisibility: {
    hero: boolean;
    featured: boolean;
    categories: boolean;
    builderTeaser: boolean;
    specialOffer: boolean;
    about: boolean;
    contact: boolean;
  };
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  action: 'create' | 'update' | 'delete' | 'toggle' | 'theme_update';
  entityType: 'product' | 'category' | 'ingredient' | 'offer' | 'content' | 'theme';
  entityId: string;
  details: string;
  timestamp: string;
}
