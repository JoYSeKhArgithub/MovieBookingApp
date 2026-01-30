import User from "../models/user.model.js";

const createUser = async(data)=>{
    try {
        const {name,userName,password,email} = data;
        if(
            [name,userName,password,email].some((field)=> field?.trim()==="")
        ){
            return {
                error: "All fields are required",
                code: 400
            }
        }
        
        const existingUser = await User.findOne({
          $or: [{ userName }, { email }],
        });

        if(existingUser){
            return {
              error: "Email or username already exists",
              code: 409,
            };
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
        return { error: err, code: 422 };
      }
        console.log("The error occure during createUser",error);
        throw error;
    }
}  

export default {
  createUser,
};