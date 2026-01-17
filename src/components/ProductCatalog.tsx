import { useEffect, useState, useMemo } from "react";
import { Plus, ShoppingBag, Star, Sparkles, Loader2, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getProductImage } from "@/lib/productImageUtils";

// Product type from Supabase
interface Product {
  id: string;
  title: string;
  price: number;
  description: string | null;
  category: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Badge styling based on category
const getBadgeVariant = (category: string) => {
  switch (category) {
    case "Best Seller":
      return "bg-gold text-burgundy";
    case "New Arrival":
      return "bg-burgundy text-white";
    case "Trending":
      return "bg-burgundy-light text-white";
    case "Featured":
      return "bg-gold/80 text-burgundy";
    default:
      return "bg-secondary text-foreground";
  }
};

// Badge icon based on category
const getBadgeIcon = (category: string) => {
  switch (category) {
    case "Best Seller":
      return <Star className="w-3 h-3 fill-current" />;
    case "New Arrival":
      return <Sparkles className="w-3 h-3" />;
    default:
      return null;
  }
};

// ProductCard Component
const ProductCard = ({ product }: { product: Product }) => {
  const { language } = useLanguage();
  const imageUrl = getProductImage(product.image_url, product.category, product.title);

  const handleAddToCart = () => {
    toast.success(language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to cart', {
      description: product.title,
      position: "top-center",
    });
  };

  return (
    <article className="group relative bg-white rounded-xl overflow-hidden border border-gold/10 shadow-gold-sm hover:shadow-gold-lg transition-all duration-500 ease-luxury">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category Badge Overlay */}
        <Badge 
          className={`absolute top-3 left-3 z-10 ${getBadgeVariant(product.category)} font-body text-[10px] uppercase tracking-wider px-2.5 py-1 flex items-center gap-1.5 shadow-md border-0`}
        >
          {getBadgeIcon(product.category)}
          {product.category}
        </Badge>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/10 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 space-y-3">
        {/* Title */}
        <h3 className="font-display text-base md:text-lg text-foreground font-medium leading-tight line-clamp-1 group-hover:text-burgundy transition-colors duration-300">
          {product.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {product.description || 'Premium quality beauty product.'}
        </p>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <p className="font-display text-lg md:text-xl font-semibold text-burgundy">
            JOD {Number(product.price).toFixed(2)}
          </p>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-burgundy hover:bg-burgundy-light text-white font-body text-xs uppercase tracking-wider px-4 py-2 shadow-gold-sm hover:shadow-gold-md transition-all duration-300"
          >
            <Plus className="w-4 h-4 me-1.5" />
            {language === 'ar' ? 'إضافة' : 'Add'}
          </Button>
        </div>
      </div>

      {/* Gold accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </article>
  );
};

// Category filter options
const CATEGORY_FILTERS = [
  { value: "all", labelEn: "All", labelAr: "الكل", icon: null },
  { value: "Best Seller", labelEn: "Best Seller", labelAr: "الأكثر مبيعاً", icon: Star },
  { value: "New Arrival", labelEn: "New Arrival", labelAr: "وصل حديثاً", icon: Sparkles },
  { value: "Trending", labelEn: "Trending", labelAr: "رائج", icon: TrendingUp },
  { value: "Featured", labelEn: "Featured", labelAr: "مميز", icon: Award },
];

// ProductCatalog Section Component
export const ProductCatalog = () => {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);

        if (error) throw error;
        setProducts(data || []);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((product) => product.category === activeFilter);
  }, [products, activeFilter]);

  return (
    <section className="py-16 md:py-24 bg-cream relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="luxury-container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 mb-6 shadow-gold-badge">
            <ShoppingBag className="w-6 h-6 text-gold" />
          </div>

          {/* Subheading */}
          <p className="luxury-subheading text-gold mb-3">
            {language === 'ar' ? 'مجموعتنا المميزة' : 'Our Collection'}
          </p>

          {/* Main Heading */}
          <h2 className="luxury-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            {language === 'ar' ? 'منتجات فاخرة' : 'Luxury Essentials'}
          </h2>

          {/* Divider */}
          <div className="luxury-divider mt-6" />

          {/* Description */}
          <p className="font-body text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            {language === 'ar' 
              ? 'اكتشفي مجموعتنا المنتقاة بعناية من منتجات العناية بالبشرة والجمال الفاخرة'
              : 'Discover our carefully curated collection of premium skincare and beauty products'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-10">
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full max-w-3xl">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0">
              {CATEGORY_FILTERS.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <TabsTrigger
                    key={filter.value}
                    value={filter.value}
                    className="px-4 py-2.5 rounded-full font-body text-xs uppercase tracking-wider border border-gold/20 bg-white text-muted-foreground data-[state=active]:bg-burgundy data-[state=active]:text-white data-[state=active]:border-burgundy data-[state=active]:shadow-gold-md hover:border-gold/50 transition-all duration-300"
                  >
                    {IconComponent && (
                      <IconComponent className="w-3.5 h-3.5 me-1.5" />
                    )}
                    {language === 'ar' ? filter.labelAr : filter.labelEn}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              {language === 'ar' ? 'حدث خطأ في تحميل المنتجات' : 'Failed to load products'}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              {language === 'ar' 
                ? activeFilter === "all" ? 'لا توجد منتجات متاحة' : 'لا توجد منتجات في هذه الفئة'
                : activeFilter === "all" ? 'No products available' : 'No products in this category'}
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <Button
            variant="outline"
            className="luxury-button-secondary px-8 py-4 font-body text-sm uppercase tracking-widest border-2 border-gold text-burgundy hover:bg-gold/10"
          >
            {language === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
          </Button>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
};

export default ProductCatalog;
