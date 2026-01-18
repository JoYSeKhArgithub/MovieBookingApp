import { badRequestResponse } from "../utils/middlewarebadRequestresponse.js";

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

export default { validateTheaterCreateRequest };
