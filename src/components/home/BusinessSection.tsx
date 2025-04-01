
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const BusinessSection = () => {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="max-w-lg">
              <h4 className="text-fiverr-green font-bold mb-2">fiverr business.</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-fiverr-black mb-4">
                A solution built for <span className="italic">business</span>
              </h2>
              <p className="text-lg text-fiverr-black mb-6">
                Upgrade to a curated experience with tools and benefits, dedicated to businesses
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Connect to vetted talent for your business needs",
                  "Manage teamwork and boost productivity with one powerful workspace",
                  "Dedicated business account managers"
                ].map((benefit, index) => (
                  <li key={index} className="flex">
                    <CheckCircle size={20} className="text-fiverr-green mr-2 flex-shrink-0" />
                    <span className="text-fiverr-black">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="bg-fiverr-green hover:bg-fiverr-dark-green text-white font-medium px-6 py-5 rounded-md">
                Explore Fiverr Business
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img 
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png" 
                alt="Fiverr Business" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
