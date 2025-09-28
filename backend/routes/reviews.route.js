import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addReview,getReviews } from "../controllers/review.controller.js";
const router = Router();


router.post("/:locationSlug/:placeSlug/addReview",addReview);
router.get("/:locationSlug/:placeSlug/reviews",getReviews);

export default router;