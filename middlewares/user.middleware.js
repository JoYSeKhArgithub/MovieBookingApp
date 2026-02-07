import { badRequestResponse } from "../utils/middlewarebadRequestresponse.js";

const validateUpdateUserRequest = (req,res,next)=>{
    if(!req.body.userRole || !req.body.userStatus){
        badRequestResponse.error = "please provide  user role or user status to update";
        return res.status(400).json(badRequestResponse);
    }
    next();
}



export default {validateUpdateUserRequest};