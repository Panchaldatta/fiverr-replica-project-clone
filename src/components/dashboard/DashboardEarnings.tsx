
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart } from 'lucide-react';

const DashboardEarnings = () => {
  // Mock data
  const earnings = {
    total: 650,
    pending: 50,
    withdrawn: 600,
    available: 0
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Earnings Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-fiverr-gray">Total Earnings</span>
              <span className="font-bold">${earnings.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-fiverr-gray">Pending Clearance</span>
              <span className="font-bold">${earnings.pending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-fiverr-gray">Withdrawn</span>
              <span className="font-bold">${earnings.withdrawn}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-fiverr-gray">Available for Withdrawal</span>
              <span className="font-bold">${earnings.available}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[200px]">
          <div className="text-center">
            <PieChart size={80} className="mx-auto text-fiverr-gray" />
            <p className="mt-4 text-fiverr-gray">Earnings visualization not available in demo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardEarnings;
