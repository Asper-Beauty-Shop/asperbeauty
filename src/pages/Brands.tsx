import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Brands() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">
              Our <span className="text-gold">Brands</span>
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="font-body text-cream/60 max-w-2xl mx-auto">
              We partner with the world's most prestigious beauty brands to bring you exceptional quality.
            </p>
          </div>

          <div className="text-center py-20 border border-gold/20 bg-secondary">
            <p className="font-display text-cream/60 text-lg">Brand showcase coming soon</p>
            <p className="font-body text-cream/40 mt-2">Check back for our premium brand partners</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
