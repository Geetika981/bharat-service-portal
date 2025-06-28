import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { isProvider } from "../middlewares/provider.middleware.js";
import {
  addService,
  deleteMyService,
  getMyBookingsAsProvider,
  getMyServices,
  updateBookingStatus,
  updateMyService,
} from "../controllers/provider.controller.js";

const router = express.Router();

// Apply provider check
router.use(protect, isProvider);

router.post("/services", addService);
router.get("/services", getMyServices);
router.put("/services/:id", updateMyService);
router.delete("/services/:id", deleteMyService);
router.get("/bookings", getMyBookingsAsProvider);
router.put("/bookings/:id", updateBookingStatus);

export default router;
