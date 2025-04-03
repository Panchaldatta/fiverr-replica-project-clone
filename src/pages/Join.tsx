
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const { toast } = useToast();
  const { signUpWithEmail, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !username) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "You must agree to the Terms of Service to continue.",
        variant: "destructive"
      });
      return;
    }
    
    // Basic password validation
    if (password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    console.log({ email, password, username, agreeTerms, marketingEmails });
    
    const result = await signUpWithEmail(email, username, password);
    
    if (result.success) {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
      });
      navigate('/');
    } else {
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-fiverr-black">Join Fiverr</h1>
          <p className="mt-2 text-sm text-fiverr-gray">
            Already have an account? <Link to="/signin" className="text-fiverr-green hover:underline">Sign In</Link>
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-fiverr-border-gray" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-fiverr-gray">REGISTER WITH EMAIL</span>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-fiverr-black mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-fiverr-border-gray focus:border-fiverr-green focus:ring-fiverr-green"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-fiverr-black mb-1">
                Choose a username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-fiverr-border-gray focus:border-fiverr-green focus:ring-fiverr-green"
              />
              <p className="text-xs text-fiverr-gray mt-1">
                This will be displayed on your public profile
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-fiverr-black mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-fiverr-border-gray focus:border-fiverr-green focus:ring-fiverr-green"
              />
              <p className="text-xs text-fiverr-gray mt-1">
                8+ characters, with at least 1 letter and 1 number
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox 
                    id="agree-terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    required
                    className="text-fiverr-green focus:ring-fiverr-green"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agree-terms" className="text-fiverr-black">
                    I agree to the <Link to="/terms" className="text-fiverr-green hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-fiverr-green hover:underline">Privacy Policy</Link>
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox 
                    id="marketing-emails" 
                    checked={marketingEmails}
                    onCheckedChange={(checked) => setMarketingEmails(checked as boolean)}
                    className="text-fiverr-green focus:ring-fiverr-green"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="marketing-emails" className="text-fiverr-black">
                    Send me emails with Fiverr tips, marketing, and special offers
                  </label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-fiverr-green hover:bg-fiverr-dark-green text-white py-5"
              disabled={!agreeTerms || isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Join'}
            </Button>
          </form>
          
          <p className="text-xs text-center text-fiverr-gray mt-4">
            By joining, you agree to receive emails from Fiverr.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Join;
