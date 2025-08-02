import mongoose from "mongoose";
const locationSchema= new mongoose.Schema(
    {
       address: {
        type:String,
        required:true,
        lowercase:true
       },
      uploadedBy:{
        type:mongoose.Schema.types.ObjectId,
        ref:"User",
      }
    }
 ,{timestamps:true});
 
 export const Location= mongoose.model("Location",locationSchema); 