
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import GigCard, { GigData } from '@/components/gigs/GigCard';

// Sample gig data for different categories
const mockGigsByCategory: Record<string, GigData[]> = {
  "wordpress": [
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
      title: "I will create a WordPress woocommerce website or online store",
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
      title: "I will create a WordPress website",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/201068353/original/3e4ecaa1f089d08155c0922317b846bc0010c566.jpg",
      sellerName: "pixelcoder",
      sellerLevel: "Level 1 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/0f5e4f8319f19e8d9ea9877b7018604f-1625500772746/be0206f0-fb39-40a5-b711-a681245fadcf.jpeg",
      rating: 4.7,
      reviewCount: 98,
      startingPrice: 40,
    },
    {
      id: "web-5",
      title: "I will migrate your WordPress website to a new host or domain",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/192346383/original/1c65a4c0f5c1f62bcac6a0c4d0f1c2fb1d5ffc85.jpg",
      sellerName: "wordpress_wizard",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/a239543b15b571a611e5e3e10eaaf343-1678329645480/90aedbc6-945c-415c-b89c-4104a3bbc004.jpg",
      rating: 4.9,
      reviewCount: 187,
      startingPrice: 70,
    },
    {
      id: "web-6",
      title: "I will optimize your WordPress site for speed and performance",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/205042959/original/11fa9cabb0d3ca6bd146c7a7a7b6dac38fe56c5e.jpg",
      sellerName: "speedy_wp",
      sellerLevel: "Top Rated Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/704a85edcf9e94fa01f9c2f2e28f3a51-1677191384140/76c09f22-23f9-474d-b92f-ad4834247ffe.jpg",
      rating: 4.8,
      reviewCount: 312,
      startingPrice: 95,
    },
  ],
  "logo-design": [
    {
      id: "logo-1",
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
      id: "logo-2",
      title: "I will design 3 modern minimalist logo design",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/319935379/original/72312465c18d1385bc892ff3879c2c97dc5c518d.png",
      sellerName: "logohero",
      sellerLevel: "Level 2 Seller",
      sellerImage: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/91bd9aa98804a717ea5dae92e50733e6-1679715088618/c40e9103-17b5-47a3-a110-57cff2856e02.jpg",
      rating: 4.9,
      reviewCount: 542,
      startingPrice: 45,
    },
  ],
  "graphics-design": [
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
  ]
};

// Add more categories as needed
const categoryData = {
  "wordpress": {
    name: "WordPress",
    subcategories: [
      "Website Creation", "Theme Development", "Plugin Development", 
      "Customization", "Bug Fixes", "Performance Optimization"
    ]
  },
  "logo-design": {
    name: "Logo Design",
    subcategories: [
      "Minimalist Logo", "3D Logo", "Mascot Logo", 
      "Vintage Logo", "Hand Drawn Logo", "Signature Logo"
    ]
  },
  "graphics-design": {
    name: "Graphics & Design",
    subcategories: [
      "Logo Design", "Brand Style Guides", "Game Art", 
      "Graphics for Streamers", "Social Media", "Book Design"
    ]
  }
};

// Default filter options
const sellerLevels = ["Any Level", "Top Rated Seller", "Level 2", "Level 1", "New Seller"];
const deliveryTimes = ["Express 24H", "Up to 3 days", "Up to 7 days", "Anytime"];

