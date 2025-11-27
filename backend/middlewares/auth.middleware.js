import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { de } from "zod/v4/locales";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    // console.log("--- New Request ---");
    // console.log("1. TOKEN RECEIVED BY MIDDLEWARE:", token);

    if (!token) {
      console.log("-> REJECTED: No token provided.");
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // This is the line that might be failing.
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    console.log("2. TOKEN DECODED SUCCESSFULLY:", decodedToken);

    const user = await User.findById(decodedToken?._id || decodedToken?.id).select("-password -refreshToken");

    console.log("3. USER FOUND IN DATABASE:", user);

    if (!user) {
      console.log("-> REJECTED: User ID from token not found in database.");
      return res.status(401).json({ message: "Invalid access token. User not found." });
    }

    // console.log("4. SUCCESS: User verified. Passing to next middleware.");
    req.user = user;
    next();

  } catch (error) {
    console.error("--- ERROR IN JWT VERIFICATION ---");
    console.error("ERROR NAME:", error.name); // e.g., "JsonWebTokenError"
    console.error("ERROR MESSAGE:", error.message); // e.g., "invalid signature"
    console.error("---------------------------------");
    
    return res.status(401).json({
      success: false,
      message: error.name === "TokenExpiredError" ? "Token expired." : "Invalid token.",
    });
  }
};
