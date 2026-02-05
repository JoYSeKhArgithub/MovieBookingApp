import {
  errorResponseBody,
  successResponseBody,
} from "../utils/responseBody.js";
import userService from "../services/user.service.js";
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    if(response.error){
        errorResponseBody.error = response.error;
        errorResponseBody.message = "Something went wrong";
        return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully register a user";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    if(error.error){
      errorResponseBody.error = error.error;
      errorResponseBody.message = "Error occuring on signup";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    errorResponseBody.message = "Error occuring on signup";
    return res.status(500).json(errorResponseBody);
  }
};

const signin = async(req,res)=>{
  try {
    const user = await userService.getUserByEmailandCheckPassword(req.body.email,req.body.password);
    const token = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
    successResponseBody.data = {
      email: user.email,
      role: user.userRole,
      status: user.userStatus,
      username: user.userName,
      token: token
    };
    successResponseBody.message = 'Successfully logged in';
    return res.status(200).json(successResponseBody);
  } catch (error) {
      if(error.error){
        errorResponseBody.error = error.error;
        errorResponseBody.message = "Error occuring on signIn";
        return res.status(error.code).json(errorResponseBody)
      }
      errorResponseBody.error = error;
      errorResponseBody.message = "Error occuring on signIn";
      return res.status(500).json(errorResponseBody);
  }
}


const resetPassword = async(req,res)=>{
  try {
    console.log("The user is ",req);
    const user = await userService.getUserById(req.user);
    const isOldPasswordCorrect = await user.isPasswordCorrect(req.body.oldPassword);
    if(!isOldPasswordCorrect){
      errorResponseBody.error = "Old password is incorrect";
      errorResponseBody.message = "Error occuring on reset password";
      return res.status(400).json(errorResponseBody);
    }
    user.password = req.body.newPassword;
    await user.save();
    successResponseBody.message = "Password reset successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log("The error is ",error);
    if(error.error){
      errorResponseBody.error = error.error;
      errorResponseBody.message = "Error occuring on reset password";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    errorResponseBody.message = "Error occuring on reset password";
    return res.status(500).json(errorResponseBody);
  }
}



export { signup,signin,resetPassword };
