import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  product?: {
    price: number;
    currency: string;
    availability: 'in stock' | 'out of stock';
    brand?: string;
    category?: string;
    sku?: string;
  };
  keywords?: string[];
  noIndex?: boolean;
}

const BASE_URL = 'https://asperbeauty.com';
const DEFAULT_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/CWvzMa0edDSZbnhOvyBkAZNNk562/social-images/social-1767231032906-IMG-20251203-WA0009.jpg';
const SITE_NAME = 'Asper Beauty Shop';

export const SEO = ({
  title,
  description = 'Discover premium skincare and beauty products at Asper Beauty Shop. Curated luxury essentials for your daily beauty ritual.',
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  product,
  keywords = ['skincare', 'beauty', 'cosmetics', 'luxury', 'Jordan', 'Amman'],
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

  // Generate JSON-LD structured data
  const structuredData = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        description,
        image: image,
        brand: product.brand ? {
          '@type': 'Brand',
          name: product.brand,
        } : undefined,
        category: product.category,
        sku: product.sku,
        offers: {
          '@type': 'Offer',
          price: product.price.toFixed(3),
          priceCurrency: product.currency,
          availability: product.availability === 'in stock' 
            ? 'https://schema.org/InStock' 
            : 'https://schema.org/OutOfStock',
          url: fullUrl,
          seller: {
            '@type': 'Organization',
            name: SITE_NAME,
          },
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: BASE_URL,
        description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE_URL}/shop?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullUrl} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'product' ? 'product' : 'website'} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title || SITE_NAME} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ar_JO" />

      {/* Product-specific Open Graph */}
      {product && (
        <>
          <meta property="product:price:amount" content={product.price.toFixed(3)} />
          <meta property="product:price:currency" content={product.currency} />
          <meta property="product:availability" content={product.availability} />
          {product.brand && <meta property="product:brand" content={product.brand} />}
          {product.category && <meta property="product:category" content={product.category} />}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@AsperBeauty" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
