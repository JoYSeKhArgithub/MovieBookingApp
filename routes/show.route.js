import { Router } from "express";
import { createShow } from "../controllers/show.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import showMiddleware from "../middlewares/show.middleware.js";

const router = Router();

router.route("/shows").post(
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    showMiddleware.validateCreateShowRequest,
    createShow
)

export default router;