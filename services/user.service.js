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

const getUserByEmailandCheckPassword = async (email,password)=>{
  try {
    const response = await User.findOne({
      email: email
    })
    if(!response){
        throw {error: "No user found on given email",code: 404}
    }
    const isPasswordCorrectCheck = await response.isPasswordCorrect(password)
    if(!isPasswordCorrectCheck){
      throw {error: "Invalid password",code: 401}
    }
    return response;
  } catch (error) {
    console.log("The error is ",error);
    throw error;
  }
}

const getUserById = async (userId)=>{
  try {
    const user = await User.findById(userId);
    if(!user){
      throw {error: "No user found",code:404}
    }
    return user;

  } catch (error) {
    console.log("Error occure while fetching user by id",error);
    throw error;
  }
}

const updateUserRoleOrStatus = async(userId,data)=>{
  try {
    let updateQuery = {};
    if(data.userRole){
      updateQuery.userRole = data.userRole;
    }
    if(data.userStatus){
        updateQuery.userStatus = data.userStatus
    }
    let response = await User.findByIdAndUpdate({
      _id: userId
    }, updateQuery,{new:true})

    if(!response){
      throw {error: "No user found for given id",code:404}
     }
    return response;
  } catch (error) {
    throw error;
  }
}

export default {
  createUser,
  getUserByEmailandCheckPassword,
  getUserById,
  updateUserRoleOrStatus
};