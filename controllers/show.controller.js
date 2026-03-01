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

const getShow = async(req,res)=>{
    try {
       const data =  await showService.getShow(req.query);
       successResponseBody.data = data;
       successResponseBody.message = "Successfully get the show";
       return res.status(STATUS.ok).json(successResponseBody);
    } catch (error) {
        if(error.error){
            errorResponseBody.errorResponseBody= error.error;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error=error;
        errorResponseBody.message = "Internal server error on get the show";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const deleteShow = async(req,res)=>{
    try {
        const response = await showService.deleteShow(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Show is deleted successfully";
        return res.status(STATUS.ok).json(successResponseBody);
    } catch (error) {
        if(error.error){
            errorResponseBody.error = error;
            return res.status(error.code).json(errorResponseBody)
        }
        console.log('The error is ',error)
        errorResponseBody.error = error;
        errorResponseBody.message = "Internal server error to delete the show";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const updateShow = async (req,res)=>{
    try {
        const updatedResponse = await showService.updateShow(req.params.id,req.body);
        successResponseBody.data = updatedResponse;
        successResponseBody.message = "Update the show successfully";
        return res.status(STATUS.ok).json(successResponseBody);
    } catch (error) {
        if(error.error){
            errorResponseBody.error = error.error;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error;
        errorResponseBody.message = "Internal server error";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

export  {createShow,getShow,deleteShow,updateShow}