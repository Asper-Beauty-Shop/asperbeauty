import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Brands() {
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
              Our Brands
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald to-transparent mx-auto mb-6" />
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              We partner with the world's most prestigious beauty brands to bring you exceptional quality.
            </p>
          </div>

          <div className="text-center py-20 border border-emerald/20 rounded-lg bg-mint">
            <p className="font-display text-forest/60 text-lg">Brand showcase coming soon</p>
            <p className="font-body text-forest/40 mt-2">Check back for our premium brand partners</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
