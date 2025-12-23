import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-mint via-background to-sage/30">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--emerald)) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="luxury-container relative z-10 text-center pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Emerald divider above headline */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald to-transparent mx-auto mb-8 opacity-0 animate-fade-up" />
          
          {/* Main Heading - Fresh Emerald with glow effect */}
          <h1 
            className="font-display text-6xl md:text-8xl lg:text-9xl font-normal leading-tight opacity-0 animate-fade-up delay-100"
            style={{
              background: 'linear-gradient(135deg, hsl(160 84% 25%), hsl(160 84% 40%), hsl(160 84% 25%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 20px hsla(160, 84%, 30%, 0.3)',
              filter: 'drop-shadow(0 2px 4px hsla(160, 84%, 30%, 0.2))'
            }}
          >
            {t.heroTitle}
          </h1>

          {/* Emerald divider below headline */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald to-transparent mx-auto mt-8 mb-10 opacity-0 animate-fade-up delay-200" />

          {/* Description - Forest text */}
          <p className="font-body text-forest text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12 opacity-0 animate-fade-up delay-300">
            {t.heroSubtitle}
          </p>

          {/* CTA Button - Emerald accent */}
          <div className="opacity-0 animate-fade-up delay-400">
            <Button 
              variant="luxury-outline" 
              size="luxury-lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-mint text-primary border-2 border-primary hover:bg-primary hover:text-white font-display tracking-wider shadow-lg shadow-emerald/20"
            >
              {t.discoverCollections}
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up delay-500">
          <a 
            href="#products"
            className="flex flex-col items-center gap-2 text-forest/60 hover:text-primary transition-colors"
          >
            <span className="font-body text-xs tracking-widest uppercase">{t.scroll}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
