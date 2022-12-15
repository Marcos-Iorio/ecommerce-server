import { ConnectOptions } from "mongodb";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("MongoDb Connected");
};

export default connectDB;
