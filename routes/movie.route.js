import express from 'express';
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../controllers/movie.controller.js";
import validateMovieMiddleware from '../middlewares/movie.middleware.js';
const router = express.Router();

router.route("/movie").post(validateMovieMiddleware.validateMovieCreateRequest, createMovie);
router.route('/movie/:movieId').delete(deleteMovie);
router.route('/movie/:movieId').get(getMovie);
router.route('/movie/:movieId').put(updateMovie);
router.route("/movie/:movieId").patch(updateMovie);
router.route('/movies').get(getMovies);


export default router;