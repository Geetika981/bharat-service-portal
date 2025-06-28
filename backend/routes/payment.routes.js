import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { createPaymentIntent } from "../controllers/payment.controllers.js";

const router = express.Router();

router.post("/create-payment-intent", protect, createPaymentIntent);

export default router;
