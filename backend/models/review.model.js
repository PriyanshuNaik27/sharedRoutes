import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },

    rating: {
      type: Number,
      min: [1, "Rating must be greater than 0"],
      max: [5, "Rating must be less than or equal to 5"],
    },
    cost: {
      type: Number,
    },
    numberOfPeople: {
      type: Number,
    },
    hotels: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
