
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GigCard, { GigData } from '@/components/gigs/GigCard';
import { gigService } from '@/services/api';

const PopularGigsSection = () => {
  const [gigs, setGigs] = useState<GigData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setIsLoading(true);
        // Try to fetch gigs from API first
        const response = await gigService.getAllGigs({ sort: '-createdAt', limit: '8' });
        console.log("API Gigs Response:", response); // Debug log
        
        if (response && response.data && response.data.length > 0) {
          console.log("Using API gigs");
          setGigs(response.data);
        } else {
          console.log("API returned no gigs, falling back to localStorage");
          // Fallback to localStorage if API fails or returns empty
          const localGigs = localStorage.getItem('userGigs');
          if (localGigs) {
            const parsedGigs = JSON.parse(localGigs);
            console.log("Local gigs found:", parsedGigs.length);
            
            // Process gigs from localStorage to match the expected format
            const formattedGigs = parsedGigs.map((gig: any) => ({
              ...gig,
              // Ensure each gig has all required properties
              id: gig.id || `local-${Math.random().toString(36).substr(2, 9)}`,
              title: gig.title || "Untitled Gig",
              image: gig.image || "https://via.placeholder.com/300",
              sellerName: gig.sellerName || "Anonymous",
              sellerLevel: gig.sellerLevel || "New Seller",
              sellerImage: gig.sellerImage || "https://via.placeholder.com/50",
              rating: gig.rating || 0,
              reviewCount: gig.reviewCount || 0,
              startingPrice: gig.startingPrice || 5
            }));
            
            setGigs(formattedGigs.slice(0, 8));
          } else {
            console.log("No local gigs found");
          }
        }
      } catch (error) {
        console.error('Error fetching gigs:', error);
        // Fallback to localStorage
        const localGigs = localStorage.getItem('userGigs');
        if (localGigs) {
          const parsedGigs = JSON.parse(localGigs);
          console.log("Using local gigs after error:", parsedGigs.length);
          setGigs(parsedGigs.slice(0, 8));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGigs();
  }, []);
  
  // Re-fetch gigs when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Local storage changed, refreshing gigs");
      const localGigs = localStorage.getItem('userGigs');
      if (localGigs) {
        const parsedGigs = JSON.parse(localGigs);
        setGigs(parsedGigs.slice(0, 8));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check when component mounts
    const localGigs = localStorage.getItem('userGigs');
    if (localGigs) {
      const parsedGigs = JSON.parse(localGigs);
      if (gigs.length === 0 && parsedGigs.length > 0) {
        setGigs(parsedGigs.slice(0, 8));
      }
    }
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [gigs.length]);
  
  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-fiverr-black">Loading Recent Gigs...</h2>
          </div>
        </div>
      </div>
    );
  }
  
  if (gigs.length === 0) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-fiverr-black">No Gigs Yet</h2>
            <p className="mt-4 text-fiverr-gray">Be the first to create a gig!</p>
            <div className="mt-6">
              <Link 
                to="/gig/create" 
                className="inline-block bg-fiverr-green text-white px-6 py-3 rounded-md hover:bg-fiverr-dark-green transition-colors"
              >
                Create a Gig
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-fiverr-black">Recent Gigs</h2>
          <p className="mt-4 text-fiverr-gray">Check out these fresh new services</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {gigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularGigsSection;
