import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();


router.post("/:locationSlug/:placeSlug/addReview",verifyJWT,addReview);
router.get("/:locationSlug/:placeSlug",getAllReviews);

