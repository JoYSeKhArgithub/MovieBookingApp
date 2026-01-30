import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";


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

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
  console.log("The password is ", this.password);
});

userSchema.methods.isPasswordCorrect = async function(password){
  await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User',userSchema);
export default User;
