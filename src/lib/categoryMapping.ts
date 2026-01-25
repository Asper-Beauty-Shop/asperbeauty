/**
 * Product Categorization Logic for Asper Beauty Shop
 * Enhanced with locable.ai integration and comprehensive brand database
 * Maps products to primary collections based on their use
 */

export interface CategoryInfo {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  editorialTagline: string;
  editorialTaglineAr: string;
  keywords: string[];
  brands?: string[];
  image?: string;
  icon?: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  category: string;
  featured: boolean;
  logo?: string;
}

// Comprehensive brand database from Asper Beauty Shop catalog
export const BRANDS: BrandInfo[] = [
  // Premium Skincare Brands
  { id: 'vichy', name: 'Vichy', nameAr: 'فيشي', country: 'France', category: 'skin-care', featured: true },
  { id: 'eucerin', name: 'Eucerin', nameAr: 'يوسيرين', country: 'Germany', category: 'skin-care', featured: true },
  { id: 'bioderma', name: 'Bioderma', nameAr: 'بيوديرما', country: 'France', category: 'skin-care', featured: true },
  { id: 'la-roche-posay', name: 'La Roche-Posay', nameAr: 'لاروش بوزيه', country: 'France', category: 'skin-care', featured: true },
  { id: 'cetaphil', name: 'Cetaphil', nameAr: 'سيتافيل', country: 'USA', category: 'skin-care', featured: true },
  { id: 'cerave', name: 'CeraVe', nameAr: 'سيرافي', country: 'USA', category: 'skin-care', featured: true },
  { id: 'the-ordinary', name: 'The Ordinary', nameAr: 'ذا أورديناري', country: 'Canada', category: 'skin-care', featured: true },
  { id: 'avene', name: 'Avène', nameAr: 'أفين', country: 'France', category: 'skin-care', featured: true },
  { id: 'svr', name: 'SVR', nameAr: 'إس في آر', country: 'France', category: 'skin-care', featured: false },
  { id: 'uriage', name: 'Uriage', nameAr: 'يورياج', country: 'France', category: 'skin-care', featured: false },
  { id: 'nuxe', name: 'NUXE', nameAr: 'نوكس', country: 'France', category: 'skin-care', featured: false },
  { id: 'filorga', name: 'Filorga', nameAr: 'فيلورغا', country: 'France', category: 'skin-care', featured: false },
  { id: 'isdin', name: 'ISDIN', nameAr: 'إيسدين', country: 'Spain', category: 'skin-care', featured: false },
  { id: 'neutrogena', name: 'Neutrogena', nameAr: 'نيوتروجينا', country: 'USA', category: 'skin-care', featured: false },
  
  // Hair Care Brands
  { id: 'olaplex', name: 'Olaplex', nameAr: 'أولابليكس', country: 'USA', category: 'hair-care', featured: true },
  { id: 'kerastase', name: 'Kérastase', nameAr: 'كيراستاس', country: 'France', category: 'hair-care', featured: true },
  { id: 'palmers', name: "Palmer's", nameAr: 'بالمرز', country: 'USA', category: 'hair-care', featured: true },
  
  // Body Care Brands
  { id: 'jergens', name: 'Jergens', nameAr: 'جيرجنز', country: 'USA', category: 'body-care', featured: false },
  { id: 'bepanthen', name: 'Bepanthen', nameAr: 'بيبانثين', country: 'Germany', category: 'body-care', featured: false },
  
  // Personal Care Brands
  { id: 'old-spice', name: 'Old Spice', nameAr: 'أولد سبايس', country: 'USA', category: 'body-care', featured: false },
  { id: 'speed-stick', name: 'Speed Stick', nameAr: 'سبيد ستيك', country: 'USA', category: 'body-care', featured: false },
  { id: 'secret', name: 'Secret', nameAr: 'سيكريت', country: 'USA', category: 'body-care', featured: false },
  { id: 'arm-hammer', name: 'Arm & Hammer', nameAr: 'آرم آند هامر', country: 'USA', category: 'body-care', featured: false },
  
  // Makeup Brands
  { id: 'bourjois', name: 'Bourjois', nameAr: 'بورجوا', country: 'France', category: 'make-up', featured: true },
  { id: 'mavala', name: 'Mavala', nameAr: 'مافالا', country: 'Switzerland', category: 'make-up', featured: false },
  { id: 'isadora', name: 'Isadora', nameAr: 'إيزادورا', country: 'Sweden', category: 'make-up', featured: true },
  { id: 'essence', name: 'Essence', nameAr: 'إيسنس', country: 'Germany', category: 'make-up', featured: true },
  { id: 'catrice', name: 'Catrice', nameAr: 'كاتريس', country: 'Germany', category: 'make-up', featured: false },
  
  // Luxury Brands
  { id: 'dior', name: 'Dior', nameAr: 'ديور', country: 'France', category: 'fragrances', featured: true },
  { id: 'lancome', name: 'Lancôme', nameAr: 'لانكوم', country: 'France', category: 'skin-care', featured: true },
  { id: 'clinique', name: 'Clinique', nameAr: 'كلينيك', country: 'USA', category: 'skin-care', featured: true },
  { id: 'estee-lauder', name: 'Estée Lauder', nameAr: 'إستي لودر', country: 'USA', category: 'skin-care', featured: true },
  { id: 'ysl', name: 'YSL Beauty', nameAr: 'واي إس إل', country: 'France', category: 'make-up', featured: true },
  
  // Health & Supplements
  { id: 'sundown', name: 'Sundown', nameAr: 'سن داون', country: 'USA', category: 'tools-devices', featured: false },
  { id: 'jamieson', name: 'Jamieson', nameAr: 'جاميسون', country: 'Canada', category: 'tools-devices', featured: false },
  { id: 'nature-made', name: 'Nature Made', nameAr: 'نيتشر ميد', country: 'USA', category: 'tools-devices', featured: false },
  { id: 'now-foods', name: 'NOW Foods', nameAr: 'ناو فودز', country: 'USA', category: 'tools-devices', featured: false },
  
  // Baby Care
  { id: 'mustela', name: 'Mustela', nameAr: 'موستيلا', country: 'France', category: 'body-care', featured: false },
  { id: 'chicco', name: 'Chicco', nameAr: 'شيكو', country: 'Italy', category: 'body-care', featured: false },
  
  // Medical
  { id: 'artelac', name: 'Artelac', nameAr: 'أرتيلاك', country: 'Germany', category: 'tools-devices', featured: false },
  { id: 'systane', name: 'Systane', nameAr: 'سيستان', country: 'USA', category: 'tools-devices', featured: false },
];

