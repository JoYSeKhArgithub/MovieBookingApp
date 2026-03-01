import { Router } from "express";
import { createShow, deleteShow, getShow, updateShow } from "../controllers/show.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import showMiddleware from "../middlewares/show.middleware.js";

const router = Router();

router.route("/shows").post(
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    showMiddleware.validateCreateShowRequest,
    createShow
)

router.route("/shows").get(
    getShow
)

router.route("/shows/:id").delete(
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    deleteShow
)

router.route("/shows/:id").patch(
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    showMiddleware.validateUpdateShowRequest,
    updateShow
)

export default router;