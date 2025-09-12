import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

const router  = Router();

router.get("/:locationSlug");//to get all places from location

router.post("/:locationSlug",verifyJWT,addNewPlace);//to add a new place to a location

export default router;