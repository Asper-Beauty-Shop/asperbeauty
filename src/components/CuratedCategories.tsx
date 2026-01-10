import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { TestTube, Sparkles, Scissors, Heart } from "lucide-react";

const categories = [
  {
    id: 'clinical-skincare',
    name: 'Clinical Skincare',
    nameAr: 'العناية السريرية',
    icon: TestTube,
    href: '/collections/skin-care',
    color: 'from-burgundy/20 to-burgundy/5',
  },
  {
    id: 'niche-fragrance',
    name: 'Niche Fragrance',
    nameAr: 'العطور الفاخرة',
    icon: Sparkles,
    href: '/collections/fragrances',
    color: 'from-gold/20 to-gold/5',
  },
  {
    id: 'dermo-hair',
    name: 'Dermo-Hair',
    nameAr: 'العناية بالشعر',
    icon: Scissors,
    href: '/collections/hair-care',
    color: 'from-rose/20 to-rose/5',
  },
  {
    id: 'mother-child',
    name: 'Mother & Child',
    nameAr: 'الأم والطفل',
    icon: Heart,
    href: '/collections/body-care',
    color: 'from-cream to-white',
  },
];

export const CuratedCategories = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="luxury-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-2">
            {isArabic ? 'المجموعات الحصرية' : 'Concierge Collections'}
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-4" />
        </div>

        {/* Circular Category Cards */}
        <div 
          className="flex md:grid md:grid-cols-4 gap-8 lg:gap-12 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.href}
              className="group flex flex-col items-center flex-shrink-0"
            >
              {/* Circular Icon Container */}
              <div className={`relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-gold transition-all duration-400 group-hover:border-gold-light group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <category.icon 
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-burgundy transition-transform duration-400 group-hover:scale-110" 
                  strokeWidth={1.5} 
                />
                {/* Gold glow overlay on hover */}
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-400 rounded-full" />
              </div>
              
              {/* Category Label */}
              <span className="mt-4 md:mt-5 font-display text-sm md:text-base text-foreground text-center transition-colors duration-400 group-hover:text-gold">
                {isArabic ? category.nameAr : category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
