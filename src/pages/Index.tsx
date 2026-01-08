import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CuratedCategories } from "@/components/CuratedCategories";
import { BestSellers } from "@/components/BestSellers";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-32 lg:pt-36">
        <Hero />
        <CuratedCategories />
        <BestSellers />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
