import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addNewLocation, recentLocation } from "../controllers/fromLocation.controller.js";
const router = Router();

router.post("/",addNewLocation);

router.get("/recentLocation",recentLocation)// to display at dashboard 

// router.get("/:locationSlug"); //to get location , if needed sometime 

export default router;