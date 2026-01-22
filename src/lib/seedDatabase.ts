// Database Seeding Script for Asper Beauty Shop
// This script populates the Supabase database with product data

import { supabase } from '@/integrations/supabase/client';
import { PRODUCT_CATALOG, ProductData } from './productData';

interface InsertProduct {
  id?: string;
  title: string;
  description: string | null;
  category: string;
  subcategory: string | null;
  brand: string | null;
  price: number;
  original_price: number | null;
  discount_percent: number | null;
  is_on_sale: boolean | null;
  volume_ml: string | null;
  image_url: string | null;
  skin_concerns: string[] | null;
  tags: string[] | null;
  source_url: string | null;
}

// Transform ProductData to database format
function transformProduct(product: ProductData): InsertProduct {
  return {
    title: product.title,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory,
    brand: product.brand,
    price: product.price,
    original_price: product.originalPrice || null,
    discount_percent: product.discountPercent || null,
    is_on_sale: product.isOnSale,
    volume_ml: product.volumeMl || null,
    image_url: product.imageUrl || null,
    skin_concerns: product.skinConcerns.length > 0 ? product.skinConcerns : null,
    tags: product.tags.length > 0 ? product.tags : null,
    source_url: null,
  };
}

// Seed all products
export async function seedProducts(): Promise<{ success: number; failed: number; errors: string[] }> {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  // Transform all products
  const productsToInsert = PRODUCT_CATALOG.map(transformProduct);

  // Insert in batches of 50
  const batchSize = 50;
  for (let i = 0; i < productsToInsert.length; i += batchSize) {
    const batch = productsToInsert.slice(i, i + batchSize);
    
    const { data, error } = await supabase
      .from('products')
      .insert(batch)
      .select();

    if (error) {
      results.failed += batch.length;
      results.errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
    } else {
      results.success += data?.length || 0;
    }
  }

  return results;
}

// Seed products by category
export async function seedProductsByCategory(category: string): Promise<{ success: number; failed: number; errors: string[] }> {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  const categoryProducts = PRODUCT_CATALOG.filter(p => p.category === category);
  const productsToInsert = categoryProducts.map(transformProduct);

  const { data, error } = await supabase
    .from('products')
    .insert(productsToInsert)
    .select();

  if (error) {
    results.failed = productsToInsert.length;
    results.errors.push(error.message);
  } else {
    results.success = data?.length || 0;
  }

  return results;
}

// Update existing products with new data
export async function updateProducts(): Promise<{ updated: number; errors: string[] }> {
  const results = {
    updated: 0,
    errors: [] as string[],
  };

  for (const product of PRODUCT_CATALOG) {
    const { error } = await supabase
      .from('products')
      .update({
        description: product.description,
        original_price: product.originalPrice || null,
        discount_percent: product.discountPercent || null,
        is_on_sale: product.isOnSale,
        skin_concerns: product.skinConcerns.length > 0 ? product.skinConcerns : null,
        tags: product.tags.length > 0 ? product.tags : null,
      })
      .eq('title', product.title);

    if (error) {
      results.errors.push(`${product.title}: ${error.message}`);
    } else {
      results.updated++;
    }
  }

  return results;
}

// Clear all products (use with caution)
export async function clearProducts(): Promise<{ deleted: boolean; error: string | null }> {
  const { error } = await supabase
    .from('products')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  return {
    deleted: !error,
    error: error?.message || null,
  };
}

// Get product counts by category
export async function getProductCounts(): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('products')
    .select('category');

  if (error || !data) return {};

  const counts: Record<string, number> = {};
  for (const product of data) {
    counts[product.category] = (counts[product.category] || 0) + 1;
  }

  return counts;
}

// Validate and fix product data
export async function validateProducts(): Promise<{ valid: number; issues: string[] }> {
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error || !products) {
    return { valid: 0, issues: [error?.message || 'Failed to fetch products'] };
  }

  const issues: string[] = [];
  let valid = 0;

  for (const product of products) {
    const productIssues: string[] = [];

    if (!product.title) productIssues.push('Missing title');
    if (!product.price || product.price <= 0) productIssues.push('Invalid price');
    if (!product.category) productIssues.push('Missing category');
    if (product.is_on_sale && !product.original_price) productIssues.push('On sale but no original price');
    if (product.discount_percent && (product.discount_percent < 0 || product.discount_percent > 100)) {
      productIssues.push('Invalid discount percent');
    }

    if (productIssues.length > 0) {
      issues.push(`${product.title || product.id}: ${productIssues.join(', ')}`);
    } else {
      valid++;
    }
  }

  return { valid, issues };
}
