import Movie from "../models/movie.model.js";
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

const getAllTheaters = async(data)=>{
try {
  let query = {};
  let pagination = {};
  if (data && data.city) {
    query.city = data.city;
  }
  if (data && data.pincode) {
    query.pincode = data.pincode;
  }
  if (data && data.name) {
    query.name = data.name;
  }
  if(data && data.movieId){
    let movie = await Movie.findById(data.movieId);
    query.movies = { $all: movie };
  }
  if (data && data.limit) {
    pagination.limit = data.limit;
  }
  if (data && data.skip) {
    let perPage = data.limit ? data.limit : 3;
    pagination.skip = data.skip * perPage;
  }
  const theaters = await Theater.find(query, {}, pagination);
  //   console.log("The theaters is ", !theaters);
  if (theaters.length === 0) {
    return {
      error: "No Theaters found",
      code: 404,
    };
  }
  return theaters;
} catch (error) {
    // console.log("The error is ------>", error);
    throw error;
}
}

const updateTheater = async(id,data)=>{
    try {
        const updatedTheater = await Theater.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        });
        if(!updatedTheater){
            return {
                error: "Thaeter not found",
                code: 404,
            }
        }
        return updateTheater;
    } catch (error) {
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log("Validation Error in creating theater: ", err);
            return { error: err, code: 422 };
        }
        throw new Error(error)
    }
}

const updatedMoviesInTheaters = async(theaterId,movieIds,insert)=>{
try {
    let theater;
        if(insert){
           theater = await Theater.findByIdAndUpdate(
             {
               _id: theaterId,
             },
             { $addToSet: { movies: { $each: movieIds } } },
             { new: true },
           );
        }
        else{
           theater = await Theater.findByIdAndUpdate(
             {
               _id: theaterId,
             },
             { $pull: { movies: { $in: movieIds } } },
             { new: true },
           );
        }

        return theater.populate("movies");
} catch (error) {
    if(error.name === 'CastError'){
        return{
            code: 404,
            error: 'No Theater found for given id'
        }
    }
    console.log("The error we got ",error);
    throw error;
    
}
}

const getAllMoviesInATheater = async(id)=>{
    try {
        const theater = await Theater.findById(id, {
          name: 1,
          movies: 1,
          address: 1,
        }).populate("movies");
        if(!theater){
            return {
              error: "No theater found at this id",
              code: 404,
            };
        }
        return theater;
    } catch (error) {
        console.log("The error is",error);
        throw error;
    }
}

export default {
  createTheater,
  getTheaterById,
  deleteTheater,
  getAllTheaters,
  updateTheater,
  updatedMoviesInTheaters,
  getAllMoviesInATheater,
};