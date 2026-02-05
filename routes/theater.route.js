import express from 'express';
import { checkMovie, createTheater, deleteTheater, getAllMoviesInATheater, getAllTheaters, getTheaterById, updatedMoviesInTheaters } from "../controllers/theater.controller.js";
import validateTheaterMiddleware from '../middlewares/theater.middleware.js';
import { updateMovie } from '../controllers/movie.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
router
  .route("/theater")
  .post(validateTheaterMiddleware.validateTheaterCreateRequest, createTheater);

router.route("/theater/:theaterId").get(getTheaterById);

router.route("/theater/:theaterId").delete(authMiddleware.isAuthenticated,deleteTheater);
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

  router.route('/theater/:theaterId/movie/:movieId').get(checkMovie)

export default router;