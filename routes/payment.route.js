import { Router } from "express";
import { createPayment } from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import paymentMiddleware from "../middlewares/payment.middleware.js";

const router = Router();

router.route('/payments').post(authMiddleware.isAuthenticated,paymentMiddleware.verifypayment,createPayment)


export default router;