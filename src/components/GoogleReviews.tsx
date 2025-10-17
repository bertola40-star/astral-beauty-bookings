import { useState, useEffect } from 'react';
import { Star, Quote, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  author_name: string;
  rating: number;
  review_text: string;
  service_type: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

const GoogleReviews = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fiveStarReviews = testimonials.filter(review => review.rating === 5);
  const displayedReviews = showAllReviews ? testimonials : testimonials.slice(0, 6);
  
  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length).toFixed(1)
    : '5.0';

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'hace 1 día';
    if (diffDays < 7) return `hace ${diffDays} días`;
    if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`;
    return `hace ${Math.floor(diffDays / 365)} años`;
  };

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

          {/* Rating Summary */}
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
                    <span className="text-3xl font-bold text-primary">{averageRating}</span>
                    <div className="flex">{renderStars(parseFloat(averageRating))}</div>
                  </div>
                  <p className="text-elegant-gray text-sm">
                    Basado en {testimonials.length} reseñas
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-elegant-gray mb-4">
                <MapPin className="h-4 w-4" />
                <span>7730 Palm River Rd, Tampa, FL</span>
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
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-elegant-gray">Cargando reseñas...</p>
          </div>
        ) : displayedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedReviews.map((review) => (
              <Card key={review.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Review Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=d4af37&color=000&bold=true`}
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
                        <span>{getRelativeTime(review.created_at)}</span>
                      </div>
                      {review.service_type && (
                        <Badge className="mt-1 text-xs">{review.service_type}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-luxury-gold/30" />
                    <p className="text-elegant-gray leading-relaxed pl-4">
                      {review.review_text}
                    </p>
                  </div>

                  {/* Google Badge */}
                  <div className="mt-4 pt-4 border-t border-elegant-gray-light/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-elegant-gray">Reseña verificada</span>
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
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-elegant-gray">
                No hay reseñas disponibles todavía. ¡Sé el primero en dejar una!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Show More/Less Button */}
        {testimonials.length > 6 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="btn-elegant px-8 py-3"
            >
              {showAllReviews ? 'Ver Menos Reseñas' : `Ver Todas las Reseñas (${testimonials.length})`}
            </Button>
          </div>
        )}

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