import mongoose, { Mongoose, Schema } from "mongoose";

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
    addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

 export default mongoose.model("ToPlaces",toPlacesSchema)