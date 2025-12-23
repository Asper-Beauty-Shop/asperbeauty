import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { getCategoryInfo, normalizeCategorySlug } from "@/lib/categoryMapping";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const isRtl = language === 'ar';
  
  const normalizedSlug = slug ? normalizeCategorySlug(slug) : '';
  const category = getCategoryInfo(normalizedSlug);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="luxury-container text-center">
            <h1 className="font-display text-4xl text-primary mb-4">
              {isRtl ? 'المجموعة غير موجودة' : 'Collection Not Found'}
            </h1>
            <p className="font-body text-muted-foreground">
              {isRtl ? 'المجموعة التي تبحث عنها غير موجودة.' : "The collection you're looking for doesn't exist."}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = isRtl ? category.titleAr : category.title;
  const description = isRtl ? category.descriptionAr : category.description;
  const editorialTagline = isRtl ? category.editorialTaglineAr : category.editorialTagline;

  return (
    <div className={`min-h-screen bg-background ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="luxury-container">
          {/* Editorial Collection Banner */}
          <div className="relative mb-16 overflow-hidden rounded-lg">
            {/* Decorative emerald lines */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald to-transparent" />
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald to-transparent" />
            
            <div className="py-12 px-6 md:px-12 text-center bg-gradient-to-b from-mint to-secondary/30">
              {/* Category Icon/Flourish */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full border border-emerald/40 flex items-center justify-center bg-mint">
                  <span className="text-primary text-xl">✦</span>
                </div>
              </div>
              
              {/* Collection Title */}
              <h1 
                className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, hsl(160 84% 25%), hsl(160 84% 40%), hsl(160 84% 25%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </h1>
              
              {/* Emerald Divider */}
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-emerald to-transparent mx-auto mb-6" />
              
              {/* Editorial Tagline - Prominent */}
              <p className="font-display text-lg md:text-xl text-primary italic mb-6 max-w-2xl mx-auto">
                "{editorialTagline}"
              </p>
              
              {/* Description */}
              <p className="font-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Products Grid with Filters */}
          <ProductGrid showFilters categorySlug={normalizedSlug} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
