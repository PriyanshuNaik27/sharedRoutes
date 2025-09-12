import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

const router  = Router();

router.get("/:locationSlug");

router.post("/:locationSlug",verifyJWT,addNewPlace);

