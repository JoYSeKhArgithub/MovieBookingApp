import User from "../models/user.model.js";
import userService from "../services/user.service.js";
import { USER_ROLE } from "../utils/constant.js";
import { badRequestResponse } from "../utils/middlewarebadRequestresponse.js"
import jwt from 'jsonwebtoken';

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

const validateSignInRequest = (req,res,next)=>{
    if(!req.body.email){
        badRequestResponse.error = "Email is required";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.password){
        badRequestResponse.error = "Password is required";
        return res.status(400).json(badRequestResponse);
    }
    next();
}

const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.headers['x-access-token'] || req.headers['authorization'];
        if(!token){
            badRequestResponse.error = "No token is Provided";
            return res.status(403).json(badRequestResponse);
        }
        const response = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!response){
            badRequestResponse.error = "Invalid Token";
            return res.status(401).json(badRequestResponse);
        }
        const user = await userService.getUserById(response.id);
        req.user = user.id;
        next();
    } catch (error) {
        console.log("The error is ",error);
        if(error.code === 404){
            badRequestResponse.error = "No user found for given token";
            return res.status(error.code).json(badRequestResponse);
        }
        badRequestResponse.error = error
        return res.status(500).json(badRequestResponse);
    }
}

const validateResetPasswordrequest = (req,res,next)=>{
    if(!req.body.oldPassword){
        badRequestResponse.error = "Old password is required";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.newPassword){
        badRequestResponse.error = "New password is required";
        return res.status(400).json(badRequestResponse);
    }
    next();
}

const isAdmin = async(req,res,next)=>{
    try {
        console.log("The user id from token is ",req);
        const user = await User.findById(req.user);
        console.log("user role is ",user);
        if(user.userRole !== USER_ROLE.admin){
            badRequestResponse.error = "Access forbidden: Admins only";
            return res.status(401).json(badRequestResponse);
        }
        next();
    } catch (error) {
        console.log("The error is ",error,USER_ROLE);

        badRequestResponse.error = error;
        return res.status(500).json(badRequestResponse);
    }


    
}

const isClient = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user);
        if(user.userRole !== USER_ROLE.client){
            badRequestResponse.error = "Access forbidden: Client only";
            return res.status(401).json(badRequestResponse);
        }
        next();
    } catch (error) {
        badRequestResponse.error = error;
        return res.status(500).json(badRequestResponse);
    }
}

const isAdminOrClient = async (req,res,next)=>{
    try {
        const user = await User.findById(req.user);
        if(user.userRole !== USER_ROLE.admin && user.userRole !== USER_ROLE.client){
            badRequestResponse.error = "Access forbidden: Admins or Client only";
            return res.status(401).json(badRequestResponse);
        }
        next();
    } catch (error) {
        badRequestResponse.error = error;
        return  res.status(500).json(badRequestResponse);
    }
}

export default {validateSignupRequest,validateSignInRequest,isAuthenticated,validateResetPasswordrequest,isAdmin,isClient,isAdminOrClient};