import Theater from "../models/theater.model.js";

const createTheater = async(data)=>{
    try {
        const theater = await Theater.create(data);
        return theater;
    } catch (error) {
      if (error.name === "ValidationError") {
        let err = {};
        Object.keys(error.errors).forEach((key) => {
          err[key] = error.errors[key].message;
        });
        console.log("Validation Error in creating theater: ", err);
        return { error: err, code: 422 };
      }
        throw new Error(error);
    }
}



const getTheaterById = async(theaterId)=>{
    const theater = await Theater.findById(theaterId);
    if(!theater){
        return {
          error: "Theater not found",
          code: 404,
        };
    }
    return theater;
}


const deleteTheater = async(theaterId)=>{
    const deleteData = await Theater.findByIdAndDelete(theaterId);
    if(!deleteData){
        return {
            error : 'Theater not found',
            code: 404,
        }
    }
    return deleteData;
}

const getAllTheaters = async()=>{
    const theaters = await Theater.find({});
    return theaters;
}

export default { createTheater, getTheaterById, deleteTheater,getAllTheaters };