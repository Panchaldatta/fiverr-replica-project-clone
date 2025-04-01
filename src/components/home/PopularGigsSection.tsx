
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/utils';
import GigCard, { GigData } from '@/components/gigs/GigCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data for popular gigs
const mockGigs: Record<string, GigData[]> = {
  "Web Development": [
    {
      id: "web-1",
      title: "I will create a responsive WordPress website",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/edcf8fc8b9aecaa25ce6c68d641f5e367e9ce636.png",
      sellerName: "john_dev",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/8a1623fd3276ad5e3c31b96b5aa9d8c2-1647284030914/4af1c28b-bdcf-4afb-b59c-10256f47a80a.jpg",
      rating: 4.9,
      reviewCount: 231,
      startingPrice: 120,
    },
    {
      id: "web-2",
      title: "I will fix bugs on your website or wordpress site",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/188246366/original/d6fa3832da07d11b903664829c8a402bd1fe4c35.png",
      sellerName: "webfixpro",
      sellerLevel: "Top Rated Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5d445b82115385ab7b3d673631c2f949-1596105153191/0e78287a-5ad1-4a18-a4cd-3c0642372977.jpeg",
      rating: 5.0,
      reviewCount: 412,
      startingPrice: 50,
    },
    {
      id: "web-3",
      title: "I will be your front end developer and react developer",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/185514191/original/1f787456a6d569ac6ef8bc728e9c81537c4a270f.jpg",
      sellerName: "reactdev_io",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7f2fb285a1a18bf26b5af0ad143f-1674723785740/6282a917-0f3c-4152-9d32-8b71ea103e46.jpg",
      rating: 4.8,
      reviewCount: 156,
      startingPrice: 85,
    },
    {
      id: "web-4",
      title: "I will convert figma, xd, sketch, psd to html, css, bootstrap, responsive design",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/201068353/original/3e4ecaa1f089d08155c0922317b846bc0010c566.jpg",
      sellerName: "pixelcoder",
      sellerLevel: "Level 1 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/0f5e4f8319f19e8d9ea9877b7018604f-1625500772746/be0206f0-fb39-40a5-b711-a681245fadcf.jpeg",
      rating: 4.7,
      reviewCount: 98,
      startingPrice: 40,
    },
  ],
  "Graphic Design": [
    {
      id: "design-1",
      title: "I will design modern minimalist logo design",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197954052/original/793199aff9c05ccfcb62cc7ecc050da39ae93cd4.png",
      sellerName: "designerelite",
      sellerLevel: "Top Rated Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/2f1ecaf40372b2f5a84fa3e8060ed124-1674555933404/74349affar-394e-4e28-b952-10ae82e0191a.jpg",
      rating: 5.0,
      reviewCount: 1203,
      startingPrice: 30,
    },
    {
      id: "design-2",
      title: "I will design social media posts and ads for instagram, facebook, twitter",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/157827646/original/5b2783fc18d6e30476bee207e72dbc61c27533f4.jpg",
      sellerName: "socialmedia_pro",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/84c79d8d462a3afc69e181f4cabd42b1-1664797708068/92d00738-85fb-411f-9ba0-83bdda34c22b.jpg",
      rating: 4.9,
      reviewCount: 452,
      startingPrice: 25,
    },
    {
      id: "design-3",
      title: "I will create a professional brand style guide",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/116905112/original/72704c633ed4cdb9b9999269f74d9624ce179fe1.jpg",
      sellerName: "brandexpert",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3c205dc7cbfca09db08f83ca5115a861-1664069255909/8a37d399-448a-4286-9038-c60badc70e76.jpg",
      rating: 4.8,
      reviewCount: 327,
      startingPrice: 120,
    },
    {
      id: "design-4",
      title: "I will design custom illustrations for your project",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/132844521/original/14609ace1d9fdb077da1a58073b77a9c8bda79a0.jpg",
      sellerName: "artcreator",
      sellerLevel: "Top Rated Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/232d73c954d7d50948cd94311da4b3b5-1675209377358/c6bf2763-ec03-4796-a365-3a36d8262e6a.jpg",
      rating: 4.9,
      reviewCount: 589,
      startingPrice: 75,
    },
  ],
  "Digital Marketing": [
    {
      id: "marketing-1",
      title: "I will do facebook and instagram marketing for your business",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/188025574/original/06557b697a458e10bc5a0af84667c297f4d1e248.png",
      sellerName: "socialmedia_guru",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/82e99fa0a7b7c58877d0bbb68e450717-1631190671217/ca214544-0e4a-493a-bc8c-1fb6b6904bd1.png",
      rating: 4.8,
      reviewCount: 213,
      startingPrice: 60,
    },
    {
      id: "marketing-2",
      title: "I will do complete SEO for your website to rank on google first page",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/148328706/original/d53a534f7208e6426b529695e93c5f1c9359f22b.jpg",
      sellerName: "seomaster",
      sellerLevel: "Top Rated Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/8b60be1bf3e1efa1a3f7fb6abc8b4415-1599818466469/1790ceb1-2b25-4d9d-bf33-3b5c9f27c429.jpg",
      rating: 5.0,
      reviewCount: 752,
      startingPrice: 95,
    },
    {
      id: "marketing-3",
      title: "I will manage your pinterest account and create pins that drive traffic",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/146046232/original/c2f1213f243072ea6f07822bbb81efa67cb0bd36.png",
      sellerName: "pinterestpro",
      sellerLevel: "Level 1 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ce7b456c5414571f7a66dfeb82636373-1623670533959/be0c3b5f-624d-4ea9-81d8-13c4c44c170a.jpg",
      rating: 4.7,
      reviewCount: 107,
      startingPrice: 45,
    },
    {
      id: "marketing-4",
      title: "I will create and manage your google ads campaign",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/173880069/original/02a10ed518d7f6dace803c43e7bcbd70868ed78e.jpg",
      sellerName: "adexpert",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/cad3edb0e21461f20732cea9920342a9-1651079153933/ca4fe26a-14ae-49a5-8d3c-7d88dcd8431c.jpg",
      rating: 4.8,
      reviewCount: 317,
      startingPrice: 120,
    },
  ],
  "Writing & Translation": [
    {
      id: "writing-1",
      title: "I will write SEO friendly website content and blog posts",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/245525658/original/ddb7a3f64c97cbb95901cb99b6318e9e3199a504.jpg",
      sellerName: "contentwriter",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a77a29d-22ab-4318-9134-3f9dd34c58c9.jpg",
      rating: 4.9,
      reviewCount: 284,
      startingPrice: 45,
    },
    {
      id: "writing-2",
      title: "I will translate english to spanish and vice versa",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/122004347/original/add6e5fe3a53fdad0fd9bd7bc883db4c964ab0cf.jpg",
      sellerName: "lingotranslate",
      sellerLevel: "Top Rated Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e3fa3ffb58487f3aecb1dc49d8cf06d5-1632220232511/f66589be-c48a-4039-a8d3-af94851cd669.jpg",
      rating: 5.0,
      reviewCount: 631,
      startingPrice: 30,
    },
    {
      id: "writing-3",
      title: "I will write compelling product descriptions for your e-commerce store",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/138922526/original/a6eaa26d2a5eeea509cc452e3983b5d235b56bc4.jpg",
      sellerName: "ecomcontent",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/f53265c5c13e17a6c13452c68113bea8-1637546074069/4a3cee4e-fe53-4525-b8c0-56ed184c89dc.jpg",
      rating: 4.8,
      reviewCount: 193,
      startingPrice: 25,
    },
    {
      id: "writing-4",
      title: "I will write professional press releases for your business",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3214083/original/85ff59c290a8d1dd3c05d5116c7f07e669fb72a8.png",
      sellerName: "presswriter",
      sellerLevel: "Top Rated Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5fddfa26d3e3f55809240c1a6d584c5f-1632429313962/4212d941-6fca-4088-b268-39d8f6483e3f.jpg",
      rating: 4.9,
      reviewCount: 426,
      startingPrice: 80,
    },
  ]
};

