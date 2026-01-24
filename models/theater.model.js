import mongoose,{Schema} from "mongoose";

const theaterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    description: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
   movies:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Movie'
   } 
  },
  { timestamps: true }
);

const Theater = mongoose.model("Theater",theaterSchema);
export default Theater;