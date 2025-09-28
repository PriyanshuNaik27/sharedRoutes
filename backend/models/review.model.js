import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },

    //LocationName isliye name nhi diya kyuki ref  have to id aaiga , too id aiigi naki name ,
    location:{
      type : mongoose.Schema.Types.ObjectId,
      ref : "FromLocation"
    },

    place :{
      type : mongoose.Schema.Types.ObjectId,
      ref:"ToPlace"
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
