import { useState, useEffect } from 'react';
import { Star, Quote, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceData {
  name: string;
  rating: number;
  user_ratings_total: number;
  formatted_address: string;
  place_id: string;
  reviews: GoogleReview[];
}

// Mock data - En producción, esto vendría de la Google Places API
const mockGoogleData: GooglePlaceData = {
  name: "Astral Beauty Spa",
  rating: 4.9,
  user_ratings_total: 127,
  formatted_address: "Tampa, FL, Estados Unidos",
  place_id: "ChIJ_mock_place_id",
  reviews: [
    {
      author_name: "María González",
      rating: 5,
      relative_time_description: "hace 2 semanas",
      text: "¡Increíble experiencia! El microblading quedó perfecto, exactamente como quería. El ambiente es muy elegante y profesional. Definitivamente regresaré para más servicios.",
      time: Date.now() - 14 * 24 * 60 * 60 * 1000,
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c"
    },
    {
      author_name: "Carmen Rodríguez",
      rating: 5,
      relative_time_description: "hace 1 mes",
      text: "El tatuaje de labios superó todas mis expectativas. La atención al detalle es impresionante y el resultado es muy natural. El spa tiene un ambiente muy relajante.",
      time: Date.now() - 30 * 24 * 60 * 60 * 1000,
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c"
    },
    {
      author_name: "Ana Martínez",
      rating: 5,
      relative_time_description: "hace 3 semanas",
      text: "Excelente servicio de faciales. Mi piel se ve radiante después del tratamiento anti-edad. Todo el personal es muy profesional y conocedor.",
      time: Date.now() - 21 * 24 * 60 * 60 * 1000,
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c"
    },
    {
      author_name: "Isabella Torres",
      rating: 5,
      relative_time_description: "hace 2 meses",
      text: "La depilación láser es indolora y muy efectiva. Ya veo resultados significativos. El lugar es muy limpio y moderno. ¡Recomiendo totalmente!",
      time: Date.now() - 60 * 24 * 60 * 60 * 1000,
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c"
    },
    {
      author_name: "Sofia Hernández",
      rating: 4,
      relative_time_description: "hace 1 mes",
      text: "Muy buena experiencia con el blanqueamiento dental. El resultado es notorio y el proceso fue cómodo. El precio es razonable para la calidad del servicio.",
      time: Date.now() - 35 * 24 * 60 * 60 * 1000,
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c"
    },
    {
      author_name: "Valentina López",
      rating: 5,
      relative_time_description: "hace 3 días",
      text: "El diseño de cejas fue perfecto. Realmente entienden la forma de rostro y crean el look ideal. Sin duda mi nuevo lugar favorito en Tampa.",
      time: Date.now() - 3 * 24 * 60 * 60 * 1000,
      profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c"
    }
  ]
};

const GoogleReviews = () => {
  const [placeData, setPlaceData] = useState<GooglePlaceData>(mockGoogleData);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? placeData.reviews : placeData.reviews.slice(0, 3);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-luxury-gold fill-current'
            : i < rating
            ? 'text-luxury-gold fill-current opacity-50'
            : 'text-elegant-gray-light'
        }`}
      />
    ));
  };

  const handleViewOnGoogle = () => {
    // En producción, esto abriría el perfil real de Google My Business
    window.open(`https://www.google.com/maps/search/Astral+Beauty+Spa+Tampa+FL`, '_blank');
  };

  return (
    <section id="reviews" className="py-20 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Lo Que Dicen Nuestros <span className="text-luxury-gold">Clientes</span>
          </h2>
          <p className="text-xl text-elegant-gray max-w-3xl mx-auto mb-8">
            Descubre por qué somos el spa de belleza más valorado en Tampa, Florida
          </p>

          {/* Google Rating Summary */}
          <Card className="max-w-md mx-auto shadow-lg border-luxury-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <img 
                  src="https://developers.google.com/static/maps/images/google_on_white.png" 
                  alt="Google"
                  className="h-8"
                />
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary">{placeData.rating}</span>
                    <div className="flex">{renderStars(placeData.rating)}</div>
                  </div>
                  <p className="text-elegant-gray text-sm">
                    Basado en {placeData.user_ratings_total} reseñas
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-elegant-gray mb-4">
                <MapPin className="h-4 w-4" />
                <span>{placeData.formatted_address}</span>
              </div>

              <Button 
                onClick={handleViewOnGoogle}
                className="w-full btn-outline-luxury"
                variant="outline"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver en Google
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedReviews.map((review, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Review Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=d4af37&color=000&bold=true`}
                    alt={review.author_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary text-lg">
                      {review.author_name}
                    </h4>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <Badge variant="secondary" className="text-xs">
                        {review.rating}/5
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-elegant-gray">
                      <Calendar className="h-3 w-3" />
                      <span>{review.relative_time_description}</span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-luxury-gold/30" />
                  <p className="text-elegant-gray leading-relaxed pl-4">
                    {review.text}
                  </p>
                </div>

                {/* Google Badge */}
                <div className="mt-4 pt-4 border-t border-elegant-gray-light/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-elegant-gray">Reseña de Google</span>
                    <div className="flex items-center space-x-1">
                      <img 
                        src="https://developers.google.com/static/maps/images/google_on_white.png" 
                        alt="Google"
                        className="h-4"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="btn-elegant px-8 py-3"
          >
            {showAllReviews ? 'Ver Menos Reseñas' : 'Ver Todas las Reseñas'}
          </Button>
        </div>

        {/* Call to Action for Reviews */}
        <div className="mt-16 text-center bg-luxury-gold/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-4">
            ¿Ya visitaste nuestro spa?
          </h3>
          <p className="text-elegant-gray mb-6">
            Tu opinión es muy importante para nosotros. Comparte tu experiencia en Google.
          </p>
          <Button
            onClick={handleViewOnGoogle}
            className="btn-luxury text-lg px-8 py-3"
          >
            <Star className="mr-2 h-5 w-5" />
            Escribir Reseña en Google
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;