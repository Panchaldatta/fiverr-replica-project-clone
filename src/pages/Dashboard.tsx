
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, DollarSign, PieChart, ShoppingCart, Star, MessageCircle, X } from 'lucide-react';
import UserGigsList from '@/components/gigs/UserGigsList';
import { Navigate, Link } from 'react-router-dom';
import { GigData } from '@/components/gigs/GigCard';
import { Button } from '@/components/ui/button';
import { Conversation, Review, MessageChatProps } from '@/types/dashboard';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardOrders from '@/components/dashboard/DashboardOrders';
import DashboardEarnings from '@/components/dashboard/DashboardEarnings';
import DashboardMessages from '@/components/dashboard/DashboardMessages';
import DashboardReviews from '@/components/dashboard/DashboardReviews';

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [userGigs, setUserGigs] = useState<GigData[]>([]);
  
  // Load user gigs from localStorage
  useEffect(() => {
    const loadUserGigs = () => {
      const gigsJson = localStorage.getItem('userGigs');
      if (gigsJson) {
        try {
          const gigs = JSON.parse(gigsJson);
          setUserGigs(gigs);
        } catch (error) {
          console.error('Failed to parse user gigs from localStorage:', error);
          setUserGigs([]);
        }
      } else {
        setUserGigs([]);
      }
    };
    
    loadUserGigs();
  }, []);
  
  // Handle gig deletion - refreshes the gig list
  const handleGigDeleted = () => {
    const gigsJson = localStorage.getItem('userGigs');
    const gigs = gigsJson ? JSON.parse(gigsJson) : [];
    setUserGigs(gigs);
  };

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
      
      {/* Display dashboard stats */}
      <DashboardStats />
      
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
        
        <TabsContent value="orders" className="mt-0">
          <DashboardOrders />
        </TabsContent>
        
        <TabsContent value="earnings" className="mt-0">
          <DashboardEarnings />
        </TabsContent>
        
        <TabsContent value="messages" className="mt-0">
          <DashboardMessages />
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-0">
          <DashboardReviews />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
