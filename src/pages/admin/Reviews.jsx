import React, { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialReviews = [
  {
    id: 1,
    name: "John Doe",
    date: "1 day ago",
    rating: 4,
    total: 5,
    review: "Great product! Quality is excellent and delivery was on time.",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "2 days ago",
    rating: 5,
    total: 5,
    review: "Absolutely love it. Will order again soon!",
    status: "pending",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    date: "3 days ago",
    rating: 3,
    total: 5,
    review: "Average experience. Packaging could be better.",
    status: "pending",
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);

  const handleStatus = (id, status) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status } : review
      )
    );
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold text-green-600 mb-6 text-center md:text-left">
        Reviews & Ratings
      </h1>

      <div className="space-y-6">
        <AnimatePresence>
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-green border border-green-100 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-3">
                  <div className="font-semibold text-green-700">
                    {review.name}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                  {Array.from({ length: review.total - review.rating }).map(
                    (_, idx) => (
                      <Star
                        key={idx + review.rating}
                        size={16}
                        stroke="currentColor"
                      />
                    )
                  )}
                  <span className="ml-2 text-gray-600 text-sm">
                    {review.rating} out of {review.total}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{review.review}</p>

              <div className="flex flex-wrap items-center gap-4 justify-between">
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => handleStatus(review.id, "approved")}
                    disabled={review.status === "approved"}
                    className={`px-4 py-2 rounded shadow-md transition-colors duration-300 ${
                      review.status === "approved"
                        ? "bg-green-300 text-white cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-500"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatus(review.id, "rejected")}
                    disabled={review.status === "rejected"}
                    className={`px-4 py-2 rounded shadow-md transition-colors duration-300 ${
                      review.status === "rejected"
                        ? "bg-red-300 text-white cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-500"
                    }`}
                  >
                    Reject
                  </button>
                </div>

                {review.status !== "pending" && (
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      review.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {review.status.charAt(0).toUpperCase() +
                      review.status.slice(1)}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reviews;
