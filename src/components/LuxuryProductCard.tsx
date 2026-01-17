import { ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductProps {
  id: string;
  title: string;
  category?: string;
  brand?: string;
  price: string | number;
  image_url: string;
  is_new?: boolean;
}

export const LuxuryProductCard = ({ product }: { product: ProductProps }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-background border border-border flex flex-col h-full overflow-hidden"
    >
      {/* 1. Image Area - Aspect Ratio is key for consistency */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
        {product.is_new && (
          <span className="absolute top-2 left-2 z-10 bg-gold text-[8px] md:text-[10px] text-foreground px-2 py-0.5 font-bold uppercase tracking-widest">
            New
          </span>
        )}
        <img 
          src={product.image_url} 
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          alt={product.title}
        />
        
        {/* Mobile Quick-Add: Only shows on mobile */}
        <button 
          className="absolute bottom-2 right-2 md:hidden bg-foreground text-background p-2 rounded-full shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            // Add to cart logic here
          }}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>

      {/* 2. Content Area - Optimized Typography */}
      <div className="p-3 md:p-6 flex flex-col flex-1 text-center md:text-left">
        <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1">
          {product.brand || product.category}
        </p>
        
        <h3 className="font-serif text-sm md:text-lg text-foreground line-clamp-2 leading-tight mb-2 flex-1">
          {product.title}
        </h3>

        <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-1">
          <span className="font-sans font-bold text-xs md:text-base text-foreground">
            {Number(product.price).toFixed(3)} <span className="text-[10px] md:text-xs">JOD</span>
          </span>
          
          {/* Rating - Hidden on very small screens to save space */}
          <div className="hidden sm:flex items-center gap-1 text-gold">
            <Star className="h-2 w-2 md:h-3 md:w-3 fill-current" />
            <span className="text-[9px] md:text-xs text-muted-foreground">4.9</span>
          </div>
        </div>
      </div>

      {/* Desktop Only: Add to Cart on Hover */}
      <div 
        className="hidden md:block absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-foreground text-background p-4 text-center cursor-pointer uppercase text-[10px] font-bold tracking-widest hover:bg-gold hover:text-foreground"
        onClick={(e) => {
          e.preventDefault();
          // Add to cart logic here
        }}
      >
        Add to Bag
      </div>
    </Link>
  );
};

export default LuxuryProductCard;
