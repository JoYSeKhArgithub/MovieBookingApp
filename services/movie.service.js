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

export default { getMovieById, createMovie, deleteMovie };