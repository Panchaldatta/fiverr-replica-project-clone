
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Facebook, Apple } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show a toast message indicating authentication is removed
    toast({
      title: "Authentication Removed",
      description: "Authentication functionality has been removed from this project.",
    });
    console.log({ email, password, username, agreeTerms, marketingEmails });
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Authentication Removed",
      description: "Authentication functionality has been removed from this project.",
    });
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
          <button className="w-full flex items-center justify-center py-2.5 px-4 border border-fiverr-border-gray rounded-md shadow-sm text-fiverr-black hover:bg-gray-50 transition-colors">
            <Facebook size={20} className="text-[#4267B2] mr-2" />
            Continue with Facebook
          </button>
          
          <button 
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-fiverr-border-gray rounded-md shadow-sm text-fiverr-black hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
          
          <button className="w-full flex items-center justify-center py-2.5 px-4 border border-fiverr-border-gray rounded-md shadow-sm text-fiverr-black hover:bg-gray-50 transition-colors">
            <Apple size={20} className="mr-2" />
            Continue with Apple
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-fiverr-border-gray" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-fiverr-gray">OR</span>
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
              disabled={!agreeTerms}
            >
              Join
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
