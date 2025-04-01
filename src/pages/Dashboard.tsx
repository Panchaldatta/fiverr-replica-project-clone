
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, MessageSquare, Star, Settings, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

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
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>View and manage your conversations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-fiverr-black">No messages yet</h3>
                <p className="text-fiverr-gray mt-2 max-w-md">
                  When you place an order or receive a message from a seller, you'll see it here.
                </p>
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
