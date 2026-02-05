import express from "express";
import { userUpdate } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/user/:userId").patch(userUpdate)

export default router;