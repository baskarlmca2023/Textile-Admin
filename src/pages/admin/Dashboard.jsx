import React, { useState } from "react";
import {
  Shirt,
  ShoppingBag,
  Baby,
  User2
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [revenueRange, setRevenueRange] = useState("Today");

  const totalClothes = [
    { title: "Men's", icon: <User2 />, count: 120 },
    { title: "Women's", icon: <Shirt />, count: 95 },
    { title: "Kids", icon: <Baby />, count: 65 },
    { title: "Accessories", icon: <ShoppingBag />, count: 40 },
  ];

  const orders = [
    { id: 1, name: "John Doe", location: "Chennai", mobile: "9876543210", products: "T-Shirts, Jeans" },
    { id: 2, name: "Priya", location: "Coimbatore", mobile: "8765432190", products: "Dress, Saree" },
  ];

  const lowStock = [
    { code: "P101", product: "White Shirt", quantity: 4 },
    { code: "P203", product: "Kids Pants", quantity: 3 },
  ];

  const expenses = [
    { id: 1, date: "2024-05-01", category: "Marketing", subCategory: "Ads", amount: 2500, status: "Paid" },
    { id: 2, date: "2024-05-10", category: "Inventory", subCategory: "Stock", amount: 5000, status: "Pending" },
  ];

  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const revenueData = {
    Today: [
      { time: "9AM", revenue: 20000 },
      { time: "12PM", revenue: 30000 },
      { time: "3PM", revenue: 25000 },
      { time: "6PM", revenue: 40000 },
    ],
    Yesterday: [
      { time: "9AM", revenue: 15000 },
      { time: "12PM", revenue: 20000 },
      { time: "3PM", revenue: 18000 },
      { time: "6PM", revenue: 30000 },
    ],
    "Last 7 Days": [
      { time: "Mon", revenue: 50000 },
      { time: "Tue", revenue: 60000 },
      { time: "Wed", revenue: 45000 },
      { time: "Thu", revenue: 70000 },
      { time: "Fri", revenue: 55000 },
      { time: "Sat", revenue: 75000 },
      { time: "Sun", revenue: 60000 },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Total Clothes Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {totalClothes.map((item, index) => (
          <div key={index} className="shadow-green bg-white rounded-xl p-4 flex items-center gap-4 transition-transform hover:scale-105">
            <div className="text-green-600 bg-green-100 p-2 rounded-full">
              {item.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.count} Items</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sales & Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-green bg-white p-4 rounded-xl h-80">
          <h3 className="text-lg font-semibold mb-2">Sales Graph</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="shadow-green bg-white p-4 rounded-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <select
              className="border text-sm p-1 rounded-md"
              value={revenueRange}
              onChange={(e) => setRevenueRange(e.target.value)}
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 Days">Last 7 Days</option>
            </select>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ₹
            {revenueData[revenueRange].reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData[revenueRange]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#22c55e" radius={[8, 8, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Table */}
      <div className="shadow-green bg-white rounded-xl p-4 overflow-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Orders</h3>
          <button className="text-green-600 hover:underline text-sm">View All</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Sl. No</th>
              <th>Name</th>
              <th>Location</th>
              <th>Mobile</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.location}</td>
                <td>{order.mobile}</td>
                <td>{order.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Low Stock Table */}
      <div className="shadow-green bg-white rounded-xl p-4 overflow-auto">
        <h3 className="text-lg font-semibold mb-2">Low Stock</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Code</th>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td>{item.code}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expense Table */}
      <div className="shadow-green bg-white rounded-xl p-4 overflow-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Expenses</h3>
          <button className="text-green-600 hover:underline text-sm">View All</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Sl. No</th>
              <th>Date</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="border-b hover:bg-gray-50">
                <td>{exp.id}</td>
                <td>{exp.date}</td>
                <td>{exp.category}</td>
                <td>{exp.subCategory}</td>
                <td>₹{exp.amount}</td>
                <td>{exp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
