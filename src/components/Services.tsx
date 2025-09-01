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
        name: 'Microblading Clásico',
        description: 'Diseño y creación de cejas naturales con técnica pelo a pelo',
        duration: '4 horas',
        price: '$350',
        features: ['Consulta y diseño', 'Aplicación de pigmento', 'Retoque adicional (45 días) - costo extra', 'Cuidados post-tratamiento']
      },
      {
        name: 'Microblading Premium',
        description: 'Técnica avanzada con pigmentos de alta calidad y diseño personalizado',
        duration: '4 horas',
        price: '$450',
        features: ['Diseño 3D personalizado', 'Pigmentos premium', 'Retoque adicional (45 días) - costo extra', 'Seguimiento 6 meses']
      }
    ]
  },
  {
    id: 'lip-tattoo',
    name: 'Tatuaje de Labios',
    image: lipTattooImg,
    description: 'Pigmentación permanente para labios más definidos y coloridos',
    price: 'Desde $300',
    duration: '4 horas aprox',
    requiresDeposit: true,
    depositAmount: '$100',
    rating: 4.9,
    treatments: [
      {
        name: 'Delineado de Labios',
        description: 'Definición del contorno natural de los labios',
        duration: '4 horas',
        price: '$300',
        features: ['Diseño de contorno', 'Pigmentación permanente', 'Efecto natural', 'Retoque adicional (45 días) - costo extra']
      },
      {
        name: 'Labios Completos',
        description: 'Pigmentación completa con color y volumen',
        duration: '4 horas',
        price: '$400',
        features: ['Color completo', 'Efecto volumen', 'Larga duración', 'Retoque adicional (45 días) - costo extra']
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
        name: 'Facial Clásico',
        description: 'Limpieza profunda y hidratación para piel radiante',
        duration: '60 minutos',
        price: '$80',
        features: ['Limpieza profunda', 'Exfoliación', 'Mascarilla hidratante', 'Masaje facial']
      },
      {
        name: 'Facial Anti-Edad',
        description: 'Tratamiento avanzado con productos anti-aging',
        duration: '90 minutos',
        price: '$120',
        features: ['Productos premium', 'Radiofrecuencia', 'Mascarilla colágeno', 'Sérum anti-edad']
      },
      {
        name: 'Facial Acné',
        description: 'Tratamiento especializado para piel con acné',
        duration: '75 minutos',
        price: '$100',
        features: ['Limpieza específica', 'Extracción', 'Luz LED', 'Productos medicados']
      },
      {
        name: 'Carbon Peel',
        description: 'Tratamiento con láser de carbón para piel radiante',
        duration: '60 minutos',
        price: '$180',
        features: ['Aplicación de carbón', 'Láser Q-switched', 'Reducción de poros', 'Brillo instantáneo']
      },
      {
        name: 'Hilos Bio Estimuladores de Colágeno',
        description: 'Lifting facial no quirúrgico con hilos biocompatibles',
        duration: '90 minutos',
        price: '$350',
        features: ['Hilos PDO', 'Estimulación de colágeno', 'Efecto lifting', 'Resultados duraderos']
      },
      {
        name: 'Plasma Pen Fibroblast',
        description: 'Tratamiento de rejuvenecimiento con plasma',
        duration: '75 minutos',
        price: '$250',
        features: ['Tecnología plasma', 'Tensado de piel', 'Reducción arrugas', 'Sin cirugía']
      },
      {
        name: 'Hydrafacial',
        description: 'Limpieza profunda e hidratación con tecnología avanzada',
        duration: '45 minutos',
        price: '$150',
        features: ['Limpieza con vórtice', 'Extracción indolora', 'Hidratación intensa', 'Antioxidantes']
      },
      {
        name: 'Microneedling',
        description: 'Estimulación de colágeno con microagujas',
        duration: '60 minutos',
        price: '$200',
        features: ['Microagujas estériles', 'Regeneración celular', 'Mejora textura', 'Sérum personalizado']
      },
      {
        name: 'Microdermoabrasión',
        description: 'Exfoliación profunda con cristales de diamante',
        duration: '50 minutos',
        price: '$120',
        features: ['Cristales de diamante', 'Renovación celular', 'Piel suave', 'Reducción manchas']
      },
      {
        name: 'Alta Frecuencia',
        description: 'Tratamiento con corriente de alta frecuencia',
        duration: '40 minutos',
        price: '$90',
        features: ['Corriente eléctrica', 'Efecto bactericida', 'Estimulación circulación', 'Piel purificada']
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
    description: 'Diseño y depilación profesional para cejas perfectas',
    price: 'Desde $25',
    duration: '30 min',
    requiresDeposit: true,
    depositAmount: '$15',
    rating: 4.8,
    treatments: [
      {
        name: 'Diseño Básico',
        description: 'Depilación y forma básica de cejas',
        duration: '20 minutos',
        price: '$25',
        features: ['Análisis facial', 'Depilación precisa', 'Forma natural', 'Tinte opcional']
      },
      {
        name: 'Diseño Arquitectónico',
        description: 'Diseño avanzado con medidas precisas',
        duration: '45 minutos',
        price: '$45',
        features: ['Medidas golden ratio', 'Diseño personalizado', 'Tinte incluido', 'Hidratación']
      },
      {
        name: 'Cejas HD',
        description: 'Técnica de alta definición para cejas perfectas',
        duration: '60 minutos',
        price: '$65',
        features: ['Técnica HD', 'Múltiples productos', 'Efecto 3D', 'Duración extendida']
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
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Duración:</span>
                          <span className="font-semibold">{service.duration}</span>
                        </div>
                        {showPrices && (
                          <div className="flex justify-between">
                            <span>Precio base:</span>
                            <span className="font-semibold text-luxury-gold">{service.price}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Reserva online:</span>
                          <span className="font-semibold text-luxury-gold">Requiere seña</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Calificación:</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-luxury-gold fill-current" />
                            <span className="font-semibold">{service.rating}</span>
                          </div>
                        </div>
                      </div>
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