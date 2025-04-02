import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, MessageSquare, Star, Settings, DollarSign, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MessageList from '@/components/messages/MessageList';
import { Message } from '@/components/messages/MessageList';
import UserGigsList from '@/components/gigs/UserGigsList';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';
import { GigData } from '@/components/gigs/GigCard';

// Sample data for messages
const sampleConversations: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'user-123',
    participantName: 'Jane Smith',
    participantAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    lastMessage: "I've reviewed your requirements and I can definitely help with your WordPress project.",
    timestamp: '2 hours ago',
    unread: 1
  },
  {
    id: 'conv-2',
    participantId: 'user-456',
    participantName: 'Mark Johnson',
    participantAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: "Thanks for your order! I'll start working on it right away.",
    timestamp: 'Yesterday',
    unread: 0
  },
  {
    id: 'conv-3',
    participantId: 'user-789',
    participantName: 'Sarah Williams',
    participantAvatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    lastMessage: 'The final files have been delivered. Please let me know if you need any revisions.',
    timestamp: '3 days ago',
    unread: 0
  }
];

const sampleMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      content: "Hello! I saw your profile and I'm interested in your WordPress development services.",
      senderId: 'current-user',
      receiverId: 'user-123',
      senderName: 'You',
      timestamp: '2 days ago',
      read: true
    },
    {
      id: 'msg-2',
      content: "Hi there! Thanks for reaching out. I'd be happy to help with your WordPress needs. Could you tell me more about your project?",
      senderId: 'user-123',
      receiverId: 'current-user',
      senderName: 'Jane Smith',
      senderAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      timestamp: '2 days ago',
      read: true
    },
    {
      id: 'msg-3',
      content: 'I need a responsive e-commerce website with about 5-7 pages and product catalog integration.',
      senderId: 'current-user',
      receiverId: 'user-123',
      senderName: 'You',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 'msg-4',
      content: "I've reviewed your requirements and I can definitely help with your WordPress project. Would you like to proceed with my standard package?",
      senderId: 'user-123',
      receiverId: 'current-user',
      senderName: 'Jane Smith',
      senderAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      timestamp: '2 hours ago',
      read: false
    }
  ],
  'conv-2': [
    {
      id: 'msg-5',
      content: "I'd like to order your Basic WordPress website package.",
      senderId: 'current-user',
      receiverId: 'user-456',
      senderName: 'You',
      timestamp: '3 days ago',
      read: true
    },
    {
      id: 'msg-6',
      content: "Great choice! I'll create a custom order for you right away.",
      senderId: 'user-456',
      receiverId: 'current-user',
      senderName: 'Mark Johnson',
      senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '3 days ago',
      read: true
    },
    {
      id: 'msg-7',
      content: "I've sent you a custom offer. Please check and accept it when you're ready.",
      senderId: 'user-456',
      receiverId: 'current-user',
      senderName: 'Mark Johnson',
      senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '2 days ago',
      read: true
    },
    {
      id: 'msg-8',
      content: "I've accepted the offer and made the payment.",
      senderId: 'current-user',
      receiverId: 'user-456',
      senderName: 'You',
      timestamp: '2 days ago',
      read: true
    },
    {
      id: 'msg-9',
      content: "Thanks for your order! I'll start working on it right away.",
      senderId: 'user-456',
      receiverId: 'current-user',
      senderName: 'Mark Johnson',
      senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: 'Yesterday',
      read: true
    }
  ],
  'conv-3': [
    {
      id: 'msg-10',
      content: "How's my logo design coming along?",
      senderId: 'current-user',
      receiverId: 'user-789',
      senderName: 'You',
      timestamp: '4 days ago',
      read: true
    },
    {
      id: 'msg-11',
      content: "It's going well! I've completed the initial concepts and will send them to you shortly.",
      senderId: 'user-789',
      receiverId: 'current-user',
      senderName: 'Sarah Williams',
      senderAvatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      timestamp: '4 days ago',
      read: true
    },
    {
      id: 'msg-12',
      content: "I've just delivered the final files. Please check them out and let me know if you need any revisions.",
      senderId: 'user-789',
      receiverId: 'current-user',
      senderName: 'Sarah Williams',
      senderAvatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      timestamp: '3 days ago',
      read: true
    }
  ]
};

