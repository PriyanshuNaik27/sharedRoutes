import { FromLocation } from "../models/fromLocation.model.js";
import { Review } from "../models/review.model.js";
import { ToPlace } from "../models/toPlaces.model.js";

export const addReview = async(req,res)=>{
    
    try {
    // const user = req.user;

    const userId = req.user?._id; 
    if (!userId) {
      
      res.status(400).json({
        message: "didnnot foujnd user id ,login !! "
      })
    }

    // const locationSlug = req.params;
    // const placeSlug = req.params; 
    // dont use this way as now both the slug will be objectss , instead destruct them 

    const {locationSlug, placeSlug} =  req.params;

    const {description, rating, cost, numberOfPeople,hotels}= req.body;
    const location = await FromLocation.findOne({locationSlug});
    const place = await ToPlace.findOne({placeSlug});
    const review = await  Review.create({
        addedBy: userId,
        description,
        rating,
        cost,
        location: location._id,
        place: place._id,
        numberOfPeople,
        hotels,
    });

    res.status(200).json({
        message : " succesfully added a review",
        data : review,
    })
    } catch (err) {
        res.status(400).json({
            message: " error while adding a review",
            error: err.message
        });
    }

}

export const getReviews = async(req,res)=>{
    try {
        const {locationSlug, placeSlug} =  req.params;
        const location = await FromLocation.findOne({locationSlug});
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        const place = await ToPlace.findOne({placeSlug});
        if (!place) {
        return res.status(404).json({ message: "Place not found in this location" });
        }

        const reviews = await Review.find({
            location: location._id,
            place: place._id
        }).populate("addedBy","userName")
        .populate("location","locationName locationSlug")
        .populate("place","placeName placeSlug")
        ;

        res.status(200).json({
            message:"succesfully fetched all the reviews",
            data:reviews
        })
    } catch (err) {
        res.status(400).json({
            message : "error while fetching reviews",
            error: err.message
        })
    }
}   



