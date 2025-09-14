import mongoose from "mongoose";
const locationSchema= new mongoose.Schema(
    {
       locationName: {
        type:String,
        required:true,
        lowercase:true
       },
      uploadedBy:{
        type:mongoose.Schema.types.ObjectId,
        ref:"User",
      },
      locationSlug:{
        type:String,
        required:true,
        unique:true,
      }
    }
 ,{timestamps:true});
 
 export const FromLocation= mongoose.model("FromLocation",locationSchema); 