
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
  
  const isLoggedIn = !!user;

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

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(name => name[0]).join('').toUpperCase();
    }
    return 'U';
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
                {!isLoggedIn && (
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
                )}
                {isLoggedIn && (
                  <>
                    <Link to="/messages" className="nav-link hidden lg:flex items-center">
                      <MessageSquare size={20} />
                    </Link>
                    <Link to="/orders" className="nav-link hidden lg:flex items-center">
                      <ShoppingCart size={20} />
                    </Link>
                    <Link to="/favorites" className="nav-link hidden lg:flex items-center">
                      <Heart size={20} />
                    </Link>
                    <Link to="/notifications" className="nav-link hidden lg:flex items-center">
                      <Bell size={20} />
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <Avatar className="h-8 w-8 cursor-pointer">
                          <AvatarImage src={user?.photoURL || undefined} />
                          <AvatarFallback className="bg-fiverr-green text-white">
                            {getInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end">
                        <div className="p-2">
                          <p className="font-medium">{user?.displayName}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => navigate('/dashboard')}>
                          Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => navigate(`/profile/${user?.displayName?.toLowerCase().replace(/\s+/g, '-')}`)}>
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => navigate('/settings')}>
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={handleSignOut}>
                          Sign Out
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

            {/* Mobile profile icon */}
            {isMobile && isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || undefined} />
                    <AvatarFallback className="bg-fiverr-green text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem onSelect={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleSignOut}>
                    Sign Out
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
                <div className="flex items-center space-x-3 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.photoURL || undefined} />
                    <AvatarFallback className="bg-fiverr-green text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.displayName}</p>
                    <p className="text-sm text-fiverr-gray">
                      <Link to={`/profile/${user?.displayName?.toLowerCase().replace(/\s+/g, '-')}`}>
                        View Profile
                      </Link>
                    </p>
                  </div>
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
                  {isLoggedIn && (
                    <>
                      <li><Link to="/orders" className="text-fiverr-black">Orders</Link></li>
                      <li><Link to="/messages" className="text-fiverr-black">Messages</Link></li>
                      <li><Link to="/favorites" className="text-fiverr-black">Favorites</Link></li>
                      <li><Link to="/dashboard" className="text-fiverr-black">Dashboard</Link></li>
                      <li><button onClick={handleSignOut} className="text-fiverr-black">Sign Out</button></li>
                    </>
                  )}
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
