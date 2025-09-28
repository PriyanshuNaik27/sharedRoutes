import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {getAllPlaces,addPlaceToLocation} from "../controllers/toPlaces.controller.js"


const router  = Router();

router.get("/:locationSlug/places",getAllPlaces);//to get all places from location

router.post("/:locationSlug/places",verifyJWT,addPlaceToLocation);//to add a new place to a location

// router.get("/:locationSlug/places/:id",getPlaceInfo);

export default router;