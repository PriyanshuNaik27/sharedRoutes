import jwt from "jsonwebtoken"
import { User } from "../models/user.models"

/* 
take username from req.body
check the token 
verify token 
if correct send okay
or error
*/

export const verifyJWT = async(req,res,next)=>{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Access denied. Please login or register.",
            });
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            "-password refreshToken"
        )

        if(!user){
                return res.json({
                    status : 401,
                    message : "invalid accestoken"
                });
        }

        req.user = user;
        next();
    }catch(error){
       return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Token expired. Please login again."
          : "Invalid token. Please login or register.",
    });
    }
}