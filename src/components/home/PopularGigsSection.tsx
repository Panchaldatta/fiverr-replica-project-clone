
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GigCard from '@/components/gigs/GigCard';
import { gigService } from '@/services/api';

// Define placeholder gigs to show when no gigs are available
const placeholderGigs = [
  {
    id: 'placeholder-1',
    title: 'Professional WordPress Website Development',
    image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/103468663/original/40dcfb9da5c463d097ff8b1d8aa8879f4b240f5a/design-and-develop-your-professional-wordpress-website.jpg',
    sellerName: 'WebDev Pro',
    sellerLevel: 'Top Rated Seller',
    sellerImage: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1797559a6c423a76207226cae866c8f7-1588085446063/ce963a36-53a3-496f-b8be-1e4933d88fc8.jpg',
    rating: 4.9,
    reviewCount: 432,
    startingPrice: 120,
    category: 'Web Development',
    description: 'I will create a professional WordPress website tailored to your business needs with responsive design and SEO optimization.'
  },
  {
    id: 'placeholder-2',
    title: 'Eye-catching Logo Design For Your Brand',
    image: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231658621/original/addb23b9ae00de19607db69760a60ab671cf940a.png',
    sellerName: 'DesignMaster',
    sellerLevel: 'Level 2 Seller',
    sellerImage: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/132ca75e015a5dbf4f95e8d189545953-1634120039750/ed5b191e-d43f-4e29-9f65-43cf646905f2.png',
    rating: 4.8,
    reviewCount: 215,
    startingPrice: 50,
    category: 'Graphic Design',
    description: 'I will design a modern, memorable logo that represents your brand's values and helps you stand out from competitors.'
  },
  {
    id: 'placeholder-3',
    title: 'Social Media Marketing Strategy',
    image: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/162366506/original/7a09842ba555e763dbed3a8a610f8acddbd6cfd8.jpg',
    sellerName: 'MarketingGuru',
    sellerLevel: 'Level 2 Seller',
    sellerImage: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e569a181617599539c083fb8207d856a-1581874760638/86645c7f-4c42-4158-9133-ab8eadfc580b.jpg',
    rating: 4.7,
    reviewCount: 189,
    startingPrice: 80,
    category: 'Digital Marketing',
    description: 'I will develop a comprehensive social media strategy to grow your audience, increase engagement, and drive conversions.'
  },
  {
    id: 'placeholder-4',
    title: 'SEO Content Writing That Ranks',
    image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/f23a46693ef0e611430e232cbc989e2b-1617004615063/annguyenwriter.png',
    sellerName: 'ContentPro',
    sellerLevel: 'Top Rated Seller',
    sellerImage: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/2a3a246210a9f0e58478bad9dfc9664b-1626205530526/195bceb6-ba8c-4ab6-82d8-315f6f9b30f2.jpg',
    rating: 4.9,
    reviewCount: 347,
    startingPrice: 60,
    category: 'Writing & Translation',
    description: 'I will create SEO-optimized blog posts and articles that drive organic traffic and engage your target audience.'
  }
];

const PopularGigsSection = () => {
  const [gigs, setGigs] = useState([]);
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
          
          // Map API response to match GigData interface
          const formattedGigs = response.data.map(gig => ({
            id: gig._id || gig.id,
            title: gig.title,
            image: gig.image,
            sellerName: gig.user?.displayName || gig.user?.username || gig.sellerName || 'Anonymous',
            sellerLevel: gig.sellerLevel || 'New Seller',
            sellerImage: gig.user?.photoURL || gig.sellerImage || 'https://via.placeholder.com/150',
            rating: gig.rating || 0,
            reviewCount: gig.reviewCount || 0,
            startingPrice: gig.startingPrice,
            description: gig.description,
            category: gig.category
          }));
          
          setGigs(formattedGigs);
        } else {
          console.log("API returned no gigs, checking localStorage");
          // Check localStorage if API returns empty
          const localGigs = localStorage.getItem('userGigs');
          if (localGigs && JSON.parse(localGigs).length > 0) {
            console.log("Local gigs found:", JSON.parse(localGigs).length);
            setGigs(JSON.parse(localGigs));
          } else {
            console.log("No gigs found, using placeholder gigs");
            // Use placeholder gigs if no gigs are available
            setGigs(placeholderGigs);
            
            // Store placeholder gigs in localStorage for future use if empty
            if (!localGigs) {
              localStorage.setItem('userGigs', JSON.stringify(placeholderGigs));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching gigs:', error);
        // Fallback to localStorage
        const localGigs = localStorage.getItem('userGigs');
        if (localGigs && JSON.parse(localGigs).length > 0) {
          console.log("Using local gigs after error:", JSON.parse(localGigs).length);
          setGigs(JSON.parse(localGigs));
        } else {
          console.log("No local gigs found after error, using placeholders");
          setGigs(placeholderGigs);
          
          // Store placeholder gigs in localStorage for future use if empty
          localStorage.setItem('userGigs', JSON.stringify(placeholderGigs));
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
        setGigs(parsedGigs);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
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
        
        <div className="mt-10 text-center">
          <Link 
            to="/gig/create" 
            className="inline-block bg-fiverr-green text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
          >
            Create Your Own Gig
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularGigsSection;
