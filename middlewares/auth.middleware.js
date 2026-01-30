import { badRequestResponse } from "../utils/middlewarebadRequestresponse.js"


const validateSignupRequest = (req,res,next)=>{
    if(!req.body.name){
        badRequestResponse.error = "Name field is required";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.userName){
        badRequestResponse.error = "User Name is required";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.email){
        badRequestResponse.error = "Email is required";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.password){
        badRequestResponse.error = "Password is required";
        return res.status(400).json(badRequestResponse);
    }
    if(req.body.password<10){
        badRequestResponse.error = "Password must be greatrer than 10 character";
        return res.status(400).json(badRequestResponse);
    }
    next();
}

export default {validateSignupRequest};