
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Clock, CheckCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { gigService } from '@/services/api';
import { GigData } from '@/components/gigs/GigCard';

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
  const [gig, setGig] = useState<GigData | null>(null);
  const [loading, setLoading] = useState(true);
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

  // Fetch gig details
  useEffect(() => {
    const fetchGigDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Try to fetch gig from backend
        const response = await gigService.getGig(id);
        if (response && response.data) {
          console.log("Fetched gig details:", response.data);
          
          // Format the gig data to match the GigData interface
          const formattedGig: GigData = {
            id: response.data._id,
            title: response.data.title,
            description: response.data.description,
            image: response.data.image,
            category: response.data.category,
            sellerName: response.data.user.displayName || response.data.user.username,
            sellerLevel: 'Level 2 Seller', // Default or get from API
            sellerImage: response.data.user.photoURL || 'https://via.placeholder.com/150',
            rating: response.data.rating || 0,
            reviewCount: response.data.reviewCount || 0,
            startingPrice: response.data.startingPrice
          };
          
          setGig(formattedGig);
        } else {
          // Fallback to localStorage
          const localGigsJson = localStorage.getItem('userGigs');
          if (localGigsJson) {
            const localGigs: GigData[] = JSON.parse(localGigsJson);
            const localGig = localGigs.find(g => g.id === id);
            if (localGig) {
              setGig(localGig);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching gig details:', error);
        // Fallback to localStorage
        const localGigsJson = localStorage.getItem('userGigs');
        if (localGigsJson) {
          const localGigs: GigData[] = JSON.parse(localGigsJson);
          const localGig = localGigs.find(g => g.id === id);
          if (localGig) {
            setGig(localGig);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchGigDetails();
  }, [id]);

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

  if (loading) {
    return (
      <div className="container mx-auto mt-8 px-4 md:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading gig details...</div>
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="container mx-auto mt-8 px-4 md:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Gig not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4 md:px-8">
      {/* Gig Title */}
      <h1 className="text-3xl font-bold mb-6">{gig.title}</h1>
      
      {/* Gig Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Left Column - Gig Info */}
        <div className="lg:col-span-2">
          {/* Gig Image */}
          <div className="mb-6">
            <img 
              src={gig.image} 
              alt={gig.title} 
              className="w-full rounded-lg object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>

          {/* About This Gig */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">About This Gig</h2>
            <p className="text-gray-700">{gig.description || "No description provided."}</p>
          </div>
          
          {/* About The Seller */}
          <div className="mb-8 border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">About The Seller</h2>
            <div className="flex items-center mb-4">
              <img 
                src={gig.sellerImage} 
                alt={gig.sellerName} 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-medium">{gig.sellerName}</h3>
                <p className="text-sm text-gray-500">{gig.sellerLevel}</p>
                <div className="flex items-center mt-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm ml-1">{gig.rating || '0'}</span>
                  <span className="text-sm text-gray-500 ml-1">({gig.reviewCount || '0'})</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 mb-6 last:border-0">
                    <div className="flex items-center mb-3">
                      <img src={review.user.avatar} alt={review.user.name} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <p className="text-sm text-gray-500">{review.user.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} 
                          size={16} 
                          className={index < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>Helpful ({review.helpful})</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
            )}
          </div>
          
          {/* Add Review Form */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Add a Review</h2>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                    className="mr-1 focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={star <= newReviewForm.rating 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment:</label>
              <Textarea
                id="comment"
                rows={4}
                value={newReviewForm.comment}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                className="w-full rounded-md"
                placeholder="Share your experience with this service..."
              />
            </div>
            <Button 
              onClick={() => handleAddReview(newReviewForm)} 
              className="bg-fiverr-green text-white hover:bg-green-600"
            >
              Submit Review
            </Button>
          </div>
        </div>
        
        {/* Right Column - Order Box */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-8">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Starting at</span>
              <span className="text-2xl font-bold">${gig.startingPrice}</span>
            </div>
            
            <p className="text-gray-700 mb-6">
              {gig.description ? gig.description.substring(0, 100) + '...' : "No description provided."}
            </p>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Clock size={16} className="mr-2 text-gray-600" />
                <span>2 days delivery</span>
              </div>
              <div className="flex items-center mb-2">
                <CheckCircle size={16} className="mr-2 text-gray-600" />
                <span>3 revisions</span>
              </div>
            </div>
            
            <Button className="w-full bg-fiverr-green text-white hover:bg-green-600 mb-2">
              Continue (${gig.startingPrice})
            </Button>
            
            <Button variant="outline" className="w-full mb-4">
              Contact Seller
            </Button>
            
            <div className="text-center text-sm text-gray-500 flex items-center justify-center">
              <Shield size={14} className="mr-1" />
              <span>30 Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetail;
