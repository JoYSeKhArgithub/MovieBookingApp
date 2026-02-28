import { STATUS, USER_ROLE,BOOKING_STATUS } from "../utils/constant.js";
import mongoose from "mongoose"
import { errorResponseBody } from "../utils/responseBody.js";
import theterService from "../services/theater.service.js";
import userService from "../services/user.service.js";

let ObjectId = mongoose.Types.ObjectId;

const bookingMiddleWare = async(req,res,next)=>{
    if(!req.body.theaterId){
        errorResponseBody.error = "theaterId is required in request body";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.theaterId)){
        errorResponseBody.error = "Invalide theater Id in the request body";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    const theaterData = await theterService.getTheaterById(req.body.theaterId);
    if(!theaterData){
        errorResponseBody.error = "Theater not found for the given theaterId";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    if(!req.body.movieId){
        errorResponseBody.error = "movieId is required in request body";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.error = "Invalid movieId in request body";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(theaterData.movies.indexOf(req.body.movieId)===-1){
        errorResponseBody.error = "Theater does not have the movie for the given movieId";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    if(!req.body.timing){
        errorResponseBody.error = "bookingTime is required in request body";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.noOfSeats){
        errorResponseBody.error = "seats is required ";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.totalCost){
        errorResponseBody.error = "totalCost is required in request body";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}


const canChangeStatus = async(req,res,next)=>{
    const user = await userService.getUserById(req.user);
    if(user.userRole === USER_ROLE.customer && req.body.status && req.body.status !== BOOKING_STATUS.CANCELLED){
        errorResponseBody.error = "Customer can only change booking status to cancelled";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody);
    }
    next();
}



export default {bookingMiddleWare, canChangeStatus};