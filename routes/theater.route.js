import express from 'express';
import { checkMovie, createTheater, deleteTheater, getAllMoviesInATheater, getAllTheaters, getTheaterById, updatedMoviesInTheaters } from "../controllers/theater.controller.js";
import validateTheaterMiddleware from '../middlewares/theater.middleware.js';
import { updateMovie } from '../controllers/movie.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
router
  .route("/theater")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    validateTheaterMiddleware.validateTheaterCreateRequest
    , createTheater
  );

router.route("/theater/:theaterId").get(getTheaterById);

router.route("/theater/:theaterId").delete(
  authMiddleware.isAuthenticated,
  authMiddleware.isAdminOrClient,
  deleteTheater);
router.route("/theaters").get(getAllTheaters);
router.route('/theater/:theaterId').put(  authMiddleware.isAuthenticated,
  authMiddleware.isAdminOrClient,updateMovie);
router.route('/theater/:theaterId').patch(authMiddleware.isAuthenticated,
  authMiddleware.isAdminOrClient,updateMovie);
router
  .route("/theater/:id/movies")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    validateTheaterMiddleware.validateUpdatedMovies,
    updatedMoviesInTheaters,
  );

  router.route('/theater/:id/movies').get(getAllMoviesInATheater)

  router.route('/theater/:theaterId/movie/:movieId').get(checkMovie)

export default router;