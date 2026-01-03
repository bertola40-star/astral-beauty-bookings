import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import yoannaProfessional from "@/assets/yoanna-new.svg";
import instagramQR from "@/assets/instagram-qr.png";
import { Instagram } from "lucide-react";

const ExpertCarousel = () => {
  const slides = [
    {
      id: 1,
      title: "Yoanna Valdés",
      description: "Tu especialista de confianza",
      showImage: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-soft-white to-pure-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Conoce a Nuestra <span className="text-luxury-gold">Experta</span>
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="p-1">
                  <Card className="border-luxury-gold/20 shadow-elegant">
                    <CardContent className="flex flex-col items-center justify-center p-8 md:p-12">
                      {!slide.showImage ? (
                        <div className="text-center space-y-4">
                          <h3 className="text-3xl font-bold text-primary">
                            {slide.title}
                          </h3>
                          <p className="text-xl text-elegant-gray">
                            {slide.description}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-6 w-full">
                          <div className="relative w-full overflow-hidden rounded-2xl">
                            <img
                              src={yoannaProfessional}
                              alt="Yoanna Valdés - Experta en Belleza"
                              className="w-full h-[500px] md:h-[700px] object-cover object-top shadow-elegant-hover border-4 border-luxury-gold/30 rounded-2xl"
                            />
                          </div>
                          
                          <div className="text-center">
                            <h3 className="text-3xl font-bold text-primary mb-2">
                              {slide.title}
                            </h3>
                            <p className="text-lg text-elegant-gray mb-6">
                              {slide.description}
                            </p>
                          </div>

                          <div className="flex flex-col items-center space-y-3 bg-soft-white p-6 rounded-lg border border-luxury-gold/20">
                            <div className="flex items-center space-x-2 text-luxury-gold">
                              <Instagram className="h-5 w-5" />
                              <span className="font-semibold">@yoanna_beautyart</span>
                            </div>
                            <img
                              src={instagramQR}
                              alt="Código QR Instagram - @yoanna_beautyart"
                              className="w-32 h-32 md:w-40 md:h-40"
                            />
                            <p className="text-sm text-elegant-gray text-center">
                              Escanea para seguirme en Instagram
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default ExpertCarousel;
