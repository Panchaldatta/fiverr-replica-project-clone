
import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Review {
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

interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
}

const ReviewList = ({ reviews, isLoading = false }: ReviewListProps) => {
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>(
    reviews.reduce((acc, review) => {
      acc[review.id] = review.helpful;
      return acc;
    }, {} as Record<string, number>)
  );
  const { toast } = useToast();
  
  const handleHelpfulClick = (reviewId: string) => {
    // If already liked, unlike and decrease count
    if (likedReviews[reviewId]) {
      setLikedReviews(prev => ({ ...prev, [reviewId]: false }));
      setHelpfulCounts(prev => ({ 
        ...prev, 
        [reviewId]: Math.max(0, (prev[reviewId] || 0) - 1) 
      }));
      toast({
        title: "Rating removed",
        description: "You've removed your helpful rating for this review",
      });
    } else {
      // If not liked, like and increase count
      setLikedReviews(prev => ({ ...prev, [reviewId]: true }));
      setHelpfulCounts(prev => ({ 
        ...prev, 
        [reviewId]: (prev[reviewId] || 0) + 1 
      }));
      toast({
        title: "Review rated as helpful",
        description: "Thank you for rating this review as helpful",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fiverr-green"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">⭐</div>
        <h3 className="text-xl font-medium text-fiverr-black">No reviews yet</h3>
        <p className="text-fiverr-gray mt-2 max-w-md">
          Be the first one to review this service.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="pb-8 border-b border-fiverr-border-gray">
          <div className="flex items-center mb-4">
            <img 
              src={review.user.avatar} 
              alt={review.user.name} 
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <div className="flex items-center">
                <span className="text-fiverr-black font-medium mr-2">{review.user.name}</span>
                <span className="text-fiverr-gray text-sm">{review.user.country}</span>
              </div>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(review.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 fill-gray-300'
                    }`}
                  />
                ))}
                <span className="text-fiverr-gray text-sm ml-2">| {review.date}</span>
              </div>
            </div>
          </div>
          
          <p className="text-fiverr-black mb-4">{review.comment}</p>
          
          <div className="flex items-center">
            <span className="text-fiverr-gray text-sm mr-4">Helpful?</span>
            <button 
              className={`flex items-center ${likedReviews[review.id] ? 'text-fiverr-green' : 'text-fiverr-gray hover:text-fiverr-green'}`}
              onClick={() => handleHelpfulClick(review.id)}
            >
              <ThumbsUp size={16} className={`mr-1 ${likedReviews[review.id] ? 'fill-fiverr-green' : ''}`} />
              <span>
                {helpfulCounts[review.id] > 0 
                  ? helpfulCounts[review.id] 
                  : 'Yes'}
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
