import { Router } from "express";
import { createPayment, getAllPayments, getPaymentDetailsById } from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import paymentMiddleware from "../middlewares/payment.middleware.js";
// import { getAllPayments } from "../controllers/booking.controller.js";

const router = Router();

router.route('/payments').post(authMiddleware.isAuthenticated,paymentMiddleware.verifypayment,createPayment);
router.route('/payments/:id').get(authMiddleware.isAuthenticated,getPaymentDetailsById);
router.route('/payments').get(authMiddleware.isAuthenticated,getAllPayments);


export default router;