// The six primary product categories
export const CATEGORIES: Record<string, CategoryInfo> = {
  'skin-care': {
    slug: 'skin-care',
    title: 'Skin Care',
    titleAr: 'العناية بالبشرة',
    description: 'Premium skincare solutions for radiant, healthy-looking skin. From gentle cleansers to powerful serums, discover products that transform your daily routine into a ritual of self-care.',
    descriptionAr: 'حلول متميزة للعناية بالبشرة للحصول على بشرة مشرقة وصحية. من المنظفات اللطيفة إلى الأمصال القوية، اكتشفي المنتجات التي تحول روتينك اليومي إلى طقس من الاعتناء بالذات.',
    editorialTagline: 'The foundation of your glow: curated cleansers, serums, and masks for every skin story.',
    editorialTaglineAr: 'أساس توهجك: منظفات وأمصال وأقنعة مختارة لكل قصة بشرة.',
    keywords: ['cleanser', 'toner', 'serum', 'moisturizer', 'cream', 'face', 'facial', 'skin', 'acne', 'anti-aging', 'hydrating', 'gel', 'normaderm', 'cetaphil', 'svr', 'vichy', 'bioten', 'bio balance']
  },
  'hair-care': {
    slug: 'hair-care',
    title: 'Hair Care',
    titleAr: 'العناية بالشعر',
    description: 'Luxurious treatments and products for every hair type, from nourishing shampoos to revitalizing treatments that restore shine and strength.',
    descriptionAr: 'علاجات ومنتجات فاخرة لجميع أنواع الشعر، من الشامبو المغذي إلى العلاجات المنشطة التي تستعيد اللمعان والقوة.',
    editorialTagline: 'From root to tip: transformative treatments for hair that moves with you.',
    editorialTaglineAr: 'من الجذور إلى الأطراف: علاجات تحويلية لشعر يتحرك معك.',
    keywords: ['hair', 'shampoo', 'conditioner', 'treatment', 'oil', 'mask', 'scalp', 'amino', 'raghad']
  },
  'make-up': {
    slug: 'make-up',
    title: 'Make Up',
    titleAr: 'المكياج',
    description: 'Enhance your natural beauty with our curated selection of premium makeup products that celebrate individuality and artistry.',
    descriptionAr: 'عززي جمالك الطبيعي مع مجموعتنا المختارة من منتجات المكياج المتميزة التي تحتفي بالفردية والفن.',
    editorialTagline: 'Define, enhance, express: artistry meets elegance in every shade.',
    editorialTaglineAr: 'حددي، عززي، عبري: الفن يلتقي بالأناقة في كل درجة.',
    keywords: ['mascara', 'lipstick', 'foundation', 'eyeshadow', 'blush', 'concealer', 'makeup', 'make-up', 'lip', 'eye', 'bourjois', 'essence', 'isadora', 'lash']
  },
  'body-care': {
    slug: 'body-care',
    title: 'Body Care',
    titleAr: 'العناية بالجسم',
    description: 'Pamper your skin with our premium body care collection, featuring luxurious moisturizers, scrubs, and treatments for silky-smooth skin.',
    descriptionAr: 'دللي بشرتك مع مجموعة العناية بالجسم المتميزة لدينا، والتي تتضمن مرطبات فاخرة ومقشرات وعلاجات للحصول على بشرة ناعمة كالحرير.',
    editorialTagline: 'Indulgence for every inch: nourishing rituals for skin that glows.',
    editorialTaglineAr: 'انغماس لكل بوصة: طقوس مغذية لبشرة متوهجة.',
    keywords: ['body', 'lotion', 'scrub', 'wash', 'soap', 'hand', 'bepanthen', 'eucerin', 'sunscreen', 'sun', 'spf']
  },
  'fragrances': {
    slug: 'fragrances',
    title: 'Fragrances',
    titleAr: 'العطور',
    description: 'Captivating scents for every occasion, from signature perfumes to subtle body mists that leave a lasting impression.',
    descriptionAr: 'روائح آسرة لكل مناسبة، من العطور المميزة إلى رذاذ الجسم الرقيق الذي يترك انطباعًا دائمًا.',
    editorialTagline: 'Your signature awaits: discover scents that tell your story.',
    editorialTaglineAr: 'توقيعك ينتظر: اكتشفي الروائح التي تروي قصتك.',
    keywords: ['perfume', 'fragrance', 'cologne', 'mist', 'eau de', 'scent', 'aroma']
  },
  'tools-devices': {
    slug: 'tools-devices',
    title: 'Tools & Devices',
    titleAr: 'الأدوات والأجهزة',
    description: 'Professional-grade beauty tools and devices for salon-quality results at home. Elevate your beauty routine with precision instruments.',
    descriptionAr: 'أدوات وأجهزة تجميل احترافية للحصول على نتائج بجودة الصالون في المنزل. ارتقي بروتينك الجمالي مع أدوات دقيقة.',
    editorialTagline: 'Precision in your hands: professional tools for flawless results.',
    editorialTaglineAr: 'الدقة بين يديك: أدوات احترافية لنتائج خالية من العيوب.',
    keywords: ['tool', 'device', 'brush', 'sponge', 'applicator', 'whitening', 'smilest', 'mavala', 'double lash']
  }
};

