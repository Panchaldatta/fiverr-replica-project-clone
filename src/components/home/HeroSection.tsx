
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const popularSearches = ["Website Design", "WordPress", "Logo Design", "AI Services", "Video Editing"];

const heroBackgrounds = [
  {
    image: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/79ddc003c25eb6f4fac22e5136qwe448/fiverr-person1.jpg",
    position: "woman working on digital illustration",
    name: "Andrea",
    title: "AI Artist"
  },
  {
    image: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/0f6552319e77504dc5f59479b7ad83f1-1620385467262/zach.jpg",
    position: "man working on SEO",
    name: "Zach",
    title: "SEO Expert"
  },
  {
    image: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049983/gabrielle.png",
    position: "woman coding on laptop",
    name: "Gabrielle",
    title: "Web Developer"
  },
  {
    image: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049970/alex.png",
    position: "man designing logo",
    name: "Alex",
    title: "Logo Designer"
  }
];

const HeroSection = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Auto rotate through hero backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchTerm);
    // Redirect to search results page
  };

  const handlePopularSearch = (term: string) => {
    setSearchTerm(term);
    // Redirect to search results page
    console.log("Searching for popular term:", term);
  };

  const background = heroBackgrounds[currentBackground];

  return (
    <div className="relative h-[680px] md:h-[600px] w-full bg-cover bg-center overflow-hidden transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.15)), url(${background.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
      
      <div className="absolute bottom-4 right-6 text-white text-sm font-medium p-2 bg-black/30 rounded">
        <div>{background.name}, <span className="font-normal">{background.title}</span></div>
      </div>
      
      <div className="flex items-center justify-center h-full px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Find the perfect <span className="italic">freelance</span> services for your business
            </h1>
            
            <form onSubmit={handleSearch} className="mt-8 flex flex-col md:flex-row">
              <div className="flex-grow mb-2 md:mb-0">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for any service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-6 px-4 text-lg rounded-md rounded-r-none"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="bg-fiverr-green hover:bg-fiverr-dark-green text-white font-semibold py-6 px-8 rounded-md md:rounded-l-none"
              >
                <Search className="mr-2" size={20} />
                Search
              </Button>
            </form>
            
            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start text-white">
              <span className="mr-3 font-medium">Popular:</span>
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(term)}
                  className="m-1 px-3 py-1 border border-white/60 rounded-full text-sm hover:border-white hover:bg-white/10 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
