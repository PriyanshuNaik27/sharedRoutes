import experss from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser,loginUser } from "../controllers/user.controller.js";
const router = experss.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
// router.post("logout",verifyJWT,logoutUser);
// router.get("getProfile",getProfile);

export default router;