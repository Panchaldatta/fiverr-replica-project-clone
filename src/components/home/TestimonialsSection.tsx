
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Kay Kim, Co-Founder",
    company: "ROOTED",
    image: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173399/testimonial-video-still-rooted.jpg",
    logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted_logo.718910f.png",
    content: "It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working.",
  },
  {
    id: 2,
    name: "Tim and Dan Joo, Co-Founders",
    company: "HAERFEST",
    image: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-haerfest.jpg",
    logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/haerfest_logo.03fa5c0.png",
    content: "We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world.",
  },
  {
    id: 3,
    name: "Brighid Gannon, Co-Founder",
    company: "LAVENDER",
    image: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg",
    logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lavender_logo.89c5e2e.png",
    content: "We used Fiverr for our explainer video and to help us translate our concept into something that could be communicated to people through video animation. It was phenomenal.",
  },
  {
    id: 4,
    name: "Caitlin Tormey, Chief Commercial Officer",
    company: "NAADAM",
    image: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-naadam.jpg",
    logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/naadam_logo.0a3b198.png",
    content: "We've used Fiverr for Shopify web development, graphic design, and backend web development. Working with Fiverr makes my job a little easier every day.",
  },
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 md:py-24 bg-fiverr-light-gray">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Mobile Testimonials (card slider) */}
          <div className="block md:hidden">
            <div 
              ref={scrollContainerRef}
              className="relative"
            >
              <div className="testimonial-card bg-white rounded-lg p-6 shadow-sm">
                <div className="mb-4">
                  <img 
                    src={testimonials[currentTestimonial].logo} 
                    alt={testimonials[currentTestimonial].company} 
                    className="h-12"
                  />
                </div>
                
                <p className="text-fiverr-black text-lg mb-6">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="flex items-center">
                  <span className="font-medium text-fiverr-black">
                    {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].company}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 mx-1 rounded-full transition-all ${
                      currentTestimonial === index ? 'w-8 bg-fiverr-green' : 'w-2 bg-gray-300'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop Testimonials (full layout) */}
          <div className="hidden md:block">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <img 
                      src={testimonials[currentTestimonial].logo} 
                      alt={testimonials[currentTestimonial].company} 
                      className="h-12"
                    />
                  </div>
                  
                  <p className="text-fiverr-black text-lg mb-6">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  
                  <div className="mt-auto">
                    <span className="font-medium text-fiverr-black">
                      {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].company}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 flex space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="h-10 w-10 rounded-full flex items-center justify-center bg-white border border-fiverr-gray text-fiverr-black hover:bg-fiverr-light-gray"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="h-10 w-10 rounded-full flex items-center justify-center bg-white border border-fiverr-gray text-fiverr-black hover:bg-fiverr-light-gray"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
