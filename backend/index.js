import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
//test route
app.get("/", (req, res) => res.send("API running..."));

//auth routes
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

//admin routes
import adminRoutes from "./routes/admin.routes.js";
app.use("/api/admin", adminRoutes);

//provider routes
import providerRoutes from "./routes/provider.routes.js";
app.use("/api/provider", providerRoutes);

//user routes

import userRoutes from "./routes/user.routes.js";
app.use("/api/user", userRoutes);

//payment route
import paymentRoutes from "./routes/payment.routes.js";
app.use("/api/payments", paymentRoutes);

//bokking routes
import bookingRoutes from "./routes/booking.routes.js";
app.use("/api/bookings", bookingRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectDb();
});
