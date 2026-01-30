import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import heroVideo from '@/assets/hero/hero-video.mp4';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* --- VIDEO BACKGROUND --- */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* --- OVERLAY GRADIENT --- */}
      {/* Ensures text is readable over the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-asper-merlot/80 via-asper-merlot/60 to-asper-merlot/90" />

      {/* --- CONTENT --- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        
        {/* Animated Lotus Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-20 w-20 text-asper-gold drop-shadow-lg"
            fill="currentColor"
          >
            {/* Lotus flower shape */}
            <path d="M50 10 C55 25, 70 30, 75 50 C70 45, 55 50, 50 75 C45 50, 30 45, 25 50 C30 30, 45 25, 50 10" />
            <path d="M50 20 C60 35, 80 40, 85 55 C75 50, 60 55, 50 85 C40 55, 25 50, 15 55 C20 40, 40 35, 50 20" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Main Heading with Gold Dividers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* Top Gold Divider */}
          <div className="mb-6 h-px w-32 bg-gradient-to-r from-transparent via-asper-gold to-transparent" />
          
          <h1 className="font-serif text-5xl font-bold tracking-wide text-asper-ivory md:text-7xl lg:text-8xl">
            Unveil Your{' '}
            <span className="bg-gold-shimmer bg-clip-text text-transparent">
              Golden Glow
            </span>
          </h1>
          
          {/* Bottom Gold Divider */}
          <div className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-asper-gold to-transparent" />
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-2xl font-sans text-lg text-asper-ivory/90 md:text-xl"
        >
          Celestial Skincare for the Modern Era.{' '}
          <br className="hidden md:block" />
          Experience the alchemy of organic botanicals and regal luxury.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="border-2 border-asper-gold bg-asper-gold px-10 py-6 font-sans text-sm font-semibold uppercase tracking-widest text-asper-charcoal transition-all duration-300 hover:bg-asper-goldLight hover:shadow-lg hover:shadow-asper-gold/30"
          >
            Shop Collection
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-asper-gold bg-transparent px-10 py-6 font-sans text-sm font-semibold uppercase tracking-widest text-asper-ivory transition-all duration-300 hover:bg-asper-gold/10"
          >
            Our Rituals
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
