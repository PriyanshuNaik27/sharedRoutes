import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addNewLocation, recentLocation ,allLocations} from "../controllers/fromLocation.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.post(
    "/",
    verifyJWT,
    upload.fields([
      {
        name: "locationImage", // should be a string
        maxCount: 1,
      }
    ]),
    addNewLocation
  );
  
// Test route to create a location without file upload (accepts imageUrl in body)
router.post('/test-create', verifyJWT, testCreateLocation);
  
router.get("/recentLocation",recentLocation)// to display at dashboard 

// router.get("/:locationSlug"); //to get location , if needed sometime 

router.get("/allLocations",allLocations);
export default router;