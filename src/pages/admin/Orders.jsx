import React, { useState } from "react";
import { Search, X, Printer } from "lucide-react";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const orders = [
    {
      id: 1,
      date: "2025-05-25",
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main Street, Chennai",
      location: "Chennai",
      contact: "9876543210",
      category: "Men",
      subCategory: "Shirts",
      product: "Cotton Shirt",
      quantity: 2,
      price: 1500,
      paymentMethod: "Cash on Delivery",
      status: "Delivered",
    },
    {
      id: 2,
      date: "2025-05-24",
      name: "Jane Smith",
      email: "jane@example.com",
      address: "45, Gandhi Road, Coimbatore",
      location: "Coimbatore",
      contact: "9123456780",
      category: "Women",
      subCategory: "Kurtis",
      product: "Silk Kurti",
      quantity: 1,
      price: 2500,
      paymentMethod: "UPI",
      status: "Pending",
    },
    {
      id: 3,
      date: "2025-05-23",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      address: "789 Anna Nagar, Madurai",
      location: "Madurai",
      contact: "9876512345",
      category: "Men",
      subCategory: "Pants",
      product: "Denim Jeans",
      quantity: 3,
      price: 1800,
      paymentMethod: "Credit Card",
      status: "Delivered",
    },
    {
      id: 4,
      date: "2025-05-22",
      name: "Priya Lakshmi",
      email: "priya@example.com",
      address: "66 MG Road, Trichy",
      location: "Trichy",
      contact: "9998887777",
      category: "Women",
      subCategory: "Sarees",
      product: "Cotton Saree",
      quantity: 1,
      price: 2000,
      paymentMethod: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 5,
      date: "2025-05-21",
      name: "Karthik Raj",
      email: "karthik@example.com",
      address: "22 North Street, Salem",
      location: "Salem",
      contact: "9123451122",
      category: "Kids",
      subCategory: "T-Shirts",
      product: "Printed T-Shirt",
      quantity: 2,
      price: 800,
      paymentMethod: "UPI",
      status: "Delivered",
    },
    {
      id: 6,
      date: "2025-05-20",
      name: "Divya R",
      email: "divya@example.com",
      address: "99 Market Street, Erode",
      location: "Erode",
      contact: "9555566666",
      category: "Women",
      subCategory: "Leggings",
      product: "Stretch Legging",
      quantity: 3,
      price: 700,
      paymentMethod: "Cash on Delivery",
      status: "Pending",
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const generateInvoiceNumber = (id) => `INV-${id.toString().padStart(5, "0")}`;

  const saveInvoice = (order) => {
    const invoice = {
      invoiceNumber: generateInvoiceNumber(order.id),
      date: order.date,
      customer: order.name,
      total: order.price * order.quantity,
    };
    localStorage.setItem(`invoice_${order.id}`, JSON.stringify(invoice));
    alert("Invoice saved to localStorage ✅");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-green-600 mb-6">Orders</h1>

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="relative flex-grow max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 text-green-500" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or product..."
            className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      <div className="overflow-auto rounded-lg shadow-green bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="text-green-700 border-b border-green-200 bg-green-50">
            <tr>
              <th className="py-2 px-4">S.No</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Qty</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order.id} className="border-b border-green-100 hover:bg-green-100 transition">
                <td className="py-2 px-4">{indexOfFirst + index + 1}</td>
                <td className="py-2 px-4">{order.date}</td>
                <td className="py-2 px-4">{order.name}</td>
                <td className="py-2 px-4">{order.product}</td>
                <td className="py-2 px-4">{order.quantity}</td>
                <td className="py-2 px-4">₹{order.price}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-green-600 font-medium hover:underline"
                  >
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
        >
          Next
        </button>
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 print:block print:bg-transparent">
          <div className="bg-white p-6 rounded-lg w-[95%] max-w-xl shadow-green relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 print:hidden"
            >
              <X size={20} />
            </button>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-green-700">Invoice</h2>
                <span className="text-sm text-gray-500">
                  {generateInvoiceNumber(selectedOrder.id)}
                </span>
              </div>
              <div className="text-sm space-y-2">
                <p><strong>Date:</strong> {selectedOrder.date}</p>
                <p><strong>Customer:</strong> {selectedOrder.name}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>Contact:</strong> {selectedOrder.contact}</p>
                <p><strong>Address:</strong> {selectedOrder.address}</p>
                <hr />
                <p><strong>Product:</strong> {selectedOrder.product}</p>
                <p><strong>Category:</strong> {selectedOrder.category} - {selectedOrder.subCategory}</p>
                <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                <p><strong>Price per item:</strong> ₹{selectedOrder.price}</p>
                <p><strong>Total:</strong> ₹{selectedOrder.price * selectedOrder.quantity}</p>
                <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
              </div>

              <div className="mt-6 flex justify-between print:hidden">
                <button
                  onClick={() => saveInvoice(selectedOrder)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Invoice
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 flex items-center gap-2"
                >
                  <Printer size={16} /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;





