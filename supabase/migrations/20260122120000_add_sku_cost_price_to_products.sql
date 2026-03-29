-- Add SKU + cost_price to support bulk imports/upserts
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS sku text,
ADD COLUMN IF NOT EXISTS cost_price numeric;

-- Ensure SKU is unique when present (allows upsert via onConflict)
CREATE UNIQUE INDEX IF NOT EXISTS products_sku_unique
ON public.products (sku)
WHERE sku IS NOT NULL;

