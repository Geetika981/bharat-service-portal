import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongo db conneceted succesfully");
    } catch (error) {
        console.log("mongodb connection error ",error)
    }
}

export {connectDb};