import { useState, useRef, useEffect } from 'react';
import { getProductImage } from '@/lib/productImageUtils';

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  category?: string;
  title?: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * SEO-optimized product image component with:
 * - Lazy loading for performance
 * - Proper alt text for accessibility and SEO
 * - Fallback images based on product category
 * - Loading skeleton
 * - Image format optimization hints
 */
export const ProductImage = ({
  src,
  alt,
  category = 'Skin Care',
  title = '',
  className = '',
  aspectRatio = 'square',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  onLoad,
  onError,
}: ProductImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Get the best image URL (actual or placeholder)
  const imageUrl = getProductImage(src, category, title || alt);
  
  // Generate SEO-friendly alt text
  const seoAlt = alt || `${title} - ${category} product from Asper Beauty Shop`;

  // Aspect ratio classes
  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  useEffect(() => {
    // If already loaded from cache, trigger load state
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden bg-muted/30 ${aspectClasses[aspectRatio]} ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/50 via-muted to-muted/50" />
      )}
      
      <img
        ref={imgRef}
        src={hasError ? getProductImage(null, category, title || alt) : imageUrl}
        alt={seoAlt}
        title={title || alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          h-full w-full object-cover transition-all duration-500
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
        `}
        // SEO attributes
        itemProp="image"
      />
    </div>
  );
};

/**
 * Gallery image for product detail pages
 * Includes zoom and lightbox-ready attributes
 */
export const ProductGalleryImage = ({
  src,
  alt,
  index = 0,
  category = 'Skin Care',
  title = '',
  className = '',
  onLoad,
}: ProductImageProps & { index?: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageUrl = getProductImage(src, category, title || alt);
  const seoAlt = `${alt} - View ${index + 1}`;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div className={`relative aspect-[4/5] overflow-hidden bg-muted/30 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/50 via-muted to-muted/50" />
      )}
      
      <img
        src={imageUrl}
        alt={seoAlt}
        title={title || alt}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding={index === 0 ? 'sync' : 'async'}
        fetchPriority={index === 0 ? 'high' : 'auto'}
        onLoad={handleLoad}
        className={`
          w-full h-full object-cover transition-all duration-700 
          hover:scale-105
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        itemProp="image"
        data-gallery-index={index}
      />
      
      {/* Figure caption for SEO */}
      <figcaption className="absolute bottom-6 left-6 text-xs font-light tracking-widest text-white/70 uppercase">
        Figure 0{index + 1} — {index === 0 ? "The Vessel" : "The Texture"}
      </figcaption>
    </div>
  );
};

export default ProductImage;
