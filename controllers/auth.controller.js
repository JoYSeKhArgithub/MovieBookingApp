import {
  errorResponseBody,
  successResponseBody,
} from "../utils/responseBody.js";
import userService from "../services/user.service.js";

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
    // const response = await userService.loginUser(req.body);
    const user = await userService.getUserByEmail(req.body.email);
    const isPasswordCorrect = await userService.checkPasswordCorrect(req.body.password);
    successResponseBody.data = {
      email: user.email,
      role: user.userRole,
      status: user.userStatus,
      username: user.userName,
      token: ''
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

export { signup,signin };
