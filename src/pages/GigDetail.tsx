
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ThumbsUp, Clock, ChevronDown, ChevronUp, CheckCircle, XCircle, MessageSquare, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

// Sample gig data
const gigData = {
  id: "web-1",
  title: "I will create a responsive WordPress website with SEO optimization",
  description: "Are you looking for a professional WordPress website that is responsive, fast loading, and optimized for search engines? Look no further! I will create a custom WordPress website that not only looks great but also performs exceptionally well in search engine rankings.",
  images: [
    "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/edcf8fc8b9aecaa25ce6c68d641f5e367e9ce636.png",
    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/9a8420c8af73804056cd9b3d3219c5bf-1689535210/Screenshot%202023-07-16%20223406/create-a-responsive-website-using-wordpress.png",
    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/e8c3f9985bca805fb4dce5dbcbb6db58-1674827602/Drones%20Empire%20Shopify%20Store/create-a-responsive-website-using-wordpress.jpg"
  ],
  seller: {
    name: "john_dev",
    level: "Level 2 Seller",
    country: "United States",
    image: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/8a1623fd3276ad5e3c31b96b5aa9d8c2-1647284030914/4af1c28b-bdcf-4afb-b59c-10256f47a80a.jpg",
    rating: 4.9,
    reviewCount: 231,
    orderCount: 452,
    memberSince: "Jan 2019",
    responseTime: "1 hour",
    lastDelivery: "about 2 hours"
  },
  packages: [
    {
      name: "Basic",
      price: 120,
      description: "5-page responsive website with basic SEO",
      deliveryTime: 7,
      revisions: 2,
      features: [
        "5 Pages",
        "Responsive Design",
        "Content Upload",
        "Basic SEO",
        "Contact Form"
      ]
    },
    {
      name: "Standard",
      price: 200,
      description: "10-page responsive website with advanced features",
      deliveryTime: 10,
      revisions: 5,
      features: [
        "10 Pages",
        "Responsive Design",
        "Content Upload",
        "Advanced SEO",
        "Contact Form",
        "Social Media Integration",
        "Google Analytics Setup"
      ]
    },
    {
      name: "Premium",
      price: 350,
      description: "Full-featured website with e-commerce capabilities",
      deliveryTime: 14,
      revisions: "Unlimited",
      features: [
        "15+ Pages",
        "Responsive Design",
        "Content Upload",
        "Advanced SEO",
        "Contact Form",
        "Social Media Integration",
        "Google Analytics Setup",
        "E-commerce Functionality",
        "Payment Gateway Integration",
        "Speed Optimization",
        "1 Month Support"
      ]
    }
  ],
  reviews: [
    {
      user: "Mark S.",
      country: "United States",
      avatar: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/22711136/original/1523016871762_Profile.jpg",
      rating: 5,
      date: "2 weeks ago",
      comment: "Amazing work! John delivered the website way before the deadline and it looks fantastic. Very responsive and professional. Will definitely use his services again."
    },
    {
      user: "Sophie T.",
      country: "Australia",
      avatar: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/61291174/original/1584122487502_IMG_20191220_151820_598.jpg",
      rating: 4.5,
      date: "1 month ago",
      comment: "Great experience working with John. He understood my requirements perfectly and delivered a beautiful website. Minor revisions were handled quickly. Would recommend!"
    }
  ],
  tags: ["wordpress development", "responsive design", "website creation", "seo optimization", "business website"]
};

