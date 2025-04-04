
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import PopularServicesSection from '@/components/home/PopularServicesSection';
import PopularGigsSection from '@/components/home/PopularGigsSection';
import BusinessSection from '@/components/home/BusinessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { useEffect } from 'react';

const Index = () => {
  // Force re-render when localStorage changes (for real-time gig updates)
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage changed, triggering re-render");
      // This forces a component re-render
      window.dispatchEvent(new Event('storage'));
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
