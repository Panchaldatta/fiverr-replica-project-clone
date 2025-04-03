import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface ReviewForm {
  rating: number;
  comment: string;
}

interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    country: string;
  };
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const GigDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'review-1',
      user: {
        id: 'user-1',
        name: 'Alice Smith',
        avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
        country: 'United States'
      },
      rating: 5,
      comment: 'Exceptional service! The delivery was prompt and the quality exceeded my expectations. I highly recommend this seller.',
      date: 'June 14, 2024',
      helpful: 3
    },
    {
      id: 'review-2',
      user: {
        id: 'user-2',
        name: 'Bob Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        country: 'Canada'
      },
      rating: 4,
      comment: 'Good value for the price. There were a few minor issues, but the seller was quick to address them. Overall, a positive experience.',
      date: 'June 10, 2024',
      helpful: 1
    },
    {
      id: 'review-3',
      user: {
        id: 'user-3',
        name: 'Charlie Brown',
        avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
        country: 'United Kingdom'
      },
      rating: 5,
      comment: 'Incredible work! The seller was very communicative and made sure to understand my needs. The final product was exactly what I wanted.',
      date: 'June 05, 2024',
      helpful: 5
    }
  ]);
  const [newReviewForm, setNewReviewForm] = useState<ReviewForm>({ rating: 5, comment: '' });

  // Fixed user check in handleAddReview function
  const handleAddReview = (review: ReviewForm) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to leave a review.",
        variant: "destructive"
      });
      return;
    }

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
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      helpful: 0
    };

    setReviews(prevReviews => [newReview, ...prevReviews]);
    setNewReviewForm({ rating: 5, comment: '' });

    toast({
      title: "Review Added",
      description: "Your review has been added successfully.",
    });
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Gig Detail - ID: {id}</h1>

      {/* Gig Details Section (Replace with actual gig data) */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About This Gig</h2>
        <p>This is a sample gig description. Replace this with the actual details of the gig.</p>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <img src={review.user.avatar} alt={review.user.name} className="w-8 h-8 rounded-full mr-2" />
              <div>
                <p className="font-semibold">{review.user.name}</p>
                <p className="text-sm text-gray-500">{review.user.country}</p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(review.rating)].map((_, index) => (
                <Star key={index} className="w-4 h-4 text-yellow-500" />
              ))}
            </div>
            <p className="mb-2">{review.comment}</p>
            <p className="text-sm text-gray-600">Date: {review.date}</p>
            <p className="text-sm text-gray-600">Helpful: {review.helpful}</p>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Add a Review</h2>
        <div className="mb-2">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
          <select
            id="rating"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newReviewForm.rating}
            onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: parseInt(e.target.value) })}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment:</label>
          <Textarea
            id="comment"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newReviewForm.comment}
            onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
          />
        </div>
        <Button onClick={() => handleAddReview(newReviewForm)} className="bg-fiverr-green text-white">Submit Review</Button>
      </div>
    </div>
  );
};

export default GigDetail;
