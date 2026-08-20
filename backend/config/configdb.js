// Force reliable DNS servers (helps fix "querySrv ECONNREFUSED" on some Windows / Pakistani networks)
try {
  const { setServers } = await import("node:dns/promises");
  setServers(["1.1.1.1", "8.8.8.8", "1.0.0.1", "8.8.4.4"]);
} catch {
  // silent - most machines don't need or allow this
}

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.rainbow);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};