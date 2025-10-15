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
router.get('/debug-cookies', (req, res) => {
  console.log('DEBUG: incoming cookies ->', req.cookies);
  return res.status(200).json({ cookies: req.cookies || {} });
});

export default router;

