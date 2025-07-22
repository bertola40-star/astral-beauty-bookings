import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-pure-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="text-3xl font-bold mb-4">
                <span className="text-pure-white">Astral</span>
                <span className="text-luxury-gold mx-2">Beauty</span>
                <span className="text-elegant-gray-light">Spa</span>
              </div>
              <p className="text-elegant-gray-light text-lg leading-relaxed">
                Tu destino de belleza premium en Tampa, Florida. Ofrecemos servicios 
                de alta calidad con las últimas técnicas y productos de lujo para 
                realzar tu belleza natural.
              </p>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-primary transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-primary transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-luxury-gold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Ubicación</p>
                  <p className="text-elegant-gray-light text-sm">
                    Tampa, Florida<br />
                    Estados Unidos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <p className="text-elegant-gray-light text-sm">(813) 555-0123</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-elegant-gray-light text-sm">info@astralbeautyspa.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Horarios</p>
                  <p className="text-elegant-gray-light text-sm">
                    Lun - Sab: 9:00 AM - 7:00 PM<br />
                    Dom: Cerrado
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-luxury-gold mb-6">Servicios</h3>
            <ul className="space-y-2">
              {[
                'Microblading',
                'Tatuaje de Labios',
                'Faciales Premium',
                'Blanqueamiento Dental',
                'Depilación Láser',
                'Diseño de Cejas'
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#servicios"
                    className="text-elegant-gray-light hover:text-luxury-gold transition-colors duration-300 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 pt-8 border-t border-elegant-gray/30">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-luxury-gold fill-current" />
              ))}
            </div>
            <blockquote className="text-xl italic text-elegant-gray-light mb-4">
              "Astral Beauty Spa transformó completamente mi look. El microblading quedó 
              perfecto y el servicio fue excepcional. ¡Altamente recomendado!"
            </blockquote>
            <cite className="text-luxury-gold font-semibold">
              - María G., Cliente Satisfecha
            </cite>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-elegant-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-elegant-gray-light text-sm">
              © 2024 Astral Beauty Spa. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-elegant-gray-light hover:text-luxury-gold text-sm transition-colors duration-300"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-elegant-gray-light hover:text-luxury-gold text-sm transition-colors duration-300"
              >
                Términos de Servicio
              </a>
              <a
                href="#"
                className="text-elegant-gray-light hover:text-luxury-gold text-sm transition-colors duration-300"
              >
                Política de Cancelación
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;