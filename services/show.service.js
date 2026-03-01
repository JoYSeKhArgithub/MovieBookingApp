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


export default {createShow}