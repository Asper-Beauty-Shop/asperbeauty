-- Add sku column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sku TEXT;
CREATE INDEX IF NOT EXISTS products_sku_idx ON public.products (sku);
