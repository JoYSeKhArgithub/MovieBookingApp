import mongoose,{Schema} from "mongoose";
import { PAYMENT_STATUS } from "../utils/constant.js";

const paymentSchema = new Schema({
    bookingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: [PAYMENT_STATUS.PENDING,PAYMENT_STATUS.SUCCESS,PAYMENT_STATUS.FAILED],
            message: "INVALID PAYMENT STATUS"
        },
        default: PAYMENT_STATUS.PENDING
    }

},{timestamps: true})

const Payment = mongoose.model("Payment",paymentSchema);

export default Payment;