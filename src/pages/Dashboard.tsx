
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, MessageSquare, Star, Settings, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MessageList, { Conversation } from '@/components/messages/MessageList';
import MessageChat, { Message } from '@/components/messages/MessageChat';
import ReviewForm from '@/components/reviews/ReviewForm';
import ReviewList, { Review } from '@/components/reviews/ReviewList';

// Sample data for messages
const sampleConversations: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'user-123',
    participantName: 'Jane Smith',
    participantAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    lastMessage: 'I've reviewed your requirements and I can definitely help with your WordPress project.',
    timestamp: '2 hours ago',
    unread: 1
  },
  {
    id: 'conv-2',
    participantId: 'user-456',
    participantName: 'Mark Johnson',
    participantAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Thanks for your order! I'll start working on it right away.',
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
      content: 'Hello! I saw your profile and I'm interested in your WordPress development services.',
      senderId: 'current-user',
      receiverId: 'user-123',
      senderName: 'You',
      timestamp: '2 days ago',
      read: true
    },
    {
      id: 'msg-2',
      content: 'Hi there! Thanks for reaching out. I'd be happy to help with your WordPress needs. Could you tell me more about your project?',
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
      content: 'I've reviewed your requirements and I can definitely help with your WordPress project. Would you like to proceed with my standard package?',
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
      content: 'Hi Mark, I just placed an order for your logo design service.',
      senderId: 'current-user',
      receiverId: 'user-456',
      senderName: 'You',
      timestamp: '2 days ago',
      read: true
    },
    {
      id: 'msg-6',
      content: 'Thanks for your order! I'll start working on it right away. I'll send you the first drafts within 48 hours.',
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
      id: 'msg-7',
      content: 'Hello Sarah, I'm checking on the progress of my banner design.',
      senderId: 'current-user',
      receiverId: 'user-789',
      senderName: 'You',
      timestamp: '4 days ago',
      read: true
    },
    {
      id: 'msg-8',
      content: 'Hi! I'm finalizing the designs now and will deliver them shortly.',
      senderId: 'user-789',
      receiverId: 'current-user',
      senderName: 'Sarah Williams',
      senderAvatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      timestamp: '3 days ago',
      read: true
    },
    {
      id: 'msg-9',
      content: 'The final files have been delivered. Please let me know if you need any revisions.',
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
  const [activeTab, setActiveTab] = useState('orders');
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(sampleMessages);
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);

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
      
      <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
        
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
              <CardDescription>Manage your active orders here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-fiverr-black">No active orders</h3>
                <p className="text-fiverr-gray mt-2 max-w-md">
                  You don't have any active orders at the moment. Browse services to find what you need.
                </p>
                <Button variant="outline" className="mt-6 fiverr-button-outline">
                  Browse Services
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Reviews section */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews & Ratings</CardTitle>
              <CardDescription>Manage your reviews or leave new ones for completed services.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Reviews list */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Your Reviews</h3>
                <ReviewList reviews={reviews} />
              </div>
              
              {/* Review form */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Leave a New Review</h3>
                <ReviewForm onReviewSubmit={handleReviewSubmit} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>View and manage your conversations.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                {/* Conversations list */}
                <div className="border-r border-fiverr-border-gray overflow-y-auto">
                  <MessageList 
                    conversations={sampleConversations} 
                    onSelectConversation={(id) => setActiveConversation(id)}
                    activeConversationId={activeConversation || undefined}
                  />
                </div>
                
                {/* Chat window */}
                <div className="md:col-span-2 flex flex-col h-full">
                  <MessageChat 
                    conversationId={activeConversation || ''}
                    messages={activeConversation ? messages[activeConversation] || [] : []}
                    participant={getCurrentParticipant() || { id: '', name: '' }}
                    currentUserId="current-user"
                    onSendMessage={handleSendMessage}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gigs" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Gigs</CardTitle>
                <CardDescription>Manage the services you offer.</CardDescription>
              </div>
              <Button className="fiverr-button">Create a New Gig</Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Star size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-fiverr-black">No gigs created yet</h3>
                <p className="text-fiverr-gray mt-2 max-w-md">
                  Create your first gig and start offering your services to customers around the world.
                </p>
                <Button className="mt-6 fiverr-button">
                  Create a Gig
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Earnings</CardTitle>
              <CardDescription>Track your revenue and withdraw funds.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <DollarSign size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-fiverr-black">No earnings yet</h3>
                <p className="text-fiverr-gray mt-2 max-w-md">
                  Complete orders to start earning. Your revenue will appear here once you've been paid.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your profile and account preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-fiverr-black mb-1">
                      Display Name
                    </label>
                    <Input 
                      value={user.displayName || ''}
                      disabled
                      className="border-fiverr-border-gray"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-fiverr-black mb-1">
                      Email Address
                    </label>
                    <Input 
                      value={user.email || ''}
                      disabled
                      className="border-fiverr-border-gray"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="fiverr-button">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
