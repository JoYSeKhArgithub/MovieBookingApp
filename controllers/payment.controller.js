import User from "../models/user.model.js";
import Movie from "../models/movie.model.js";
import Theater from "../models/theater.model.js"
import paymentService from "../services/payment.service.js";
import { BOOKING_STATUS, STATUS } from "../utils/constant.js";
import { errorResponseBody, successResponseBody } from "../utils/responseBody.js"
import axios from "axios";

const createPayment = async(req,res)=>{
    try {
        const response = await paymentService.createPayment(req.body);
        if(response.status === BOOKING_STATUS.EXPIRED){
            errorResponseBody.error = "The payment took more than 5 than minutes to get proccessed";
            errorResponseBody.data = response;
            return res.status(STATUS.GONE).json(errorResponseBody);
        }
        if(response.status === BOOKING_STATUS.CANCELLED){
            errorResponseBody.error = "The payment failed due to for some reason";
            errorResponseBody.data = response;
            return res.status(STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
        }
        const user =await User.findById(response.userId);
        const movie = await Movie.findById(response.movieId);
        const theater = await Theater.findById(response.theaterId);
        successResponseBody.data = response;
        successResponseBody.message = "Booking completed successfully";
        console.log("the booking is ",response)
        axios.post(process.env.NOTI_SERVICE +'/notiService/api/v1/notification/',{
            subject: "Your booking is successfull",
            recepientEmails:[user.email],
            content: `You booking for ${movie.name} in ${theater.name} for ${response.noOfSeats}seats on ${response.timing} is successfull,Your booking id is ${response.id}`
        })
        return res.status(STATUS.ok).json(successResponseBody);
    } catch (error) {
        if(error.error){
            errorResponseBody.error = error.error;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error;
        errorResponseBody.message = "Internal server error";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const getPaymentDetailsById = async(req,res)=>{
    try {
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Payment details fetched successfully";
        return res.status(STATUS.ok).json(successResponseBody);
    } catch (error) {
        if(error.error){
            errorResponseBody.error = error.error;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error;
        errorResponseBody.message = "Internal server error";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const getAllPayments = async(req,res)=>{
    try {
        const response = await paymentService.getAllPayments(req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Payments fetched successfully";
        return res.status(STATUS.ok).json(successResponseBody);
    } catch (error) {

        errorResponseBody.error = error;
        errorResponseBody.message = "Internal server error to fetch payments";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

export {createPayment,getPaymentDetailsById,getAllPayments}