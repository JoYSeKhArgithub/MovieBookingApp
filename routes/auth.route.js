import express from 'express';
import { resetPassword, signin, signup } from "../controllers/auth.controller.js";
import userMiddleWare from '../middlewares/auth.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';


const router = express.Router();

router.route("/auth/signup").post(userMiddleWare.validateSignupRequest,signup);
router.route("/auth/signin").post(userMiddleWare.validateSignInRequest,signin);
router.route("/auth/reset-password").patch(authMiddleware.isAuthenticated,resetPassword);

export default router;