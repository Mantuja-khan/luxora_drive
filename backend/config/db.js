import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/luxoradrive");
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    console.warn(`[MongoDB Warning]: Please verify MongoDB is running on ${process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/luxoradrive"}`);
    return null;
  }
};
