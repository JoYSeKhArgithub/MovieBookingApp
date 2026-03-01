import { STATUS } from "../utils/constant.js";
import { errorResponseBody, successResponseBody } from "../utils/responseBody.js"
import showService from "../services/show.service.js";

const createShow = async(req,res)=>{
    try {
        const showData = await showService.createShow(req.body);
        successResponseBody.data = showData;
        successResponseBody.message = "Successfully Craeate show data";
        return res.status(STATUS.CREATED).json(successResponseBody)
    } catch (error) {
        if(error.error){
            errorResponseBody= error.error;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error;
        errorResponseBody.message = "Something went wrong to create show";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

export  {createShow}