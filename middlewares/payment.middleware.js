import mongoose from "mongoose";
import { STATUS } from "../utils/constant.js";
import { errorResponseBody } from "../utils/responseBody.js"

let ObjectId = mongoose.Types.ObjectId

const verifypayment = async(req,res,next)=>{
    if(!req.body.bookingId){
        errorResponseBody.error = "No booking id recived";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }
    if(!ObjectId.isValid(req.body.bookingId)){
        errorResponseBody.error = "Invalide booking id recived";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }
    if(!req.body.amount){
        errorResponseBody.error = "No amount recived";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }
    next();
}

export default {verifypayment}