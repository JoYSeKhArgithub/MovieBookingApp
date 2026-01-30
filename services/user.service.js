import User from "../models/user.model.js";
import { USER_ROLE,USER_STATUS } from "../utils/constant.js";

const createUser = async(data)=>{
    try {
        let {name,userName,password,email,userRole,userStatus} = data;
        const existingUser = await User.findOne({
          $or: [{ userName }, { email }],
        });

        if(existingUser){
            return {
              error: "Email or username already exists",
              code: 409,
            };
        }

        if(!userRole || userRole === USER_ROLE.customer){
          if(userStatus && userStatus !== USER_STATUS.approved){
            throw {error: "We cannot set any other status for customer",code:400}
          }
        }

        if(userRole && userRole!==USER_ROLE.customer){
            data.userStatus = USER_STATUS.pending;
        }

        const response = await User.create(data);
        return response;
    } catch (error) {
        if (error.name === "ValidationError") {
        let err = {};
        Object.keys(error.errors).forEach((key) => {
          err[key] = error.errors[key].message;
        });
        console.log("Validation Error in creating theater: ", err);
        throw { error: err, code: 422 };
      }
        console.log("The error occure during createUser",error);
        throw error;
    }
} 

const getUserByEmail = async (email)=>{
  try {
    const response = await User.findOne({
      email: email
    })
    if(!response){
        throw {error: "No user found on given email",code: 404}
    }
    return response;
  } catch (error) {
    console.log("The error is ",error);
    throw error;
  }
}

const checkPasswordCorrect = async(password)=>{
  try {
    const isPasswordCorrect = await User.isPasswordCorrect(password);
    if(!isPasswordCorrect){
      throw {error: "Invalid password for given user email",code: 401}
    }
    return isPasswordCorrect;
  } catch (error) {
    console.log("Error is ",error);
    throw error;
  }
}



export default {
  createUser,
  getUserByEmail,
  checkPasswordCorrect
};