const categories = Object.keys(mockGigs);

const PopularGigsSection = () => {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
    
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

  // Reset scroll position when changing categories
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setScrollPosition(0);
    }
  }, [selectedIndex]);

  return (
    <section className="py-12 md:py-24 bg-fiverr-light-gray">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-fiverr-black mb-4 md:mb-0">
            Recently viewed & more
          </h2>
          
          <div className="hidden md:flex items-center">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`mr-2 h-10 w-10 rounded-full flex items-center justify-center border border-fiverr-gray ${!canScrollLeft ? 'text-gray-300 cursor-not-allowed' : 'text-fiverr-black hover:bg-white'}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`h-10 w-10 rounded-full flex items-center justify-center border border-fiverr-gray ${!canScrollRight ? 'text-gray-300 cursor-not-allowed' : 'text-fiverr-black hover:bg-white'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex overflow-x-auto hide-scrollbar space-x-2 md:space-x-4 border-b border-fiverr-border-gray mb-8">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) => cn(
                  "py-2 px-3 md:px-5 text-sm md:text-base font-medium whitespace-nowrap",
                  "focus:outline-none",
                  selected 
                    ? "text-fiverr-black border-b-2 border-fiverr-black" 
                    : "text-fiverr-gray hover:text-fiverr-black"
                )}
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          
          <Tab.Panels>
            {categories.map((category, idx) => (
              <Tab.Panel key={idx}>
                <div 
                  ref={scrollContainerRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:flex md:overflow-x-auto md:hide-scrollbar"
                  onScroll={handleScroll}
                >
                  {mockGigs[category].map((gig) => (
                    <div key={gig.id} className={`${!isMobile ? "flex-shrink-0 md:w-72" : ""}`}>
                      <GigCard gig={gig} />
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default PopularGigsSection;
