import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/me").get(verifyJWT, (req, res) => {
 
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

// Debug endpoint to inspect cookies sent by the client
// (debug route removed)

export default router;

