import mongoose from "mongoose";
const reviewSchema= new mongoose.Schema(
    {
       writtenBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       },
       locationreview : {
        type:String,
        required:true,
        lowercase:true
       }
   

    }
 ,{timestamps:true});
 
 export const Review= mongoose.model("Review",reviewSchema);