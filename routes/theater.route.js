import express from 'express';
import { createTheater, deleteTheater, getAllTheaters, getTheaterById } from "../controllers/theater.controller.js";
import validateTheaterMiddleware from '../middlewares/theater.middleware.js';

const router = express.Router();
router
  .route("/theater")
  .post(validateTheaterMiddleware.validateTheaterCreateRequest, createTheater);

router.route("/theater/:theaterId").get(getTheaterById);

router.route("/theater/:theaterId").delete(deleteTheater);
router.route("/theaters").get(getAllTheaters);

export default router;