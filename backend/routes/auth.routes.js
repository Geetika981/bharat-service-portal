import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(protect, getProfile);

export default router;
