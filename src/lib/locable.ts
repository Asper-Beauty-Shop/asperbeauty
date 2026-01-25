// Locable.ai Integration for Local Business Discovery
// Integrates with Locable.ai API for store locator and local SEO

export interface StoreLocation {
  id: string;
  name: string;
  nameAr: string;
  address: string;
  addressAr: string;
  city: string;
  cityAr: string;
  country: string;
  countryAr: string;
  phone: string;
  email: string;
  website: string;
  latitude: number;
  longitude: number;
  hours: StoreHours;
  services: string[];
  servicesAr: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isMainStore: boolean;
  socialLinks: SocialLinks;
  localDeliveryRadius: number; // in km
  pickupAvailable: boolean;
  codAvailable: boolean;
}

export interface StoreHours {
  sunday: DayHours;
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed: boolean;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  whatsapp?: string;
  snapchat?: string;
}

// Asper Beauty Shop Main Location in Amman, Jordan
export const ASPER_STORE: StoreLocation = {
  id: 'asper-main',
  name: 'Asper Beauty Shop',
  nameAr: 'أسبر بيوتي شوب',
  address: 'Wasfi Al Tal Street, Khalda',
  addressAr: 'شارع وصفي التل، خلدا',
  city: 'Amman',
  cityAr: 'عمّان',
  country: 'Jordan',
  countryAr: 'الأردن',
  phone: '+962 79 065 6666',
  email: 'asperpharma@gmail.com',
  website: 'https://www.asperbeautyshop.com',
  latitude: 31.9539,
  longitude: 35.9106,
  hours: {
    sunday: { open: '10:00', close: '21:00', isClosed: false },
    monday: { open: '10:00', close: '21:00', isClosed: false },
    tuesday: { open: '10:00', close: '21:00', isClosed: false },
    wednesday: { open: '10:00', close: '21:00', isClosed: false },
    thursday: { open: '10:00', close: '21:00', isClosed: false },
    friday: { open: '14:00', close: '21:00', isClosed: false },
    saturday: { open: '10:00', close: '21:00', isClosed: false },
  },
  services: [
    'Premium Skincare',
    'Luxury Beauty Products',
    'Professional Makeup',
    'Hair Care',
    'Fragrances',
    'Beauty Consultation',
    'Cash on Delivery',
    'Same Day Delivery',
  ],
  servicesAr: [
    'منتجات عناية بالبشرة متميزة',
    'منتجات جمال فاخرة',
    'مكياج احترافي',
    'العناية بالشعر',
    'العطور',
    'استشارات تجميلية',
    'الدفع عند الاستلام',
    'توصيل في نفس اليوم',
  ],
  images: [
    '/lovable-uploads/7831568c-30c3-4d7e-935c-aacc6f527765.jpg',
    '/luxury-beauty-background.jpg',
  ],
  rating: 4.8,
  reviewCount: 256,
  isMainStore: true,
  socialLinks: {
    instagram: 'https://www.instagram.com/asper.beauty.box/',
    facebook: 'https://web.facebook.com/robu.sweileh/',
    whatsapp: 'https://wa.me/962790656666',
    tiktok: 'https://tiktok.com/@asperbeautyshop',
  },
  localDeliveryRadius: 50, // 50km around Amman
  pickupAvailable: true,
  codAvailable: true,
};

// Jordan delivery coverage areas
export const DELIVERY_AREAS = [
  { name: 'Amman', nameAr: 'عمّان', fee: 2.50, minOrder: 10, sameDay: true },
  { name: 'Zarqa', nameAr: 'الزرقاء', fee: 3.50, minOrder: 15, sameDay: true },
  { name: 'Irbid', nameAr: 'إربد', fee: 4.00, minOrder: 20, sameDay: false },
  { name: 'Salt', nameAr: 'السلط', fee: 3.00, minOrder: 15, sameDay: true },
  { name: 'Aqaba', nameAr: 'العقبة', fee: 5.00, minOrder: 30, sameDay: false },
  { name: 'Madaba', nameAr: 'مادبا', fee: 3.50, minOrder: 15, sameDay: true },
  { name: 'Jerash', nameAr: 'جرش', fee: 4.00, minOrder: 20, sameDay: false },
  { name: 'Ajloun', nameAr: 'عجلون', fee: 4.50, minOrder: 20, sameDay: false },
  { name: 'Karak', nameAr: 'الكرك', fee: 5.00, minOrder: 25, sameDay: false },
  { name: 'Mafraq', nameAr: 'المفرق', fee: 4.50, minOrder: 20, sameDay: false },
  { name: 'Tafilah', nameAr: 'الطفيلة', fee: 5.00, minOrder: 30, sameDay: false },
  { name: "Ma'an", nameAr: 'معان', fee: 5.50, minOrder: 30, sameDay: false },
];

