import TheaterService from '../services/theater.service.js';
import { errorResponseBody, successResponseBody } from '../utils/responseBody.js';

const createTheater = async(req,res)=>{
    try {
        const theater = await TheaterService.createTheater(req.body);
        if(theater.error){
            errorResponseBody.error = theater.error;
            errorResponseBody.message = "Validation Error in creating theater";
            return res.status(theater.code).json(errorResponseBody);
        }
        successResponseBody.data = theater;
        successResponseBody.message = "Theater created successfully";
        return res.status(201).json(successResponseBody);
    } catch (error) {
        errorResponseBody.error = error;
        errorResponseBody.message = "Something went wrong while creating theater";
        return res.status(500).json(errorResponseBody);
    }
}

const getTheaterById = async(req,res)=>{
    try {
        const tId = req.params.theaterId;
        if(!tId){
            errorResponseBody.error = "Theater ID not found in request params";
            errorResponseBody.message = "Theater ID is required to fetch a theater";
            return res.status(400).json(errorResponseBody);
        }
        const theater = await TheaterService.getTheaterById(tId);
        if(theater.error){
            errorResponseBody.error = theater.error;
            errorResponseBody.message = "Theater not found";
            return res.status(theater.code).json(errorResponseBody);
        }

        successResponseBody.data = theater;
        successResponseBody.message = "Theater fetched successfully";
        return res.status(200).json(successResponseBody);

    } catch (error) {
        errorResponseBody.error = error;
        errorResponseBody.message =
          "Something went wrong while getting theater";
        return res.status(500).json(errorResponseBody);
    }
}

const deleteTheater = async(req,res)=>{
    try {
        const {theaterId} = req.params;
        if(!theaterId){
            errorResponseBody.error = "Theater ID not found in request params";
            errorResponseBody.message = "Theater ID is required to delete a theater";
            return res.status(400).json(errorResponseBody);
        }
        const deletedData = await TheaterService.deleteTheater(theaterId);
        if(deletedData.error){
            errorResponseBody.error = deletedData.error;
            errorResponseBody.message = "Theater data is not found";
            return res.status(deletedData.code).json(errorResponseBody);
        }
        successResponseBody.data = deletedData;
        successResponseBody.message = "Theater deleted successfully";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.error = error;
        errorResponseBody.message = "Something went wrong while deleting theater";
        return res.status(500).json(errorResponseBody);
    }
}

const getAllTheaters = async (req, res) => {
  try {
    const { city, pincode, name, limit, skip, movieId } = req.query;
    const data = {city,pincode,name,movieId,limit: limit? Number(limit): undefined,skip: skip?Number(skip): undefined}
    const theaters = await TheaterService.getAllTheaters(data);
    if(theaters.error){
      errorResponseBody.error = theaters.error;
      errorResponseBody.message = "Theaters not found";
      return res.status(theaters.code).json(errorResponseBody)
    }

    successResponseBody.data = theaters;
    successResponseBody.message = "Successfully fetched all the theaters";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.error = error;
    errorResponseBody.message = "Something went wrong during get all theaters";
    return res.status(500).json(errorResponseBody);
  }
};

const updatedTheater = async(req,res)=>{
  try {
    const { theaterId } = req.params;
    if (!theaterId) {
      errorResponseBody.error = "Theater Id not found in request params";
      errorResponseBody.message = "Theater ID is required to update a movie";
      return res.status(500).json(errorResponseBody);
    }
    const response = await TheaterService.updateTheater(theaterId, req.body);
    if (response.error) {
      errorResponseBody.error = response.error;
      errorResponseBody.message = "Cannot update theater";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movie updated successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.error = error;
    errorResponseBody.message = "Something went wrong during update theaters";
    return res.status(500).json(errorResponseBody);
  }
}

const updatedMoviesInTheaters = async(req,res)=>{
  try {
    const response = await TheaterService.updatedMoviesInTheaters(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    )
    if(response.error){
      errorResponseBody.error = response.error;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated movies in the theaters";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log("The error is ",error);
    errorResponseBody.error = error;
    return res.status(500).json(errorResponseBody);
  }
}

const getAllMoviesInATheater = async(req,res)=>{
  try {
    const response = await TheaterService.getAllMoviesInATheater(req.params.id);
    if(response.error){
      errorResponseBody.error = response.error;
      errorResponseBody.message = "Getting error in get movies in theater";
      return res.status(response.code).json(errorResponseBody)
    }
    successResponseBody.data =  response;
    successResponseBody.message = "Successfully get the movies in theater";
    return res.status(200).json(successResponseBody);
  } catch (error) {
        console.log("The error is ",error);
    errorResponseBody.error = error;
    return res.status(500).json(errorResponseBody);
  }
}

export {
  createTheater,
  getTheaterById,
  deleteTheater,
  getAllTheaters,
  updatedTheater,
  updatedMoviesInTheaters,
  getAllMoviesInATheater
};