import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShoppingBag, Minus, Plus, Star, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductImage } from "@/lib/productImageUtils";

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

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
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

export const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const { language } = useLanguage();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const imageUrl = getProductImage(product.image_url, product.category, product.title);

  const handleAddToCart = () => {
    toast.success(language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to cart', {
      description: `${product.title} × ${quantity}`,
      position: "top-center",
    });
    setQuantity(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-cream border-gold/20 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-sm border border-gold/30 flex items-center justify-center hover:bg-burgundy hover:text-white transition-colors shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative bg-gradient-to-br from-cream to-cream/80 aspect-square">
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            
            {/* Category Badge */}
            <Badge 
              className={`absolute top-4 left-4 z-10 ${getBadgeVariant(product.category)} font-body text-[10px] uppercase tracking-wider px-2.5 py-1 flex items-center gap-1.5 shadow-md border-0`}
            >
              {getBadgeIcon(product.category)}
              {product.category}
            </Badge>
          </div>
          
          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader className="text-start mb-4">
              <DialogTitle className="font-display text-xl md:text-2xl text-foreground leading-tight">
                {product.title}
              </DialogTitle>
            </DialogHeader>
            
            {/* Price */}
            <div className="mb-4">
              <span className="font-display text-2xl text-burgundy">
                JOD {Number(product.price).toFixed(2)}
              </span>
            </div>
            
            {/* Description */}
            <p className="font-body text-muted-foreground mb-6 leading-relaxed flex-grow">
              {product.description || (language === 'ar' 
                ? 'منتج فاخر عالي الجودة من مجموعتنا المميزة. يتميز بأفضل المكونات لبشرة مشرقة وصحية.'
                : 'Premium quality beauty product from our curated collection. Formulated with the finest ingredients for radiant, healthy skin.')}
            </p>
            
            {/* Quantity */}
            <div className="mb-6">
              <label className="font-display text-sm text-foreground mb-2 block uppercase tracking-wider">
                {language === 'ar' ? 'الكمية' : 'Quantity'}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gold/30 rounded-lg flex items-center justify-center hover:bg-burgundy hover:text-white hover:border-burgundy transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-display text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gold/30 rounded-lg flex items-center justify-center hover:bg-burgundy hover:text-white hover:border-burgundy transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/60 to-gold/40" />
              <div className="w-2 h-2 rounded-full bg-gold/40" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-gold/60 to-gold/40" />
            </div>
            
            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-burgundy hover:bg-burgundy-light text-white font-body text-sm uppercase tracking-widest py-6 shadow-gold-md hover:shadow-gold-lg transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4 me-2" />
              {language === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}
            </Button>

            {/* Trust Badge */}
            <p className="text-center text-xs text-muted-foreground mt-4 font-body">
              {language === 'ar' 
                ? '✓ منتج أصلي 100% ✓ شحن سريع'
                : '✓ 100% Authentic ✓ Fast Shipping'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
