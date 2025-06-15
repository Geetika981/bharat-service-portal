import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get('/api/ping', (req, res) => {
  res.send({ msg: 'Backend running 🚀' });
});


app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is running on port ${process.env.PORT}`);
    connectDb();
});
