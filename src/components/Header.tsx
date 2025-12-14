import { ShoppingBag, Menu, X, Search, ChevronDown, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { CartDrawer } from "./CartDrawer";
import { WishlistDrawer, WishlistButton } from "./WishlistDrawer";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const setCartOpen = useCartStore((state) => state.setOpen);
  const { t, isRTL } = useLanguage();

  const collections = [
    { name: t.hairCare, href: "/collections/hair-care", icon: "✦" },
    { name: t.bodyCare, href: "/collections/body-care", icon: "✦" },
    { name: t.makeUp, href: "/collections/make-up", icon: "✦" },
    { name: t.skincare, href: "/collections/skincare", icon: "✦" },
    { name: t.fragrances, href: "/collections/fragrances", icon: "✦" },
    { name: t.toolsDevices, href: "/collections/tools-devices", icon: "✦" },
  ];

  const navLinks = [
    { name: t.brands, href: "/brands" },
    { name: t.bestSellers, href: "/best-sellers" },
    { name: t.offers, href: "/offers" },
    { name: t.contactUs, href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-taupe border-b border-gold/20 shadow-sm">
      <nav className="luxury-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left with shiny gold effect */}
          <Link to="/" className="flex items-center gap-2">
            <h1 
              className="font-display text-2xl md:text-3xl tracking-wider"
              style={{
                background: 'linear-gradient(135deg, hsl(46 100% 45%), hsl(46 100% 60%), hsl(46 100% 45%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 1px 2px hsla(46, 100%, 50%, 0.3))'
              }}
            >
              ASPER
            </h1>
            <span 
              className="hidden sm:block font-display text-sm tracking-widest"
              style={{
                background: 'linear-gradient(135deg, hsl(46 100% 45%), hsl(46 100% 55%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t.beautyShop}
            </span>
          </Link>

          {/* Navigation Links - Center/Right (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className="font-display text-sm tracking-wider text-charcoal hover:text-gold transition-colors"
            >
              {t.home}
            </Link>

            {/* Shop By Category Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button 
                className="flex items-center gap-1 font-display text-sm tracking-wider text-charcoal hover:text-gold transition-colors"
              >
                {t.shopByCategory}
                <ChevronDown className={`h-3 w-3 transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {collectionsOpen && (
                <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-1/2 -translate-x-1/2'} pt-4 z-50`}>
                  <div className="bg-cream border border-gold/30 shadow-2xl min-w-[420px] overflow-hidden animate-fade-in">
                    {/* Elegant Header */}
                    <div className="bg-taupe px-8 py-4 border-b border-gold/30">
                      <h3 
                        className="font-display text-sm tracking-[0.2em] uppercase"
                        style={{
                          background: 'linear-gradient(135deg, hsl(46 100% 45%), hsl(46 100% 60%))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {t.shopByCategory}
                      </h3>
                    </div>
                    
                    {/* Categories Grid */}
                    <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-2">
                      {collections.map((collection) => (
                        <Link
                          key={collection.name}
                          to={collection.href}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gold/5 transition-colors group"
                        >
                          <span className="text-gold text-sm font-display">{collection.icon}</span>
                          <span className="font-display text-sm tracking-wide text-gold group-hover:text-gold/80 transition-colors">
                            {collection.name}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="bg-taupe/30 px-8 py-4 border-t border-gold/20">
                      <Link
                        to="/collections"
                        className="font-display text-xs tracking-[0.15em] text-gold hover:text-gold/80 transition-colors uppercase"
                      >
                        {isRTL ? 'عرض جميع المجموعات ←' : 'View All Collections →'}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-display text-sm tracking-wider text-charcoal hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons - Right */}
          <div className="flex items-center gap-3">
            {/* Language Switcher - Desktop */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Search Icon */}
            <button className="p-2 text-gold border border-gold/30 rounded-full hover:bg-gold/10 transition-colors shadow-sm shadow-gold/20">
              <Search className="h-4 w-4" />
            </button>

            {/* Wishlist Icon */}
            <WishlistButton />

            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gold hover:text-gold-light transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} h-5 w-5 rounded-full bg-gold text-charcoal text-xs flex items-center justify-center font-body font-medium shadow-md`}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gold/20 animate-fade-in bg-taupe">
            {/* Language Switcher - Mobile (Fixed at top of menu) */}
            <div className="border-b border-gold/20">
              <LanguageSwitcher variant="mobile" />
            </div>
            
            <div className="flex flex-col gap-2 py-6">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-charcoal hover:text-gold transition-colors py-2"
              >
                {t.home}
              </Link>

              {/* Mobile Shop By Category Accordion */}
              <div>
                <button
                  onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                  className="flex items-center justify-between w-full font-display text-charcoal hover:text-gold transition-colors py-2"
                >
                  {t.shopByCategory}
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileCollectionsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileCollectionsOpen && (
                  <div className={`${isRTL ? 'mr-4 border-r-2 pr-4' : 'ml-4 border-l-2 pl-4'} mt-2 space-y-1 border-gold/30`}>
                    {collections.map((collection) => (
                      <Link
                        key={collection.name}
                        to={collection.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 font-body text-sm text-charcoal/80 hover:text-gold transition-colors py-2"
                      >
                        <span className="text-gold text-xs">{collection.icon}</span>
                        {collection.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-charcoal hover:text-gold transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <CartDrawer />
      <WishlistDrawer />
    </header>
  );
};
