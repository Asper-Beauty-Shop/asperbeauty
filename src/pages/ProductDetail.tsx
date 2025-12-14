import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

interface ProductData {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
}

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductData["variants"]["edges"][0]["node"] | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setOpen);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        if (data?.variants.edges[0]) {
          const firstVariant = data.variants.edges[0].node;
          setSelectedVariant(firstVariant);
          const initialOptions: Record<string, string> = {};
          firstVariant.selectedOptions.forEach((opt: { name: string; value: string }) => {
            initialOptions[opt.name] = opt.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  useEffect(() => {
    if (!product) return;
    
    const matchingVariant = product.variants.edges.find((v) =>
      v.node.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value
      )
    );
    
    if (matchingVariant) {
      setSelectedVariant(matchingVariant.node);
    }
  }, [selectedOptions, product]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });

    toast.success("Added to bag", {
      description: `${product.title}${selectedVariant.title !== "Default Title" ? ` - ${selectedVariant.title}` : ""}`,
      position: "top-center",
    });

    setCartOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] pt-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
          <h1 className="font-display text-2xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/" className="text-gold hover:underline font-body text-sm">
            Return to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;
  const hasMultipleVariants = product.variants.edges.length > 1;

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-28 pb-24">
        <div className="luxury-container">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-12 font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Large Image Gallery */}
            <div className="space-y-6">
              {/* Main Image - Large & High Resolution */}
              <div className="aspect-square bg-cream-dark overflow-hidden border border-gold/20">
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground font-body">No image</span>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === idx 
                          ? "border-gold shadow-md" 
                          : "border-transparent hover:border-gold/50"
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="lg:pt-4">
              <p className="font-body text-xs tracking-widest uppercase text-gold mb-4">Asper Beauty</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                {product.title}
              </h1>
              
              <p className="font-display text-3xl text-gold mb-8">
                {selectedVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode}{" "}
                {parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>

              <div className="w-16 h-px bg-gold mb-8" />

              <p className="font-body text-muted-foreground leading-relaxed text-base mb-10">
                {product.description || "A premium beauty product from our curated collection, crafted with the finest ingredients for discerning individuals."}
              </p>

              {/* Options */}
              {hasMultipleVariants && product.options.map((option) => (
                <div key={option.name} className="mb-8">
                  <label className="font-body text-xs tracking-widest uppercase text-foreground mb-4 block">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() => setSelectedOptions({ ...selectedOptions, [option.name]: value })}
                        className={`px-6 py-3 border font-body text-sm transition-all duration-300 ${
                          selectedOptions[option.name] === value
                            ? "border-gold bg-gold/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-gold hover:text-foreground"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="mb-10">
                <label className="font-body text-xs tracking-widest uppercase text-foreground mb-4 block">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-display text-xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart - Prominent Burgundy Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
                className="w-full py-5 px-8 bg-[hsl(var(--cta-burgundy))] text-cream font-display text-lg tracking-wider uppercase transition-all duration-300 hover:bg-[hsl(var(--cta-burgundy-hover))] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
              </button>

              {/* Additional Info */}
              <div className="mt-12 pt-10 border-t border-gold/20 space-y-5">
                <div className="flex items-start gap-6">
                  <span className="font-body text-xs tracking-widest uppercase text-muted-foreground w-28">Shipping</span>
                  <span className="font-body text-sm text-foreground">Complimentary shipping on orders over $100</span>
                </div>
                <div className="flex items-start gap-6">
                  <span className="font-body text-xs tracking-widest uppercase text-muted-foreground w-28">Returns</span>
                  <span className="font-body text-sm text-foreground">30-day hassle-free returns</span>
                </div>
                <div className="flex items-start gap-6">
                  <span className="font-body text-xs tracking-widest uppercase text-muted-foreground w-28">Quality</span>
                  <span className="font-body text-sm text-foreground">Premium ingredients, ethically sourced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