// Sample reviews
const sampleReviews: Review[] = [
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
    helpful: 3
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
    helpful: 1
  }
];

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gigs');
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(sampleMessages);
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [userGigs, setUserGigs] = useState<GigData[]>([]);

  // Load user gigs from localStorage
  useEffect(() => {
    const loadUserGigs = () => {
      const gigsJson = localStorage.getItem('userGigs');
      if (gigsJson) {
        const gigs: GigData[] = JSON.parse(gigsJson);
        setUserGigs(gigs);
      }
    };

    loadUserGigs();
  }, []);

  const handleSendMessage = (content: string) => {
    if (activeConversation) {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        content,
        senderId: 'current-user',
        receiverId: sampleConversations.find(c => c.id === activeConversation)?.participantId || '',
        senderName: 'You',
        timestamp: 'Just now',
        read: true
      };

      setMessages(prev => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), newMessage]
      }));
    }
  };

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

  // Refresh gigs data when a gig is deleted
  const refreshGigs = () => {
    const gigsJson = localStorage.getItem('userGigs');
    const gigs: GigData[] = gigsJson ? JSON.parse(gigsJson) : [];
    setUserGigs(gigs);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const getCurrentParticipant = () => {
    if (!activeConversation) return null;
    const conversation = sampleConversations.find(c => c.id === activeConversation);
    if (!conversation) return null;
    
    return {
      id: conversation.participantId,
      name: conversation.participantName,
      avatar: conversation.participantAvatar
    };
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-fiverr-black mb-8">My Dashboard</h1>
      
      <Tabs defaultValue="gigs" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag size={16} /> Orders
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare size={16} /> Messages
          </TabsTrigger>
          <TabsTrigger value="gigs" className="flex items-center gap-2">
            <Star size={16} /> My Gigs
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center gap-2">
            <DollarSign size={16} /> Earnings
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} /> Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
                <CardDescription>Orders currently in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Completed Orders</CardTitle>
                <CardDescription>Successfully delivered orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">27</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cancelled Orders</CardTitle>
                <CardDescription>Orders that were cancelled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <div className="bg-white rounded-md overflow-hidden border border-fiverr-border-gray">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-fiverr-light-gray">
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Buyer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Due On</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-fiverr-border-gray">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fiverr-black">#FO-3251</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Mark Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">WordPress Website</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Aug 15, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">$120</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          In Progress
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fiverr-black">#FO-3250</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Sarah Williams</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Logo Design</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Aug 10, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">$50</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Delivered
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fiverr-black">#FO-3249</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Alex Chen</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">SEO Optimization</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Aug 5, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">$75</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="messages">
          <div className="bg-white rounded-md overflow-hidden border border-fiverr-border-gray">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Messages sidebar */}
              <div className="border-r border-fiverr-border-gray">
                <div className="p-4 border-b border-fiverr-border-gray">
                  <Input 
                    placeholder="Search messages..." 
                    className="w-full"
                  />
                </div>
                <div className="h-[600px] overflow-y-auto">
                  <MessageList 
                    conversations={sampleConversations}
                    activeConversationId={activeConversation}
                    onSelectConversation={(id) => setActiveConversation(id)}
                  />
                </div>
              </div>
              
              {/* Message content */}
              <div className="col-span-2 flex flex-col h-[600px]">
                {activeConversation ? (
                  <MessageChat 
                    messages={messages[activeConversation] || []}
                    participant={getCurrentParticipant()}
                    onSendMessage={handleSendMessage}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <MessageSquare size={48} className="text-fiverr-gray mb-4" />
                    <h3 className="text-xl font-medium text-fiverr-black mb-2">Your Messages</h3>
                    <p className="text-fiverr-gray max-w-md">
                      Select a conversation from the sidebar to view your messages.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="gigs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Gigs</CardTitle>
                <CardDescription>Manage the services you offer</CardDescription>
              </div>
              <Button 
                className="fiverr-button flex items-center gap-1"
                onClick={() => navigate('/gig/create')}
              >
                <Plus size={16} />
                Create New Gig
              </Button>
            </CardHeader>
            <CardContent>
              <UserGigsList 
                gigs={userGigs} 
                onGigDeleted={refreshGigs}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="earnings">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Available for Withdrawal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$1,240</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Earnings this month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$850</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Earnings last month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$1,120</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Lifetime Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$12,450</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-md overflow-hidden border border-fiverr-border-gray mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Recent Earnings</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-fiverr-light-gray">
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Buyer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-fiverr-gray uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-fiverr-border-gray">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Aug 10, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fiverr-black">#FO-3250</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Sarah Williams</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Logo Design</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fiverr-black">$50</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Aug 5, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fiverr-black">#FO-3249</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Alex Chen</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">SEO Optimization</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fiverr-black">$75</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Jul 28, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fiverr-black">#FO-3248</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">Emily Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-fiverr-black">WordPress Website</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-fiverr-black">$120</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button className="fiverr-button">Withdraw Earnings</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src={user?.photoURL || "https://via.placeholder.com/150"} 
                        alt={user?.displayName || "User"} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Name</label>
                    <Input defaultValue={user?.displayName || ""} />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue={user?.email || ""} disabled />
                  </div>
                  
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Email notifications for new orders</span>
                          <input type="checkbox" defaultChecked className="toggle toggle-success" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Email notifications for messages</span>
                          <input type="checkbox" defaultChecked className="toggle toggle-success" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Email notifications for reviews</span>
                          <input type="checkbox" defaultChecked className="toggle toggle-success" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Marketing emails</span>
                          <input type="checkbox" className="toggle toggle-success" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Security</h3>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Language & Region</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Language</label>
                          <select className="w-full p-2 border border-fiverr-border-gray rounded-md mt-1">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Currency</label>
                          <select className="w-full p-2 border border-fiverr-border-gray rounded-md mt-1">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                            <option>CAD (C$)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Reviews & Feedback</CardTitle>
                  <CardDescription>Manage reviews you've received</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReviewList reviews={reviews} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
