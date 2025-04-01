
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer className="bg-fiverr-light-gray border-t border-fiverr-border-gray pt-16 pb-8">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        {/* Footer links */}
        <div className={isMobile ? "space-y-8" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"}>
          {/* Categories */}
          <div>
            <h3 className="font-bold text-fiverr-black mb-4">Categories</h3>
            <ul className="space-y-3">
              {['Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Video & Animation', 'Music & Audio'].map((item, index) => (
                <li key={index}>
                  <Link to={`/categories/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-fiverr-gray hover:text-fiverr-green transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-fiverr-black mb-4">About</h3>
            <ul className="space-y-3">
              {['Careers', 'Press & News', 'Partnerships', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-fiverr-gray hover:text-fiverr-green transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-fiverr-black mb-4">Support</h3>
            <ul className="space-y-3">
              {['Help & Support', 'Trust & Safety', 'Selling on Fiverr', 'Buying on Fiverr'].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-fiverr-gray hover:text-fiverr-green transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-fiverr-black mb-4">Community</h3>
            <ul className="space-y-3">
              {['Events', 'Blog', 'Forum', 'Community Standards', 'Podcast'].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-fiverr-gray hover:text-fiverr-green transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Solutions */}
          <div>
            <h3 className="font-bold text-fiverr-black mb-4">Business Solutions</h3>
            <ul className="space-y-3">
              {['About Business Solutions', 'Fiverr Pro', 'Fiverr Logo Maker', 'Fiverr Guides'].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-fiverr-gray hover:text-fiverr-green transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 pt-6 border-t border-fiverr-border-gray ${isMobile ? "" : "flex items-center justify-between"}`}>
          <div className={`${isMobile ? "mb-6" : "flex items-center"}`}>
            <div className="font-bold text-2xl text-fiverr-green mr-6">fiverr<span className="text-fiverr-black">.</span></div>
            <p className="text-sm text-fiverr-gray">© Fiverr International Ltd. 2023</p>
          </div>

          <div className={isMobile ? "space-y-4" : "flex items-center space-x-6"}>
            <div className="flex space-x-4">
              <a href="https://twitter.com/fiverr" target="_blank" rel="noopener noreferrer" className="text-fiverr-gray hover:text-fiverr-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com/fiverr" target="_blank" rel="noopener noreferrer" className="text-fiverr-gray hover:text-fiverr-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com/company/fiverr-com" target="_blank" rel="noopener noreferrer" className="text-fiverr-gray hover:text-fiverr-green transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com/fiverr" target="_blank" rel="noopener noreferrer" className="text-fiverr-gray hover:text-fiverr-green transition-colors">
                <Instagram size={20} />
              </a>
            </div>

            <div className={`flex items-center ${isMobile ? "mt-4" : ""}`}>
              <Globe size={20} className="text-fiverr-gray mr-2" />
              <span className="text-sm text-fiverr-gray">English</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
