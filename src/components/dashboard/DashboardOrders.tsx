
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DashboardOrders = () => {
  // Mock data
  const orders = [
    { id: '1', title: 'Logo Design', buyer: 'John D.', price: 50, status: 'In Progress', dueDate: '2023-09-15' },
    { id: '2', title: 'Website Redesign', buyer: 'Sarah M.', price: 250, status: 'Delivered', dueDate: '2023-09-10' },
    { id: '3', title: 'Mobile App UI', buyer: 'Robert J.', price: 350, status: 'Completed', dueDate: '2023-09-05' }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-xs text-fiverr-gray border-b">
              <tr>
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-left">Buyer</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Due</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-3">{order.title}</td>
                  <td className="px-4 py-3">{order.buyer}</td>
                  <td className="px-4 py-3">${order.price}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardOrders;
