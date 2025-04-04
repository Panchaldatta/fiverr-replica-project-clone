
import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import PopularServicesSection from '@/components/home/PopularServicesSection';
import PopularGigsSection from '@/components/home/PopularGigsSection';
import BusinessSection from '@/components/home/BusinessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

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

  // Initial check for placeholder gigs
  useEffect(() => {
    const checkPlaceholderGigs = () => {
      const gigs = localStorage.getItem('userGigs');
      if (!gigs || JSON.parse(gigs).length === 0) {
        console.log("No gigs found on initial load, PopularGigsSection will add placeholders");
      }
    };
    
    checkPlaceholderGigs();
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
