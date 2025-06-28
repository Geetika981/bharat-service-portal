import express from "express";
import { createBooking } from "../controllers/booking.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isUser } from "../middlewares/user.middleware.js";
const router = express.Router();

router.post(
  "/",
  protect,
  isUser,
  (req, res, next) => {
    console.log("📥 /api/bookings route hit");
    next();
  },
  createBooking
);

export default router;
