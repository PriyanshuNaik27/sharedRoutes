import mongoose from "mongoose";
const locationSchema= new mongoose.Schema(
    {
       locationName: {
        type:String,
        required:true,
        lowercase:true
       },
      uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
      locationSlug:{
        type:String,
        required:true,
        unique:true,
      },
      image:{
        type:String,
        default:null
      }
    }
 ,{timestamps:true});
 
 export const FromLocation= mongoose.model("FromLocation",locationSchema); 