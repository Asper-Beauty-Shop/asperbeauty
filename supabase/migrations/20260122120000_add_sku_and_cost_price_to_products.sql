-- Add SKU + cost price so we can reliably import/upsert Excel catalog
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS sku TEXT,
ADD COLUMN IF NOT EXISTS cost_price NUMERIC;

-- Ensure SKU is unique when present (allows upsert by SKU)
CREATE UNIQUE INDEX IF NOT EXISTS products_sku_unique
ON public.products (sku)
WHERE sku IS NOT NULL;

-- Helpful indexes for storefront filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products (brand);
