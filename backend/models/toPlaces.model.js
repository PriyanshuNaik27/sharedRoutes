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

//// ✅ Add compound unique index here
// learn about this and than addd this ,  i dont know whhat index does right now , will look and then add
//  toPlacesSchema.index({ placeSlug: 1, fromLocation: 1 }, { unique: true });


 export const ToPlace =   mongoose.model("ToPlace",toPlacesSchema)