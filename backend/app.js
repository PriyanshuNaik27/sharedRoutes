import express from "express"
import cors from "cors"

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());


import userRouter from "./routes/user.route.js";
app.use("/api/v1/user",userRouter);


import fromLocationRouter from "./routes/fromLocation.route.js";
app.use("/api/v1/fromLocation",fromLocationRouter);

import toPlaceRouter from "./routes/toPlaces.route.js";
app.use("/api/v1/fromLocation",toPlaceRouter);


export default app;