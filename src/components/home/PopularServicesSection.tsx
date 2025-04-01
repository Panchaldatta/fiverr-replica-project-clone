
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: "AI Artists",
    description: "Add talent to AI",
    backgroundImage: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/ai-artists-2x.png",
    category: "ai-artists"
  },
  {
    id: 2,
    title: "Logo Design",
    description: "Build your brand",
    backgroundImage: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/logo-design-2x.png",
    category: "logo-design"
  },
  {
    id: 3,
    title: "WordPress",
    description: "Customize your site",
    backgroundImage: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png",
    category: "wordpress"
  },
  {
    id: 4,
    title: "Voice Over",
    description: "Share your message",
    backgroundImage: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161253/voice-over-2x.png",
    category: "voice-over"
  },
  {
    id: 5,
    title: "Video Explainer",
    description: "Engage your audience",
    backgroundImage: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161245/animated-explainer-2x.png",
    category: "video-explainer"
  },
  {
    id: 6,
    title: "Social Media",
    description: "Reach more customers",
    backgroundImage: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161249/social-2x.png",
    category: "social-media"
  },
  {
    id: 7,
    title: "SEO",
    description: "Unlock growth online",
    backgroundImage: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161248/seo-2x.png",
    category: "seo"
  },
  {
    id: 8,
    title: "Illustration",
    description: "Color your dreams",
    backgroundImage: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/illustration-2x.png",
    category: "illustration"
  }
];

const PopularServicesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    
    scrollContainerRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
    
    setScrollPosition(scrollTo);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  // Calculate if we can scroll
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainerRef.current 
    ? scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth + scrollPosition
    : false;

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-fiverr-black">
            Popular services
          </h2>
          
          <div className="hidden md:flex">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`mr-2 h-10 w-10 rounded-full flex items-center justify-center border border-fiverr-gray ${!canScrollLeft ? 'text-gray-300 cursor-not-allowed' : 'text-fiverr-black hover:bg-fiverr-light-gray'}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`h-10 w-10 rounded-full flex items-center justify-center border border-fiverr-gray ${!canScrollRight ? 'text-gray-300 cursor-not-allowed' : 'text-fiverr-black hover:bg-fiverr-light-gray'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar gap-4"
          onScroll={handleScroll}
        >
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/categories/${service.category}`}
              className="flex-shrink-0 group"
              style={{ width: 'calc(100% / 2 - 16px)', minWidth: '250px', maxWidth: '300px' }}
            >
              <div 
                className="relative h-80 rounded-md overflow-hidden"
                style={{
                  backgroundImage: `url(${service.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity group-hover:bg-opacity-20"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="text-white text-sm font-medium">{service.description}</span>
                  <h3 className="text-white text-lg md:text-xl font-bold mt-1">{service.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServicesSection;
