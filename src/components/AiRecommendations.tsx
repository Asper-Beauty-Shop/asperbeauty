/**
 * AI-Powered Product Recommendations Component
 * Integrates with locable.ai for intelligent product suggestions
 */

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, RefreshCw, Zap, TrendingUp, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LuxuryProductCard } from "@/components/LuxuryProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPersonalizedRecommendations, type RecommendationContext } from "@/lib/locableAi";

interface AiRecommendationsProps {
  title?: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  context?: RecommendationContext;
  limit?: number;
  variant?: "default" | "compact" | "featured";
  showViewAll?: boolean;
}

export const AiRecommendations = ({
  title = "Recommended For You",
  titleAr = "موصى به لك",
  subtitle = "Curated by AI based on your preferences",
  subtitleAr = "مختار بواسطة الذكاء الاصطناعي بناءً على تفضيلاتك",
  context = {},
  limit = 4,
  variant = "default",
  showViewAll = true,
}: AiRecommendationsProps) => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ["ai-recommendations", context, refreshKey],
    queryFn: async () => {
      // Get personalized recommendations
      const recommendations = await getPersonalizedRecommendations(context);
      const productIds = recommendations.slice(0, limit).map(r => r.productId);

      if (productIds.length === 0) {
        // Fallback to trending products
        const { data } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);
        return data || [];
      }

      // Fetch actual product data
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("id", productIds);

      if (error) throw error;
      
      // Sort by recommendation order
      return (data || []).sort((a, b) => {
        return productIds.indexOf(a.id) - productIds.indexOf(b.id);
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  if (variant === "compact") {
    return (
      <div className="bg-gradient-to-r from-gold/5 to-burgundy/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <h3 className="text-sm font-medium text-foreground">
              {isAr ? titleAr : title}
            </h3>
          </div>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            title={isAr ? "تحديث" : "Refresh"}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-muted-foreground ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products?.slice(0, 2).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group block bg-white rounded-lg overflow-hidden border border-border hover:border-gold/50 transition-colors"
              >
                <div className="aspect-square bg-muted/30">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-foreground line-clamp-1">
                    {product.title}
                  </p>
                  <p className="text-xs text-gold font-semibold mt-1">
                    {product.price.toFixed(3)} JD
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className={`py-16 md:py-24 ${variant === "featured" ? "bg-gradient-to-b from-cream to-background" : "bg-background"}`}>
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row md:mb-14">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="p-1.5 rounded-full bg-gradient-to-r from-gold/20 to-burgundy/20">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <Badge variant="outline" className="text-xs font-medium uppercase tracking-wider border-gold/30 text-gold">
                {isAr ? "مدعوم بالذكاء الاصطناعي" : "AI Powered"}
              </Badge>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
              {isAr ? titleAr : title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              {isAr ? subtitleAr : subtitle}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-muted hover:border-gold/50 hover:bg-gold/5 transition-all"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="text-sm">{isAr ? "تحديث" : "Refresh"}</span>
            </button>
            
            {showViewAll && (
              <Link
                to="/shop"
                className="group flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:text-gold"
              >
                {isAr ? "عرض الكل" : "View All"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        {/* AI Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
            <Zap className="w-3.5 h-3.5" />
            {isAr ? "توصيات شخصية" : "Personalized Picks"}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            {isAr ? "الأكثر رواجاً" : "Trending Now"}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-700 text-xs font-medium">
            <Heart className="w-3.5 h-3.5" />
            {isAr ? "مختار بعناية" : "Curated Selection"}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {isLoading ? (
            [...Array(limit)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="aspect-[3/4] w-full bg-muted" />
                <div className="p-4">
                  <Skeleton className="mb-2 h-3 w-16 bg-muted" />
                  <Skeleton className="mb-3 h-5 w-full bg-muted" />
                  <Skeleton className="h-4 w-20 bg-muted" />
                </div>
              </div>
            ))
          ) : products?.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {isAr ? "لا توجد توصيات متاحة حالياً" : "No recommendations available right now"}
              </p>
              <Button variant="outline" className="mt-4" onClick={handleRefresh}>
                {isAr ? "حاول مرة أخرى" : "Try Again"}
              </Button>
            </div>
          ) : (
            products?.map((product) => (
              <LuxuryProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  category: product.category,
                  brand: product.brand || undefined,
                  price: product.price,
                  original_price: product.original_price,
                  discount_percent: product.discount_percent,
                  image_url: product.image_url || "/placeholder.svg",
                  description: product.description || undefined,
                  volume_ml: product.volume_ml || undefined,
                  is_new: false,
                  is_on_sale: product.is_on_sale || false,
                }}
              />
            ))
          )}
        </div>

        {/* AI Trust Badge */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gold/10 via-burgundy/5 to-gold/10 border border-gold/20">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-sm text-muted-foreground">
              {isAr 
                ? "يتم تحديث التوصيات باستمرار بناءً على اهتماماتك" 
                : "Recommendations update based on your interests"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiRecommendations;
