
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Circle, DollarSign, ShoppingCart, X } from 'lucide-react';

const DashboardStats = () => {
  // Mock data
  const activeOrders = 1;
  const completedOrders = 2;
  const cancelledOrders = 0;
  const earnings = { total: 650 };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md mr-4">
              <ShoppingCart size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-fiverr-gray">Active Orders</p>
              <h4 className="text-2xl font-bold">{activeOrders}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-md mr-4">
              <Circle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-fiverr-gray">Completed Orders</p>
              <h4 className="text-2xl font-bold">{completedOrders}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-md mr-4">
              <X size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-fiverr-gray">Cancelled Orders</p>
              <h4 className="text-2xl font-bold">{cancelledOrders}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-md mr-4">
              <DollarSign size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-fiverr-gray">Total Earnings</p>
              <h4 className="text-2xl font-bold">${earnings.total}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
