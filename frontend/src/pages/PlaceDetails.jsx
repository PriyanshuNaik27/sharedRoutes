// src/pages/PlaceDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function PlaceDetails() {
  const { locationSlug, placeSlug } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ description: "", rating: 5 });
  const [message, setMessage] = useState("");

  // Fetch reviews when page loads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/v1/review/${locationSlug}/${placeSlug}/reviews`
        );
        setReviews(res.data.data || []);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load reviews");
      }
    };
    fetchReviews();
  }, [locationSlug, placeSlug]);

  // Submit review (only if logged in)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${backendUrl}/api/v1/review/${locationSlug}/${placeSlug}/addReview`,
        newReview,
        {
          withCredentials: true,
        }
      );
      setMessage("Review added!");
      setReviews([...reviews, res.data.data]); // append new review
      setNewReview({ description: "", rating: 5 });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setMessage("You need to login to add a review.");
      } else {
        setMessage(err.response?.data?.message || "Failed to add review");
      }
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Reviews for {placeSlug.replace("-", " ")}
      </h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-3 mb-6">
          {reviews.map((r, i) => (
            <li key={i} className="border p-3 rounded">
              <p className="font-semibold">⭐ {r.rating}</p>
              <p>{r.description}</p>
              <small className="text-gray-500">
                by {r.createdBy?.name || "Anonymous"}
              </small>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
        <textarea
          className="w-full border p-2 mb-2 rounded"
          value={newReview.description}
          onChange={(e) =>
            setNewReview({ ...newReview, description: e.target.value })
          }
          placeholder="Write your review"
          required
        />
        <input
          type="number"
          min="1"
          max="5"
          className="w-full border p-2 mb-2 rounded"
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: e.target.value })
          }
          placeholder="Rating (1-5)"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Review
        </button>
      </form>

      {message && <p className="mt-3 text-red-500">{message}</p>}
    </div>
  );
}
