/**
 * Product Import Script
 * Imports products from BeautyBox JSON data into Supabase
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rgehleqcubtmcwyipyvi.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZWhsZXFjdWJ0bWN3eWlweXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDM5MDEsImV4cCI6MjA4MzQxOTkwMX0.8BEpVzIvWc2do2v8v3pOP3txcTs52HsM4F7KVavlQNU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface RawProduct {
  brand?: string;
  categories?: string[];
  description?: string;
  medias?: Array<{
    id: string;
    type: string;
    url: string;
    alt?: string;
  }>;
  title: string;
  variants?: Array<{
    id: string;
    title: string;
    sku?: string;
    options?: string[];
    price: {
      current: number;
      previous?: number;
      stockStatus?: string;
    };
  }>;
  source?: {
    canonicalUrl?: string;
    retailer?: string;
    currency?: string;
  };
}

interface TransformedProduct {
  title: string;
  description: string | null;
  price: number;
  original_price: number | null;
  discount_percent: number | null;
  is_on_sale: boolean;
  image_url: string | null;
  category: string;
  subcategory: string | null;
  brand: string | null;
  tags: string[];
  volume_ml: string | null;
  source_url: string | null;
}

// Strip HTML tags from description
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2000); // Limit description length
}

// Extract volume from title or options
function extractVolume(title: string, options?: string[]): string | null {
  const volumeRegex = /(\d+(?:\.\d+)?)\s*(ml|ML|g|G|oz|OZ|L|l)/i;
  
  // Check title first
  const titleMatch = title.match(volumeRegex);
  if (titleMatch) {
    return `${titleMatch[1]}${titleMatch[2].toLowerCase()}`;
  }
  
  // Check options
  if (options) {
    for (const opt of options) {
      const optMatch = opt.match(volumeRegex);
      if (optMatch) {
        return `${optMatch[1]}${optMatch[2].toLowerCase()}`;
      }
    }
  }
  
  return null;
}

// Map category to our schema
function mapCategory(categories: string[] | undefined, title: string): string {
  if (!categories || categories.length === 0) {
    // Try to infer from title
    const titleLower = title.toLowerCase();
    if (titleLower.includes('serum')) return 'Skin Care';
    if (titleLower.includes('cream') || titleLower.includes('moistur')) return 'Skin Care';
    if (titleLower.includes('cleanser') || titleLower.includes('wash')) return 'Skin Care';
    if (titleLower.includes('lipstick') || titleLower.includes('mascara')) return 'Makeup';
    if (titleLower.includes('foundation') || titleLower.includes('concealer')) return 'Makeup';
    if (titleLower.includes('perfume') || titleLower.includes('parfum') || titleLower.includes('fragrance')) return 'Fragrance';
    if (titleLower.includes('shampoo') || titleLower.includes('conditioner') || titleLower.includes('hair')) return 'Hair Care';
    if (titleLower.includes('body') || titleLower.includes('lotion')) return 'Body Care';
    return 'Beauty';
  }
  
  const category = categories[0];
  
  // Map common categories
  const categoryMap: Record<string, string> = {
    'Serum': 'Skin Care',
    'Moisturizer': 'Skin Care',
    'Cleanser': 'Skin Care',
    'Toner': 'Skin Care',
    'Mask': 'Skin Care',
    'Eye Care': 'Skin Care',
    'Sunscreen': 'Skin Care',
    'Anti-Aging': 'Skin Care',
    'Acne': 'Skin Care',
    'Lipstick': 'Makeup',
    'Mascara': 'Makeup',
    'Foundation': 'Makeup',
    'Concealer': 'Makeup',
    'Primer': 'Makeup',
    'Eyeshadow': 'Makeup',
    'Blush': 'Makeup',
    'Highlighter': 'Makeup',
    'Makeup Set': 'Makeup',
    'Lip': 'Makeup',
    'Perfume': 'Fragrance',
    'Parfum': 'Fragrance',
    'Cologne': 'Fragrance',
    'Shampoo': 'Hair Care',
    'Conditioner': 'Hair Care',
    'Hair Treatment': 'Hair Care',
    'Hair Styling': 'Hair Care',
    'Body Lotion': 'Body Care',
    'Body Wash': 'Body Care',
    'Hand Cream': 'Body Care',
  };
  
  return categoryMap[category] || category;
}

// Transform raw product to our schema
function transformProduct(raw: RawProduct): TransformedProduct | null {
  if (!raw.title) return null;
  
  // Get price from first variant
  const variant = raw.variants?.[0];
  if (!variant) return null;
  
  // Price is in fils (1/1000 of JOD), convert to JOD
  const currentPrice = variant.price.current / 100;
  const previousPrice = variant.price.previous ? variant.price.previous / 100 : null;
  
  // Skip products with zero or negative price
  if (currentPrice <= 0) return null;
  
  // Calculate discount
  let discountPercent: number | null = null;
  let isOnSale = false;
  
  if (previousPrice && previousPrice > currentPrice) {
    discountPercent = Math.round(((previousPrice - currentPrice) / previousPrice) * 100);
    isOnSale = true;
  }
  
  // Get main image
  const mainImage = raw.medias?.find(m => m.type === 'Image')?.url || null;
  
  return {
    title: raw.title.trim(),
    description: raw.description ? stripHtml(raw.description) : null,
    price: currentPrice,
    original_price: previousPrice,
    discount_percent: discountPercent,
    is_on_sale: isOnSale,
    image_url: mainImage,
    category: mapCategory(raw.categories, raw.title),
    subcategory: raw.categories?.[0] || null,
    brand: raw.brand || null,
    tags: raw.categories || [],
    volume_ml: extractVolume(raw.title, variant.options),
    source_url: raw.source?.canonicalUrl || null,
  };
}

async function importProducts() {
  console.log('🚀 Starting product import...\n');
  
  // Read JSON file
  const jsonPath = path.join(process.cwd(), 'products_full.json');
  
  if (!fs.existsSync(jsonPath)) {
    console.error('❌ products_full.json not found!');
    process.exit(1);
  }
  
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const rawProducts: RawProduct[] = JSON.parse(rawData);
  
  console.log(`📦 Found ${rawProducts.length} raw products\n`);
  
  // Transform products
  const transformedProducts = rawProducts
    .map(transformProduct)
    .filter((p): p is TransformedProduct => p !== null);
  
  console.log(`✅ Transformed ${transformedProducts.length} valid products\n`);
  
  // Remove duplicates by title
  const uniqueProducts = new Map<string, TransformedProduct>();
  transformedProducts.forEach(p => {
    const key = p.title.toLowerCase();
    if (!uniqueProducts.has(key)) {
      uniqueProducts.set(key, p);
    }
  });
  
  const products = Array.from(uniqueProducts.values());
  console.log(`🔄 Unique products: ${products.length}\n`);
  
  // Import in batches
  const BATCH_SIZE = 100;
  let imported = 0;
  let errors = 0;
  
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(batch);
      
      if (error) {
        console.error(`❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} error:`, error.message);
        errors += batch.length;
      } else {
        imported += batch.length;
        console.log(`✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}: Imported ${batch.length} products (Total: ${imported})`);
      }
    } catch (err) {
      console.error(`❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, err);
      errors += batch.length;
    }
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n📊 Import Summary:');
  console.log(`   ✅ Successfully imported: ${imported}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('\n🎉 Import complete!');
}

// Run the import
importProducts().catch(console.error);