// Generate JSON-LD structured data for local business (Google SEO)
export function generateLocalBusinessSchema(store: StoreLocation): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'CosmeticsStore',
    '@id': store.website,
    name: store.name,
    alternateName: store.nameAr,
    description: 'Premium beauty and skincare products in Amman, Jordan. Shop Vichy, Eucerin, Bioderma, and more luxury beauty brands with same-day delivery.',
    url: store.website,
    telephone: store.phone,
    email: store.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address,
      addressLocality: store.city,
      addressCountry: 'JO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: store.latitude,
      longitude: store.longitude,
    },
    openingHoursSpecification: Object.entries(store.hours).map(([day, hours]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      opens: hours.isClosed ? undefined : hours.open,
      closes: hours.isClosed ? undefined : hours.close,
    })).filter(spec => spec.opens),
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: store.rating,
      reviewCount: store.reviewCount,
    },
    sameAs: Object.values(store.socialLinks).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Beauty Products',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Skin Care' },
        { '@type': 'OfferCatalog', name: 'Hair Care' },
        { '@type': 'OfferCatalog', name: 'Makeup' },
        { '@type': 'OfferCatalog', name: 'Fragrances' },
        { '@type': 'OfferCatalog', name: 'Body Care' },
      ],
    },
    areaServed: DELIVERY_AREAS.map(area => ({
      '@type': 'City',
      name: area.name,
    })),
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${store.website}/shop`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModePickUp',
    },
  };
}

// Generate Organization Schema for brand identity
export function generateOrganizationSchema(store: StoreLocation): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: store.name,
    alternateName: store.nameAr,
    url: store.website,
    logo: `${store.website}/favicon.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: store.phone,
      contactType: 'customer service',
      email: store.email,
      availableLanguage: ['English', 'Arabic'],
      areaServed: 'JO',
    },
    sameAs: Object.values(store.socialLinks).filter(Boolean),
  };
}

// Generate Website Schema for search
export function generateWebsiteSchema(store: StoreLocation): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: store.name,
    url: store.website,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${store.website}/shop?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate BreadcrumbList schema for navigation
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate Product schema for individual products
export function generateProductSchema(product: {
  id: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  brand?: string;
  category: string;
  imageUrl?: string;
  sku?: string;
  inStock?: boolean;
}): object {
  const store = ASPER_STORE;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${store.website}/product/${product.id}`,
    name: product.title,
    description: product.description || product.title,
    image: product.imageUrl || `${store.website}/placeholder.svg`,
    sku: product.sku || product.id,
    brand: product.brand ? {
      '@type': 'Brand',
      name: product.brand,
    } : undefined,
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: `${store.website}/product/${product.id}`,
      priceCurrency: 'JOD',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock !== false 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: store.name,
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 2.50,
          currency: 'JOD',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'JO',
        },
      },
    },
  };
}

// Calculate delivery fee based on city
export function getDeliveryFee(city: string): { fee: number; minOrder: number; sameDay: boolean } | null {
  const area = DELIVERY_AREAS.find(
    a => a.name.toLowerCase() === city.toLowerCase() || 
         a.nameAr === city
  );
  
  return area ? { fee: area.fee, minOrder: area.minOrder, sameDay: area.sameDay } : null;
}

// Format store hours for display
export function formatStoreHours(hours: StoreHours, language: 'en' | 'ar'): string[] {
  const dayNames = language === 'ar' 
    ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const dayKeys: (keyof StoreHours)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  return dayKeys.map((day, index) => {
    const dayHours = hours[day];
    if (dayHours.isClosed) {
      return `${dayNames[index]}: ${language === 'ar' ? 'مغلق' : 'Closed'}`;
    }
    return `${dayNames[index]}: ${dayHours.open} - ${dayHours.close}`;
  });
}

// Check if store is currently open
export function isStoreOpen(hours: StoreHours): boolean {
  const now = new Date();
  const dayIndex = now.getDay();
  const dayKeys: (keyof StoreHours)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayHours = hours[dayKeys[dayIndex]];
  
  if (todayHours.isClosed) return false;
  
  const currentTime = now.getHours() * 100 + now.getMinutes();
  const openTime = parseInt(todayHours.open.replace(':', ''));
  const closeTime = parseInt(todayHours.close.replace(':', ''));
  
  return currentTime >= openTime && currentTime < closeTime;
}

// Format distance for display
export function formatDistance(km: number, language: 'en' | 'ar'): string {
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return language === 'ar' ? `${meters} متر` : `${meters}m`;
  }
  return language === 'ar' ? `${km.toFixed(1)} كم` : `${km.toFixed(1)}km`;
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
