import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ASPER_STORE, 
  DELIVERY_AREAS, 
  formatStoreHours, 
  isStoreOpen,
  getDeliveryFee 
} from '@/lib/locable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Truck,
  Store,
  Star,
  CheckCircle,
  Package
} from 'lucide-react';

export const StoreLocator: React.FC = () => {
  const { language } = useLanguage();
  const store = ASPER_STORE;
  const storeOpen = isStoreOpen(store.hours);
  const hours = formatStoreHours(store.hours, language);

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.3em] text-gold-500 mb-3">
            {language === 'ar' ? 'تجدنا' : 'Find Us'}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-luxury-black mb-4">
            {language === 'ar' ? 'موقعنا وخدماتنا' : 'Our Location & Services'}
          </h2>
          <div className="mx-auto h-px w-16 bg-gold-300" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Store Info Card */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="relative h-48 md:h-64 bg-gradient-to-br from-burgundy to-burgundy-dark">
              <img 
                src={store.images[0]} 
                alt={language === 'ar' ? store.nameAr : store.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
                <Store className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-serif">
                  {language === 'ar' ? store.nameAr : store.name}
                </h3>
                <Badge 
                  variant={storeOpen ? "default" : "secondary"}
                  className={`mt-3 ${storeOpen ? 'bg-green-500' : 'bg-gray-500'}`}
                >
                  {storeOpen 
                    ? (language === 'ar' ? 'مفتوح الآن' : 'Open Now')
                    : (language === 'ar' ? 'مغلق حاليًا' : 'Currently Closed')
                  }
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(store.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-charcoal">{store.rating}</span>
                <span className="text-sm text-taupe">
                  ({store.reviewCount} {language === 'ar' ? 'تقييم' : 'reviews'})
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-burgundy mt-0.5" />
                  <div>
                    <p className="text-charcoal font-medium">
                      {language === 'ar' ? store.addressAr : store.address}
                    </p>
                    <p className="text-sm text-taupe">
                      {language === 'ar' ? `${store.cityAr}، ${store.countryAr}` : `${store.city}, ${store.country}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-burgundy" />
                  <a href={`tel:${store.phone}`} className="text-charcoal hover:text-burgundy transition-colors">
                    {store.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-burgundy" />
                  <a href={`mailto:${store.email}`} className="text-charcoal hover:text-burgundy transition-colors">
                    {store.email}
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                {store.socialLinks.instagram && (
                  <a 
                    href={store.socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {store.socialLinks.facebook && (
                  <a 
                    href={store.socialLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {store.socialLinks.whatsapp && (
                  <a 
                    href={store.socialLinks.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Hours and Delivery */}
          <div className="space-y-6">
            <Tabs defaultValue="hours" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hours" className="gap-2">
                  <Clock className="w-4 h-4" />
                  {language === 'ar' ? 'ساعات العمل' : 'Hours'}
                </TabsTrigger>
                <TabsTrigger value="delivery" className="gap-2">
                  <Truck className="w-4 h-4" />
                  {language === 'ar' ? 'التوصيل' : 'Delivery'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hours" className="mt-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {language === 'ar' ? 'ساعات العمل' : 'Store Hours'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'ar' ? 'مواعيد عمل المتجر' : 'When you can visit us'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {hours.map((line, i) => (
                        <div 
                          key={i} 
                          className={`flex justify-between text-sm py-2 px-3 rounded ${
                            i === new Date().getDay() ? 'bg-burgundy/10 font-medium' : ''
                          }`}
                        >
                          <span className="text-charcoal">{line.split(':')[0]}</span>
                          <span className="text-taupe">{line.split(': ')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="delivery" className="mt-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {language === 'ar' ? 'مناطق التوصيل' : 'Delivery Areas'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'ar' ? 'نوصل إلى جميع أنحاء الأردن' : 'We deliver across Jordan'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                      {DELIVERY_AREAS.map((area) => (
                        <div 
                          key={area.name}
                          className="p-3 bg-cream rounded-lg border border-gray-100"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-charcoal">
                              {language === 'ar' ? area.nameAr : area.name}
                            </span>
                            {area.sameDay && (
                              <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-700">
                                {language === 'ar' ? 'نفس اليوم' : 'Same Day'}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-taupe">
                            {language === 'ar' ? 'التوصيل:' : 'Delivery:'} {area.fee.toFixed(2)} JOD
                          </div>
                          <div className="text-xs text-taupe">
                            {language === 'ar' ? 'الحد الأدنى:' : 'Min Order:'} {area.minOrder} JOD
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Services */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'ar' ? 'خدماتنا' : 'Our Services'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(language === 'ar' ? store.servicesAr : store.services).map((service) => (
                    <Badge 
                      key={service} 
                      variant="outline"
                      className="py-1.5 px-3 bg-cream border-gold-200 text-charcoal"
                    >
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Button asChild className="flex-1 bg-burgundy hover:bg-burgundy-dark">
                <a href="/shop">
                  <Package className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <a 
                  href={`https://maps.google.com/?q=${store.latitude},${store.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'الاتجاهات' : 'Get Directions'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocator;
