
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export interface GigFormData {
  title: string;
  description: string;
  image: string;
  category: string;
  startingPrice: number;
}

interface GigFormProps {
  onSubmit: (data: GigFormData) => void;
  initialData?: Partial<GigFormData>;
  isEditing?: boolean;
}

const DEFAULT_IMAGE = "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/edcf8fc8b9aecaa25ce6c68d641f5e367e9ce636.png";

const GigForm = ({ onSubmit, initialData, isEditing = false }: GigFormProps) => {
  const [formData, setFormData] = useState<GigFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    image: initialData?.image || DEFAULT_IMAGE,
    category: initialData?.category || 'Web Development',
    startingPrice: initialData?.startingPrice || 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'startingPrice' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validation
      if (!formData.title.trim()) {
        throw new Error("Title is required");
      }
      if (!formData.description.trim()) {
        throw new Error("Description is required");
      }
      if (formData.startingPrice < 5) {
        throw new Error("Starting price must be at least $5");
      }
      
      onSubmit(formData);
      
      toast({
        title: isEditing ? "Gig Updated" : "Gig Created",
        description: isEditing 
          ? "Your gig has been successfully updated." 
          : "Your gig has been successfully created.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Gig' : 'Create a New Gig'}</CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Update your gig information below' 
            : 'Fill in the details below to create your gig'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Gig Title *
            </label>
            <Input
              id="title"
              name="title"
              placeholder="I will do something amazing"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description *
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your service in detail"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Image URL
            </label>
            <Input
              id="image"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
            />
            {formData.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <img 
                  src={formData.image} 
                  alt="Gig preview" 
                  className="w-full h-40 object-cover rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = DEFAULT_IMAGE;
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Writing & Translation">Writing & Translation</option>
              <option value="Video & Animation">Video & Animation</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="startingPrice" className="text-sm font-medium">
              Starting Price ($)
            </label>
            <Input
              id="startingPrice"
              name="startingPrice"
              type="number"
              min={5}
              step={5}
              value={formData.startingPrice}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full fiverr-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : isEditing ? 'Update Gig' : 'Create Gig'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GigForm;
