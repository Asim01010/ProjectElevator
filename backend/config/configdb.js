import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURL = process.env.MONGO_URL;
  if (!mongoURL) {
    console.warn(
      "MONGO_URL not set — skipping MongoDB connection (development only).",
    );
    return;
  }

  try {
    const conn = await mongoose.connect(mongoURL); // ✅ remove options
    console.log(`MongoDB Connected: ${conn.connection.host}`.america);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    if (process.env.NODE_ENV === "production") {
      process.exit(1); // stop app if connection fails in production
    }
  }
};
