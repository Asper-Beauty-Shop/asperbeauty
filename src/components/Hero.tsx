import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import asperLogo from "@/assets/asper-logo.jpg";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold)) 0.5px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Elegant corner accents */}
      <div className="absolute top-20 left-8 w-24 h-24 border-t border-l border-gold/30" />
      <div className="absolute top-20 right-8 w-24 h-24 border-t border-r border-gold/30" />
      <div className="absolute bottom-20 left-8 w-24 h-24 border-b border-l border-gold/30" />
      <div className="absolute bottom-20 right-8 w-24 h-24 border-b border-r border-gold/30" />

      <div className="luxury-container relative z-10 text-center pt-36 lg:pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Logo Image */}
          <div className="mb-8 opacity-0 animate-fade-up">
            <img 
              src={asperLogo} 
              alt="Asper Beauty Shop" 
              className="w-48 h-48 md:w-64 md:h-64 mx-auto object-contain rounded-lg shadow-2xl shadow-black/30"
            />
          </div>
          
          {/* Gold divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8 opacity-0 animate-fade-up delay-100" />
          
          {/* Main Heading - Elegant Cream */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-normal leading-tight opacity-0 animate-fade-up delay-200 text-cream"
          >
            {t.heroTitle}
          </h1>

          {/* Gold divider below headline */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8 mb-10 opacity-0 animate-fade-up delay-300" />

          {/* Description - Cream muted */}
          <p className="font-body text-cream/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12 opacity-0 animate-fade-up delay-400">
            {t.heroSubtitle}
          </p>

          {/* CTA Button - Gold accent */}
          <div className="opacity-0 animate-fade-up delay-500">
            <Button 
              variant="luxury-outline" 
              size="luxury-lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent text-gold border-2 border-gold hover:bg-gold hover:text-background font-display tracking-wider shadow-lg shadow-gold/10 transition-all duration-500"
            >
              {t.discoverCollections}
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up delay-500">
          <a 
            href="#products"
            className="flex flex-col items-center gap-2 text-cream/50 hover:text-gold transition-colors"
          >
            <span className="font-body text-xs tracking-widest uppercase">{t.scroll}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
