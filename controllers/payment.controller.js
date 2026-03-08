import paymentService from "../services/payment.service.js";
import { BOOKING_STATUS, STATUS } from "../utils/constant.js";
import { errorResponseBody, successResponseBody } from "../utils/responseBody.js"

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
        successResponseBody.data = response;
        successResponseBody.message = "Booking completed successfully";
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

export {createPayment}