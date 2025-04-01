
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const categoryData = [
  {
    name: "Graphics & Design",
    icon: "📊",
    subcategories: ["Logo Design", "Brand Identity", "Social Media Design", "Illustration", "NFT Art"]
  },
  {
    name: "Digital Marketing",
    icon: "💻",
    subcategories: ["SEO", "Social Media", "Email Marketing", "Video Marketing", "Web Analytics"]
  },
  {
    name: "Writing & Translation",
    icon: "✍️",
    subcategories: ["Content Writing", "Translation", "Proofreading", "UX Writing", "Technical Writing"]
  },
  {
    name: "Video & Animation",
    icon: "🎬",
    subcategories: ["Video Editing", "Animation", "Short Video Ads", "Explainer Videos", "Logo Animation"]
  },
  {
    name: "Music & Audio",
    icon: "🎵",
    subcategories: ["Voice Over", "Music Production", "Mixing & Mastering", "Podcast Editing", "Sound Effects"]
  },
  {
    name: "Programming & Tech",
    icon: "💡",
    subcategories: ["WordPress", "Web Programming", "Mobile Apps", "Game Development", "E-Commerce Development"]
  },
  {
    name: "Business",
    icon: "📈",
    subcategories: ["Virtual Assistant", "Market Research", "Business Plans", "Legal Consultation", "Financial Consulting"]
  },
  {
    name: "Lifestyle",
    icon: "🌞",
    subcategories: ["Online Tutoring", "Fitness Lessons", "Cooking Lessons", "Life Coaching", "Astrology & Readings"]
  },
  {
    name: "Data",
    icon: "📊",
    subcategories: ["Data Analysis", "Data Visualization", "Databases", "Data Mining", "Data Processing"]
  },
];

const CategoriesSection = () => {
  const isMobile = useIsMobile();
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-fiverr-black text-center mb-4">
          Explore the marketplace
        </h2>
        
        <div className="mt-12 grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-8">
          {categoryData.map((category, index) => (
            <div 
              key={index}
              className="relative"
              onMouseEnter={() => !isMobile && setHoveredCategory(index)}
              onMouseLeave={() => !isMobile && setHoveredCategory(null)}
            >
              <Link to={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <p className="text-fiverr-black font-medium text-sm">{category.name}</p>
                </div>
              </Link>
              
              {/* Dropdown for desktop */}
              {!isMobile && hoveredCategory === index && (
                <div className="absolute top-full left-0 z-50 mt-3 w-60 bg-white shadow-lg rounded-md p-3 border border-fiverr-border-gray">
                  <ul>
                    {category.subcategories.map((subcat, idx) => (
                      <li key={idx}>
                        <Link
                          to={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-3 py-2 text-sm text-fiverr-black hover:bg-fiverr-light-gray rounded-md"
                        >
                          {subcat}
                        </Link>
                      </li>
                    ))}
                    <li className="border-t border-fiverr-border-gray mt-2 pt-2">
                      <Link
                        to={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-3 py-2 text-sm text-fiverr-green font-medium"
                      >
                        See All
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
