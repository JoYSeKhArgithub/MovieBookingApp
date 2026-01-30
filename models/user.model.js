import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import { USER_ROLE, USER_STATUS } from "../utils/constant.js";


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Plaese fill a valid email"],
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 10,
    },
    userRole: {
      type: String,
      required: true,
      enum: {
        values: [USER_ROLE.admin,USER_ROLE.client,USER_ROLE.customer],
        message: "Invalid user role",
      },
      default: USER_ROLE.customer,
    },
    userStatus: {
      type: String,
      required: true,
      enum: {
        values: [USER_STATUS.rejected,USER_STATUS.pending,USER_STATUS.approved],
        message: "Invalid user status",
      },
      default: USER_STATUS.approved,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
  console.log("The password is ", this.password);
});

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User',userSchema);
export default User;
