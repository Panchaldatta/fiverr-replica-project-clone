
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import PopularServicesSection from '@/components/home/PopularServicesSection';
import PopularGigsSection from '@/components/home/PopularGigsSection';
import BusinessSection from '@/components/home/BusinessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <PopularServicesSection />
      <PopularGigsSection />
      <BusinessSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
