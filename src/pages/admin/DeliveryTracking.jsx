import React, { useState } from "react";
import { Search, Eye } from "lucide-react";

const DeliveryTracking = () => {
  const [search, setSearch] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedDeliveries, setSavedDeliveries] = useState([]);

  const deliveries = [
    {
      id: 1,
      date: "2025-05-25",
      invoiceNumber: "INV001",
      name: "John Doe",
      email: "john@example.com",
      address: "123 Street, Chennai",
      location: "Chennai",
      contact: "9876543210",
      products: "Cotton Shirt x2",
      price: 3000,
      trackingId: "TRK123456789",
      courier: "Professional Couriers",
      trackLink: "https://professionalcouriers.in/track/TRK123456789",
    },
    {
      id: 2,
      date: "2025-05-25",
      invoiceNumber: "INV002",
      name: "Jane Smith",
      email: "jane@example.com",
      address: "456 Avenue, Coimbatore",
      location: "Coimbatore",
      contact: "9123456780",
      products: "Silk Kurti x1",
      price: 2500,
      trackingId: "TRK987654321",
      courier: "Professional Couriers",
      trackLink: "https://professionalcouriers.in/track/TRK987654321",
    },
    
  ];

  const filteredDeliveries = deliveries.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.trackingId.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);
  const paginatedDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = () => {
    if (selectedDelivery) {
      setSavedDeliveries((prev) => [...prev, selectedDelivery]);
      setSelectedDelivery(null);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-full overflow-x-auto">
      <h1 className="text-2xl font-semibold text-green-600 mb-6">
        Delivery Tracking (Today)
      </h1>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="relative flex items-center w-full sm:w-80">
          <Search className="absolute left-3 text-green-500" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, invoice or tracking..."
            className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          />
        </div>
      </div>

      <div className="overflow-auto rounded-lg shadow-green p-4 bg-white">
        <table className="min-w-[800px] w-full text-sm text-left">
          <thead className="text-green-700 border-b border-green-200">
            <tr>
              <th className="py-2 px-4">S.No</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Invoice No</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">Products</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Tracking ID</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDeliveries.map((delivery, index) => (
              <tr
                key={delivery.id}
                className="border-b border-green-100 hover:bg-green-50 transition-all duration-200"
              >
                <td className="py-2 px-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-2 px-4">{delivery.date}</td>
                <td
                  className="py-2 px-4 text-green-600 cursor-pointer hover:underline"
                  onClick={() => setSelectedDelivery(delivery)}
                >
                  {delivery.invoiceNumber}
                </td>
                <td className="py-2 px-4">{delivery.name}</td>
                <td className="py-2 px-4">{delivery.location}</td>
                <td className="py-2 px-4">{delivery.contact}</td>
                <td className="py-2 px-4">{delivery.products}</td>
                <td className="py-2 px-4">₹{delivery.price}</td>
                <td
                  className="py-2 px-4 text-green-600 cursor-pointer hover:underline"
                  onClick={() => setSelectedDelivery(delivery)}
                >
                  {delivery.trackingId}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => setSelectedDelivery(delivery)}
                    className="text-green-600 hover:text-green-800 transition"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-6 gap-2 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-green relative transition-all duration-300">
            <button
              onClick={() => setSelectedDelivery(null)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">Delivery Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p><strong>Customer Name:</strong> {selectedDelivery.name}</p>
              <p><strong>Email:</strong> {selectedDelivery.email}</p>
              <p><strong>Address:</strong> {selectedDelivery.address}</p>
              <p><strong>Location:</strong> {selectedDelivery.location}</p>
              <p><strong>Contact:</strong> {selectedDelivery.contact}</p>
              <p><strong>Invoice No:</strong> {selectedDelivery.invoiceNumber}</p>
              <p><strong>Tracking Number:</strong> {selectedDelivery.trackingId}</p>
              <p><strong>Delivery Partner:</strong> {selectedDelivery.courier}</p>
              <p><strong>Track Link:</strong>{" "}
                <a href={selectedDelivery.trackLink} target="_blank" rel="noopener noreferrer" className="text-green-600 underline">
                  Track Package
                </a>
              </p>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 bg-green-100 text-green-700 rounded shadow hover:bg-green-200 transition"
                onClick={() => setSelectedDelivery(null)}
              >
                Discard
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryTracking;
