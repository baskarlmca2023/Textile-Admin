import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import  ResponsivePagination  from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { motion, AnimatePresence } from "framer-motion";

const UploadProducts = () => {
  const initialProducts = [
    {
      postedOn: "2025-05-01",
      code: "TX001",
      category: "Men",
      subCategory: "Shirts",
      price: "1200",
      gst: "5%",
      status: "Active",
      details: "Cotton casual shirt",
      image: null,
    },
    {
      postedOn: "2025-05-03",
      code: "TX002",
      category: "Women",
      subCategory: "Dresses",
      price: "1500",
      gst: "12%",
      status: "Active",
      details: "Summer floral dress",
      image: null,
    },
    {
      postedOn: "2025-05-05",
      code: "TX003",
      category: "Kids",
      subCategory: "T-Shirts",
      price: "700",
      gst: "5%",
      status: "Active",
      details: "Printed kids t-shirt",
      image: null,
    },
    {
      postedOn: "2025-05-07",
      code: "TX004",
      category: "Accessories",
      subCategory: "Belts",
      price: "500",
      gst: "18%",
      status: "Inactive",
      details: "Leather belt",
      image: null,
    },
    {
      postedOn: "2025-05-10",
      code: "TX005",
      category: "Men",
      subCategory: "Trousers",
      price: "1300",
      gst: "12%",
      status: "Active",
      details: "Formal trousers",
      image: null,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    postedOn: "",
    code: "",
    category: "",
    subCategory: "",
    price: "",
    gst: "",
    status: "Active",
    details: "",
    image: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All"); // New filter state
  const itemsPerPage = 5;

  // Filter products by status
  const filteredProducts =
    filterStatus === "All"
      ? products
      : products.filter((p) => p.status === filterStatus);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prev) => ({ ...prev, image: file }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts((prev) =>
        prev.map((item, idx) => (idx === editProductId ? { ...newProduct } : item))
      );
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }
    setNewProduct({
      postedOn: "",
      code: "",
      category: "",
      subCategory: "",
      price: "",
      gst: "",
      status: "Active",
      details: "",
      image: null,
    });
    setShowForm(false);
    setIsEditing(false);
    setEditProductId(null);
  };

  const handleEditProduct = (product) => {
    const index = products.findIndex((p) => p.code === product.code);
    setEditProductId(index);
    setNewProduct(product);
    setIsEditing(true);
    setShowForm(true);
  };

  // When filter changes, reset page to 1
  const onFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-green w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-green-700">Upload Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-shadow shadow-green hover:shadow-green-md flex items-center gap-1"
        >
          <Plus size={18} />
          {showForm ? "Close Form" : "Add New Product"}
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-200 rounded-xl shadow-green shadow-md">
          <thead className="bg-green-100 text-green-800 text-sm font-semibold">
            <tr>
              <th className="px-4 py-2">Posted On</th>
              <th className="px-4 py-2">Product Code</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Sub Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">GST</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr
                  key={indexOfFirstItem + index}
                  className="border-t hover:bg-green-50 transition-shadow shadow-green"
                >
                  <td className="px-4 py-2">{product.postedOn}</td>
                  <td className="px-4 py-2">{product.code}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">{product.subCategory}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.gst}</td>
                  <td className="px-4 py-2 font-semibold">
                    {product.status === "Active" && (
                      <span className="text-green-600">{product.status}</span>
                    )}
                    {product.status === "Inactive" && (
                      <span className="text-red-600">{product.status}</span>
                    )}
                    {product.status === "Out of Stock" && (
                      <span className="text-yellow-600">{product.status}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{product.details}</td>
                  <td className="px-4 py-2">
                    {product.image ? (
                      <img
                        src={URL.createObjectURL(product.image)}
                        alt="Product"
                        className="h-12 object-cover rounded shadow"
                      />
                    ) : (
                      <span className="text-gray-400 italic text-sm">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-green-700 hover:underline text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
          className="text-green-700"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="mt-6 max-w-md mx-auto">
        <label
          htmlFor="statusFilter"
          className="block mb-1 font-semibold text-green-700"
        >
          Filter by Status
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={onFilterChange}
          className="w-full border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Product Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-green-50 rounded-lg shadow-green shadow-lg p-6 max-w-xl mx-auto"
          >
            <form
              onSubmit={handleAddProduct}
              className="grid grid-cols-1 gap-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-green-700">
                  {isEditing ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setEditProductId(null);
                    setNewProduct({
                      postedOn: "",
                      code: "",
                      category: "",
                      subCategory: "",
                      price: "",
                      gst: "",
                      status: "Active",
                      details: "",
                      image: null,
                    });
                  }}
                  className="text-green-600 hover:text-green-800 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <input
                type="date"
                name="postedOn"
                value={newProduct.postedOn}
                onChange={handleInputChange}
                required
                className="border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Posted On"
              />
              <input
                type="text"
                name="code"
                value={newProduct.code}
                onChange={handleInputChange}
                required
                disabled={isEditing} // disable editing code
                className="border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition disabled:bg-green-100"
                placeholder="Product Code"
              />
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                required
                className="border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Category"
              />
              <input
                type="text"
                name="subCategory"
                value={newProduct.subCategory}
                onChange={handleInputChange}
                required
                className="border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Sub Category"
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
                className="border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Price"
              />
              <input
                type="text"
                name="gst"
                value={newProduct.gst}
                onChange={handleInputChange}
                required
                className="border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="GST"
              />
              <select
                name="status"
                value={newProduct.status}
                onChange={handleInputChange}
                className="border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <textarea
                name="details"
                value={newProduct.details}
                onChange={handleInputChange}
                rows="3"
                className="border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Product Details"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-green-400 rounded px-3 py-2 shadow-green focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition shadow-green hover:shadow-green-md"
              >
                {isEditing ? "Update Product" : "Add Product"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadProducts;
