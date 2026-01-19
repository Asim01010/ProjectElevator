import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.warn("MONGO_URL not set — skipping MongoDB connection (development only).");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`.america);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Do not exit the process automatically — allow server to start for development/testing
  }
};