const CategoryPage = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [priceRange, setPriceRange] = useState<[number, number]>([5, 500]);
  const [selectedLevel, setSelectedLevel] = useState("Any Level");
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Get category data based on URL parameter
  const category = categoryData[categorySlug as keyof typeof categoryData] || {
    name: categorySlug?.replace(/-/g, ' '),
    subcategories: []
  };

  // Get gigs for this category
  const gigs = mockGigsByCategory[categorySlug as string] || [];

  return (
    <div className="bg-white pt-8 pb-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-fiverr-black mb-2">{category.name}</h1>
          <p className="text-lg text-fiverr-gray mb-6">
            Get your {category.name.toLowerCase()} service from great sellers
          </p>
          
          {/* Subcategories Pills */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="border-fiverr-border-gray bg-white text-fiverr-black hover:bg-fiverr-light-gray">
              All {category.name}
            </Button>
            {category.subcategories.map((subcat, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="border-fiverr-border-gray bg-white text-fiverr-black hover:bg-fiverr-light-gray"
              >
                {subcat}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Filters & Results */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-6">
                <h3 className="font-bold text-fiverr-black mb-4">Budget</h3>
                <div className="flex items-center gap-3 mb-6">
                  <Input
                    type="text"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 5, priceRange[1]])}
                    className="w-1/2 border-fiverr-border-gray"
                  />
                  <Input
                    type="text"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                    className="w-1/2 border-fiverr-border-gray"
                  />
                </div>
                <Slider 
                  defaultValue={[priceRange[0], priceRange[1]]} 
                  max={1000}
                  min={5}
                  step={5}
                  onValueChange={(values) => setPriceRange(values as [number, number])}
                  className="my-6"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-fiverr-black mb-4">Seller Level</h3>
                <div className="space-y-2">
                  {sellerLevels.map((level, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 cursor-pointer ${
                          selectedLevel === level 
                            ? 'bg-fiverr-green border-fiverr-green' 
                            : 'border-fiverr-border-gray'
                        }`}
                        onClick={() => setSelectedLevel(level)}
                      >
                        {selectedLevel === level && (
                          <CheckCircle size={14} className="text-white" />
                        )}
                      </div>
                      <span className="text-fiverr-black">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-fiverr-black mb-4">Delivery Time</h3>
                <div className="space-y-2">
                  {deliveryTimes.map((time, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`time-${index}`}
                        className="h-4 w-4 text-fiverr-green focus:ring-fiverr-green border-fiverr-border-gray rounded"
                      />
                      <label htmlFor={`time-${index}`} className="ml-2 text-fiverr-black">
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full bg-fiverr-green hover:bg-fiverr-dark-green text-white">
                Apply Filters
              </Button>
            </div>
          </div>
          
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline"
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="w-full flex items-center justify-between border-fiverr-border-gray"
            >
              <div className="flex items-center">
                <SlidersHorizontal size={18} className="mr-2" />
                <span>Filters</span>
              </div>
              <ChevronDown size={18} className={filtersVisible ? "rotate-180 transition-transform" : "transition-transform"} />
            </Button>
            
            {/* Mobile Filters Panel */}
            {filtersVisible && (
              <div className="mt-4 p-4 border border-fiverr-border-gray rounded-md">
                <div className="mb-6">
                  <h3 className="font-bold text-fiverr-black mb-4">Budget</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <Input
                      type="text"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 5, priceRange[1]])}
                      className="w-1/2 border-fiverr-border-gray"
                    />
                    <Input
                      type="text"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                      className="w-1/2 border-fiverr-border-gray"
                    />
                  </div>
                  <Slider 
                    defaultValue={[priceRange[0], priceRange[1]]} 
                    max={1000}
                    min={5}
                    step={5}
                    onValueChange={(values) => setPriceRange(values as [number, number])}
                    className="my-6"
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="font-bold text-fiverr-black mb-4">Seller Level</h3>
                  <div className="space-y-2">
                    {sellerLevels.map((level, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 cursor-pointer ${
                            selectedLevel === level 
                              ? 'bg-fiverr-green border-fiverr-green' 
                              : 'border-fiverr-border-gray'
                          }`}
                          onClick={() => setSelectedLevel(level)}
                        >
                          {selectedLevel === level && (
                            <CheckCircle size={14} className="text-white" />
                          )}
                        </div>
                        <span className="text-fiverr-black">{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-bold text-fiverr-black mb-4">Delivery Time</h3>
                  <div className="space-y-2">
                    {deliveryTimes.map((time, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`mobile-time-${index}`}
                          className="h-4 w-4 text-fiverr-green focus:ring-fiverr-green border-fiverr-border-gray rounded"
                        />
                        <label htmlFor={`mobile-time-${index}`} className="ml-2 text-fiverr-black">
                          {time}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full bg-fiverr-green hover:bg-fiverr-dark-green text-white">
                  Apply Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Gig Results */}
          <div className="flex-1">
            {/* Sorting Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <p className="text-fiverr-black mb-4 md:mb-0">
                {gigs.length} services available
              </p>
              
              <div className="flex items-center">
                <span className="text-fiverr-black mr-2">Sort by:</span>
                <select className="border border-fiverr-border-gray rounded-md py-2 px-3 text-fiverr-black bg-white">
                  <option>Best Selling</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Gig Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigs.length > 0 ? (
                gigs.map((gig) => (
                  <GigCard key={gig.id} gig={gig} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-fiverr-gray">No gigs found for this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
