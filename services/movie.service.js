import Movie from "../models/movie.model.js";

const createMovie = async(data)=>{
    try {
        const movie = await Movie.create(data);
        return movie;
    } catch (error) {
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            })
            console.log("Validation Error in creating movie: ", err);
            return { error: err, code: 422 };
        }
        throw new Error(error);
    }
}

const deleteMovie = async(data)=>{
    const deleteData = await Movie.findByIdAndDelete(data);
    if(!deleteData){
        return {
            error : 'Movie not found',
            code: 404,
        }
    }
    return deleteData;
}



const getMovieById = async(movieId) => {
    const movie =  await Movie.findById(movieId);
    if(!movie){
        return {
          error: "Movie not found",
          code: 404,
        };
    }
    return movie;
}

const updateMovie = async(id,data)=>{
    try {
        const movie = await Movie.findByIdAndUpdate(id,data,{new: true,runValidators: true});
        if(!movie){
            return {
                error: "Movie not found",
                code: 404,
            }
        }
        return movie;
    } catch (error) {
        let err = {};
        if(error.name === 'ValidationError'){
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            })
        }
        console.log("Validation Error in updating movie: ", err);
        return { error: err, code: 422 };
    }
}

const fetchMovie = async(filter)=>{
  let query = {};
    if (filter.name){
        query.name = { $regex: filter.name, $options: "i" };
    }
  

  const movie = await Movie.find(query);
  if (!movie) {
    return {
      error: "Movie not found",
      code: 404,
    };
  }
  return movie;
}

export default { getMovieById, createMovie, deleteMovie,updateMovie,fetchMovie };