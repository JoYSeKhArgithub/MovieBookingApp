import mongoose,{Schema} from "mongoose";


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
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Plaese fill a valid email"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 10,
    },
    userRole: {
      type: String,
      required: true,
      default: "CUSTOMER",
    },
    userStatus: {
      type: String,
      required: true,
      default: "APPROVED",
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User',userSchema);
export default User;
