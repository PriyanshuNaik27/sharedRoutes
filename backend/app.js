import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  // If FRONTEND_URL is set, use it. Otherwise reflect the request origin (true)
  // so that Access-Control-Allow-Origin echoes the incoming Origin header.
  origin: process.env.FRONTEND_URL || true,
  // Allow cookies and other credentials to be sent
  credentials: true,
  // Explicitly allow the headers your frontend might send
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Use the detailed options
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

import userRouter from "./routes/user.route.js";
app.use("/api/v1/user",userRouter);


import fromLocationRouter from "./routes/fromLocation.route.js";
app.use("/api/v1/fromLocation",fromLocationRouter);

import toPlaceRouter from "./routes/toPlaces.route.js";
app.use("/api/v1/toPlace",toPlaceRouter);

import reviewRouter from "./routes/reviews.route.js"
app.use("/api/v1/review",reviewRouter);

export default app;