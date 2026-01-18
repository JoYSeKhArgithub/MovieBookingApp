import Movie from "../models/movie.model.js";
import movieService from "../services/movie.service.js";
import { errorResponseBody, successResponseBody } from "../utils/responseBody.js";


const createMovie = async (req, res) => {
  try {
    const movie = await movieService.createMovie(req.body);
    if(movie.error){
        errorResponseBody.error = movie.error;
        errorResponseBody.message = "Validation Error in creating movie";
        return res.status(movie.code).json(errorResponseBody);
    }
    successResponseBody.data = movie;
    successResponseBody.message = "Movie created successfully";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    console.log("Error in creating movie: ", error);
    errorResponseBody.error = error;
    errorResponseBody.message = "Something went wrong while creating movie";
    return res.status(500).json(errorResponseBody);
  }
};

const deleteMovie = async (req,res)=>{
    try {
        const {movieId} = req.params;
        if(!movieId){
            errorResponseBody.error = "Movie ID not found in request params";
            errorResponseBody.message = "Movie ID is required to delete a movie";
            return res.status(400).json(errorResponseBody);
        }
        const response = await movieService.deleteMovie(movieId);
        if (response.error) {
          errorResponseBody.error = response.error;
          errorResponseBody.message =
            "Cannot delete movie as it does not exist";
          return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Movie deleted successfully";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        console.log("Error in deleting movie: ", error);
        errorResponseBody.error = error;
        errorResponseBody.message = "Something went wrong while deleting movie";
        return res.status(500).json(errorResponseBody);
    }
}

const getMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    if (!movieId) {
        errorResponseBody.error = "Movie ID not found in request params";
        errorResponseBody.message = "Movie ID is required to fetch a movie";
      return res.status(400).json(errorResponseBody);
    }
    const movie = await movieService.getMovieById(movieId);
    if(movie.error){
        errorResponseBody.error = movie.error;
        errorResponseBody.message = "Movie not found";
        return res.status(movie.code).json(errorResponseBody);
    }
    successResponseBody.data = movie;
    successResponseBody.message = "Movie fetched successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log("Error in fetching movie: ", error);
    errorResponseBody.error = error;
    errorResponseBody.message = "Something went wrong while fetching movie";

    return res.status(500).json(errorResponseBody);
  }
};

const updateMovie = async(req,res)=>{
try {
    const movieId = req.params.movieId;
    // const updatedBody = req.body;
    if(!movieId){
        errorResponseBody.error = "Movie Id not found in request params";
        errorResponseBody.message = "Movie ID is required to update a movie";
        return res.status(400).json(errorResponseBody);
    }
    const response = await movieService.updateMovie(movieId,req.body);
    if(response.error){
        errorResponseBody.error = response.error;
        errorResponseBody.message = "Cannot update movie";
        return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movie updated successfully";
    return res.status(200).json(successResponseBody);
} catch (error) {
    console.log("Error in fetching movie: ", error);
    errorResponseBody.error = error;
    errorResponseBody.message = "Something went wrong while update movie";

    return res.status(500).json(errorResponseBody);
}
}

const getMovies = async(req,res)=>{
    try {
        const data = await movieService.fetchMovie(req.query);
        if(data.error){
            errorResponseBody.error = data.error;
            errorResponseBody.message = "Cannot fetch movie";
            return res.status(data.code).json(errorResponseBody);
        }
        successResponseBody.data = data;
        successResponseBody.message = "Movie fetched successfully";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        console.log("Error in fetching movie: ", error);
        errorResponseBody.error = error;
        errorResponseBody.message = "Something went wrong while fetching movie";
        return res.status(500).json(errorResponseBody);
    }
}

export { createMovie, deleteMovie, getMovie, updateMovie, getMovies };
