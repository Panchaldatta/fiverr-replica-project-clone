
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface GigData {
  id: string;
  title: string;
  image: string;
  sellerName: string;
  sellerLevel: string;
  sellerImage: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  liked?: boolean;
}

interface GigCardProps {
  gig: GigData;
}

const GigCard = ({ gig }: GigCardProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(gig.liked || false);
  const { toast } = useToast();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLiked(!isLiked);
    
    toast({
      title: isLiked ? "Removed from saved" : "Saved to favorites",
      description: isLiked 
        ? "Gig has been removed from your saved list" 
        : "Gig has been added to your saved list",
    });
  };

  return (
    <div className="gig-card">
      <Link to={`/gig/${gig.id}`} className="block">
        <div className="relative">
          {/* Gig Image */}
          <img 
            src={gig.image} 
            alt={gig.title} 
            className="w-full aspect-video object-cover"
          />
          
          {/* Save button */}
          <button 
            onClick={handleLikeClick}
            className="absolute top-3 right-3 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
          >
            <Heart 
              size={16} 
              className={isLiked 
                ? "text-red-500 fill-red-500" 
                : "text-fiverr-gray"
              } 
            />
          </button>
        </div>
        
        {/* Gig content */}
        <div className="p-4">
          {/* Seller info */}
          <div className="flex items-center mb-3">
            <img 
              src={gig.sellerImage} 
              alt={gig.sellerName} 
              className="w-6 h-6 rounded-full mr-2"
            />
            <div className="flex items-center">
              <span className="text-sm font-medium text-fiverr-black">{gig.sellerName}</span>
              <span className="text-xs text-fiverr-gray ml-1">• {gig.sellerLevel}</span>
            </div>
          </div>
          
          {/* Gig title */}
          <h3 className="text-base text-fiverr-black line-clamp-2 mb-2">
            {gig.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium ml-1">{gig.rating}</span>
            <span className="text-sm text-fiverr-gray ml-1">({gig.reviewCount})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-fiverr-gray">STARTING AT</div>
            <div className="font-bold text-fiverr-black">${gig.startingPrice}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GigCard;
