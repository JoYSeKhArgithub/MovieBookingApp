import userService from "../services/user.service.js";
import { errorResponseBody,successResponseBody } from "../utils/responseBody.js";


const userUpdate = async(req,res)=>{
  try {
    const response = await userService.updateUserRoleOrStatus(req.params.userId,req.body);
    if(response.error){
      errorResponseBody.error = response.error;
      errorResponseBody.message = "Error occuring on updating user";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated user";
    return res.status(200).json(successResponseBody);

  } catch (error) {
    console.log("The error is ",error);
    if(error.error){
      errorResponseBody.error = error.error;
      errorResponseBody.message = "Error occuring on update user";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    errorResponseBody.message = "Error occuring on update user";
    return res.status(500).json(errorResponseBody);
  }
}

export {userUpdate};