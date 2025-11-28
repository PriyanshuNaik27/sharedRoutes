import { Router } from "express";
import passport, { Passport } from "passport";
import jwt from "jsonwebtoken";
const Frontend_URL = process.env.FRONTEND_URL || "http://localhost:5173";


const router = Router();
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }), // session: false because we use JWT
  (req, res) => {
    // 1. Generate the Token
    const accessToken = jwt.sign({ id: req.user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // 2. Set the Cookie (The Key Logic)
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Frontend JS cannot read this (Security!)
      secure: process.env.NODE_ENV === "production", // true in production (HTTPS), false in localhost
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-site in prod
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // 3. Redirect to Frontend (No token in URL!)
    // Just send them to a success page or straight home
    res.redirect(Frontend_URL); 
  }
);
export default router;