// Get category slug from slug (handles legacy 'skincare' vs 'skin-care')
export function normalizeCategorySlug(slug: string): string {
  if (slug === 'skincare') return 'skin-care';
  return slug;
}

// Categorize a product based on its title, productType, and vendor
export function categorizeProduct(title: string, productType?: string, vendor?: string): string {
  const searchText = `${title} ${productType || ''} ${vendor || ''}`.toLowerCase();
  
  // Priority order for categorization
  const categoryPriority = [
    'hair-care',      // Check hair care first (specific)
    'make-up',        // Then makeup (specific)
    'fragrances',     // Then fragrances (specific)
    'tools-devices',  // Then tools (specific)
    'body-care',      // Then body care
    'skin-care',      // Default facial/skin products
  ];
  
  for (const categorySlug of categoryPriority) {
    const category = CATEGORIES[categorySlug];
    for (const keyword of category.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return categorySlug;
      }
    }
  }
  
  // Default to skin care if no match found
  return 'skin-care';
}

// Get category info by slug
export function getCategoryInfo(slug: string): CategoryInfo | null {
  const normalizedSlug = normalizeCategorySlug(slug);
  return CATEGORIES[normalizedSlug] || null;
}

// Get all category slugs
export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORIES);
}

// Get brand info by ID
export function getBrandById(brandId: string): BrandInfo | null {
  return BRANDS.find(b => b.id === brandId) || null;
}

// Get brand info by name (case-insensitive)
export function getBrandByName(brandName: string): BrandInfo | null {
  const searchName = brandName.toLowerCase();
  return BRANDS.find(b => 
    b.name.toLowerCase() === searchName || 
    b.nameAr === brandName
  ) || null;
}

// Get all featured brands
export function getFeaturedBrands(): BrandInfo[] {
  return BRANDS.filter(b => b.featured);
}