const GigDetail = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(1); // Standard package selected by default
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="pt-8 pb-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column (Gig Details) */}
          <div className="w-full lg:w-2/3">
            {/* Breadcrumbs */}
            <nav className="text-sm text-fiverr-gray mb-4">
              <ol className="flex flex-wrap items-center">
                <li className="mr-2">
                  <a href="/" className="hover:text-fiverr-green">Home</a>
                </li>
                <span className="mr-2">/</span>
                <li className="mr-2">
                  <a href="/categories/wordpress" className="hover:text-fiverr-green">WordPress</a>
                </li>
                <span className="mr-2">/</span>
                <li className="text-fiverr-black font-medium truncate">
                  {gigData.title}
                </li>
              </ol>
            </nav>
            
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-fiverr-black mb-6">
              {gigData.title}
            </h1>
            
            {/* Seller Brief */}
            <div className="flex items-center mb-6">
              <img 
                src={gigData.seller.image} 
                alt={gigData.seller.name} 
                className="w-8 h-8 rounded-full mr-3"
              />
              <div className="flex items-center flex-wrap gap-y-1">
                <span className="text-fiverr-black font-medium mr-2">{gigData.seller.name}</span>
                <div className="flex items-center mr-4">
                  <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-medium">{gigData.seller.rating}</span>
                  <span className="text-fiverr-gray ml-1">({gigData.seller.reviewCount})</span>
                </div>
                <span className="text-fiverr-gray">{gigData.seller.orderCount} Orders in Queue</span>
              </div>
            </div>
            
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative">
                <img 
                  src={gigData.images[selectedImageIndex]} 
                  alt={gigData.title} 
                  className="w-full rounded-lg"
                />
              </div>
              <div className="flex mt-4 gap-3 overflow-x-auto hide-scrollbar">
                {gigData.images.map((image, index) => (
                  <button 
                    key={index} 
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 border-2 rounded ${
                      selectedImageIndex === index ? 'border-fiverr-green' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="w-full border-b border-fiverr-border-gray grid grid-cols-4">
                <TabsTrigger 
                  value="description" 
                  className="data-[state=active]:text-fiverr-black data-[state=active]:border-b-2 data-[state=active]:border-fiverr-black rounded-none"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger 
                  value="about-seller" 
                  className="data-[state=active]:text-fiverr-black data-[state=active]:border-b-2 data-[state=active]:border-fiverr-black rounded-none"
                >
                  About the Seller
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="data-[state=active]:text-fiverr-black data-[state=active]:border-b-2 data-[state=active]:border-fiverr-black rounded-none"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="faq" 
                  className="data-[state=active]:text-fiverr-black data-[state=active]:border-b-2 data-[state=active]:border-fiverr-black rounded-none"
                >
                  FAQ
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="pt-6">
                <div className={`prose max-w-none text-fiverr-black ${!showMore ? 'line-clamp-6' : ''}`}>
                  <p>{gigData.description}</p>
                  <h3 className="text-xl font-bold mt-6 mb-3">What you'll get:</h3>
                  <ul className="space-y-2">
                    <li>✅ Custom WordPress website designed to match your brand identity</li>
                    <li>✅ Mobile-responsive design that looks great on all devices</li>
                    <li>✅ SEO optimization to help your site rank higher in search results</li>
                    <li>✅ Fast loading speed for better user experience and SEO</li>
                    <li>✅ Contact forms and social media integration</li>
                    <li>✅ Basic security setup to protect your website</li>
                  </ul>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3">Why choose my service:</h3>
                  <ul className="space-y-2">
                    <li>📊 Years of experience in WordPress development</li>
                    <li>📊 Attention to detail and commitment to quality</li>
                    <li>📊 Excellent communication throughout the process</li>
                    <li>📊 Quick turnaround times and timely delivery</li>
                    <li>📊 Post-delivery support and guidance</li>
                  </ul>
                </div>
                
                <button 
                  onClick={() => setShowMore(!showMore)}
                  className="mt-4 text-fiverr-green flex items-center font-medium"
                >
                  {showMore ? (
                    <>
                      Show less <ChevronUp size={18} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDown size={18} className="ml-1" />
                    </>
                  )}
                </button>
                
                {/* Tags */}
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    {gigData.tags.map((tag, index) => (
                      <a 
                        key={index}
                        href={`/search?q=${tag}`}
                        className="bg-fiverr-light-gray text-fiverr-gray text-sm py-1 px-3 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="about-seller" className="pt-6">
                <div className="flex items-start">
                  <img 
                    src={gigData.seller.image} 
                    alt={gigData.seller.name} 
                    className="w-20 h-20 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-fiverr-black mb-1">{gigData.seller.name}</h3>
                    <p className="text-fiverr-gray mb-2">WordPress Developer</p>
                    <div className="flex items-center mb-4">
                      <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{gigData.seller.rating}</span>
                      <span className="text-fiverr-gray ml-1">({gigData.seller.reviewCount})</span>
                    </div>
                    <Button variant="outline" className="border-fiverr-gray text-fiverr-black hover:bg-fiverr-light-gray">
                      Contact Me
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-b border-fiverr-border-gray py-6">
                  <div>
                    <h4 className="text-fiverr-gray mb-3">From</h4>
                    <p className="text-fiverr-black">{gigData.seller.country}</p>
                  </div>
                  <div>
                    <h4 className="text-fiverr-gray mb-3">Member since</h4>
                    <p className="text-fiverr-black">{gigData.seller.memberSince}</p>
                  </div>
                  <div>
                    <h4 className="text-fiverr-gray mb-3">Avg. response time</h4>
                    <p className="text-fiverr-black">{gigData.seller.responseTime}</p>
                  </div>
                  <div>
                    <h4 className="text-fiverr-gray mb-3">Last delivery</h4>
                    <p className="text-fiverr-black">{gigData.seller.lastDelivery}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-fiverr-black mb-4">Seller Bio</h3>
                  <p className="text-fiverr-black">
                    Hi there! I'm John, a professional WordPress developer with over 5 years of experience. I specialize in creating responsive, SEO-friendly websites that help businesses establish a strong online presence. My background in both design and development allows me to create websites that not only look great but also perform exceptionally well. I'm passionate about delivering high-quality work and ensuring my clients are completely satisfied with the final product.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="mr-6">
                      <span className="text-4xl font-bold text-fiverr-black">{gigData.seller.rating}</span>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(gigData.seller.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 fill-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center">
                            <span className="text-sm text-fiverr-gray mr-2">5 Stars</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-fiverr-green rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <span className="text-sm text-fiverr-gray ml-2">(180)</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <span className="text-sm text-fiverr-gray mr-2">4 Stars</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-fiverr-green rounded-full" style={{ width: '12%' }}></div>
                            </div>
                            <span className="text-sm text-fiverr-gray ml-2">(32)</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <span className="text-sm text-fiverr-gray mr-2">3 Stars</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-fiverr-green rounded-full" style={{ width: '3%' }}></div>
                            </div>
                            <span className="text-sm text-fiverr-gray ml-2">(15)</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <span className="text-sm text-fiverr-gray mr-2">2 Stars</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-fiverr-green rounded-full" style={{ width: '0%' }}></div>
                            </div>
                            <span className="text-sm text-fiverr-gray ml-2">(3)</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <span className="text-sm text-fiverr-gray mr-2">1 Star</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-fiverr-green rounded-full" style={{ width: '0%' }}></div>
                            </div>
                            <span className="text-sm text-fiverr-gray ml-2">(1)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="text-sm border-fiverr-gray text-fiverr-black hover:bg-fiverr-light-gray">
                      Most Relevant
                    </Button>
                    <Button variant="outline" className="text-sm border-fiverr-gray text-fiverr-black hover:bg-fiverr-light-gray">
                      Most Recent
                    </Button>
                  </div>
                </div>
                
                {/* Reviews list */}
                <div className="space-y-8">
                  {gigData.reviews.map((review, index) => (
                    <div key={index} className="pb-8 border-b border-fiverr-border-gray">
                      <div className="flex items-center mb-4">
                        <img 
                          src={review.avatar} 
                          alt={review.user} 
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <div className="flex items-center">
                            <span className="text-fiverr-black font-medium mr-2">{review.user}</span>
                            <span className="text-fiverr-gray text-sm">{review.country}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${
                                  i < Math.floor(review.rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300 fill-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-fiverr-gray text-sm ml-2">| {review.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-fiverr-black mb-4">{review.comment}</p>
                      
                      <div className="flex items-center">
                        <span className="text-fiverr-gray text-sm mr-4">Helpful?</span>
                        <button className="flex items-center text-fiverr-gray hover:text-fiverr-green mr-4">
                          <ThumbsUp size={16} className="mr-1" />
                          <span>Yes</span>
                        </button>
                        <button className="flex items-center text-fiverr-gray hover:text-fiverr-green">
                          <MessageSquare size={16} className="mr-1" />
                          <span>Comment</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-fiverr-black mb-2">Do you provide ongoing support after the website is completed?</h3>
                    <p className="text-fiverr-black">Yes, I offer post-delivery support to ensure your website continues to function properly. The duration of support depends on the package you choose. The Premium package includes 1 month of support. For additional support, I offer maintenance packages that can be purchased separately.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-fiverr-black mb-2">What information do you need from me to start building my website?</h3>
                    <p className="text-fiverr-black">To get started, I'll need your brand guidelines (logo, colors, fonts), content for the pages (text and images), any specific feature requirements, and examples of websites you like for inspiration. After you place an order, I'll send you a detailed questionnaire to gather all necessary information.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-fiverr-black mb-2">Can you help with website hosting?</h3>
                    <p className="text-fiverr-black">While I don't provide hosting services directly, I can recommend reliable hosting providers based on your needs and budget. I can also assist with setting up your hosting account and installing WordPress if needed (this service may require an additional fee depending on your package).</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-fiverr-black mb-2">How many revisions are included in each package?</h3>
                    <p className="text-fiverr-black">The Basic package includes 2 revisions, the Standard package includes 5 revisions, and the Premium package comes with unlimited revisions until you're completely satisfied with the website.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column (Pricing) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              {/* Package Selection Tabs */}
              <div className="bg-white border border-fiverr-border-gray rounded-lg overflow-hidden mb-4">
                <div className="grid grid-cols-3 border-b border-fiverr-border-gray">
                  {gigData.packages.map((pkg, index) => (
                    <button
                      key={index}
                      className={`py-3 text-center font-medium text-sm ${
                        selectedPackage === index
                          ? 'text-fiverr-black border-b-2 border-fiverr-green'
                          : 'text-fiverr-gray'
                      }`}
                      onClick={() => setSelectedPackage(index)}
                    >
                      {pkg.name}
                    </button>
                  ))}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">{gigData.packages[selectedPackage].name}</h3>
                    <span className="text-2xl font-bold">${gigData.packages[selectedPackage].price}</span>
                  </div>
                  
                  <p className="text-fiverr-black mb-6">{gigData.packages[selectedPackage].description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-6">
                    <div className="flex items-center">
                      <Clock size={16} className="text-fiverr-gray mr-2" />
                      <span>{gigData.packages[selectedPackage].deliveryTime} Days Delivery</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fiverr-gray mr-2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                      <span>{gigData.packages[selectedPackage].revisions} Revisions</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {gigData.packages[selectedPackage].features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle size={16} className="text-fiverr-green mr-2 mt-1 flex-shrink-0" />
                        <span className="text-fiverr-black text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-fiverr-green hover:bg-fiverr-dark-green text-white py-3">
                    Continue (${gigData.packages[selectedPackage].price})
                  </Button>
                  
                  <button className="w-full flex items-center justify-center mt-3 py-2 text-fiverr-dark-gray hover:text-fiverr-black">
                    <MessageSquare size={16} className="mr-2" />
                    Contact Seller
                  </button>
                </div>
              </div>
              
              {/* Save to list button */}
              <div className="flex justify-center">
                <button className="flex items-center text-fiverr-gray hover:text-fiverr-black">
                  <Heart size={16} className="mr-2" />
                  <span>Save to List</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetail;
