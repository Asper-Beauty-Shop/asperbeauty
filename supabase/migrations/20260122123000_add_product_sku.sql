-- Add SKU column for bulk imports and upserts
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS sku TEXT;

-- Unique index for safe upserts (ignore nulls)
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_sku_unique
ON public.products (sku)
WHERE sku IS NOT NULL;
