import mongoose,{Schema} from "mongoose";
import { BOOKING_STATUS } from "../utils/constant.js";

const bookingSchema = new Schema({
    theaterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true,
    },
    movieId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    timing:{
        type: String,
        required: true
    },
    noOfSeats:{
        type: Number,
        required: true
    },
    totalCost:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:{
            values:[BOOKING_STATUS.IN_PROCESS,BOOKING_STATUS.CANCELLED,BOOKING_STATUS.SUCCESSFULL],
            message: "Invalid booking status"
        },
        default: BOOKING_STATUS.IN_PROCESS
    }
},{timestamps: true})

const Booking = mongoose.model("Booking",bookingSchema);
export default Booking;