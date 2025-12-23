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
            <h1 
              className="font-display text-4xl md:text-5xl mb-4"
              style={{
                background: 'linear-gradient(135deg, hsl(160 84% 25%), hsl(160 84% 40%), hsl(160 84% 25%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Contact Us
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald to-transparent mx-auto mb-6" />
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Reach out with any questions about our products or services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-display text-2xl text-forest">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald/10 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm text-forest mb-1">Email</h3>
                    <p className="font-body text-muted-foreground">hello@asperbeauty.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald/10 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm text-forest mb-1">Phone</h3>
                    <p className="font-body text-muted-foreground">+962 7 XXXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald/10 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm text-forest mb-1">Location</h3>
                    <p className="font-body text-muted-foreground">Amman, Jordan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-mint border border-emerald/20 rounded-lg p-8">
              <h2 className="font-display text-2xl text-forest mb-6">Send a Message</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block font-body text-sm text-muted-foreground mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background border border-emerald/30 rounded-md font-body text-forest focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm text-muted-foreground mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-emerald/30 rounded-md font-body text-forest focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm text-muted-foreground mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-emerald/30 rounded-md font-body text-forest focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-display text-sm tracking-wider rounded-md hover:bg-emerald-light transition-colors"
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
