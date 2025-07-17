import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log(
        `MongoDB connected at ${mongoose.connection.host}:${mongoose.connection.port}`
      );
  } catch (err) {
    console.error("mongodb connection error: ", err.message);
    process.exit(1);
  }
};

export default connectDB;


