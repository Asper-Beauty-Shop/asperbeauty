import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageSwitcher = ({ variant = "default" }: { variant?: "default" | "mobile" | "announcement" }) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  if (variant === "announcement") {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 px-3 py-1 text-black font-body text-xs font-medium hover:bg-black/10 rounded transition-colors"
        aria-label="Toggle language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{language === 'en' ? 'AR' : 'EN'}</span>
      </button>
    );
  }

  if (variant === "mobile") {
    return (
      <button
        onClick={toggleLanguage}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-shiny-gold text-black font-display text-sm tracking-wider transition-colors hover:bg-shiny-gold/90 shadow-sm"
        aria-label="Toggle language"
      >
        <Globe className="w-4 h-4" />
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-shiny-gold text-black font-display text-sm tracking-wider transition-all hover:bg-shiny-gold/90 shadow-md"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">{language === 'en' ? 'العربية' : 'EN'}</span>
      <span className="sm:hidden">{language === 'en' ? 'ع' : 'EN'}</span>
    </button>
  );
};
