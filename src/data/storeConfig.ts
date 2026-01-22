/**
 * Asper Beauty Shop Configuration
 * Central configuration for store settings, promotions, and integrations
 */

// Store Information
export const STORE_INFO = {
  name: "Asper Beauty Shop",
  nameAr: "أسبر بيوتي شوب",
  domain: "www.asperbeautyshop.com",
  tagline: "Redefining Eternal Beauty",
  taglineAr: "إعادة تعريف الجمال الأبدي",
  description: "Premium beauty and skincare products from world-renowned brands. Discover the fusion of nature's finest ingredients and scientific innovation.",
  descriptionAr: "منتجات التجميل والعناية بالبشرة الفاخرة من العلامات التجارية العالمية الشهيرة. اكتشفي اندماج أفضل مكونات الطبيعة والابتكار العلمي.",
  currency: "JOD",
  currencySymbol: "JD",
  country: "Jordan",
  countryCode: "JO",
  phone: "+962 6 XXX XXXX",
  email: "info@asperbeautyshop.com",
  socialMedia: {
    instagram: "https://instagram.com/asperbeautyshop",
    facebook: "https://facebook.com/asperbeautyshop",
    tiktok: "https://tiktok.com/@asperbeautyshop",
    whatsapp: "https://wa.me/962XXXXXXXXX",
  },
  address: {
    street: "Amman, Jordan",
    city: "Amman",
    country: "Jordan",
  }
};

// Shopify Integration
export const SHOPIFY_CONFIG = {
  storeDomain: "lovable-project-milns.myshopify.com",
  storefrontAccessToken: "9daedc472c5910e742ec88bdaad108e2",
  apiVersion: "2025-01",
  checkoutEnabled: true,
  syncEnabled: true,
};

// Locable.ai Integration
export const LOCABLE_CONFIG = {
  enabled: true,
  features: {
    aiRecommendations: true,
    smartSearch: true,
    productCategorization: true,
    chatAssistant: true,
    imageGeneration: true,
  },
  aiModels: {
    categorization: "google/gemini-3-flash-preview",
    imageGeneration: "google/gemini-2.5-flash-image-preview",
  }
};

// Promotional Banners Configuration
export interface PromoBanner {
  id: string;
  title: string;
  titleAr: string;
  subtitle?: string;
  subtitleAr?: string;
  description?: string;
  descriptionAr?: string;
  ctaText: string;
  ctaTextAr: string;
  ctaLink: string;
  image: string;
  backgroundColor?: string;
  textColor?: string;
  active: boolean;
  startDate?: string;
  endDate?: string;
  position: "hero" | "banner" | "popup" | "sidebar";
  priority: number;
}

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: "new-arrivals-2026",
    title: "New Arrivals",
    titleAr: "وصل حديثاً",
    subtitle: "The Latest in Luxury Beauty",
    subtitleAr: "أحدث ما في الجمال الفاخر",
    description: "Discover our newest collection of premium skincare and beauty products from the world's most prestigious brands.",
    descriptionAr: "اكتشفي أحدث مجموعاتنا من منتجات العناية بالبشرة والتجميل الفاخرة من أرقى العلامات التجارية العالمية.",
    ctaText: "Shop New Arrivals",
    ctaTextAr: "تسوقي الجديد",
    ctaLink: "/shop?sort=newest",
    image: "/luxury-beauty-background.jpg",
    backgroundColor: "#4A0E19",
    textColor: "#FAF6F1",
    active: true,
    position: "banner",
    priority: 1,
  },
  {
    id: "skincare-sale",
    title: "Skincare Essentials",
    titleAr: "أساسيات العناية بالبشرة",
    subtitle: "Up to 30% Off",
    subtitleAr: "خصم حتى 30%",
    description: "Premium skincare from Vichy, Eucerin, Bioderma, and more. Limited time offer.",
    descriptionAr: "منتجات العناية بالبشرة الفاخرة من فيشي ويوسيرين وبيوديرما والمزيد. عرض لفترة محدودة.",
    ctaText: "Shop Skincare",
    ctaTextAr: "تسوقي العناية بالبشرة",
    ctaLink: "/shop?category=skin-care",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800",
    active: true,
    position: "banner",
    priority: 2,
  },
  {
    id: "haircare-olaplex",
    title: "Olaplex Collection",
    titleAr: "مجموعة أولابليكس",
    subtitle: "Professional Hair Care",
    subtitleAr: "عناية احترافية بالشعر",
    description: "Transform your hair with the world's #1 bond-building treatment.",
    descriptionAr: "حولي شعرك مع علاج بناء الروابط رقم 1 في العالم.",
    ctaText: "Discover Olaplex",
    ctaTextAr: "اكتشفي أولابليكس",
    ctaLink: "/shop?brand=Olaplex",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800",
    active: true,
    position: "banner",
    priority: 3,
  },
  {
    id: "summer-suncare",
    title: "Sun Protection",
    titleAr: "الحماية من الشمس",
    subtitle: "Stay Protected This Season",
    subtitleAr: "ابقي محمية هذا الموسم",
    description: "SPF essentials from La Roche-Posay, Vichy, and ISDIN.",
    descriptionAr: "أساسيات الحماية من الشمس من لاروش بوزيه وفيشي وإيسدين.",
    ctaText: "Shop Suncare",
    ctaTextAr: "تسوقي واقي الشمس",
    ctaLink: "/shop?subcategory=sunscreen",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800",
    active: true,
    position: "banner",
    priority: 4,
  },
];

