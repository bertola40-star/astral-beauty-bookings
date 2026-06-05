import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Gallery — Astral Beauty Spa Tampa</title>
        <meta name="description" content="Browse real results from microblading, lip tattoo, eyebrow design, and facial treatments at Astral Beauty Spa in Tampa, FL." />
        <link rel="canonical" href="https://astral-beauty-bookings.lovable.app/galeria" />
        <meta property="og:title" content="Gallery — Astral Beauty Spa Tampa" />
        <meta property="og:description" content="Real results from microblading, lip tattoo, eyebrow design, and facials at Astral Beauty Spa." />
        <meta property="og:url" content="https://astral-beauty-bookings.lovable.app/galeria" />
      </Helmet>
      <Header />
      <Gallery />
      <Footer />
    </div>
  );
};

export default GalleryPage;
