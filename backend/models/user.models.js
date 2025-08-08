import mongoose from "mongoose";
import bcyrpt from "bcrypt";
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
       }

    }
 ,{timestamps:true});
 //hash the password before saving and before saving check if the passwrod is modified or not;
userSchema.pre("save", async function(next){
   if(!this.isModified('password')){
      return next();
   }
   try{
      this.password= await bcyrpt.hash(password,10);
      next();
   }catch(error){
      console.error("error while hashing the password",error);
      next(error);
   }
});
//method to see if the password is correct or not
userSchema.methods.isPasswordCorrect() = async function(password){
   return await bcyrpt.compare(password,this.password);
}

 
 export const User= mongoose.model("User",userSchema);