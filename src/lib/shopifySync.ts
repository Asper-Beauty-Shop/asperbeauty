// Shopify Sync Enhancement for Asper Beauty Shop
// Handles bulk product synchronization with Shopify

import { supabase } from '@/integrations/supabase/client';
import { ProductData } from './productData';
import { toast } from 'sonner';

// Shopify API configuration
const SHOPIFY_STORE_DOMAIN = 'lovable-project-milns.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';

interface ShopifyProductInput {
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string;
  status: 'active' | 'draft' | 'archived';
  variants: Array<{
    price: string;
    sku: string;
    inventory_management: string;
    inventory_policy: string;
  }>;
  images?: Array<{
    src: string;
    alt: string;
  }>;
}

// Transform ProductData to Shopify format
export function transformToShopifyProduct(product: ProductData): ShopifyProductInput {
  const tags = [
    product.category,
    product.subcategory,
    product.brand,
    ...product.tags,
    ...product.skinConcerns,
  ].filter(Boolean).join(', ');

  // Create SEO-optimized description
  const description = `
    <div class="product-description">
      <h3>${product.brand}</h3>
      <p>${product.description}</p>
      ${product.volumeMl ? `<p><strong>Size:</strong> ${product.volumeMl}</p>` : ''}
      ${product.skinConcerns.length > 0 ? `
        <p><strong>Good for:</strong> ${product.skinConcerns.join(', ')}</p>
      ` : ''}
    </div>
  `;

  return {
    title: product.title,
    body_html: description,
    vendor: product.brand,
    product_type: product.category,
    tags,
    status: 'active',
    variants: [
      {
        price: product.price.toFixed(2),
        sku: product.sku,
        inventory_management: 'shopify',
        inventory_policy: 'continue',
      },
    ],
    images: product.imageUrl ? [
      {
        src: product.imageUrl,
        alt: product.title,
      },
    ] : undefined,
  };
}

// Bulk sync products to Shopify via Edge Function
export async function bulkSyncToShopify(
  products: ProductData[],
  onProgress?: (current: number, total: number, status: string) => void
): Promise<{
  success: number;
  failed: number;
  errors: Array<{ sku: string; title: string; error: string }>;
}> {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as Array<{ sku: string; title: string; error: string }>,
  };

  // Get auth session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    toast.error('Please log in as admin to sync products');
    return results;
  }

  const total = products.length;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    onProgress?.(i + 1, total, `Syncing ${product.title}...`);

    try {
      const shopifyProduct = transformToShopifyProduct(product);
      
      const { data, error } = await supabase.functions.invoke('bulk-product-upload', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: {
          action: 'create-shopify-product',
          product: {
            title: shopifyProduct.title,
            body: shopifyProduct.body_html,
            vendor: shopifyProduct.vendor,
            product_type: shopifyProduct.product_type,
            tags: shopifyProduct.tags,
            price: shopifyProduct.variants[0].price,
            sku: shopifyProduct.variants[0].sku,
            imageUrl: shopifyProduct.images?.[0]?.src,
          },
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      results.success++;

      // Rate limiting delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
    } catch (error: any) {
      results.failed++;
      results.errors.push({
        sku: product.sku,
        title: product.title,
        error: error.message || 'Unknown error',
      });
      
      // Check for auth errors
      if (error.message?.includes('401') || error.message?.includes('403')) {
        toast.error('Authorization failed');
        break;
      }
      
      // Check for rate limiting
      if (error.message?.includes('429')) {
        toast.warning('Rate limited. Waiting 60 seconds...');
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    }
  }

  return results;
}

// Sync products from Supabase to Shopify
export async function syncSupabaseToShopify(
  onProgress?: (current: number, total: number, status: string) => void
): Promise<{
  success: number;
  failed: number;
  errors: Array<{ id: string; title: string; error: string }>;
}> {
  // Fetch all products from Supabase
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !products) {
    toast.error('Failed to fetch products from database');
    return { success: 0, failed: 0, errors: [{ id: '', title: '', error: error?.message || 'Unknown error' }] };
  }

  const results = {
    success: 0,
    failed: 0,
    errors: [] as Array<{ id: string; title: string; error: string }>,
  };

  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    toast.error('Please log in as admin to sync products');
    return results;
  }

  const total = products.length;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    onProgress?.(i + 1, total, `Syncing ${product.title}...`);

    try {
      const tags = [
        product.category,
        product.subcategory,
        product.brand,
        ...(product.tags || []),
        ...(product.skin_concerns || []),
      ].filter(Boolean).join(', ');

      const { data, error } = await supabase.functions.invoke('bulk-product-upload', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: {
          action: 'create-shopify-product',
          product: {
            title: product.title,
            body: product.description || '',
            vendor: product.brand || 'Asper Beauty',
            product_type: product.category,
            tags,
            price: product.price.toFixed(2),
            sku: product.id,
            imageUrl: product.image_url,
          },
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      results.success++;
      await new Promise(resolve => setTimeout(resolve, 300));
      
    } catch (error: any) {
      results.failed++;
      results.errors.push({
        id: product.id,
        title: product.title,
        error: error.message || 'Unknown error',
      });
      
      if (error.message?.includes('401') || error.message?.includes('403')) {
        break;
      }
      
      if (error.message?.includes('429')) {
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    }
  }

  return results;
}

// Generate Shopify product handle from title
export function generateHandle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get Shopify collection for category
export function getCategoryCollection(category: string): string {
  const collections: Record<string, string> = {
    'Skin Care': 'skincare',
    'Hair Care': 'hair-care',
    'Make Up': 'makeup',
    'Body Care': 'body-care',
    'Fragrances': 'fragrances',
    'Tools & Devices': 'tools-devices',
    'Health & Supplements': 'health-supplements',
  };
  
  return collections[category] || 'all-products';
}

// Format price for display
export function formatPrice(price: number, currency: string = 'JOD'): string {
  return new Intl.NumberFormat('en-JO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

// Calculate discount percentage
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
