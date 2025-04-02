
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ReviewFormProps {
  gigId?: string;
  sellerId?: string;
  onReviewSubmit?: (review: {
    rating: number;
    comment: string;
  }) => void;
}

const ReviewForm = ({ gigId, sellerId, onReviewSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review",
        variant: "destructive",
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: "More details needed",
        description: "Please provide more details in your review (at least 10 characters)",
        variant: "destructive",
      });
      return;
    }

    // Submit the review
    if (onReviewSubmit) {
      onReviewSubmit({
        rating,
        comment,
      });
    }

    // Reset form
    setRating(0);
    setComment('');
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="bg-white p-6 rounded-md border border-fiverr-border-gray">
      <h3 className="text-xl font-bold text-fiverr-black mb-4">Leave a Review</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-fiverr-black mb-2">
            Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="mr-1 focus:outline-none"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={24}
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-fiverr-gray">
              {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select a rating'}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-fiverr-black mb-2">
            Your Review
          </label>
          <Textarea
            id="review"
            placeholder="Share your experience with this service..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[120px]"
            rows={4}
          />
        </div>
        
        <Button type="submit" className="fiverr-button">
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
