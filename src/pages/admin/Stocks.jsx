import React, { useState } from "react";
import { Search, Plus, X } from "lucide-react";

const ITEMS_PER_PAGE = 5;

const Stocks = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityMap, setQuantityMap] = useState({});
  const [stocks, setStocks] = useState([
    {
      id: 1,
      code: "P1001",
      category: "Men",
      subCategory: "Shirts",
      product: "Cotton Shirt",
      updatedOn: "2025-05-25",
      quantity: 120,
    },
    {
      id: 2,
      code: "P1002",
      category: "Women",
      subCategory: "Kurtis",
      product: "Silk Kurti",
      updatedOn: "2025-05-24",
      quantity: 80,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    code: "",
    category: "",
    subCategory: "",
    product: "",
    quantity: 0,
    updatedOn: new Date().toISOString().split("T")[0],
  });

  const handleAddMore = (id) => {
    setQuantityMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 10,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const id = stocks.length + 1;
    const productToAdd = {
      ...newProduct,
      id,
      quantity: Number(newProduct.quantity),
    };
    setStocks([...stocks, productToAdd]);
    setShowAddModal(false);
    setNewProduct({
      code: "",
      category: "",
      subCategory: "",
      product: "",
      quantity: 0,
      updatedOn: new Date().toISOString().split("T")[0],
    });
  };

  const filteredStocks = stocks.filter((item) => {
    const matchesSearch =
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentStocks = filteredStocks.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-green-600">Stocks</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded shadow-green hover:bg-green-700 transition duration-200"
        >
          <Plus size={18} className="mr-2" /> Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-green-500" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product/code..."
            className="pl-10 pr-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 transition duration-200"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-green-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400 transition duration-200"
        >
          <option value="All">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-green p-4 bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="text-green-700 border-b border-green-200">
            <tr>
              <th className="py-2 px-4">S.No</th>
              <th className="py-2 px-4">Code</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Sub Category</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Updated</th>
              <th className="py-2 px-4">Qty</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStocks.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-green-100 hover:bg-green-50 transition duration-150"
              >
                <td className="py-2 px-4">{start + index + 1}</td>
                <td className="py-2 px-4">{item.code}</td>
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">{item.subCategory}</td>
                <td className="py-2 px-4">{item.product}</td>
                <td className="py-2 px-4">{item.updatedOn}</td>
                <td className="py-2 px-4">
                  {item.quantity + (quantityMap[item.id] || 0)}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleAddMore(item.id)}
                    className="text-green-600 hover:underline"
                  >
                    Add More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded transition ${
              currentPage === i + 1
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
        >
          Next
        </button>
      </div>

      {/* Add New Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-3xl shadow-green relative overflow-y-auto max-h-[90vh] animate-fade-in">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              Add New Product
            </h2>
            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
            >
              <input name="code" value={newProduct.code} onChange={handleInputChange} type="text" placeholder="Product Code" className="border p-2 rounded" />
              <input name="category" value={newProduct.category} onChange={handleInputChange} type="text" placeholder="Category" className="border p-2 rounded" />
              <input name="subCategory" value={newProduct.subCategory} onChange={handleInputChange} type="text" placeholder="Sub Category" className="border p-2 rounded" />
              <input name="product" value={newProduct.product} onChange={handleInputChange} type="text" placeholder="Product Name" className="border p-2 rounded" />
              <input name="quantity" value={newProduct.quantity} onChange={handleInputChange} type="number" placeholder="Quantity" className="border p-2 rounded" />
              {/* Optional fields can go below if needed */}
              {/* <input type="text" placeholder="Colors" className="border p-2 rounded" /> */}
              {/* <input type="text" placeholder="Sizes" className="border p-2 rounded" /> */}
              {/* <input type="file" className="border p-2 rounded col-span-1 sm:col-span-2" /> */}
              <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 mt-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 transition"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stocks;
