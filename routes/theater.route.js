import express from 'express';
import { createTheater, deleteTheater, getAllMoviesInATheater, getAllTheaters, getTheaterById, updatedMoviesInTheaters } from "../controllers/theater.controller.js";
import validateTheaterMiddleware from '../middlewares/theater.middleware.js';
import { updateMovie } from '../controllers/movie.controller.js';

const router = express.Router();
router
  .route("/theater")
  .post(validateTheaterMiddleware.validateTheaterCreateRequest, createTheater);

router.route("/theater/:theaterId").get(getTheaterById);

router.route("/theater/:theaterId").delete(deleteTheater);
router.route("/theaters").get(getAllTheaters);
router.route('/theater/:theaterId').put(updateMovie);
router.route('/theater/:theaterId').patch(updateMovie);
router
  .route("/theater/:id/movies")
  .patch(
    validateTheaterMiddleware.validateUpdatedMovies,
    updatedMoviesInTheaters,
  );

  router.route('/theater/:id/movies').get(getAllMoviesInATheater)


export default router;