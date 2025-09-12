import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js"

const router = Router();

router.post("/",verifyJWT,addNewLocation);

router.get("/getRandomLocation")// to display at dashboard 

router.get("/:locationName"); //to get location , if needed sometime 

export default router;