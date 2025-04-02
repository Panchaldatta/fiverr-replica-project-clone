
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import GigForm, { GigFormData } from '@/components/gigs/GigForm';
import { v4 as uuidv4 } from 'uuid';
import { GigData } from '@/components/gigs/GigCard';

// This would normally save to a backend database
const CreateGig = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Get existing gigs from localStorage or initialize empty array
  const getUserGigs = (): GigData[] => {
    const gigsJson = localStorage.getItem('userGigs');
    return gigsJson ? JSON.parse(gigsJson) : [];
  };

  const handleSubmit = (formData: GigFormData) => {
    // Create a new gig with user information
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
    
    // Redirect to dashboard
    navigate('/dashboard');
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
