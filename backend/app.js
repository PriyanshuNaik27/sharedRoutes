import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  // Use the specific origin of your frontend app
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  // Allow cookies and other credentials to be sent
  credentials: true,
  // Explicitly allow the headers your frontend might send
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Use the detailed options
app.use(cookieParser());
app.use(express.json());

import userRouter from "./routes/user.route.js";
app.use("/api/v1/user",userRouter);


import fromLocationRouter from "./routes/fromLocation.route.js";
app.use("/api/v1/fromLocation",fromLocationRouter);

import toPlaceRouter from "./routes/toPlaces.route.js";
app.use("/api/v1/toPlace",toPlaceRouter);

import reviewRouter from "./routes/reviews.route.js"
app.use("/api/v1/review",reviewRouter);

export default app;