import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import Show from "../models/show.model.js";
import User from "../models/user.model.js";
import { STATUS, USER_ROLE } from "../utils/constant.js";

const createBooking = async(data)=>{
    try {
        const show = await Show.findOne({
            movieId: data.movieId,
            theaterId: data.theaterId,
            timing: data.timing
        })
        data.totalCost = show.price * data.noOfSeats;
        if(show.noOfSeats < data.noOfSeats){
            throw {
                error: "Seats are not available for the given number of seats",
                code: STATUS.BAD_REQUEST
            }
        }
        const result = await Booking.create(data);
        // show.noOfSeats = show.noOfSeats - data.noOfSeats;
        await show.save();
        return result;
    } catch (error) {
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            })
            throw {error: err, code: STATUS.UNPROCESSABLE_ENTITY};
        }
        throw error;
    }
}

const update = async(bookingId,data)=>{
    try {
        const updatedValue = await Booking.findByIdAndUpdate(bookingId,data,{new: true, runValidators: true});
        if(!updatedValue){
            throw {
                error: "Booking not found with the given ID",
                code: STATUS.NOT_FOUND
            }
        }
        return updatedValue;
    } catch (error) {
        if (error.name === "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });
            return {error: err, code: STATUS.UNPROCESSABLE_ENTITY};
        }
        throw error;
    }
}

const getBookings = async(data)=>{
    try {
       const result =  await Booking.find({
            userId: data.userId
        })
        return result;
    } catch (error) {
        throw error;
    }
}


const getBookingById = async(id)=>{
    try {
        const bookingResult = await Booking.findById(id);
        if(!bookingResult){
            throw {
                error: "Booking not found with the given ID",
                code: STATUS.NOT_FOUND
            }
        }
        return bookingResult;
    } catch (error) {
        throw error;
    }
}



export default {createBooking,update,getBookings,getBookingById};