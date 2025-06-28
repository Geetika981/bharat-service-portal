import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getApprovedServices,
  getMyBookings,
  getSingleService,
} from "../controllers/user.controllers.js";
import { isUser } from "../middlewares/user.middleware.js";

const router = express.Router();

// All routes require login
router.use(protect, isUser);

// Public for logged-in users
router.get("/services", getApprovedServices);

router.get("/services/:id", protect, getSingleService);
router.post("/bookings", createBooking);
router.get("/bookings", getMyBookings);

export default router;
