import mongoose from "mongoose";
const userSchema= new mongoose.Schema(
    {
       name: {
        type:String,
        required:true,
        lowercase:true
       },
       email : {
        type:String,
        required:true,
        unique:true,
        lowercase:true
       },
       password:{
        required:true,
        type:String,
        minLength:6,
        maxLength:20
       }

    }
 ,{timestamps:true});
 
 export const User= mongoose.model("User",userSchema);