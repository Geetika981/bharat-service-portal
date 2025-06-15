import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend
    credentials: true,
  })
);

app.get("/api/ping", (req, res) => {
  res.send({ msg: "Backend running 🚀" });
});
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectDb();
});
