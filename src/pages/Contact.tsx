import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">
              Contact <span className="text-gold">Us</span>
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="font-body text-cream/60 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out with any questions about our products or services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-display text-2xl text-cream">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/10 border border-gold/30 rounded-full">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm text-cream mb-1">Email</h3>
                    <p className="font-body text-cream/60">hello@asperbeauty.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/10 border border-gold/30 rounded-full">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm text-cream mb-1">Phone</h3>
                    <p className="font-body text-cream/60">+962 7 XXXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/10 border border-gold/30 rounded-full">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm text-cream mb-1">Location</h3>
                    <p className="font-body text-cream/60">Amman, Jordan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-secondary border border-gold/20 p-8">
              <h2 className="font-display text-2xl text-cream mb-6">Send a Message</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block font-body text-sm text-cream/60 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background border border-gold/30 font-body text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm text-cream/60 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-gold/30 font-body text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm text-cream/60 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-gold/30 font-body text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gold text-background font-display text-sm tracking-wider hover:bg-gold-light transition-colors"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
