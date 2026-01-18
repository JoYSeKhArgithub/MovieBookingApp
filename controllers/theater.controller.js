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

const getAllTheaters = async (_, res) => {
  try {
    const data = await TheaterService.getAllTheaters();
    successResponseBody.data = data;
    successResponseBody.message = "Successfully fetched all the theaters";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.error = error;
    errorResponseBody.message = "Something went wrong during get all theaters";
    return res.status(500).json(errorResponseBody);
  }
};

export { createTheater, getTheaterById, deleteTheater,getAllTheaters };