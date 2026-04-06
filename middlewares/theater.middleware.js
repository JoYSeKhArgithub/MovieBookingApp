import { badRequestResponse } from "../utils/middlewarebadRequestresponse.js";
import { errorResponseBody } from "../utils/responseBody.js";

const validateTheaterCreateRequest = async (req, res, next) => {
  if (!req.body.name) {
    badRequestResponse.error = "Theater name is required";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.city) {
    badRequestResponse.error = "Theater city is required";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.pincode && typeof req.body.pincode !== "number") {
    badRequestResponse.error = "Theater pincode is required";
    return res.status(400).json(badRequestResponse);
  }
  next();
};

const validateUpdatedMovies = async(req,res,next)=>{
  if (req.body.insert === undefined) {
    errorResponseBody.error =
      "The insert parameter is missing in the request";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.movieIds) {
    errorResponseBody.error =
      "The movieIds parameter is missing in the request";
    return res.status(400).json(errorResponseBody);
  }
  if (!Array.isArray(req.body.movieIds)) {
    // movieIds instaceof Array
    errorResponseBody.error = "The movieIds mustbe in array formate";
    return res.status(400).json(errorResponseBody);
  }
  if(req.body.movieIds.length === 0){
    errorResponseBody.error = "No movies present in the array provided";
    return res.status(400).json(errorResponseBody);
  }
  next();
}

export default { validateTheaterCreateRequest,validateUpdatedMovies };
