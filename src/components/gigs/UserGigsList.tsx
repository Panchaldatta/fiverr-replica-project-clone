
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GigData } from './GigCard';
import { Star, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserGigsListProps {
  gigs: GigData[];
  onGigDeleted: () => void;
}

const UserGigsList = ({ gigs, onGigDeleted }: UserGigsListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gigToDelete, setGigToDelete] = useState<string | null>(null);

  const handleEdit = (gigId: string) => {
    navigate(`/gig/edit/${gigId}`);
  };

  const handleDelete = (gigId: string) => {
    setGigToDelete(gigId);
  };

  const confirmDelete = () => {
    if (gigToDelete) {
      try {
        // Get existing gigs
        const gigsJson = localStorage.getItem('userGigs');
        const existingGigs: GigData[] = gigsJson ? JSON.parse(gigsJson) : [];
        
        // Filter out the gig to delete
        const updatedGigs = existingGigs.filter(gig => gig.id !== gigToDelete);
        
        // Save back to localStorage
        localStorage.setItem('userGigs', JSON.stringify(updatedGigs));
        
        // Notify user
        toast({
          title: "Gig Deleted",
          description: "Your gig has been successfully deleted",
        });
        
        // Close dialog and refresh list
        setGigToDelete(null);
        onGigDeleted();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete the gig",
          variant: "destructive",
        });
      }
    }
  };

  const cancelDelete = () => {
    setGigToDelete(null);
  };

  if (gigs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Star size={64} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-fiverr-black">No gigs created yet</h3>
        <p className="text-fiverr-gray mt-2 max-w-md">
          Create your first gig and start offering your services to customers around the world.
        </p>
        <Button 
          className="mt-6 fiverr-button"
          onClick={() => navigate('/gig/create')}
        >
          Create a Gig
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {gigs.map((gig) => (
        <div 
          key={gig.id} 
          className="bg-white rounded-md overflow-hidden border border-fiverr-border-gray flex flex-col sm:flex-row"
        >
          <img 
            src={gig.image} 
            alt={gig.title} 
            className="w-full sm:w-48 h-36 object-cover"
          />
          
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-medium mb-2 line-clamp-2">{gig.title}</h3>
            
            <div className="flex items-center text-sm text-fiverr-gray mb-2">
              {gig.reviewCount > 0 ? (
                <>
                  <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                  <span>{gig.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{gig.reviewCount} reviews</span>
                </>
              ) : (
                <span>No reviews yet</span>
              )}
              
              {gig.category && (
                <>
                  <span className="mx-1">•</span>
                  <span>{gig.category}</span>
                </>
              )}
            </div>
            
            <p className="text-sm text-fiverr-gray line-clamp-2 mb-auto">
              {gig.description || "No description provided."}
            </p>
            
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-fiverr-border-gray">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center text-xs"
                  onClick={() => handleEdit(gig.id)}
                >
                  <Edit size={14} className="mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center text-xs text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => handleDelete(gig.id)}
                >
                  <Trash2 size={14} className="mr-1" />
                  Delete
                </Button>
              </div>
              <div className="text-sm">
                <span className="text-fiverr-gray">Starting at:</span>
                <span className="font-bold text-fiverr-black ml-1">${gig.startingPrice}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={!!gigToDelete} onOpenChange={() => setGigToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this gig?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this gig from your profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserGigsList;
