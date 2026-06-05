import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import GoogleReviews from '@/components/GoogleReviews';
import ExpertCarousel from '@/components/ExpertCarousel';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';

const Index = () => {
  useAnalytics();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Astral Beauty Spa — Premium Beauty in Tampa, FL</title>
        <meta name="description" content="Microblading, LipTint, facials, teeth whitening, and laser hair removal in Tampa, Florida. Book online with expert Yoanna Valdés." />
        <link rel="canonical" href="https://astral-beauty-bookings.lovable.app/" />
        <meta property="og:title" content="Astral Beauty Spa — Premium Beauty in Tampa, FL" />
        <meta property="og:description" content="Microblading, LipTint, facials, teeth whitening, and laser hair removal in Tampa, Florida." />
        <meta property="og:url" content="https://astral-beauty-bookings.lovable.app/" />
      </Helmet>
      <Header />
      <Hero />
      <Services />
      <GoogleReviews />
      <ExpertCarousel />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Index;
