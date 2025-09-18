import express from "express"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());


import userRouter from "./routes/user.route.js";
app.use("/api/v1/user",userRouter);



export default app;