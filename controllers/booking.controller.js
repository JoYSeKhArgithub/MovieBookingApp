import { STATUS } from "../utils/constant.js";
import { errorResponseBody, successResponseBody } from "../utils/responseBody.js";
import bookingService from "../services/booking.service.js";

const createBooking = async(req,res)=>{
    try {
        const userId = req.user;
        const bookingData = await bookingService.createBooking({...req.body,userId: userId});
        successResponseBody.data = bookingData;
        successResponseBody.message = "Booking Created Successfully";
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch (error) {
        if(error.error){
            errorResponseBody.error = error.error;
            errorResponseBody.message = "Validation Error in creating booking";
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.error = error;
        errorResponseBody.message = "Internal Server Error To Create Booking";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(badRequestResponse);
    }
}

const updatebooking = async(req,res)=>{
    try {
        const result = await bookingService.update(req.params.bookingId, req.body);
        console.log("Result in updating booking: ", result);
        if(result.error){
            errorResponseBody.error = result.error;
            errorResponseBody.message = "Error in updating booking";
            return res.status(result.code).json(errorResponseBody);
        }
        successResponseBody.data = result;
        successResponseBody.message = "Booking updated successfully";
        return res.status(STATUS.ok).json(successResponseBody);

    } catch (error) {
        if(error.error){
            errorResponseBody.error = error.error;
            errorResponseBody.message = " Error in updating booking";
            return res.status(error.code).json(errorResponseBody);
        }
        console.log("The error in updating booking is ",error);
        errorResponseBody.error = error;
        errorResponseBody.message = "Internal Server Error To Update Booking";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getBookings = async (req,res)=>{
    try {
        const response = await bookingService.getBookings({userId: req.user});
        successResponseBody.data = response;
        successResponseBody.message = "Bookings fetched successfully";
        return res.status(STATUS.ok).json(successResponseBody);

    } catch (error) {
        errorResponseBody.error = error;
        errorResponseBody.message = "Internal server error to fetch bookings";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllBookings = async (req,res)=>{
    try {
        const response = await bookingService.getBookings();
        successResponseBody.data = response;
        successResponseBody.message = "Bookings fetched successfully";
        return res.status(STATUS.ok).json(successResponseBody);

    } catch (error) {
        errorResponseBody.error = error;
        errorResponseBody.message = "Internal server error to fetch bookings";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getBookingById = async(req,res)=>{
    try {
        const result = await bookingService.getBookingById(req.params.bookingId);
        successResponseBody.data = result;
        successResponseBody.message = "Booking fetched successfully";
        return res.status(STATUS.ok).json(successResponseBody);
    } catch (error) {
        if(error.error){
            errorResponseBody.error = error.error;
            errorResponseBody.message = "Error in fetching booking by ID";
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.error = error;
        errorResponseBody.message = "Internal server error to fetch booking by ID";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

export {createBooking,updatebooking,getBookings,getAllBookings,getBookingById};