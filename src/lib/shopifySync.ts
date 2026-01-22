/**
 * Enhanced Shopify Sync Service for Asper Beauty Shop
 * Handles bidirectional product sync between Supabase and Shopify
 */

import { supabase } from '@/integrations/supabase/client';
import { fetchProducts, type ShopifyProduct } from './shopify';
import { categorizeProduct, detectBrandFromName, type BrandInfo } from './categoryMapping';

// Sync status types
export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

export interface SyncResult {
  success: boolean;
  message: string;
  synced: number;
  created: number;
  updated: number;
  errors: Array<{ productId: string; error: string }>;
}

export interface SyncOptions {
  direction: 'shopify-to-supabase' | 'supabase-to-shopify' | 'bidirectional';
  updateExisting: boolean;
  createNew: boolean;
  batchSize: number;
}

const DEFAULT_SYNC_OPTIONS: SyncOptions = {
  direction: 'shopify-to-supabase',
  updateExisting: true,
  createNew: true,
  batchSize: 50,
};

/**
 * Transform Shopify product to Supabase format
 */
export function transformShopifyToSupabase(shopifyProduct: ShopifyProduct): Record<string, any> {
  const product = shopifyProduct.node;
  const firstVariant = product.variants.edges[0]?.node;
  const firstImage = product.images.edges[0]?.node;
  
  // Get pricing
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = firstVariant?.compareAtPrice 
    ? parseFloat(firstVariant.compareAtPrice.amount) 
    : null;
  
  // Calculate discount
  const isOnSale = compareAtPrice && compareAtPrice > price;
  const discountPercent = isOnSale 
    ? Math.round(((compareAtPrice! - price) / compareAtPrice!) * 100) 
    : null;
  
  // Categorize product
  const searchText = `${product.title} ${product.productType || ''} ${product.vendor || ''}`;
  const categorySlug = categorizeProduct(product.title, product.productType, product.vendor);
  
  // Detect brand
  const detectedBrand = detectBrandFromName(searchText);
  
  // Map category slug to display name
  const categoryMap: Record<string, string> = {
    'skin-care': 'Skin Care',
    'hair-care': 'Hair Care',
    'make-up': 'Makeup',
    'body-care': 'Body Care',
    'fragrances': 'Fragrances',
    'tools-devices': 'Tools & Devices',
  };
  
  return {
    title: product.title,
    description: product.description || null,
    price: price,
    original_price: compareAtPrice,
    discount_percent: discountPercent,
    is_on_sale: isOnSale,
    category: categoryMap[categorySlug] || 'Uncategorized',
    subcategory: product.productType || null,
    brand: detectedBrand?.name || product.vendor || null,
    image_url: firstImage?.url || null,
    source_url: `https://lovable-project-milns.myshopify.com/products/${product.handle}`,
    tags: product.tags || [],
  };
}

/**
 * Transform Supabase product to Shopify format
 */
export function transformSupabaseToShopify(product: any): Record<string, any> {
  return {
    title: product.title,
    body_html: product.description || '',
    vendor: product.brand || 'Asper',
    product_type: product.subcategory || product.category || 'General',
    tags: product.tags?.join(', ') || `${product.category}, bulk-upload`,
    status: 'active',
    variants: [
      {
        price: product.price.toFixed(2),
        compare_at_price: product.original_price?.toFixed(2) || null,
        sku: product.id,
        inventory_management: 'shopify',
        inventory_policy: 'continue',
      },
    ],
    images: product.image_url ? [
      {
        src: product.image_url,
        alt: product.title,
      },
    ] : [],
  };
}

/**
 * Sync products from Shopify to Supabase
 */
