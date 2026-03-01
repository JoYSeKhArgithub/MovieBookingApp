import mongoose from "mongoose";
import { STATUS } from "../utils/constant.js";
import { errorResponseBody } from "../utils/responseBody.js"
import theaterService from "../services/theater.service.js";

let ObjectId = mongoose.Types.ObjectId

const validateCreateShowRequest = async (req,res,next)=>{
    if(!req.body.theaterId){
        errorResponseBody.error = "No Theater Provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.theaterId)){
        errorResponseBody.error = "Invalide theater Id in the request body";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    const theaterData = await theaterService.getTheaterById(req.body.theaterId);
    if(!theaterData){
        errorResponseBody.error = "No theater is present ath this id";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.movieId){
        errorResponseBody.error = "No Movie Provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.error = "Invalid movieId in request body";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(theaterData.movies.indexOf(req.body.movieId)===-1){
        errorResponseBody.error = "Movie is not present in this theater";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.timing){
        errorResponseBody.error = "Timing is required for create show";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.price){
        errorResponseBody.error = "Price required for create show";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.noOfSeats){
        errorResponseBody.error = "No of Seats required for created show";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    next()
}

export default {validateCreateShowRequest}