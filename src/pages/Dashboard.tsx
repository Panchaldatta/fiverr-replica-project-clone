import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, DollarSign, PieChart, ShoppingCart, Star, MessageCircle, X } from 'lucide-react';
import UserGigsList from '@/components/gigs/UserGigsList';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { GigData } from '@/components/gigs/GigCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Conversation, Review, MessageChatProps } from '@/types/dashboard';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [userGigs, setUserGigs] = useState<GigData[]>([]);
  
  // Load user gigs from localStorage
  const getUserGigs = (): GigData[] => {
    const gigsJson = localStorage.getItem('userGigs');
    const allGigs = gigsJson ? JSON.parse(gigsJson) : [];
    return allGigs.filter((gig: GigData) => gig.sellerName === user?.displayName);
  };

  // Load gigs when component mounts or user changes
  useEffect(() => {
    if (user) {
      setUserGigs(getUserGigs());
    }
  }, [user]);

  // Handler for when a gig is deleted
  const handleGigDeleted = () => {
    setUserGigs(getUserGigs());
  };

  // Mock data
  const orders = [
    { id: '1', title: 'Logo Design', buyer: 'John D.', price: 50, status: 'In Progress', dueDate: '2023-09-15' },
    { id: '2', title: 'Website Redesign', buyer: 'Sarah M.', price: 250, status: 'Delivered', dueDate: '2023-09-10' },
    { id: '3', title: 'Mobile App UI', buyer: 'Robert J.', price: 350, status: 'Completed', dueDate: '2023-09-05' }
  ];

  const earnings = {
    total: 650,
    pending: 50,
    withdrawn: 600,
    available: 0
  };

  const activeOrders = 1;
  const completedOrders = 2;
  const cancelledOrders = 0;

  const conversations: Conversation[] = [
    {
      id: '1',
      username: 'John Smith',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Hi, I have a question about your gig...',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      username: 'Emma Watson',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Thanks for the quick response!',
      timestamp: '1 day ago',
      unread: false
    },
    {
      id: '3',
      username: 'Michael Brown',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Looking forward to working with you!',
      timestamp: '2 days ago',
      unread: false
    }
  ];

  // Mock message chat component
  const MessageChat = ({ isOpen, onClose }: MessageChatProps) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex flex-col h-full">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img 
                src="https://via.placeholder.com/40" 
                alt="User avatar" 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">John Smith</h3>
                <p className="text-xs text-fiverr-gray">Active now</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1">
              <X size={20} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-end">
                <img 
                  src="https://via.placeholder.com/40" 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="bg-gray-100 rounded-lg p-3 max-w-[75%]">
                  <p>Hi, I have a question about your gig...</p>
                  <span className="text-xs text-fiverr-gray mt-1">2:30 PM</span>
                </div>
              </div>
              
              <div className="flex items-end justify-end">
                <div className="bg-fiverr-green text-white rounded-lg p-3 max-w-[75%]">
                  <p>Sure, I'd be happy to help! What would you like to know?</p>
                  <span className="text-xs text-white/80 mt-1">2:32 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Message input */}
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-l-md p-2"
              />
              <button className="bg-fiverr-green text-white px-4 py-2 rounded-r-md">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const reviews: Review[] = [
    {
      id: '1',
      username: 'Sarah M.',
      avatar: 'https://via.placeholder.com/40',
      rating: 5,
      content: 'Excellent work! Will definitely hire again.',
      date: '2 weeks ago',
      gigTitle: 'Logo Design'
    },
    {
      id: '2',
      username: 'Robert J.',
      avatar: 'https://via.placeholder.com/40',
      rating: 4,
      content: 'Good job, but took a bit longer than expected.',
      date: '1 month ago',
      gigTitle: 'Website Redesign'
    }
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-fiverr-black">Dashboard</h1>
          <p className="text-fiverr-gray">Welcome back, {user.displayName}!</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/gig/create">
            <Button className="bg-fiverr-green hover:bg-fiverr-dark-green">
              Create New Gig
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-md mr-4">
                <ShoppingCart size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-fiverr-gray">Active Orders</p>
                <h4 className="text-2xl font-bold">{activeOrders}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-md mr-4">
                <Circle size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-fiverr-gray">Completed Orders</p>
                <h4 className="text-2xl font-bold">{completedOrders}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-md mr-4">
                <X size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-fiverr-gray">Cancelled Orders</p>
                <h4 className="text-2xl font-bold">{cancelledOrders}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-md mr-4">
                <DollarSign size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-fiverr-gray">Total Earnings</p>
                <h4 className="text-2xl font-bold">${earnings.total}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="gigs" className="w-full">
        <TabsList className="mb-8 border-b w-full justify-start rounded-none bg-transparent space-x-8">
          <TabsTrigger 
            value="gigs"
            className="data-[state=active]:border-b-2 data-[state=active]:border-fiverr-green rounded-none border-b-2 border-transparent px-1 pb-2"
          >
            My Gigs
          </TabsTrigger>
          <TabsTrigger 
            value="orders"
            className="data-[state=active]:border-b-2 data-[state=active]:border-fiverr-green rounded-none border-b-2 border-transparent px-1 pb-2"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger 
            value="earnings"
            className="data-[state=active]:border-b-2 data-[state=active]:border-fiverr-green rounded-none border-b-2 border-transparent px-1 pb-2"
          >
            Earnings
          </TabsTrigger>
          <TabsTrigger 
            value="messages"
            className="data-[state=active]:border-b-2 data-[state=active]:border-fiverr-green rounded-none border-b-2 border-transparent px-1 pb-2"
          >
            Messages
          </TabsTrigger>
          <TabsTrigger 
            value="reviews"
            className="data-[state=active]:border-b-2 data-[state=active]:border-fiverr-green rounded-none border-b-2 border-transparent px-1 pb-2"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="gigs" className="mt-0">
          <UserGigsList 
            gigs={userGigs} 
            onGigDeleted={handleGigDeleted} 
          />
        </TabsContent>
        
        {/* Other TabsContent components */}
        <TabsContent value="orders" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-xs text-fiverr-gray border-b">
                    <tr>
                      <th className="px-4 py-3 text-left">Order</th>
                      <th className="px-4 py-3 text-left">Buyer</th>
                      <th className="px-4 py-3 text-left">Price</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b">
                        <td className="px-4 py-3">{order.title}</td>
                        <td className="px-4 py-3">{order.buyer}</td>
                        <td className="px-4 py-3">${order.price}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{order.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="earnings" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Earnings Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-fiverr-gray">Total Earnings</span>
                    <span className="font-bold">${earnings.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-fiverr-gray">Pending Clearance</span>
                    <span className="font-bold">${earnings.pending}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-fiverr-gray">Withdrawn</span>
                    <span className="font-bold">${earnings.withdrawn}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-fiverr-gray">Available for Withdrawal</span>
                    <span className="font-bold">${earnings.available}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[200px]">
                <div className="text-center">
                  <PieChart size={80} className="mx-auto text-fiverr-gray" />
                  <p className="mt-4 text-fiverr-gray">Earnings visualization not available in demo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="messages" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {conversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    onClick={() => setActiveChat(conversation.id)}
                    className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="relative">
                      <img 
                        src={conversation.avatar} 
                        alt={conversation.username} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      {conversation.unread && (
                        <span className="absolute top-0 right-2 w-3 h-3 bg-fiverr-green rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium truncate">{conversation.username}</h4>
                        <span className="text-xs text-fiverr-gray">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-fiverr-gray truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {activeChat && (
            <MessageChat 
              isOpen={!!activeChat}
              onClose={() => setActiveChat(null)}
            />
          )}
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center mb-3">
                      <img 
                        src={review.avatar} 
                        alt={review.username} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{review.username}</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < review.rating 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-gray-300"
                                } 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-fiverr-gray ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    {review.gigTitle && (
                      <p className="text-sm text-fiverr-green mb-1">
                        For: {review.gigTitle}
                      </p>
                    )}
                    <p className="text-sm text-fiverr-black">{review.content}</p>
                  </div>
                ))}

                {reviews.length === 0 && (
                  <div className="text-center py-8">
                    <Star size={40} className="mx-auto text-gray-300" />
                    <p className="mt-2 text-fiverr-gray">No reviews yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