// Featured Categories for Homepage
export const FEATURED_CATEGORIES = [
  {
    id: "skin-care",
    name: "Skin Care",
    nameAr: "العناية بالبشرة",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400",
    productCount: 0, // Will be populated dynamically
    featured: true,
  },
  {
    id: "hair-care",
    name: "Hair Care",
    nameAr: "العناية بالشعر",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400",
    productCount: 0,
    featured: true,
  },
  {
    id: "makeup",
    name: "Makeup",
    nameAr: "المكياج",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400",
    productCount: 0,
    featured: true,
  },
  {
    id: "fragrances",
    name: "Fragrances",
    nameAr: "العطور",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400",
    productCount: 0,
    featured: true,
  },
  {
    id: "body-care",
    name: "Body Care",
    nameAr: "العناية بالجسم",
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=400",
    productCount: 0,
    featured: true,
  },
];

// Shipping Configuration
export const SHIPPING_CONFIG = {
  freeShippingThreshold: 50, // JOD
  standardShippingCost: 3, // JOD
  expressShippingCost: 7, // JOD
  estimatedDelivery: {
    standard: "3-5 business days",
    standardAr: "3-5 أيام عمل",
    express: "1-2 business days",
    expressAr: "1-2 يوم عمل",
  },
  cities: [
    { id: "amman", name: "Amman", nameAr: "عمان", shippingCost: 3 },
    { id: "irbid", name: "Irbid", nameAr: "إربد", shippingCost: 4 },
    { id: "zarqa", name: "Zarqa", nameAr: "الزرقاء", shippingCost: 3.5 },
    { id: "aqaba", name: "Aqaba", nameAr: "العقبة", shippingCost: 5 },
    { id: "salt", name: "Salt", nameAr: "السلط", shippingCost: 4 },
    { id: "madaba", name: "Madaba", nameAr: "مادبا", shippingCost: 3.5 },
    { id: "jerash", name: "Jerash", nameAr: "جرش", shippingCost: 4 },
    { id: "ajloun", name: "Ajloun", nameAr: "عجلون", shippingCost: 4.5 },
    { id: "karak", name: "Karak", nameAr: "الكرك", shippingCost: 5 },
    { id: "maan", name: "Ma'an", nameAr: "معان", shippingCost: 5.5 },
  ],
  codEnabled: true,
  codFee: 1, // JOD
};

// Payment Configuration
export const PAYMENT_CONFIG = {
  methods: [
    { id: "cod", name: "Cash on Delivery", nameAr: "الدفع عند الاستلام", enabled: true },
    { id: "card", name: "Credit/Debit Card", nameAr: "بطاقة ائتمان/خصم", enabled: false },
    { id: "cliq", name: "CliQ", nameAr: "كليك", enabled: false },
  ],
};

// SEO Configuration
export const SEO_CONFIG = {
  titleTemplate: "%s | Asper Beauty Shop",
  defaultTitle: "Asper Beauty Shop - Premium Beauty & Skincare in Jordan",
  defaultDescription: "Shop premium beauty and skincare products from world-renowned brands. Vichy, Eucerin, La Roche-Posay, Olaplex & more. Free delivery over 50 JD.",
  keywords: [
    "beauty shop jordan",
    "skincare amman",
    "vichy jordan",
    "eucerin jordan",
    "la roche posay jordan",
    "bioderma jordan",
    "olaplex jordan",
    "cerave jordan",
    "the ordinary jordan",
    "premium skincare",
    "beauty products jordan",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    localeAlternate: "ar_JO",
    siteName: "Asper Beauty Shop",
  },
};

// Feature Flags
export const FEATURE_FLAGS = {
  enableWishlist: true,
  enableReviews: false,
  enableLoyaltyProgram: false,
  enableGiftCards: false,
  enableSubscriptions: false,
  enableAiAssistant: true,
  enableAiRecommendations: true,
  enableBulkUpload: true,
  enableShopifySync: true,
  enableMultiLanguage: true,
  enableDarkMode: false,
};

// Export helper functions
export const getActivePromoBanners = (position?: PromoBanner["position"]): PromoBanner[] => {
  const now = new Date();
  return PROMO_BANNERS
    .filter(banner => {
      if (!banner.active) return false;
      if (position && banner.position !== position) return false;
      if (banner.startDate && new Date(banner.startDate) > now) return false;
      if (banner.endDate && new Date(banner.endDate) < now) return false;
      return true;
    })
    .sort((a, b) => a.priority - b.priority);
};

export const getShippingCost = (cityId: string): number => {
  const city = SHIPPING_CONFIG.cities.find(c => c.id === cityId);
  return city?.shippingCost || SHIPPING_CONFIG.standardShippingCost;
};

export const isFreeShipping = (orderTotal: number): boolean => {
  return orderTotal >= SHIPPING_CONFIG.freeShippingThreshold;
};
