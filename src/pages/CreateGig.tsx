
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import GigForm, { GigFormData } from '@/components/gigs/GigForm';
import { v4 as uuidv4 } from 'uuid';
import { GigData } from '@/components/gigs/GigCard';
import { gigService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const CreateGig = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get existing gigs from localStorage or initialize empty array
  const getUserGigs = (): GigData[] => {
    const gigsJson = localStorage.getItem('userGigs');
    return gigsJson ? JSON.parse(gigsJson) : [];
  };

  const handleSubmit = async (formData: GigFormData) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a gig.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Try to create gig in backend first
      const backendGig = await gigService.createGig({
        ...formData,
        user: user.id // Make sure user ID is passed to the backend
      });
      
      // If successful, create a new gig with user information
      const newGig: GigData = {
        id: backendGig.data._id || uuidv4(),
        title: formData.title,
        image: formData.image,
        sellerName: user.displayName || 'Anonymous',
        sellerLevel: 'New Seller',
        sellerImage: user.photoURL || 'https://via.placeholder.com/150',
        rating: 0,
        reviewCount: 0,
        startingPrice: formData.startingPrice,
        description: formData.description,
        category: formData.category
      };
      
      // Save to localStorage as backup
      const userGigs = getUserGigs();
      localStorage.setItem('userGigs', JSON.stringify([...userGigs, newGig]));
      
      toast({
        title: "Gig Created",
        description: "Your gig has been successfully created!",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Error creating gig:", error);
      
      // Fallback to localStorage only
      const newGig: GigData = {
        id: uuidv4(),
        title: formData.title,
        image: formData.image,
        sellerName: user?.displayName || 'Anonymous',
        sellerLevel: 'New Seller',
        sellerImage: user?.photoURL || 'https://via.placeholder.com/150',
        rating: 0,
        reviewCount: 0,
        startingPrice: formData.startingPrice,
        description: formData.description,
        category: formData.category
      };
      
      // Save to localStorage
      const userGigs = getUserGigs();
      localStorage.setItem('userGigs', JSON.stringify([...userGigs, newGig]));
      
      toast({
        title: "Gig Created Locally",
        description: "Your gig was saved locally. Backend storage failed.",
        variant: "warning"
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-fiverr-black mb-8">Create a New Gig</h1>
      <GigForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateGig;
