export const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-taupe">
      <div className="luxury-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Large italicized quote - Charcoal text */}
          <blockquote className="font-display text-2xl md:text-4xl lg:text-5xl italic text-charcoal leading-relaxed mb-12">
            "True beauty is found in the pursuit of indulgence, where luxury meets the art of self-care."
          </blockquote>

          {/* Small gold logo element with glow */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span 
              className="font-display text-lg tracking-widest"
              style={{
                background: 'linear-gradient(135deg, hsl(46 100% 45%), hsl(46 100% 60%), hsl(46 100% 45%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 1px 2px hsla(46, 100%, 50%, 0.3))'
              }}
            >
              ASPER
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
