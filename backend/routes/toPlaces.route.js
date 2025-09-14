import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

const router  = Router();

router.get("/:locationSlug/places",getAllPlaces);//to get all places from location

router.post("/:locationSlug/places",verifyJWT,addNewPlace);//to add a new place to a location

router.get("/:locationSlug/places/:id",getPlaceInfo);

export default router;