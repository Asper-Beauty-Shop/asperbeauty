/**
 * Locable.ai Integration for Asper Beauty Shop
 * Provides AI-powered features for product recommendations,
 * intelligent search, and personalized shopping experiences
 */

import { supabase } from '@/integrations/supabase/client';

// Locable.ai Configuration
export interface LocableConfig {
  enableAiRecommendations: boolean;
  enableSmartSearch: boolean;
  enablePersonalization: boolean;
  enableChatAssistant: boolean;
}

export const LOCABLE_CONFIG: LocableConfig = {
  enableAiRecommendations: true,
  enableSmartSearch: true,
  enablePersonalization: true,
  enableChatAssistant: true,
};

// Product Recommendation Types
export interface ProductRecommendation {
  productId: string;
  score: number;
  reason: string;
  reasonAr?: string;
}

export interface RecommendationContext {
  userId?: string;
  currentProductId?: string;
  category?: string;
  brand?: string;
  skinConcerns?: string[];
  recentlyViewed?: string[];
  cartItems?: string[];
}

// AI-powered product categorization keywords
export const AI_CATEGORY_KEYWORDS = {
  'Skin Care': {
    en: ['serum', 'cream', 'lotion', 'moisturizer', 'cleanser', 'toner', 'mask', 'sunscreen', 'spf', 'retinol', 'vitamin c', 'niacinamide', 'hyaluronic', 'face', 'facial', 'anti-aging', 'wrinkle', 'acne', 'blemish'],
    ar: ['كريم', 'سيروم', 'مرطب', 'منظف', 'تونر', 'ماسك', 'واقي شمس', 'بشرة', 'وجه']
  },
  'Hair Care': {
    en: ['shampoo', 'conditioner', 'hair', 'scalp', 'oil', 'treatment', 'mask', 'styling', 'color', 'dye', 'keratin', 'argan'],
    ar: ['شامبو', 'بلسم', 'شعر', 'زيت', 'علاج', 'صبغة']
  },
  'Body Care': {
    en: ['body lotion', 'body wash', 'body butter', 'shower', 'bath', 'hand cream', 'foot', 'scrub', 'exfoliate'],
    ar: ['لوشن الجسم', 'غسول الجسم', 'يد', 'قدم']
  },
  'Makeup': {
    en: ['lipstick', 'mascara', 'foundation', 'concealer', 'blush', 'bronzer', 'eyeshadow', 'eyeliner', 'nail', 'polish', 'makeup', 'cosmetic'],
    ar: ['أحمر شفاه', 'ماسكارا', 'كريم أساس', 'بلاشر', 'ظلال', 'طلاء أظافر', 'مكياج']
  },
  'Fragrance': {
    en: ['perfume', 'parfum', 'cologne', 'fragrance', 'eau de', 'body mist', 'scent'],
    ar: ['عطر', 'بيرفيوم', 'كولونيا', 'بخاخ']
  },
  'Health & Supplements': {
    en: ['vitamin', 'supplement', 'capsule', 'tablet', 'omega', 'probiotic', 'mineral', 'immune', 'digestive'],
    ar: ['فيتامين', 'مكمل', 'كبسولة', 'قرص', 'أوميغا']
  },
  'Personal Care': {
    en: ['deodorant', 'antiperspirant', 'toothpaste', 'mouthwash', 'razor', 'shaving'],
    ar: ['مزيل عرق', 'معجون أسنان', 'حلاقة']
  },
  'Baby Care': {
    en: ['baby', 'infant', 'diaper', 'nappy', 'gentle', 'kids', 'children'],
    ar: ['طفل', 'أطفال', 'حفاض', 'رضيع']
  },
  'Medical': {
    en: ['eye drops', 'medical', 'pharmaceutical', 'ointment', 'bandage', 'first aid', 'pain relief'],
    ar: ['قطرة عين', 'طبي', 'صيدلاني', 'مرهم']
  }
};

