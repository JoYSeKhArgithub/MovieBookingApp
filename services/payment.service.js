import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import { BOOKING_STATUS, PAYMENT_STATUS, STATUS, USER_ROLE } from "../utils/constant.js";
import User from "../models/user.model.js";
import Show from "../models/show.model.js";


const createPayment = async(data)=>{
    try {
        const booking = await Booking.findById(data.bookingId);
        const show = await Show.findOne({
            movieId: booking.movieId,
            theaterId: booking.theaterId,
            timing: booking.timing
        })
        if(booking.status === BOOKING_STATUS.SUCCESSFULL){
            throw {
                error: "Payment is already done for this booking",
                code: STATUS.BAD_REQUEST
            }
        }
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
        show.noOfSeats = show.noOfSeats - booking.noOfSeats;
        await payment.save();
        await show.save();
        booking.status = BOOKING_STATUS.SUCCESSFULL;
        await booking.save();
        return booking;
    } catch (error) {
        throw error;
    }
}

const getPaymentById = async(id)=>{
    try {
        const payment = await Payment.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'bookingId',
                    foreignField: '_id',
                    as: 'booking'
                }
            },
            {
                $unwind: "$booking"
            }
        ])
        if(!payment){
            throw {
                error: "No payment is find at this id",
                code: STATUS.NOT_FOUND
            }
        }
        return payment;
    } catch (error) {
        throw error;
    }
}


// const getAllPayments = async(userId)=>{
//     try {
//         const user = await User.findById(userId);
//         let filter = {};
//         if(user.userRole !== USER_ROLE.admin){
//             filter.userId= userId;
//         }
//         const bookings = await Booking.find(filter,'_id');
//         const payment = await Payment.find({
//             bookingId: {$in: bookings}
//         })
//         return payment;
//     } catch (error) {
//         throw error;
//     }
// }
const getAllPayments = async (userId) => {
    try {
        const user = await User.findById(userId);
        let pipeline = [
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'bookingId',
                    foreignField: '_id',
                    as: 'booking'
                }
            },{
                $unwind: '$booking'
            }
        ]
        if(user.userRole !== USER_ROLE.admin){
            pipeline.push({
                $match: {
                    "booking.userId": new mongoose.Types.ObjectId(userId)
                }
            })
        }
        pipeline.push({
            $project: {
                amount: 1,
                status: 1,
                createdAt: 1,
                bookingId: 1,
                userId: "$booking.userId",
                movieId: "$booking.movieId",
                theaterId: "$booking.theaterId"
            }
        })
        const payments = await Payment.aggregate(pipeline);
        return payments;
    } catch (error) {
        throw error;
    }
};

export default {createPayment,getPaymentById,getAllPayments}