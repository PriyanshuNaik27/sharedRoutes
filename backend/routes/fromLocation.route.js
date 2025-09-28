import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addNewLocation, recentLocation ,allLocations} from "../controllers/fromLocation.controller.js";
const router = Router();

router.post("/",verifyJWT,addNewLocation);

router.get("/recentLocation",recentLocation)// to display at dashboard 

// router.get("/:locationSlug"); //to get location , if needed sometime 

router.get("/allLocations",allLocations);
export default router;