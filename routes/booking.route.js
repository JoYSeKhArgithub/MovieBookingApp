import { Router } from "express";
import { createBooking, getAllBookings, getBookingById, getBookings, updatebooking } from "../controllers/booking.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import BookingMiddleWare from "../middlewares/booking.middleware.js";
const router = Router();

router.route("/booking").post(authMiddleware.isAuthenticated,BookingMiddleWare.bookingMiddleWare,createBooking);
router.route("/booking/:bookingId").patch(authMiddleware.isAuthenticated,BookingMiddleWare.canChangeStatus,updatebooking);

router.route("/bookings").get(authMiddleware.isAuthenticated,getBookings);
router.route("/bookings/all").get(authMiddleware.isAuthenticated,authMiddleware.isAdmin,getAllBookings);
router.route("/booking/:bookingId").get(authMiddleware.isAuthenticated,getBookingById);

export default router;