// Get brands by category
export function getBrandsByCategory(categorySlug: string): BrandInfo[] {
  return BRANDS.filter(b => b.category === categorySlug);
}

// Detect brand from product name
export function detectBrandFromName(productName: string): BrandInfo | null {
  const nameLower = productName.toLowerCase();
  
  // Sort brands by name length (longer first) to match specific brands first
  const sortedBrands = [...BRANDS].sort((a, b) => b.name.length - a.name.length);
  
  for (const brand of sortedBrands) {
    // Check for brand name variations
    const brandNameLower = brand.name.toLowerCase();
    const brandNameNoSpaces = brandNameLower.replace(/[\s\-\']/g, '');
    const productNameNoSpaces = nameLower.replace(/[\s\-\']/g, '');
    
    if (
      nameLower.includes(brandNameLower) ||
      productNameNoSpaces.includes(brandNameNoSpaces)
    ) {
      return brand;
    }
  }
  
  return null;
}

// Enhanced categorization with brand detection
export function smartCategorizeProduct(
  title: string, 
  productType?: string, 
  vendor?: string
): { category: string; brand: BrandInfo | null } {
  const searchText = `${title} ${productType || ''} ${vendor || ''}`;
  
  // First, try to detect the brand
  const detectedBrand = detectBrandFromName(searchText);
  
  // If brand is detected and has a category, use that
  if (detectedBrand?.category) {
    return {
      category: detectedBrand.category,
      brand: detectedBrand
    };
  }
  
  // Otherwise, use keyword-based categorization
  return {
    category: categorizeProduct(title, productType, vendor),
    brand: detectedBrand
  };
}

// Skin concerns mapping
export const SKIN_CONCERNS = [
  { id: 'acne', labelEn: 'Acne & Blemishes', labelAr: 'حب الشباب والشوائب', color: 'bg-red-100 text-red-700', icon: 'AlertCircle' },
  { id: 'anti-aging', labelEn: 'Anti-Aging', labelAr: 'مكافحة الشيخوخة', color: 'bg-purple-100 text-purple-700', icon: 'Clock' },
  { id: 'hydration', labelEn: 'Hydration', labelAr: 'الترطيب', color: 'bg-blue-100 text-blue-700', icon: 'Droplet' },
  { id: 'oily-skin', labelEn: 'Oily Skin', labelAr: 'البشرة الدهنية', color: 'bg-yellow-100 text-yellow-700', icon: 'Sun' },
  { id: 'dry-skin', labelEn: 'Dry Skin', labelAr: 'البشرة الجافة', color: 'bg-orange-100 text-orange-700', icon: 'Wind' },
  { id: 'sensitivity', labelEn: 'Sensitivity', labelAr: 'الحساسية', color: 'bg-pink-100 text-pink-700', icon: 'Heart' },
  { id: 'dark-spots', labelEn: 'Dark Spots', labelAr: 'البقع الداكنة', color: 'bg-amber-100 text-amber-700', icon: 'Target' },
  { id: 'wrinkles', labelEn: 'Wrinkles', labelAr: 'التجاعيد', color: 'bg-indigo-100 text-indigo-700', icon: 'Minus' },
  { id: 'sun-protection', labelEn: 'Sun Protection', labelAr: 'الحماية من الشمس', color: 'bg-sky-100 text-sky-700', icon: 'Sun' },
  { id: 'redness', labelEn: 'Redness', labelAr: 'الاحمرار', color: 'bg-rose-100 text-rose-700', icon: 'Flame' },
  { id: 'cleansing', labelEn: 'Cleansing', labelAr: 'التنظيف', color: 'bg-teal-100 text-teal-700', icon: 'Sparkles' },
];

// Price ranges in JOD
export const PRICE_RANGES = [
  { id: 'under-5', min: 0, max: 5, labelEn: 'Under 5 JD', labelAr: 'أقل من 5 دينار' },
  { id: '5-15', min: 5, max: 15, labelEn: '5 - 15 JD', labelAr: '5 - 15 دينار' },
  { id: '15-30', min: 15, max: 30, labelEn: '15 - 30 JD', labelAr: '15 - 30 دينار' },
  { id: '30-50', min: 30, max: 50, labelEn: '30 - 50 JD', labelAr: '30 - 50 دينار' },
  { id: 'over-50', min: 50, max: 999999, labelEn: 'Over 50 JD', labelAr: 'أكثر من 50 دينار' },
];

// Get skin concern by ID
export function getSkinConcernById(id: string) {
  return SKIN_CONCERNS.find(c => c.id === id) || null;
}
