import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addNewLocation } from "../controllers/fromLocation.controller.js";
const router = Router();

router.post("/",addNewLocation);

// router.get("/getRandomLocation")// to display at dashboard 

// router.get("/:locationSlug"); //to get location , if needed sometime 

export default router;