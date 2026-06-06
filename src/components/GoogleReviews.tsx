import { useState, useEffect } from 'react';
import { Star, Quote, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

interface GoogleReview {
  author_name: string;
  author_photo: string | null;
  rating: number;
  text: string;
  relative_time: string;
  publish_time: string | null;
}

interface GooglePlaceData {
  rating: number | null;
  userRatingCount: number;
  googleMapsUri: string | null;
  reviews: GoogleReview[];
}

const GoogleReviews = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [googleData, setGoogleData] = useState<GooglePlaceData | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchTestimonials();
    fetchGoogleReviews();
  }, []);

  const fetchGoogleReviews = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('dynamic-endpoint');
      if (error) throw error;
      setGoogleData(data as GooglePlaceData);
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
    }
  };

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

  // Merge real Google reviews with manual testimonials (Google first).
  const googleAsTestimonials: Testimonial[] = (googleData?.reviews || []).map((r, idx) => ({
    id: `google-${idx}`,
    author_name: r.author_name,
    rating: r.rating,
    review_text: r.text,
    service_type: null,
    is_featured: false,
    is_published: true,
    created_at: r.publish_time || new Date().toISOString(),
  }));

  const allReviews = [...googleAsTestimonials, ...testimonials];
  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 6);

  const totalReviewCount = (googleData?.userRatingCount ?? 0) || allReviews.length;
  const averageRating =
    googleData?.rating != null
      ? googleData.rating.toFixed(1)
      : testimonials.length > 0
        ? (testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length).toFixed(1)
        : '5.0';

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return t('reviews.oneDayAgo');
    if (diffDays < 7) return t('reviews.daysAgo', { count: diffDays });
    if (diffDays < 30) return t('reviews.weeksAgo', { count: Math.floor(diffDays / 7) });
    if (diffDays < 365) return t('reviews.monthsAgo', { count: Math.floor(diffDays / 30) });
    return t('reviews.yearsAgo', { count: Math.floor(diffDays / 365) });
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
    const url = googleData?.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:ChIJi9PiE_zPwogR8W71AcGadbs`;
    window.open(url, '_blank');
  };

  return (
    <section id="reviews" className="py-20 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('reviews.title')} <span className="text-luxury-gold">{t('reviews.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-elegant-gray max-w-3xl mx-auto mb-8">
            {t('reviews.subtitle')}
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
                    {t('reviews.basedOn')} {totalReviewCount} {t('reviews.reviewsCount')}
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
                {t('reviews.viewOnGoogle')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-elegant-gray">{t('reviews.loading')}</p>
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
                      <span className="text-xs text-elegant-gray">{t('reviews.verifiedReview')}</span>
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
                {t('reviews.noReviews')}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Show More/Less Button */}
        {allReviews.length > 6 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="btn-elegant px-8 py-3"
            >
              {showAllReviews ? t('reviews.showLess') : `${t('reviews.showAll')} (${allReviews.length})`}
            </Button>
          </div>
        )}

        {/* Call to Action for Reviews */}
        <div className="mt-16 text-center bg-luxury-gold/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-4">
            {t('reviews.visitedSpa')}
          </h3>
          <p className="text-elegant-gray mb-6">
            {t('reviews.yourOpinionMatters')}
          </p>
          <Button
            onClick={handleViewOnGoogle}
            className="btn-luxury text-lg px-8 py-3"
          >
            <Star className="mr-2 h-5 w-5" />
            {t('reviews.writeReview')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