export async function syncShopifyToSupabase(
  options: Partial<SyncOptions> = {}
): Promise<SyncResult> {
  const opts = { ...DEFAULT_SYNC_OPTIONS, ...options };
  const result: SyncResult = {
    success: false,
    message: '',
    synced: 0,
    created: 0,
    updated: 0,
    errors: [],
  };

  try {
    // Fetch products from Shopify
    const shopifyProducts = await fetchProducts(100);
    
    if (!shopifyProducts || shopifyProducts.length === 0) {
      result.message = 'No products found in Shopify';
      result.success = true;
      return result;
    }

    console.log(`Fetched ${shopifyProducts.length} products from Shopify`);

    // Get existing products from Supabase for comparison
    const { data: existingProducts } = await supabase
      .from('products')
      .select('id, title, source_url');

    const existingUrls = new Set(existingProducts?.map(p => p.source_url) || []);
    const existingTitles = new Set(existingProducts?.map(p => p.title.toLowerCase()) || []);

    // Process products in batches
    for (let i = 0; i < shopifyProducts.length; i += opts.batchSize) {
      const batch = shopifyProducts.slice(i, i + opts.batchSize);
      
      for (const shopifyProduct of batch) {
        try {
          const product = shopifyProduct.node;
          const sourceUrl = `https://lovable-project-milns.myshopify.com/products/${product.handle}`;
          const transformedProduct = transformShopifyToSupabase(shopifyProduct);

          // Check if product exists
          const productExists = existingUrls.has(sourceUrl) || 
            existingTitles.has(product.title.toLowerCase());

          if (productExists && opts.updateExisting) {
            // Update existing product
            const { error } = await supabase
              .from('products')
              .update({
                ...transformedProduct,
                updated_at: new Date().toISOString(),
              })
              .eq('source_url', sourceUrl);

            if (error) throw error;
            result.updated++;
          } else if (!productExists && opts.createNew) {
            // Create new product
            const { error } = await supabase
              .from('products')
              .insert(transformedProduct);

            if (error) throw error;
            result.created++;
          }

          result.synced++;
        } catch (error: any) {
          result.errors.push({
            productId: shopifyProduct.node.id,
            error: error.message || 'Unknown error',
          });
        }
      }
    }

    result.success = result.errors.length === 0;
    result.message = `Synced ${result.synced} products (${result.created} created, ${result.updated} updated)`;
    
    if (result.errors.length > 0) {
      result.message += `. ${result.errors.length} errors occurred.`;
    }

    return result;
  } catch (error: any) {
    result.success = false;
    result.message = error.message || 'Sync failed';
    return result;
  }
}

/**
 * Get sync status for a product
 */
export async function getProductSyncStatus(productId: string): Promise<{
  inSupabase: boolean;
  inShopify: boolean;
  lastSynced?: string;
}> {
  try {
    const { data: product } = await supabase
      .from('products')
      .select('source_url, updated_at')
      .eq('id', productId)
      .single();

    return {
      inSupabase: !!product,
      inShopify: !!product?.source_url,
      lastSynced: product?.updated_at,
    };
  } catch {
    return {
      inSupabase: false,
      inShopify: false,
    };
  }
}

/**
 * Get products that need syncing
 */
export async function getProductsNeedingSync(): Promise<any[]> {
  try {
    // Get products without source_url (not synced to Shopify)
    const { data } = await supabase
      .from('products')
      .select('*')
      .is('source_url', null);

    return data || [];
  } catch (error) {
    console.error('Error getting products needing sync:', error);
    return [];
  }
}

/**
 * Manual product sync trigger
 */
export async function triggerManualSync(
  productIds: string[],
  direction: 'to-shopify' | 'from-shopify' = 'to-shopify'
): Promise<SyncResult> {
  const result: SyncResult = {
    success: false,
    message: '',
    synced: 0,
    created: 0,
    updated: 0,
    errors: [],
  };

  try {
    // Get session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      result.message = 'Authentication required';
      return result;
    }

    if (direction === 'to-shopify') {
      // Get products from Supabase
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .in('id', productIds);

      if (error) throw error;

      // Sync each product to Shopify
      for (const product of products || []) {
        try {
          const shopifyProduct = transformSupabaseToShopify(product);
          
          const { data, error: syncError } = await supabase.functions.invoke(
            'bulk-product-upload',
            {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
              body: {
                action: 'create-shopify-product',
                product: {
                  ...shopifyProduct,
                  imageUrl: product.image_url,
                },
              },
            }
          );

          if (syncError) throw syncError;
          if (data?.error) throw new Error(data.error);

          // Update source_url in Supabase
          if (data?.handle) {
            await supabase
              .from('products')
              .update({
                source_url: `https://lovable-project-milns.myshopify.com/products/${data.handle}`,
              })
              .eq('id', product.id);
          }

          result.synced++;
          result.created++;
        } catch (error: any) {
          result.errors.push({
            productId: product.id,
            error: error.message || 'Unknown error',
          });
        }
      }
    }

    result.success = result.errors.length === 0;
    result.message = `Synced ${result.synced} products`;
    
    return result;
  } catch (error: any) {
    result.success = false;
    result.message = error.message || 'Sync failed';
    return result;
  }
}

// Export sync utilities
export default {
  syncShopifyToSupabase,
  getProductSyncStatus,
  getProductsNeedingSync,
  triggerManualSync,
  transformShopifyToSupabase,
  transformSupabaseToShopify,
};
