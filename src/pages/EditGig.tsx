
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import GigForm, { GigFormData } from '@/components/gigs/GigForm';
import { GigData } from '@/components/gigs/GigCard';
import { useToast } from '@/hooks/use-toast';

const EditGig = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gig, setGig] = useState<GigData | null>(null);
  const [isLoadingGig, setIsLoadingGig] = useState(true);

  // Load the gig from localStorage
  useEffect(() => {
    const loadGig = () => {
      try {
        const gigsJson = localStorage.getItem('userGigs');
        const gigs: GigData[] = gigsJson ? JSON.parse(gigsJson) : [];
        const foundGig = gigs.find(g => g.id === id);
        
        if (foundGig) {
          setGig(foundGig);
        } else {
          toast({
            title: "Gig not found",
            description: "The gig you're trying to edit could not be found.",
            variant: "destructive",
          });
          navigate('/dashboard');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load gig details.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingGig(false);
      }
    };

    loadGig();
  }, [id, navigate, toast]);

  const handleSubmit = (formData: GigFormData) => {
    try {
      // Get all gigs
      const gigsJson = localStorage.getItem('userGigs');
      const gigs: GigData[] = gigsJson ? JSON.parse(gigsJson) : [];
      
      // Update the specific gig
      const updatedGigs = gigs.map(g => {
        if (g.id === id) {
          return {
            ...g,
            title: formData.title,
            description: formData.description,
            image: formData.image,
            category: formData.category,
            startingPrice: formData.startingPrice
          };
        }
        return g;
      });
      
      // Save back to localStorage
      localStorage.setItem('userGigs', JSON.stringify(updatedGigs));
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the gig.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || isLoadingGig) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!gig) {
    return (
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-fiverr-black">Gig Not Found</h2>
          <p className="mt-2 text-fiverr-gray">The gig you're looking for could not be found.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 fiverr-button"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Convert GigData to GigFormData
  const initialData: GigFormData = {
    title: gig.title,
    description: gig.description || '',
    image: gig.image,
    category: gig.category || 'Web Development',
    startingPrice: gig.startingPrice
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-fiverr-black mb-8">Edit Gig</h1>
      <GigForm 
        onSubmit={handleSubmit} 
        initialData={initialData}
        isEditing={true}
      />
    </div>
  );
};

export default EditGig;
