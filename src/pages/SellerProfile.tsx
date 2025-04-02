
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Check, MessageSquare } from 'lucide-react';
import ReviewList, { Review } from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';

const SellerProfile = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('gigs');
  
  // This would normally fetch the seller data from a backend
  // For demo purposes, we're using the current user's data
  const seller = {
    displayName: user?.displayName || 'John Doe',
    photoURL: user?.photoURL,
    username: username || 'john-doe',
    location: 'San Francisco, USA',
    memberSince: 'March 2023',
    responseTime: 'Within a few hours',
    description: 'Professional developer with expertise in web and mobile application development. I specialize in React, React Native, and Node.js. I deliver high-quality code with fast turnaround times.',
    languages: [
      { language: 'English', level: 'Fluent' },
      { language: 'Spanish', level: 'Conversational' }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Mobile Development'],
    stats: {
      rating: 4.9,
      reviews: 245,
      completedOrders: 312,
      inProgress: 3
    }
  };

  // Sample reviews for this seller
  const sellerReviews: Review[] = [
    {
      id: 'review-1',
      user: {
        id: 'user-123',
        name: 'Jessica Lee',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        country: 'United States'
      },
      rating: 5,
      comment: 'Incredible work! The delivery was faster than expected and the quality exceeded my expectations. Will definitely work with this seller again.',
      date: '1 week ago',
      helpful: 7
    },
    {
      id: 'review-2',
      user: {
        id: 'user-456',
        name: 'Michael Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
        country: 'Spain'
      },
      rating: 4,
      comment: 'Great service overall. Communication was smooth and the final product was good. Just needed a few minor revisions.',
      date: '2 weeks ago',
      helpful: 3
    },
    {
      id: 'review-3',
      user: {
        id: 'user-789',
        name: 'Amanda Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        country: 'Australia'
      },
      rating: 5,
      comment: 'One of the best developers I've worked with! Really understood my requirements and delivered exactly what I needed. Highly recommended.',
      date: '1 month ago',
      helpful: 12
    }
  ];

  const [reviews, setReviews] = useState<Review[]>(sellerReviews);

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      user: {
        id: user?.uid || 'unknown',
        name: user?.displayName || 'Anonymous',
        avatar: user?.photoURL || 'https://via.placeholder.com/150',
        country: 'Unknown Location'
      },
      rating: review.rating,
      comment: review.comment,
      date: 'Just now',
      helpful: 0
    };

    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Profile info */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={seller.photoURL || undefined} />
                  <AvatarFallback className="bg-fiverr-green text-white text-xl">
                    {seller.displayName.split(' ').map(name => name[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-fiverr-black mb-1">{seller.displayName}</h2>
                <p className="text-fiverr-gray mb-3">@{seller.username}</p>
                <div className="flex items-center justify-center mb-4">
                  <MapPin size={16} className="text-fiverr-gray mr-1" />
                  <span className="text-fiverr-gray text-sm">{seller.location}</span>
                </div>
                <Button className="w-full fiverr-button mb-4">
                  <MessageSquare size={16} className="mr-2" />
                  Contact Me
                </Button>
              </div>

              <div className="border-t border-fiverr-border-gray pt-4 mt-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Member since</span>
                      <span className="text-sm text-fiverr-gray">{seller.memberSince}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Avg. response time</span>
                      <span className="text-sm text-fiverr-gray">{seller.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-fiverr-border-gray pt-4 mt-4">
                <h3 className="text-base font-medium mb-3">Languages</h3>
                <div className="space-y-2">
                  {seller.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{lang.language}</span>
                      <span className="text-sm text-fiverr-gray">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-fiverr-border-gray pt-4 mt-4">
                <h3 className="text-base font-medium mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {seller.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-fiverr-light-gray px-3 py-1 rounded-full text-fiverr-gray"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-md overflow-hidden shadow-sm border border-fiverr-border-gray mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-fiverr-black">About Me</h1>
                <div className="flex items-center text-fiverr-black">
                  <Star size={16} className="fill-yellow-400 stroke-yellow-400 mr-1" />
                  <span className="font-medium mr-1">{seller.stats.rating}</span>
                  <span className="text-sm text-fiverr-gray">({seller.stats.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-fiverr-black mb-6">{seller.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 border border-fiverr-border-gray rounded-md">
                  <div className="text-2xl font-bold text-fiverr-black">{seller.stats.completedOrders}</div>
                  <div className="text-sm text-fiverr-gray">Orders Completed</div>
                </div>
                <div className="text-center p-3 border border-fiverr-border-gray rounded-md">
                  <div className="text-2xl font-bold text-fiverr-black">{seller.stats.inProgress}</div>
                  <div className="text-sm text-fiverr-gray">In Progress</div>
                </div>
                <div className="text-center p-3 border border-fiverr-border-gray rounded-md">
                  <div className="flex items-center justify-center text-2xl font-bold text-fiverr-black">
                    <Clock size={18} className="mr-1" /> 2 hrs
                  </div>
                  <div className="text-sm text-fiverr-gray">Response Time</div>
                </div>
                <div className="text-center p-3 border border-fiverr-border-gray rounded-md">
                  <div className="flex items-center justify-center text-2xl font-bold text-fiverr-green">
                    <Check size={18} className="mr-1" /> 100%
                  </div>
                  <div className="text-sm text-fiverr-gray">Order Completion</div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="gigs" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="gigs">Gigs</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gigs">
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-fiverr-border-gray rounded-md">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-medium text-fiverr-black">No gigs available yet</h3>
                <p className="text-fiverr-gray mt-2 max-w-md">
                  This seller hasn't created any gigs yet. Check back later!
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="bg-white border border-fiverr-border-gray rounded-md p-6">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-fiverr-black">
                      {reviews.length} Reviews
                    </h2>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{seller.stats.rating}</span>
                    </div>
                  </div>
                  
                  {/* Rating summary */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
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
                
                {/* Reviews list */}
                <ReviewList reviews={reviews} />
                
                {/* Review form */}
                <div className="mt-8 pt-8 border-t border-fiverr-border-gray">
                  <h3 className="text-xl font-bold text-fiverr-black mb-4">
                    Leave a Review for {seller.displayName}
                  </h3>
                  <ReviewForm 
                    sellerId={seller.username} 
                    onReviewSubmit={handleReviewSubmit} 
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="portfolio">
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-fiverr-border-gray rounded-md">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-medium text-fiverr-black">Portfolio is empty</h3>
                <p className="text-fiverr-gray mt-2 max-w-md">
                  This seller hasn't added any portfolio items yet.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
