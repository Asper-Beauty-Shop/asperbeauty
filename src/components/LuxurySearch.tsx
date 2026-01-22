"use client";

import React, { useState, useEffect } from "react";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import { Search, TrendingUp, History, Sparkles, ArrowRight, Zap, Tag, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { detectBrandFromName, getFeaturedBrands, SKIN_CONCERNS } from "@/lib/categoryMapping";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  brand: string | null;
  image_url: string | null;
  price: number;
  is_on_sale: boolean | null;
  discount_percent: number | null;
}

export const LuxurySearch = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestedBrand, setSuggestedBrand] = useState<string | null>(null);
  const [recentSearches] = useState(["Olaplex", "CeraVe Cleanser", "Retinol", "Vitamin C Serum"]);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isAr = language === "ar";

  // Featured brands from database
  const featuredBrands = getFeaturedBrands().slice(0, 8);

  // Popular search suggestions with AI
  const popularSearches = [
    { term: "anti-aging serum", icon: Star },
    { term: "moisturizer", icon: Sparkles },
    { term: "sunscreen SPF", icon: Zap },
    { term: "hair treatment", icon: Tag },
  ];

  // 1. Live Search Logic with AI Brand Detection (Debounced)
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setSuggestedBrand(null);
      return;
    }

    // AI-powered brand detection
    const detectedBrand = detectBrandFromName(query);
    setSuggestedBrand(detectedBrand?.name || null);

    const timer = setTimeout(async () => {
      // Smart search: search in title, brand, and description
      const { data } = await supabase
        .from('products')
        .select('id, title, category, brand, image_url, price, is_on_sale, discount_percent')
        .or(`title.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`)
        .order('is_on_sale', { ascending: false })
        .limit(6);
      
      if (data) setResults(data);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleProductClick = (productId: string) => {
    setOpen(false);
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (searchTerm: string) => {
    setOpen(false);
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center border-b border-gray-100 px-4">
        <Search className="h-5 w-5 text-gold-500" />
        <CommandInput 
          placeholder="Search for products, brands..." 
          value={query}
          onValueChange={setQuery}
          className="border-0 focus:ring-0 font-sans text-base placeholder:text-gray-400"
        />
      </div>

      <CommandList className="max-h-[60vh]">
        <CommandEmpty className="py-12 text-center">
          <p className="text-gray-400 text-sm">No results found for "{query}"</p>
        </CommandEmpty>

        {/* AI Brand Detection Suggestion */}
        {suggestedBrand && query.length >= 2 && (
          <CommandGroup>
            <div className="px-4 py-3 bg-gradient-to-r from-gold/10 to-burgundy/5 border-b">
              <button
                onClick={() => handleSearchSubmit(suggestedBrand)}
                className="flex items-center gap-2 text-sm"
              >
                <Zap className="h-4 w-4 text-gold" />
                <span className="text-muted-foreground">{isAr ? "هل تبحث عن" : "Looking for"}</span>
                <span className="font-medium text-foreground">{suggestedBrand}</span>
                <span className="text-muted-foreground">{isAr ? "منتجات؟" : "products?"}</span>
                <ArrowRight className="h-3 w-3 text-gold ml-auto" />
              </button>
            </div>
          </CommandGroup>
        )}

        {/* 2. RECENT SEARCHES (iHerb Style) */}
        {!query && (
          <CommandGroup heading={
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold px-2">
              <History className="h-3 w-3" />
              {isAr ? "عمليات البحث الأخيرة" : "Recent Searches"}
            </span>
          }>
            {recentSearches.map((search) => (
              <CommandItem 
                key={search} 
                className="py-3 px-4 cursor-pointer"
                onSelect={() => handleSearchSubmit(search)}
              >
                {search}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Popular AI-Powered Suggestions */}
        {!query && (
          <>
            <CommandSeparator />
            <CommandGroup heading={
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold px-2">
                <Sparkles className="h-3 w-3" />
                {isAr ? "اقتراحات ذكية" : "Smart Suggestions"}
              </span>
            }>
              <div className="grid grid-cols-2 gap-2 p-4">
                {popularSearches.map(({ term, icon: Icon }) => (
                  <button 
                    key={term} 
                    onClick={() => handleSearchSubmit(term)}
                    className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg text-xs font-medium text-foreground hover:bg-gold/10 hover:text-gold transition-colors"
                  >
                    <Icon className="h-3 w-3" />
                    {term}
                  </button>
                ))}
              </div>
            </CommandGroup>
          </>
        )}

        {/* 3. TRENDING BRANDS (Luxury Style) */}
        {!query && (
          <>
            <CommandSeparator />
            <CommandGroup heading={
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold px-2">
                <TrendingUp className="h-3 w-3" />
                {isAr ? "العلامات التجارية الرائجة" : "Trending Luxury Brands"}
              </span>
            }>
              <div className="flex flex-wrap gap-2 p-4">
                {featuredBrands.map((brand) => (
                  <button 
                    key={brand.id} 
                    onClick={() => handleSearchSubmit(brand.name)}
                    className="px-4 py-2 bg-cream rounded-full text-xs font-bold uppercase tracking-wider text-luxury-black hover:bg-gold-300 transition-colors"
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </CommandGroup>
          </>
        )}

        {/* 4. LIVE PRODUCT SUGGESTIONS */}
        {results.length > 0 && (
          <CommandGroup heading={
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold px-2">
              <Sparkles className="h-3 w-3" />
              {isAr ? "المنتجات المقترحة" : "Suggested Products"}
            </span>
          }>
            {results.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => handleProductClick(product.id)}
                className="flex items-center gap-4 py-4 cursor-pointer hover:bg-gray-50 rounded-none border-b border-gray-50 last:border-0"
              >
                <div className="relative w-14 h-14 bg-cream rounded-lg overflow-hidden flex-shrink-0">
                  {product.image_url && (
                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                  )}
                  {product.is_on_sale && product.discount_percent && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded-full font-bold">
                      -{product.discount_percent}%
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-luxury-black truncate">{product.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {product.brand && (
                      <span className="text-[10px] font-medium text-gold uppercase tracking-wider">{product.brand}</span>
                    )}
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">{product.category}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className={`font-bold text-sm ${product.is_on_sale ? 'text-red-600' : ''}`}>
                    {Number(product.price).toFixed(3)} JD
                  </p>
                  <ArrowRight className="h-4 w-4 text-gold-500 ml-auto" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
      
      <div className="flex items-center justify-between border-t border-gray-100 p-4 bg-cream/50">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-gold" />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            {isAr ? "بحث ذكي مدعوم من locable.ai" : "Smart Search powered by locable.ai"}
          </p>
        </div>
        <button 
          onClick={() => handleSearchSubmit(query || '')}
          className="text-[10px] uppercase tracking-widest font-bold text-gold-500 hover:text-luxury-black transition-colors flex items-center gap-1"
        >
          {isAr ? "عرض كل النتائج" : "View all results"}
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </CommandDialog>
  );
};

export default LuxurySearch;