
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/api';
import { Loader2 } from 'lucide-react';

// Define the earnings type
type EarningsSummary = {
  total: number;
  pending: number;
  withdrawn: number;
  available: number;
};

const DashboardEarnings = () => {
  const [earnings, setEarnings] = useState<EarningsSummary>({
    total: 0,
    pending: 0,
    withdrawn: 0,
    available: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  useEffect(() => {
    const fetchEarnings = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await userService.getUserEarnings(user.uid);
        
        if (response.success && response.data) {
          setEarnings(response.data.summary);
        }
      } catch (err) {
        console.error('Error fetching earnings:', err);
        setError('Failed to load earnings data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEarnings();
  }, [user]);

  // Prepare data for the pie chart
  const chartData = [
    { name: 'Pending', value: earnings.pending },
    { name: 'Withdrawn', value: earnings.withdrawn },
    { name: 'Available', value: earnings.available }
  ].filter(item => item.value > 0); // Only show segments with values

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Earnings Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-fiverr-gray" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 my-4">{error}</div>
          ) : (
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
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-fiverr-gray" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 my-4">{error}</div>
          ) : chartData.length === 0 ? (
            <div className="text-center flex flex-col justify-center items-center h-full">
              <PieChart size={80} className="mx-auto text-fiverr-gray" />
              <p className="mt-4 text-fiverr-gray">No earnings data to display</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardEarnings;
