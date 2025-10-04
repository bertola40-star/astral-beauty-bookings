import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import GoogleReviews from '@/components/GoogleReviews';
import ExpertCarousel from '@/components/ExpertCarousel';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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