import { useState } from 'react';
import { Star, Clock, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

// Import service images
import microbladingImg from '@/assets/microblading.jpg';
import lipTattooImg from '@/assets/lip-tattoo.jpg';
import facialsImg from '@/assets/facials.jpg';
import teethWhiteningImg from '@/assets/teeth-whitening.jpg';
import laserHairRemovalImg from '@/assets/laser-hair-removal.jpg';
import eyebrowDesignImg from '@/assets/eyebrow-design.jpg';

interface Treatment {
  name: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
}

interface Service {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  duration: string;
  requiresDeposit: boolean;
  depositAmount?: string;
  rating: number;
  treatments: Treatment[];
}

const services: Service[] = [
  {
    id: 'microblading',
    name: 'Microblading',
    image: microbladingImg,
    description: 'Técnica de micropigmentación para cejas perfectas y naturales',
    price: 'Desde $350',
    duration: '4 horas aprox',
    requiresDeposit: true,
    depositAmount: '$100',
    rating: 5.0,
    treatments: [
      {
        name: 'Hybrid Brows Pro 🌿',
        description: 'Híbrido avanzado adaptado a cada persona para resultados naturales únicos',
        duration: '4 horas',
        price: '$500',
        features: ['Técnica híbrida personalizada', 'Adaptación facial única', 'Pigmentos biocompatibles', 'Retoque adicional (45 días) - costo extra', 'Seguimiento especializado']
      },
      {
        name: 'Microblading Clásico',
        description: 'Diseño y creación de cejas naturales con técnica pelo a pelo',
        duration: '4 horas',
        price: '$350',
        features: ['Consulta y diseño', 'Aplicación de pigmento', 'Retoque adicional (45 días) - costo extra', 'Cuidados post-tratamiento']
      },
      {
        name: 'Nano Brows ✨',
        description: 'Técnica de precisión tecnológica para cejas ultra naturales y delicadas',
        duration: '4 horas',
        price: '$400',
        features: ['Tecnología nano', 'Precisión extrema', 'Efecto súper natural', 'Retoque adicional (45 días) - costo extra', 'Para uso diario']
      },
      {
        name: 'Power Brows 💪',
        description: 'Cejas definidas con carácter para un look empoderado e impactante',
        duration: '4 horas',
        price: '$420',
        features: ['Cejas con fuerza', 'Definición marcada', 'Look empoderado', 'Retoque adicional (45 días) - costo extra', 'Máximo impacto']
      },
      {
        name: 'Ombre Brows ✨',
        description: 'Efecto degradado elegante tipo maquillaje permanente para despertar lista',
        duration: '4 horas',
        price: '$450',
        features: ['Efecto makeup look', 'Degradado suave', 'Elegancia moderna', 'Retoque adicional (45 días) - costo extra', 'Practicidad diaria']
      },
      {
        name: 'Microblading Premium',
        description: 'Técnica avanzada con pigmentos de alta calidad y diseño personalizado',
        duration: '4 horas',
        price: '$480',
        features: ['Diseño 3D personalizado', 'Pigmentos premium', 'Retoque adicional (45 días) - costo extra', 'Seguimiento 6 meses']
      }
    ]
  },
  {
    id: 'lip-tint',
    name: 'LipTint',
    image: lipTattooImg,
    description: 'Pigmentación permanente para labios más definidos y coloridos',
    price: 'Desde $300',
    duration: '4 horas aprox',
    requiresDeposit: true,
    depositAmount: '$100',
    rating: 4.9,
    treatments: [
      {
        name: 'Astral Lips',
        description: 'Definición del contorno natural de los labios',
        duration: '4 horas',
        price: '$300',
        features: ['Diseño de contorno', 'Pigmentación permanente', 'Efecto natural', 'Retoque adicional (45 días) - costo extra']
      },
      {
        name: 'FullLips',
        description: 'Pigmentación completa con color y volumen',
        duration: '4 horas',
        price: '$400',
        features: ['Color completo', 'Efecto volumen', 'Larga duración', 'Retoque adicional (45 días) - costo extra']
      },
      {
        name: 'Neutralización de Labios',
        description: 'Corrección de pigmentaciones previas y tonos no deseados',
        duration: '4 horas',
        price: '$350',
        features: ['Corrección de color', 'Neutralización de tonos', 'Técnica especializada', 'Retoque adicional (45 días) - costo extra']
      }
    ]
  },
  {
    id: 'facials',
    name: 'Faciales',
    image: facialsImg,
    description: 'Tratamientos faciales personalizados para todo tipo de piel',
    price: 'Desde $80',
    duration: '60-90 min',
    requiresDeposit: true,
    depositAmount: '$25',
    rating: 4.8,
    treatments: [
      {
        name: 'Hydra Facial Astral Glow',
        description: 'No es una limpieza es un reset cósmico',
        duration: '60 minutos',
        price: '$150',
        features: ['Reset cósmico', 'Hidratación profunda', 'Tecnología avanzada', 'Resultados inmediatos']
      },
      {
        name: 'Deep Clean',
        description: 'Limpieza profunda con extracciones',
        duration: '75 minutos',
        price: '$100',
        features: ['Limpieza profunda', 'Extracciones', 'Purificación poros', 'Piel renovada']
      },
      {
        name: 'SkinBooster',
        description: 'Un shot directo de poder para tu piel: vitaminas, aminoácidos y péptidos más hidratación intensiva',
        duration: '60 minutos',
        price: '$180',
        features: ['Vitaminas concentradas', 'Aminoácidos', 'Péptidos activos', 'Hidratación intensiva']
      },
      {
        name: 'EXOSOMAS Astral Regeneration',
        description: 'Tratamiento de alta tecnología celular. Restaura, regenera y rejuvenece tu piel como si le dieras "Ctrl+Z" al envejecimiento',
        duration: '90 minutos',
        price: '$400',
        features: ['Tecnología celular', 'Restauración profunda', 'Regeneración avanzada', 'Efecto anti-edad']
      },
      {
        name: 'MICRONEEDLING Dermapen Astral',
        description: 'Pequeñas agujas, grandes resultados. Estimula colágeno, reduce marcas y te deja la piel más firme que tu ex tratando de volver',
        duration: '75 minutos',
        price: '$250',
        features: ['Estimulación colágeno', 'Reducción marcas', 'Firmeza extrema', 'Microagujas precision']
      },
      {
        name: 'MICRODERMO ASTRAL Microdermoabrasión',
        description: 'Exfoliación de otra galaxia. Remueve células muertas con precisión y revela una piel suave, clara y con textura de lujo',
        duration: '60 minutos',
        price: '$140',
        features: ['Exfoliación galáctica', 'Remoción células muertas', 'Textura de lujo', 'Piel renovada']
      },
      {
        name: 'ASTRAL CARBON PEEL',
        description: 'Un peeling con carbón que limpia en profundidad',
        duration: '50 minutos',
        price: '$200',
        features: ['Peeling con carbón', 'Limpieza profunda', 'Purificación intensa', 'Brillo natural']
      }
    ]
  },
  {
    id: 'teeth-whitening',
    name: 'Blanqueamiento Dental',
    image: teethWhiteningImg,
    description: 'Blanqueamiento cosmético profesional para una sonrisa perfecta',
    price: 'Desde $150',
    duration: '60 min',
    requiresDeposit: true,
    depositAmount: '$50',
    rating: 4.9,
    treatments: [
      {
        name: 'Blanqueamiento Básico',
        description: 'Tratamiento estándar para blanquear hasta 3 tonos',
        duration: '45 minutos',
        price: '$150',
        features: ['Gel blanqueador', 'Luz LED', 'Protección gingival', 'Resultado inmediato']
      },
      {
        name: 'Blanqueamiento Premium',
        description: 'Tratamiento avanzado para blanquear hasta 8 tonos',
        duration: '90 minutos',
        price: '$250',
        features: ['Gel de alta concentración', 'Doble sesión', 'Kit de mantenimiento', 'Garantía 6 meses']
      }
    ]
  },
  {
    id: 'laser-hair-removal',
    name: 'Depilación Láser',
    image: laserHairRemovalImg,
    description: 'Eliminación permanente del vello con tecnología láser avanzada',
    price: 'Desde $60',
    duration: '30-60 min',
    requiresDeposit: true,
    depositAmount: '$50',
    rating: 4.9,
    treatments: [
      {
        name: 'Zona Pequeña',
        description: 'Labio superior, barbilla, axilas',
        duration: '15-30 minutos',
        price: '$60-80',
        features: ['Láser diodo', 'Indoloro', 'Resultados permanentes', 'Piel suave']
      },
      {
        name: 'Zona Media',
        description: 'Brazos, bikini, rostro completo',
        duration: '30-45 minutos',
        price: '$120-180',
        features: ['Tecnología avanzada', 'Enfriamiento', 'Sesiones programadas', 'Resultados duraderos']
      },
      {
        name: 'Zona Grande',
        description: 'Piernas, espalda, pecho',
        duration: '45-60 minutos',
        price: '$200-300',
        features: ['Cobertura amplia', 'Eficiencia máxima', 'Paquetes disponibles', 'Garantía de resultados']
      }
    ]
  },
  {
    id: 'eyebrow-design',
    name: 'Depilación y Diseño de Cejas',
    image: eyebrowDesignImg,
    description: 'EPILACIÓN CON HILO: precisión milimétrica, sin químicos, ideal para pieles exigentes. CERA PREMIUM: rápida, duradera y perfecta para quienes quieren resultados impecables en segundos. PINZAS DE DISEÑO: el arte de la perfección en cada detalle. Porque la elegancia no tiene género ni edad, atrévete a regalarte una mirada más limpia, fresca y poderosa. Tus cejas no son solo un complemento; son tu poder silencioso. Listo para descubrir cómo un simple gesto puede transformar tu rostro.',
    price: 'Desde $25',
    duration: '30 min',
    requiresDeposit: true,
    depositAmount: '$15',
    rating: 4.8,
    treatments: [
      {
        name: 'Cera Premium',
        description: 'Rápida, duradera y perfecta para quienes quieren resultados impecables en segundos',
        duration: '20 minutos',
        price: '$25',
        features: ['Depilación rápida', 'Resultados duraderos', 'Cera de alta calidad', 'Técnica profesional']
      },
      {
        name: 'Epilación con Hilo',
        description: 'Precisión milimétrica, sin químicos, ideal para pieles exigentes',
        duration: '30 minutos',
        price: '$30',
        features: ['Técnica milenaria', 'Sin químicos', 'Precisión extrema', 'Ideal pieles sensibles']
      },
      {
        name: 'Pinzas y Diseño',
        description: 'El arte de la perfección en cada detalle',
        duration: '45 minutos',
        price: '$35',
        features: ['Diseño personalizado', 'Depilación precisa', 'Forma perfecta', 'Atención al detalle']
      }
    ]
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showPrices, setShowPrices] = useState(false);

  return (
    <section id="servicios" className="py-20 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Nuestros <span className="text-luxury-gold">Servicios</span>
          </h2>
          <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
            Experimenta la excelencia en cada tratamiento. Servicios de belleza premium 
            con las últimas técnicas y productos de la más alta calidad.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Dialog key={service.id}>
              <DialogTrigger asChild>
                <Card className="service-card group">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      {service.requiresDeposit && (
                        <Badge className="bg-luxury-gold text-primary font-semibold">
                          Requiere Seña
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(service.rating)
                                ? 'text-luxury-gold fill-current'
                                : 'text-elegant-gray-light'
                            }`}
                          />
                        ))}
                        <span className="text-pure-white font-semibold ml-2">
                          {service.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {service.name}
                    </h3>
                    <p className="text-elegant-gray mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-luxury-gold" />
                        <span className="text-sm text-elegant-gray">{service.duration}</span>
                      </div>
                      {showPrices && (
                        <div className="text-lg font-bold text-luxury-gold">
                          {service.price}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mb-4 p-3 bg-luxury-gold/10 rounded-lg">
                      <CreditCard className="h-4 w-4 text-luxury-gold" />
                      <span className="text-sm text-elegant-gray">
                        Requiere seña para reserva online
                      </span>
                    </div>

                    <Button className="w-full btn-elegant group">
                      Ver Tratamientos
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-primary">
                    {service.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="mt-4 p-4 bg-luxury-gold/10 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Información del Servicio</h4>
                      <p className="text-sm text-elegant-gray italic">
                        Los precios de nuestros servicios serán confirmados al momento de realizar la reserva.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-4">
                      Tratamientos Disponibles
                    </h4>
                    <div className="space-y-4">
                      {service.treatments.map((treatment, index) => (
                        <Card key={index} className="p-4">
                          <h5 className="font-semibold text-primary mb-2">
                            {treatment.name}
                          </h5>
                          <p className="text-elegant-gray text-sm mb-3">
                            {treatment.description}
                          </p>
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-luxury-gold" />
                              <span className="text-sm">{treatment.duration}</span>
                            </div>
                            {showPrices && (
                              <div className="font-bold text-luxury-gold">
                                {treatment.price}
                              </div>
                            )}
                          </div>
                          <div className="space-y-1">
                            {treatment.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-2">
                                <div className="h-1.5 w-1.5 bg-luxury-gold rounded-full"></div>
                                <span className="text-sm text-elegant-gray">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Button className="w-full mt-3 btn-luxury">
                            Reservar {treatment.name}
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Price Toggle & Call to Action */}
        <div className="text-center mt-16 space-y-4">
          <Button 
            onClick={() => setShowPrices(!showPrices)}
            variant="outline"
            className="text-lg px-8 py-3 mr-4"
          >
            {showPrices ? 'Ocultar Precios' : 'Consultar Precios'}
          </Button>
          <Button className="btn-luxury text-lg px-12 py-4">
            Ver Todos los Paquetes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;