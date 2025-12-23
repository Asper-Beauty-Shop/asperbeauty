import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";

export default function Offers() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="luxury-container">
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
              Special Offers
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald to-transparent mx-auto mb-6" />
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Exclusive deals on premium beauty products. Limited time only.
            </p>
          </div>

          <ProductGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
