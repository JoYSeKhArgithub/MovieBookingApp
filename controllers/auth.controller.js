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
    errorResponseBody.error = error;
    errorResponseBody.message = "Error occuring on signup";
    return res.status(500).json(errorResponseBody);
  }
};

export { signup };
