import Show from "../models/show.model.js";
import { STATUS } from "../utils/constant.js";


const createShow = async(data)=>{
    try {
        const response = await Show.create(data);
        return response
    } catch (error) {
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message
            })
            return {error: err,code: STATUS.UNPROCESSABLE_ENTITY}
        }
        throw new Error(error)
    }
}

const getShow = async(data)=>{
try {
        const filter = {};
        if(data.theaterId){
            filter.theaterId = data.theaterId
        }
        if(data.movieId){
            filter.movieId = data.movieId
        }
        const show = await Show.find(filter)
        if(!show){
            throw{
                error: "No show found",
                code: STATUS.UNPROCESSABLE_ENTITY
            }
        }
        return show
} catch (error) {
    throw error;
}
}

const deleteShow = async(id)=>{
    try {
        const response = await Show.findByIdAndDelete(id);
        if(!response){
            throw {
                error: "No id of the show find",
                code: STATUS.NOT_FOUND
            }
        }
    } catch (error) {
        throw error;
    }
}

const updateShow = async(id,data)=>{
    try {
        const updatedData = await Show.findByIdAndUpdate(id,data,{
            new: true,
            runValidators: true
        })
        if(!updatedData){
            throw {
                error: "No show found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return updatedData;
    } catch (error) {
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message
            })
            throw {error: err,code: STATUS.UNPROCESSABLE_ENTITY}
        }
        throw error;
    }
}


export default {createShow,getShow,deleteShow,updateShow}