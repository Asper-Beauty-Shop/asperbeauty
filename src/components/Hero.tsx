import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

// Hero image - Filorga products
import filorgaHero from "@/assets/hero/filorga-hero.webp";

export const Hero = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className="min-h-[80vh] lg:min-h-[90vh] flex flex-col-reverse lg:flex-row">
      {/* Left Side - Deep Cream (Text) - Shows second on mobile */}
      <div className="w-full lg:w-1/2 bg-[#F3E5DC] flex items-center justify-center p-8 lg:p-16">
        <div className={`max-w-lg ${isArabic ? 'text-right' : 'text-left'}`}>
          {/* Script Sub-header */}
          <span className="font-script text-2xl lg:text-3xl text-burgundy/70 mb-4 block">
            {isArabic ? 'علم باريسي. أناقة أردنية.' : 'Parisian Science.'}
          </span>
          
          {/* Main Headline */}
          <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl text-burgundy leading-tight mb-6">
            {isArabic ? 'فيلورغا' : 'Jordanian Elegance.'}
          </h1>
          
          {/* Subtext */}
          <p className="font-body text-lg text-burgundy/80 mb-10 leading-relaxed">
            {isArabic 
              ? 'اكتشف فيلورغا، الرائد العالمي في مكافحة الشيخوخة، متوفر الآن مع خدمة التوصيل السريع في عمّان.'
              : 'Discover Filorga, the world leader in anti-aging, now available with same-day concierge delivery in Amman.'
            }
          </p>
          
          {/* CTA Button */}
          <Link to="/collections/skin-care">
            <Button 
              className="bg-burgundy text-cream hover:bg-burgundy/90 font-display text-sm tracking-widest uppercase px-10 py-6 transition-all duration-400"
            >
              {isArabic ? 'استكشف المختبر' : 'Explore the Laboratory'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Side - Hero Image - Shows first on mobile */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden bg-[#f8f8f8]">
        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
          <img
            src={filorgaHero}
            alt={isArabic ? 'مجموعة فيلورغا الفاخرة' : 'Filorga Luxury Collection'}
            className="w-full h-full object-contain max-w-2xl"
            fetchPriority="high"
            width={1024}
            height={1280}
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
