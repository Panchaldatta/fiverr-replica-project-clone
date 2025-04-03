import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, ChevronDown, Bell, MessageSquare, Heart, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const categories = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Business",
  "Lifestyle",
  "Data"
];

const Header = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const isLoggedIn = !!user; // Check if user exists

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-white shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        {/* Main Navigation */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            {/* Mobile menu button */}
            {isMobile && (
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mr-2 text-fiverr-black"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
            
            {/* Logo */}
            <Link to="/" className="mr-8">
              <div className="font-bold text-2xl text-fiverr-green">fiverr<span className="text-fiverr-black">.</span></div>
            </Link>
            
            {/* Search bar - visible on medium screens and up */}
            {!isMobile && (
              <div className="hidden md:flex flex-1 max-w-md relative">
                <div className="w-full relative">
                  <Input
                    placeholder="Find services"
                    className="pr-10 border-fiverr-border-gray focus:border-fiverr-green"
                  />
                  <button className="absolute right-0 top-0 h-full px-3 text-fiverr-gray hover:text-fiverr-green">
                    <Search size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right navigation section */}
          <div className="flex items-center space-x-4">
            {/* Desktop navigation links */}
            {!isMobile && (
              <>
                <Link to="/explore" className="nav-link whitespace-nowrap hidden lg:block">
                  Explore
                </Link>
                <Link to="/business" className="nav-link whitespace-nowrap hidden lg:block">
                  Fiverr Business
                </Link>
                
                {!isLoggedIn ? (
                  <>
                    <Link to="/become-seller" className="nav-link whitespace-nowrap hidden lg:block">
                      Become a Seller
                    </Link>
                    <Link to="/signin" className="nav-link">
                      Sign In
                    </Link>
                    <Link to="/join">
                      <Button className="fiverr-button">
                        Join
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* User is logged in - show user menu */}
                    <Link to="/dashboard" className="nav-link whitespace-nowrap hidden lg:block">
                      Dashboard
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="h-8 w-8 cursor-pointer">
                          <AvatarImage src={user.photoURL || ''} alt={user.displayName} />
                          <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <div className="px-4 py-2">
                          <p className="font-medium">{user.displayName}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard" className="w-full">Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/profile/${user.uid}`} className="w-full">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          Sign out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </>
            )}

            {/* Mobile search button */}
            {isMobile && (
              <button className="text-fiverr-black">
                <Search size={20} />
              </button>
            )}

            {/* Mobile join button */}
            {isMobile && !isLoggedIn && (
              <Link to="/join">
                <Button size="sm" className="fiverr-button">
                  Join
                </Button>
              </Link>
            )}
            
            {/* Mobile user avatar (if logged in) */}
            {isMobile && isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName} />
                    <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Categories navigation - visible on desktop and when not scrolled */}
        {!isMobile && !isScrolled && (
          <div className="border-t border-fiverr-border-gray py-2 overflow-x-auto hide-scrollbar">
            <ul className="flex space-x-6 whitespace-nowrap">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-sm font-medium text-fiverr-black hover:text-fiverr-green flex items-center"
                  >
                    {category}
                    <ChevronDown size={16} className="ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mobile menu */}
        {isMobile && mobileMenuOpen && (
          <div className="fixed inset-0 top-[57px] bg-white z-50 overflow-y-auto">
            <div className="p-4">
              {!isLoggedIn ? (
                <>
                  <div className="flex flex-col space-y-4 mb-8">
                    <Link to="/signin" className="nav-link text-lg font-medium">Sign In</Link>
                    <Link to="/join" className="nav-link text-lg font-medium">Join</Link>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-4 mb-8">
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName} />
                      <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  <Link to={`/profile/${user.uid}`} className="nav-link">Profile</Link>
                  <button onClick={handleSignOut} className="nav-link text-left">Sign out</button>
                </div>
              )}

              <div className="py-4 border-t border-fiverr-border-gray">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-4">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link 
                        to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between text-fiverr-black"
                      >
                        <span>{category}</span>
                        <ChevronDown size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-4 border-t border-fiverr-border-gray">
                <ul className="space-y-4">
                  <li><Link to="/explore" className="text-fiverr-black">Explore</Link></li>
                  <li><Link to="/business" className="text-fiverr-black">Fiverr Business</Link></li>
                  <li><Link to="/become-seller" className="text-fiverr-black">Become a Seller</Link></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
