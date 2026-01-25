import React from 'react';
import { 
  ASPER_STORE, 
  generateLocalBusinessSchema, 
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateProductSchema,
  generateBreadcrumbSchema
} from '@/lib/locable';

interface StructuredDataProps {
  type: 'localBusiness' | 'organization' | 'website' | 'product' | 'breadcrumb' | 'all';
  product?: {
    id: string;
    title: string;
    description?: string;
    price: number;
    originalPrice?: number;
    brand?: string;
    category: string;
    imageUrl?: string;
    sku?: string;
    inStock?: boolean;
  };
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ 
  type, 
  product,
  breadcrumbs 
}) => {
  const store = ASPER_STORE;
  
  const schemas: object[] = [];

  if (type === 'all' || type === 'localBusiness') {
    schemas.push(generateLocalBusinessSchema(store));
  }
  
  if (type === 'all' || type === 'organization') {
    schemas.push(generateOrganizationSchema(store));
  }
  
  if (type === 'all' || type === 'website') {
    schemas.push(generateWebsiteSchema(store));
  }
  
  if (type === 'product' && product) {
    schemas.push(generateProductSchema(product));
  }
  
  if (type === 'breadcrumb' && breadcrumbs) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

// FAQ Schema Generator for FAQ pages
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): object => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Collection/Category Schema Generator
export const generateCollectionSchema = (collection: {
  name: string;
  description: string;
  url: string;
  products: Array<{ id: string; title: string; price: number; imageUrl?: string }>;
}): object => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: collection.name,
  description: collection.description,
  url: collection.url,
  hasPart: collection.products.map(product => ({
    '@type': 'Product',
    name: product.title,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'JOD',
    },
    image: product.imageUrl,
  })),
});

export default StructuredData;