// Brand detection patterns
export const BRAND_PATTERNS = [
  { pattern: /palmer'?s/i, brand: "Palmer's" },
  { pattern: /eucerin/i, brand: 'Eucerin' },
  { pattern: /vichy/i, brand: 'Vichy' },
  { pattern: /bioderma/i, brand: 'Bioderma' },
  { pattern: /la.?roche.?posay/i, brand: 'La Roche-Posay' },
  { pattern: /cetaphil/i, brand: 'Cetaphil' },
  { pattern: /cerave/i, brand: 'CeraVe' },
  { pattern: /olaplex/i, brand: 'Olaplex' },
  { pattern: /the.?ordinary/i, brand: 'The Ordinary' },
  { pattern: /avene|avène/i, brand: 'Avène' },
  { pattern: /uriage/i, brand: 'Uriage' },
  { pattern: /svr/i, brand: 'SVR' },
  { pattern: /nuxe/i, brand: 'NUXE' },
  { pattern: /filorga/i, brand: 'Filorga' },
  { pattern: /isdin/i, brand: 'ISDIN' },
  { pattern: /neutrogena/i, brand: 'Neutrogena' },
  { pattern: /jergens/i, brand: 'Jergens' },
  { pattern: /speed.?stick/i, brand: 'Speed Stick' },
  { pattern: /old.?spice/i, brand: 'Old Spice' },
  { pattern: /arm.?&?.?hammer/i, brand: 'Arm & Hammer' },
  { pattern: /sundown/i, brand: 'Sundown' },
  { pattern: /jamieson/i, brand: 'Jamieson' },
  { pattern: /nature.?made/i, brand: 'Nature Made' },
  { pattern: /now.?foods/i, brand: 'NOW Foods' },
  { pattern: /bourjois/i, brand: 'Bourjois' },
  { pattern: /mavala/i, brand: 'Mavala' },
  { pattern: /isadora/i, brand: 'Isadora' },
  { pattern: /essence/i, brand: 'Essence' },
  { pattern: /catrice/i, brand: 'Catrice' },
  { pattern: /mustela/i, brand: 'Mustela' },
  { pattern: /chicco/i, brand: 'Chicco' },
  { pattern: /artelac/i, brand: 'Artelac' },
  { pattern: /systane/i, brand: 'Systane' },
  { pattern: /kerastase|kérastase/i, brand: 'Kérastase' },
  { pattern: /dior/i, brand: 'Dior' },
  { pattern: /lancome|lancôme/i, brand: 'Lancôme' },
  { pattern: /clinique/i, brand: 'Clinique' },
  { pattern: /estee.?lauder/i, brand: 'Estée Lauder' },
  { pattern: /ysl|yves.?saint.?laurent/i, brand: 'YSL Beauty' },
];

/**
 * AI-powered product categorization
 */
export function categorizeProduct(productName: string): { category: string; confidence: number } {
  const nameLower = productName.toLowerCase();
  let bestMatch = { category: 'Uncategorized', confidence: 0 };

  for (const [category, keywords] of Object.entries(AI_CATEGORY_KEYWORDS)) {
    const allKeywords = [...keywords.en, ...keywords.ar];
    let matchCount = 0;
    
    for (const keyword of allKeywords) {
      if (nameLower.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }
    
    const confidence = matchCount / allKeywords.length;
    if (confidence > bestMatch.confidence) {
      bestMatch = { category, confidence };
    }
  }

  return bestMatch;
}

/**
 * AI-powered brand detection
 */
export function detectBrand(productName: string): string | null {
  for (const { pattern, brand } of BRAND_PATTERNS) {
    if (pattern.test(productName)) {
      return brand;
    }
  }
  return null;
}

/**
 * Generate personalized product recommendations
 */
export async function getPersonalizedRecommendations(
  context: RecommendationContext
): Promise<ProductRecommendation[]> {
  try {
    // Fetch products based on context
    let query = supabase.from('products').select('*');

    // If viewing a specific product, get related products
    if (context.currentProductId) {
      const { data: currentProduct } = await supabase
        .from('products')
        .select('category, brand, skin_concerns')
        .eq('id', context.currentProductId)
        .single();

      if (currentProduct) {
        query = query
          .or(`category.eq.${currentProduct.category},brand.eq.${currentProduct.brand}`)
          .neq('id', context.currentProductId);
      }
    }

    // Filter by skin concerns if provided
    if (context.skinConcerns && context.skinConcerns.length > 0) {
      query = query.overlaps('skin_concerns', context.skinConcerns);
    }

    // Exclude recently viewed and cart items
    const excludeIds = [
      ...(context.recentlyViewed || []),
      ...(context.cartItems || []),
    ];
    if (excludeIds.length > 0) {
      query = query.not('id', 'in', `(${excludeIds.join(',')})`);
    }

    const { data: products, error } = await query.limit(10);

    if (error) throw error;

    // Score and rank products
    const recommendations: ProductRecommendation[] = (products || []).map((product) => {
      let score = 50; // Base score
      let reason = 'Popular product';
      let reasonAr = 'منتج شائع';

      // Boost score for on-sale items
      if (product.is_on_sale) {
        score += 20;
        reason = 'On sale now!';
        reasonAr = 'معروض الآن!';
      }

      // Boost for matching category
      if (context.category && product.category === context.category) {
        score += 15;
        reason = `Similar ${context.category.toLowerCase()} product`;
        reasonAr = `منتج ${product.category} مشابه`;
      }

      // Boost for matching brand
      if (context.brand && product.brand === context.brand) {
        score += 10;
        reason = `More from ${context.brand}`;
        reasonAr = `المزيد من ${context.brand}`;
      }

      return {
        productId: product.id,
        score,
        reason,
        reasonAr,
      };
    });

    // Sort by score descending
    return recommendations.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}

/**
 * AI-powered smart search
 */
export async function smartSearch(
  query: string,
  options: {
    limit?: number;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    onSaleOnly?: boolean;
  } = {}
): Promise<any[]> {
  try {
    const { limit = 20, category, brand, minPrice, maxPrice, onSaleOnly } = options;
    
    // Detect if query is looking for a specific brand
    const detectedBrand = detectBrand(query);
    const searchBrand = brand || detectedBrand;

    // Build Supabase query
    let dbQuery = supabase
      .from('products')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`);

    if (category) {
      dbQuery = dbQuery.eq('category', category);
    }

    if (searchBrand) {
      dbQuery = dbQuery.eq('brand', searchBrand);
    }

    if (minPrice !== undefined) {
      dbQuery = dbQuery.gte('price', minPrice);
    }

    if (maxPrice !== undefined) {
      dbQuery = dbQuery.lte('price', maxPrice);
    }

    if (onSaleOnly) {
      dbQuery = dbQuery.eq('is_on_sale', true);
    }

    const { data, error } = await dbQuery.limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error in smart search:', error);
    return [];
  }
}

/**
 * Generate AI-powered product description
 */
export function generateProductDescription(
  productName: string,
  category: string,
  brand: string
): { en: string; ar: string } {
  const descriptionTemplates: Record<string, { en: string; ar: string }> = {
    'Skin Care': {
      en: `Discover ${productName} by ${brand} - a premium skincare solution designed to nourish and protect your skin. This expertly formulated product delivers visible results for healthier, more radiant skin.`,
      ar: `اكتشفي ${productName} من ${brand} - حل للعناية بالبشرة الفاخرة مصمم لتغذية وحماية بشرتك. يقدم هذا المنتج المركب بخبرة نتائج مرئية لبشرة أكثر صحة وإشراقاً.`
    },
    'Hair Care': {
      en: `Transform your hair with ${productName} by ${brand} - a professional-grade hair care solution that strengthens, nourishes, and restores your hair to its natural beauty.`,
      ar: `حولي شعرك مع ${productName} من ${brand} - حل للعناية بالشعر بمستوى احترافي يقوي ويغذي ويعيد شعرك إلى جماله الطبيعي.`
    },
    'Body Care': {
      en: `Indulge in luxury with ${productName} by ${brand} - a premium body care product that leaves your skin feeling soft, smooth, and beautifully hydrated.`,
      ar: `دللي نفسك بالفخامة مع ${productName} من ${brand} - منتج فاخر للعناية بالجسم يترك بشرتك ناعمة وملساء ومرطبة بشكل جميل.`
    },
    'Makeup': {
      en: `Express your beauty with ${productName} by ${brand} - a high-quality makeup product designed to enhance your natural features with stunning, long-lasting results.`,
      ar: `عبري عن جمالك مع ${productName} من ${brand} - منتج مكياج عالي الجودة مصمم لتعزيز ملامحك الطبيعية بنتائج مذهلة تدوم طويلاً.`
    },
    'default': {
      en: `Introducing ${productName} by ${brand} - a quality product designed to meet your beauty and wellness needs with professional-grade ingredients and results.`,
      ar: `نقدم لكم ${productName} من ${brand} - منتج عالي الجودة مصمم لتلبية احتياجات جمالك وعافيتك بمكونات ونتائج بمستوى احترافي.`
    }
  };

  return descriptionTemplates[category] || descriptionTemplates['default'];
}

/**
 * Get trending products based on various factors
 */
export async function getTrendingProducts(limit: number = 8): Promise<any[]> {
  try {
    // Get products that are on sale or recently added
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or('is_on_sale.eq.true')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error getting trending products:', error);
    return [];
  }
}

/**
 * Get products by skin concern
 */
export async function getProductsBySkinConcern(
  concern: string,
  limit: number = 10
): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .contains('skin_concerns', [concern])
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error getting products by skin concern:', error);
    return [];
  }
}

/**
 * Generate product tags based on name and category
 */
export function generateProductTags(
  productName: string,
  category: string,
  brand: string
): string[] {
  const tags: string[] = [];
  const nameLower = productName.toLowerCase();

  // Add brand tag
  if (brand) {
    tags.push(brand.toLowerCase());
  }

  // Add category tag
  if (category) {
    tags.push(category.toLowerCase().replace(/\s+/g, '-'));
  }

  // Add keyword-based tags
  const keywordTags: Record<string, string[]> = {
    'moisturiz': ['moisturizing', 'hydrating'],
    'hydrat': ['hydrating', 'moisture'],
    'anti-ag': ['anti-aging', 'mature-skin'],
    'vitamin c': ['brightening', 'antioxidant'],
    'retinol': ['anti-aging', 'night-care'],
    'spf': ['sun-protection', 'daily-use'],
    'sunscreen': ['sun-protection', 'uv-protection'],
    'acne': ['acne-prone', 'blemish-control'],
    'sensitive': ['gentle', 'fragrance-free'],
    'oily': ['oil-control', 'mattifying'],
    'dry': ['intense-hydration', 'nourishing'],
  };

  for (const [keyword, tagsToAdd] of Object.entries(keywordTags)) {
    if (nameLower.includes(keyword)) {
      tags.push(...tagsToAdd);
    }
  }

  // Remove duplicates
  return [...new Set(tags)];
}

// Export configuration
export default {
  config: LOCABLE_CONFIG,
  categorizeProduct,
  detectBrand,
  getPersonalizedRecommendations,
  smartSearch,
  generateProductDescription,
  getTrendingProducts,
  getProductsBySkinConcern,
  generateProductTags,
};
