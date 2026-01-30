import express from 'express';
import { signup } from "../controllers/auth.controller.js";


const router = express.Router();

router.route("/auth/signup").post(signup);

export default router;