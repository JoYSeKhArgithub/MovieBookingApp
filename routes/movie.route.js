import express from 'express';
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../controllers/movie.controller.js";
import validateMovieMiddleware from '../middlewares/movie.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.route("/movie").post(authMiddleware.isAuthenticated,authMiddleware.isAdminOrClient,validateMovieMiddleware.validateMovieCreateRequest, createMovie);
router.route('/movie/:movieId').delete(authMiddleware.isAuthenticated,authMiddleware.isAdminOrClient,deleteMovie);
router.route('/movie/:movieId').get(getMovie);
router.route('/movie/:movieId').put(authMiddleware.isAuthenticated,authMiddleware.isAdminOrClient,updateMovie);
router.route("/movie/:movieId").patch(authMiddleware.isAuthenticated,authMiddleware.isAdminOrClient,updateMovie);
router.route('/movies').get(getMovies);


export default router;