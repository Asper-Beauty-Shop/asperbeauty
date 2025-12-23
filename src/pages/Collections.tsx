import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const collections = [
  { 
    name: "Hair Care", 
    slug: "hair-care",
    description: "Luxurious treatments for every hair type",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600"
  },
  { 
    name: "Body Care", 
    slug: "body-care",
    description: "Nourish and pamper your skin",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600"
  },
  { 
    name: "Make Up", 
    slug: "make-up",
    description: "Enhance your natural beauty",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600"
  },
  { 
    name: "Skincare", 
    slug: "skincare",
    description: "Premium skincare solutions",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600"
  },
  { 
    name: "Fragrances", 
    slug: "fragrances",
    description: "Captivating scents for every occasion",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"
  },
  { 
    name: "Tools & Devices", 
    slug: "tools-devices",
    description: "Professional-grade beauty tools",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
  },
];

export default function Collections() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="luxury-container">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 
              className="font-display text-4xl md:text-5xl mb-4"
              style={{
                background: 'linear-gradient(135deg, hsl(160 84% 25%), hsl(160 84% 40%), hsl(160 84% 25%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Collections
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald to-transparent mx-auto mb-6" />
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of premium beauty products, carefully chosen for the discerning customer.
            </p>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                to={`/collections/${collection.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-[4/5] border border-emerald/20 hover:border-primary/50 transition-all duration-500"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h2 className="font-display text-2xl text-white mb-2 group-hover:text-emerald-glow transition-colors">
                    {collection.name}
                  </h2>
                  <p className="font-body text-sm text-white/80">
                    {collection.description}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-block px-6 py-2 border border-emerald-glow text-emerald-glow font-display text-xs tracking-wider rounded">
                      EXPLORE →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
