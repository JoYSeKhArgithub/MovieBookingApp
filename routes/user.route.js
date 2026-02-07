import express from "express";
import { userUpdate } from "../controllers/user.controller.js";
import userMiddleware from "../middlewares/user.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/user/:userId").patch(
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    userMiddleware.validateUpdateUserRequest,
    userUpdate
)

export default router;