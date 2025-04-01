
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Check, MessageSquare } from 'lucide-react';

const SellerProfile = () => {
  const { username } = useParams();
  const { user } = useAuth();
  
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

          <Tabs defaultValue="gigs">
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
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-fiverr-border-gray rounded-md">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-xl font-medium text-fiverr-black">No reviews yet</h3>
                <p className="text-fiverr-gray mt-2 max-w-md">
                  Once this seller completes orders, reviews will appear here.
                </p>
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
