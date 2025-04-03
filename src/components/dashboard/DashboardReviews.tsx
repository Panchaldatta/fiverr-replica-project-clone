
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { Review } from '@/types/dashboard';

const DashboardReviews = () => {
  // Mock data
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

  return (
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
  );
};

export default DashboardReviews;
