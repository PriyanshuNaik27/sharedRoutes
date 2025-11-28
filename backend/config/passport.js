import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/user.model.js";

console.log("----- PASSPORT CONFIG LOADING -----");
console.log("Client ID:", process.env.GOOGLE_CLIENT_ID ? "Exists" : "MISSING!");

// 1. REMOVED the "export default (passport) => {" wrapper. 
// Now this runs immediately when imported.

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/user/auth/google/callback",
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
        userName: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id
    };
    try {
        // 2. FIXED TYPO: finOne -> findOne
        let user = await User.findOne({ 
            googleId: profile.id
        });

        if (user) {
            done(null, user);
        } else {
            user = await User.create(newUser);
            done(null, user);
        }
    } catch (err) {
        console.error("Error in Google Strategy", err);
        done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});