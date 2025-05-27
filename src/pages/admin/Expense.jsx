import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Search, PlusCircle, X } from "lucide-react";

// Validation schema
const schema = yup.object().shape({
  date: yup.string().required("Date is required"),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Sub Category is required"),
  description: yup.string().required("Description is required"),
  amount: yup.number().positive().required("Amount is required"),
});

const Expense = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("Paid");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2025-05-24",
      category: "Transport",
      subCategory: "Fuel",
      description: "Diesel for delivery van",
      amount: 1500,
      status: "Paid",
    },
    {
      id: 2,
      date: "2025-05-25",
      category: "Utility",
      subCategory: "Electricity",
      description: "Factory bill",
      amount: 3000,
      status: "Unpaid",
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.category.toLowerCase().includes(search.toLowerCase()) ||
      expense.description.toLowerCase().includes(search.toLowerCase())
  );

  const paidAmount = expenses
    .filter((e) => e.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const unpaidAmount = expenses
    .filter((e) => e.status === "Unpaid")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalAmount = paidAmount + unpaidAmount;

  const onSubmit = (data) => {
    const newExpense = {
      id: expenses.length + 1,
      ...data,
      amount: Number(data.amount),
      status,
    };
    setExpenses([...expenses, newExpense]);
    setShowModal(false);
    reset();
    setStatus("Paid");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    const json = JSON.stringify(expenses, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "expenses.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-semibold text-green-600">Expense</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 text-green-600 hover:text-green-800"
        >
          <PlusCircle size={20} />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="date"
          className="border border-green-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
        />
        <span className="text-green-600 font-semibold">to</span>
        <input
          type="date"
          className="border border-green-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
        />
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-green-500" size={20} />
          <input
            type="text"
            placeholder="Search expense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-green p-4 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="text-green-700 border-b border-green-200">
            <tr>
              <th className="py-2 px-4">S.No</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Sub Category</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Amount (₹)</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((e, index) => (
              <tr key={e.id} className="border-b border-green-100 hover:bg-green-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{e.date}</td>
                <td className="py-2 px-4">{e.category}</td>
                <td className="py-2 px-4">{e.subCategory}</td>
                <td className="py-2 px-4">{e.description}</td>
                <td className="py-2 px-4">₹{e.amount}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      e.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 text-sm">
        <div className="flex-1 bg-green-50 px-4 py-2 rounded text-green-700 font-semibold">
          Paid Amount: ₹{paidAmount}
        </div>
        <div className="flex-1 bg-red-50 px-4 py-2 rounded text-red-600 font-semibold">
          Unpaid Amount: ₹{unpaidAmount}
        </div>
        <div className="flex-1 bg-gray-100 px-4 py-2 rounded text-gray-700 font-semibold">
          Total Amount: ₹{totalAmount}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-md"
        >
          Print
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-md"
        >
          Save
        </button>
      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-xl shadow-green relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">Add Expense</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 text-sm">
              <input
                type="date"
                {...register("date")}
                className="border border-green-300 px-4 py-2 rounded-md"
              />
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}

              <input
                type="text"
                placeholder="Category"
                {...register("category")}
                className="border border-green-300 px-4 py-2 rounded-md"
              />
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}

              <input
                type="text"
                placeholder="Sub Category"
                {...register("subCategory")}
                className="border border-green-300 px-4 py-2 rounded-md"
              />
              {errors.subCategory && <p className="text-red-500">{errors.subCategory.message}</p>}

              <textarea
                placeholder="Description"
                {...register("description")}
                className="border border-green-300 px-4 py-2 rounded-md"
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}

              <input
                type="number"
                placeholder="Amount"
                {...register("amount")}
                className="border border-green-300 px-4 py-2 rounded-md"
              />
              {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={status === "Paid"}
                  onChange={() => setStatus(status === "Paid" ? "Unpaid" : "Paid")}
                  className="accent-green-600"
                />
                <span
                  className={`font-medium ${
                    status === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status}
                </span>
              </label>

              <div className="flex justify-end mt-4 gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
