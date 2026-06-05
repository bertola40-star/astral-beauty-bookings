import { useState } from 'react';
import { Star, Clock, CreditCard, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { BookingDialog } from '@/components/BookingDialog';

// Import service images
import microbladingImg from '@/assets/microblading.jpg';
import lipTattooImg from '@/assets/lip-tattoo.jpg';
import facialsImg from '@/assets/facials.jpg';
import teethWhiteningImg from '@/assets/teeth-whitening.jpg';
import laserHairRemovalImg from '@/assets/laser-hair-removal.jpg';
import eyebrowDesignImg from '@/assets/eyebrow-design.jpg';

interface Treatment {
  nameKey: string;
  descriptionKey: string;
  duration: string;
  price: string;
  featureKeys: string[];
}

interface Service {
  id: string;
  nameKey: string;
  image: string;
  descriptionKey: string;
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
    nameKey: 'services.microblading',
    image: microbladingImg,
    descriptionKey: 'services.microbladingDesc',
    price: '$350',
    duration: '4h',
    requiresDeposit: true,
    depositAmount: '$100',
    rating: 5.0,
    treatments: [
      {
        nameKey: 'treatments.hybridBrows',
        descriptionKey: 'treatments.hybridBrowsDesc',
        duration: '4h',
        price: '$500',
        featureKeys: ['treatments.hybridTechnique', 'treatments.facialAdaptation', 'treatments.biocompatiblePigments', 'treatments.retouchExtra', 'treatments.specializedFollowup']
      },
      {
        nameKey: 'treatments.classicMicroblading',
        descriptionKey: 'treatments.classicMicrobladingDesc',
        duration: '4h',
        price: '$350',
        featureKeys: ['treatments.consultDesign', 'treatments.pigmentApplication', 'treatments.retouchExtra', 'treatments.postCareTreatment']
      },
      {
        nameKey: 'treatments.nanoBrows',
        descriptionKey: 'treatments.nanoBrowsDesc',
        duration: '4h',
        price: '$400',
        featureKeys: ['treatments.nanoTech', 'treatments.extremePrecision', 'treatments.superNaturalEffect', 'treatments.retouchExtra', 'treatments.dailyUse']
      },
      {
        nameKey: 'treatments.powerBrows',
        descriptionKey: 'treatments.powerBrowsDesc',
        duration: '4h',
        price: '$420',
        featureKeys: ['treatments.strongBrows', 'treatments.markedDefinition', 'treatments.empoweredLook', 'treatments.retouchExtra', 'treatments.maxImpact']
      },
      {
        nameKey: 'treatments.ombreBrows',
        descriptionKey: 'treatments.ombreBrowsDesc',
        duration: '4h',
        price: '$450',
        featureKeys: ['treatments.makeupLook', 'treatments.softGradient', 'treatments.modernElegance', 'treatments.retouchExtra', 'treatments.dailyPracticality']
      },
      {
        nameKey: 'treatments.premiumMicroblading',
        descriptionKey: 'treatments.premiumMicrobladingDesc',
        duration: '4h',
        price: '$480',
        featureKeys: ['treatments.personalized3D', 'treatments.premiumPigments', 'treatments.retouchExtra', 'treatments.followup6Months']
      }
    ]
  },
  {
    id: 'lip-tint',
    nameKey: 'services.lipTint',
    image: lipTattooImg,
    descriptionKey: 'services.lipTintDesc',
    price: '$300',
    duration: '4h',
    requiresDeposit: true,
    depositAmount: '$100',
    rating: 4.9,
    treatments: [
      {
        nameKey: 'treatments.astralLips',
        descriptionKey: 'treatments.astralLipsDesc',
        duration: '4h',
        price: '$300',
        featureKeys: ['treatments.contourDesign', 'treatments.permanentPigmentation', 'treatments.naturalEffect', 'treatments.retouchExtra']
      },
      {
        nameKey: 'treatments.fullLips',
        descriptionKey: 'treatments.fullLipsDesc',
        duration: '4h',
        price: '$400',
        featureKeys: ['treatments.fullColor', 'treatments.volumeEffect', 'treatments.longLasting', 'treatments.retouchExtra']
      },
      {
        nameKey: 'treatments.lipNeutralization',
        descriptionKey: 'treatments.lipNeutralizationDesc',
        duration: '4h',
        price: '$350',
        featureKeys: ['treatments.colorCorrection', 'treatments.toneNeutralization', 'treatments.specializedTechnique', 'treatments.retouchExtra']
      }
    ]
  },
  {
    id: 'facials',
    nameKey: 'services.facials',
    image: facialsImg,
    descriptionKey: 'services.facialsDesc',
    price: '$80',
    duration: '60-90 min',
    requiresDeposit: true,
    depositAmount: '$25',
    rating: 4.8,
    treatments: [
      {
        nameKey: 'treatments.hydraFacial',
        descriptionKey: 'treatments.hydraFacialDesc',
        duration: '60 min',
        price: '$150',
        featureKeys: ['treatments.cosmicReset', 'treatments.deepHydration', 'treatments.advancedTech', 'treatments.immediateResults']
      },
      {
        nameKey: 'treatments.deepClean',
        descriptionKey: 'treatments.deepCleanDesc',
        duration: '75 min',
        price: '$100',
        featureKeys: ['treatments.deepCleansing', 'treatments.extractions', 'treatments.porePurification', 'treatments.renewedSkin']
      },
      {
        nameKey: 'treatments.skinBooster',
        descriptionKey: 'treatments.skinBoosterDesc',
        duration: '60 min',
        price: '$180',
        featureKeys: ['treatments.concentratedVitamins', 'treatments.aminoAcids', 'treatments.activePeptides', 'treatments.intensiveHydration']
      },
      {
        nameKey: 'treatments.exosomes',
        descriptionKey: 'treatments.exosomesDesc',
        duration: '90 min',
        price: '$400',
        featureKeys: ['treatments.cellularTech', 'treatments.deepRestoration', 'treatments.advancedRegeneration', 'treatments.antiAging']
      },
      {
        nameKey: 'treatments.microneedling',
        descriptionKey: 'treatments.microneedlingDesc',
        duration: '75 min',
        price: '$250',
        featureKeys: ['treatments.collagenStimulation', 'treatments.markReduction', 'treatments.extremeFirmness', 'treatments.precisionMicroneedles']
      },
      {
        nameKey: 'treatments.microDermo',
        descriptionKey: 'treatments.microDermoDesc',
        duration: '60 min',
        price: '$140',
        featureKeys: ['treatments.galacticExfoliation', 'treatments.deadCellRemoval', 'treatments.luxuryTexture', 'treatments.renewedSkin']
      },
      {
        nameKey: 'treatments.carbonPeel',
        descriptionKey: 'treatments.carbonPeelDesc',
        duration: '50 min',
        price: '$200',
        featureKeys: ['treatments.carbonPeeling', 'treatments.deepCleansing', 'treatments.intensePurification', 'treatments.naturalGlow']
      }
    ]
  },
  {
    id: 'teeth-whitening',
    nameKey: 'services.teethWhitening',
    image: teethWhiteningImg,
    descriptionKey: 'services.teethWhiteningDesc',
    price: '$150',
    duration: '60 min',
    requiresDeposit: true,
    depositAmount: '$50',
    rating: 4.9,
    treatments: [
      {
        nameKey: 'treatments.basicWhitening',
        descriptionKey: 'treatments.basicWhiteningDesc',
        duration: '45 min',
        price: '$150',
        featureKeys: ['treatments.whiteningGel', 'treatments.ledLight', 'treatments.gingivalProtection', 'treatments.immediateResult']
      },
      {
        nameKey: 'treatments.premiumWhitening',
        descriptionKey: 'treatments.premiumWhiteningDesc',
        duration: '90 min',
        price: '$250',
        featureKeys: ['treatments.highConcentration', 'treatments.doubleSession', 'treatments.maintenanceKit', 'treatments.guarantee6Months']
      }
    ]
  },
  {
    id: 'laser-hair-removal',
    nameKey: 'services.laserHairRemoval',
    image: laserHairRemovalImg,
    descriptionKey: 'services.laserHairRemovalDesc',
    price: '$60',
    duration: '30-60 min',
    requiresDeposit: true,
    depositAmount: '$50',
    rating: 4.9,
    treatments: [
      {
        nameKey: 'treatments.smallZone',
        descriptionKey: 'treatments.smallZoneDesc',
        duration: '15-30 min',
        price: '$60-80',
        featureKeys: ['treatments.diodeLaser', 'treatments.painless', 'treatments.permanentResults', 'treatments.smoothSkin']
      },
      {
        nameKey: 'treatments.mediumZone',
        descriptionKey: 'treatments.mediumZoneDesc',
        duration: '30-45 min',
        price: '$120-180',
        featureKeys: ['treatments.advancedTech', 'treatments.cooling', 'treatments.scheduledSessions', 'treatments.lastingResults']
      },
      {
        nameKey: 'treatments.largeZone',
        descriptionKey: 'treatments.largeZoneDesc',
        duration: '45-60 min',
        price: '$200-300',
        featureKeys: ['treatments.wideCoverage', 'treatments.maxEfficiency', 'treatments.packagesAvailable', 'treatments.guaranteedResults']
      }
    ]
  },
  {
    id: 'eyebrow-design',
    nameKey: 'services.eyebrowDesign',
    image: eyebrowDesignImg,
    descriptionKey: 'services.eyebrowDesignDesc',
    price: '$25',
    duration: '30 min',
    requiresDeposit: true,
    depositAmount: '$15',
    rating: 4.8,
    treatments: [
      {
        nameKey: 'treatments.premiumWax',
        descriptionKey: 'treatments.premiumWaxDesc',
        duration: '20 min',
        price: '$25',
        featureKeys: ['treatments.quickHairRemoval', 'treatments.lastingResults', 'treatments.highQualityWax', 'treatments.professionalTechnique']
      },
      {
        nameKey: 'treatments.threadEpilation',
        descriptionKey: 'treatments.threadEpilationDesc',
        duration: '30 min',
        price: '$30',
        featureKeys: ['treatments.ancientTechnique', 'treatments.chemicalFree', 'treatments.extremePrecision', 'treatments.sensitiveSkinIdeal']
      },
      {
        nameKey: 'treatments.tweezersDesign',
        descriptionKey: 'treatments.tweezersDesignDesc',
        duration: '45 min',
        price: '$35',
        featureKeys: ['treatments.personalizedDesign', 'treatments.preciseHairRemoval', 'treatments.perfectShape', 'treatments.detailAttention']
      }
    ]
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showPrices, setShowPrices] = useState(false);
  const { t } = useTranslation();

  return (
    <section id="servicios" className="py-20 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('services.title')} <span className="text-luxury-gold">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
            {t('services.subtitle')}
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
                      alt={`${t(service.nameKey)} treatment at Astral Beauty Spa`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      {service.requiresDeposit && (
                        <Badge className="bg-luxury-gold text-primary font-semibold">
                          {t('services.requiresDeposit')}
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
                      {t(service.nameKey)}
                    </h3>
                    <p className="text-elegant-gray mb-4 line-clamp-2">
                      {t(service.descriptionKey)}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-luxury-gold" />
                        <span className="text-sm text-elegant-gray">{service.duration}</span>
                      </div>
                      {showPrices && (
                        <div className="text-lg font-bold text-luxury-gold">
                          {t('services.from')} {service.price}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mb-4 p-3 bg-luxury-gold/10 rounded-lg">
                      <CreditCard className="h-4 w-4 text-luxury-gold" />
                      <span className="text-sm text-elegant-gray">
                        {t('services.depositRequired')}
                      </span>
                    </div>

                    <Button className="w-full btn-elegant group">
                      {t('services.viewTreatments')}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-primary">
                    {t(service.nameKey)}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={service.image}
                      alt={`${t(service.nameKey)} service example`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="mt-4 p-4 bg-luxury-gold/10 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">{t('services.serviceInfo')}</h4>
                      <p className="text-sm text-elegant-gray italic">
                        {t('services.priceNote')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-4">
                      {t('services.availableTreatments')}
                    </h4>
                    <div className="space-y-4">
                      {service.treatments.map((treatment, index) => (
                        <Card key={index} className="p-4">
                          <h5 className="font-semibold text-primary mb-2">
                            {t(treatment.nameKey)}
                          </h5>
                          <p className="text-elegant-gray text-sm mb-3">
                            {t(treatment.descriptionKey)}
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
                            {treatment.featureKeys.map((featureKey, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-2">
                                <div className="h-1.5 w-1.5 bg-luxury-gold rounded-full"></div>
                                <span className="text-sm text-elegant-gray">{t(featureKey)}</span>
                              </div>
                            ))}
                          </div>
                          <Button 
                            className="w-full mt-3 btn-luxury"
                            onClick={() => {
                              setSelectedService(null);
                              setIsBookingOpen(true);
                            }}
                          >
                            {t('services.bookTreatment', { name: t(treatment.nameKey) })}
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
            {showPrices ? t('services.hidePrices') : t('services.showPrices')}
          </Button>
          <Button className="btn-luxury text-lg px-12 py-4">
            {t('services.viewAllPackages')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </section>
  );
};

export default Services;