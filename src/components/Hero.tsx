import { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { BookingDialog } from '@/components/BookingDialog';
import heroImage from '@/assets/hero-spa-interior.jpg';
import yoannaImage from '@/assets/yoanna perfil pagina web 1.jpeg';
const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { t } = useTranslation();
  
  return (
    <section id="inicio" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Astral Beauty Spa - Luxury Beauty Services in Tampa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-luxury-gold/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-luxury-gold fill-current" />
            <span className="text-luxury-gold font-medium">{t('hero.badge')}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-pure-white mb-6 leading-tight">
            {t('hero.title1')}
            <span className="text-luxury-gold block">{t('hero.title2')}</span>
            <span className="text-elegant-gray-light">{t('hero.title3')}</span>
          </h1>

          {/* Expert Section */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative w-24 h-24 rounded-full border-4 border-luxury-gold/30 overflow-hidden bg-primary">
              <img
                src={yoannaImage}
                alt="Yoanna Valdés - Experta en Belleza"
                className="w-full h-full object-cover scale-125"
                style={{ objectPosition: 'center 30%' }}
              />
            </div>
            <div>
              <p className="text-elegant-gray-light text-lg mb-1">{t('hero.expertLabel')}</p>
              <p className="text-luxury-gold font-semibold text-xl">{t('hero.expertBy')}</p>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-elegant-gray-light mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="btn-luxury text-lg px-8 py-4"
              onClick={() => setIsBookingOpen(true)}
            >
              {t('hero.bookAppointment')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              className="btn-outline-luxury text-lg px-8 py-4 bg-pure-white/10 backdrop-blur-sm"
              onClick={() => {
                const serviciosSection = document.getElementById('servicios');
                serviciosSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('hero.viewServices')}
            </Button>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-luxury-gold mb-1">5+</div>
              <div className="text-elegant-gray-light">{t('hero.yearsExp')}</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-luxury-gold mb-1">1000+</div>
              <div className="text-elegant-gray-light">{t('hero.happyClients')}</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-luxury-gold mb-1">100%</div>
              <div className="text-elegant-gray-light">{t('hero.premiumProducts')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-luxury-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-luxury-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </section>
  );
};

export default Hero;
