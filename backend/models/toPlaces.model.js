import mongoose from "mongoose";

const toPlacesSchema =  new mongoose.Schema({
    placeName : {
        type:String,
        required:true
    },
    fromLocation :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"FromLocation",
        required: true
    },
    placeSlug :{
        type:String,
        required:true
    },
    addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

 export const toPlaces=   mongoose.model("ToPlaces",toPlacesSchema)