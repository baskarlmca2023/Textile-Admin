import React, { useState } from "react";
import { Plus, Trash2, Edit, UploadCloud, X } from "lucide-react";

const initialProducts = [
  { id: 1, category: "Men's Wear", heading: "Stylish Shirts", content: "Latest trends in men's fashion." },
  { id: 2, category: "Men's Wear", heading: "Denim Jackets", content: "Comfort and style combined." },
  { id: 3, category: "Men's Wear", heading: "Casual Tees", content: "Perfect for everyday wear." },
  { id: 4, category: "Men's Wear", heading: "Formal Suits", content: "Elegant formal attire." },
];

const Advertisement = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    category: "",
    heading: "",
    content: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddOrUpdateProduct = () => {
    const { category, heading, content } = newProduct;
    if (!category || !heading || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingProduct !== null) {
      // Edit mode
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...newProduct }
            : product
        )
      );
      setEditingProduct(null);
    } else {
      // Add mode
      setProducts((prev) => [
        ...prev,
        {
          ...newProduct,
          id: prev.length + 1,
        },
      ]);
    }

    setNewProduct({ category: "", heading: "", content: "", image: null });
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">Advertisement</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
            setNewProduct({ category: "", heading: "", content: "", image: null });
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow transition duration-300 hover:bg-green-500"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded border border-green-200 shadow-md transition duration-300 hover:shadow-lg"
          >
            <div className="mb-4">
              <p className="text-green-700 font-semibold mb-1">Product No: {product.id}</p>
              <p className="text-gray-800">Category: {product.category}</p>
              <p className="text-gray-800">Heading: {product.heading}</p>
              <p className="text-gray-600 text-sm">{product.content}</p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg border border-green-200 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-700">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-red-600 hover:text-red-800">
                <X />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product No</label>
                <input
                  type="text"
                  value={editingProduct ? editingProduct.id : products.length + 1}
                  disabled
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category *</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="Enter category"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Heading *</label>
                <input
                  type="text"
                  name="heading"
                  value={newProduct.heading}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="Enter heading"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Content *</label>
                <textarea
                  name="content"
                  value={newProduct.content}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="Enter content"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateProduct}
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-500 flex items-center gap-2 transition"
              >
                <UploadCloud size={18} /> {editingProduct ? "Update" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advertisement;
