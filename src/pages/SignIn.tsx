
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const { signInWithEmail, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    const result = await signInWithEmail(email, password);
    
    if (result.success) {
      toast({
        title: "Sign In Successful",
        description: "You have been signed in successfully.",
      });
      navigate('/');
    } else {
      toast({
        title: "Sign In Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-fiverr-black">Sign In to Fiverr</h1>
          <p className="mt-2 text-sm text-fiverr-gray">
            Don't have an account? <Link to="/join" className="text-fiverr-green hover:underline">Join</Link>
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-fiverr-border-gray" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-fiverr-gray">SIGN IN WITH EMAIL</span>
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
              <label htmlFor="password" className="block text-sm font-medium text-fiverr-black mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-fiverr-border-gray focus:border-fiverr-green focus:ring-fiverr-green"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="text-fiverr-green focus:ring-fiverr-green"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-fiverr-black">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="text-fiverr-green hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-fiverr-green hover:bg-fiverr-dark-green text-white py-5"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
