import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import { BOOKING_STATUS, PAYMENT_STATUS, STATUS } from "../utils/constant.js";

const createPayment = async(data)=>{
    try {
        const booking = await Booking.findById(data.bookingId);
        if(!booking){
            throw {
                error: "No Booking is find at this id",
                code: STATUS.NOT_FOUND
            }
        }
        let bookingTime = booking.createdAt;
        let currentTime = Date.now();

        let minitues = Math.floor(((currentTime-bookingTime)/1000)/60);
        if(minitues>5){
            booking.status = BOOKING_STATUS.EXPIRED;
            await booking.save();
            return booking;
        }

        const payment = await Payment.create({
            bookingId: data.bookingId,
            amount: data.amount
        })

        if(payment.amount !== booking.totalCost){
            payment.status = PAYMENT_STATUS.FAILED;
        }

        if(!payment || payment.status === PAYMENT_STATUS.FAILED){
            booking.status = BOOKING_STATUS.CANCELLED;
            await booking.save();
            await payment.save();
            return booking;
        }
        payment.status = PAYMENT_STATUS.SUCCESS;
        await payment.save();
        booking.status = BOOKING_STATUS.SUCCESSFULL;
        await booking.save();
        return booking;
    } catch (error) {
        throw error;
    }
}

export default {createPayment}