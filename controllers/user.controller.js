import userService from "../services/user.service.js";
import { STATUS } from "../utils/constant.js";
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
    return res.status(STATUS.CREATED).json(successResponseBody);

  } catch (error) {
    console.log("The error is ",error);
    if(error.error){
      errorResponseBody.error = error.error;
      errorResponseBody.message = "Error occuring on update user";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    errorResponseBody.message = "Error occuring on update user";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

export {userUpdate};