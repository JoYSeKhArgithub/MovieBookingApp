import express from 'express';
import { createMovie, deleteMovie, getMovie } from '../controllers/movie.controller.js';
const router = express.Router();

router.route('/movie').post(createMovie);
router.route('/movie/:movieId').delete(deleteMovie);
router.route('/movie/:movieId').get(getMovie);

export default router;