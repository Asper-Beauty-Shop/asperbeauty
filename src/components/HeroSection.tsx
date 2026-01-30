import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* --- 1. VIDEO BACKGROUND --- */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60"
        >
          <source src="/That_is_a_1080p_202601291655.mp4" type="video/mp4" />
        </video>
        {/* Fallback gradient if video fails */}
        <div className="absolute inset-0 bg-gradient-to-br from-asper-merlot to-asper-merlot/80" />
      </div>

      {/* --- 2. OVERLAY GRADIENTS --- */}
      {/* Bottom fade to blend into next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-asper-merlot to-transparent" />
      
      {/* Radial gradient to spotlight center text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(74,4,4,0.7)_70%)]" />

      {/* --- 3. MAIN CONTENT --- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        
        {/* Brand Logo - Lotus Icon */}
        <div className="mb-8 animate-fade-in-up">
          <img 
            src="/IMG-20251203-WA0009.jpg" 
            alt="Asper Beauty Lotus" 
            className="h-24 w-24 rounded-full border-2 border-asper-gold/50 object-cover shadow-lg shadow-asper-gold/20"
          />
        </div>

        {/* Headline */}
        <h1 className="mb-6 animate-fade-in-up font-serif text-5xl font-bold leading-tight text-asper-ivory md:text-7xl lg:text-8xl" style={{ animationDelay: '0.2s' }}>
          Unveil Your{' '}
          <span className="bg-gold-shimmer bg-clip-text text-transparent">
            Golden Glow
          </span>
        </h1>

        {/* Sub-Headline */}
        <p className="mb-10 max-w-2xl animate-fade-in-up font-sans text-lg text-asper-ivory/80 md:text-xl" style={{ animationDelay: '0.4s' }}>
          The perfect union of nature's purity and regal luxury.{' '}
          <br className="hidden md:block" />
          Organic skincare crafted to restore your eternal radiance.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex animate-fade-in-up flex-col gap-4 sm:flex-row" style={{ animationDelay: '0.6s' }}>
          <Button
            size="lg"
            className="bg-asper-gold px-10 py-6 font-sans text-sm font-semibold uppercase tracking-widest text-asper-merlot transition-all duration-300 hover:bg-asper-goldLight hover:shadow-lg hover:shadow-asper-gold/30"
          >
            Shop Collection
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-asper-gold/60 bg-transparent px-10 py-6 font-sans text-sm font-semibold uppercase tracking-widest text-asper-ivory transition-all duration-300 hover:border-asper-gold hover:bg-asper-gold/10"
          >
            Discover Rituals
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      
      {/* --- 4. SCROLL INDICATOR --- */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-asper-gold/50">
          <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-asper-gold" />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
