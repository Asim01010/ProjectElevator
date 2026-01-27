// backend/server.js (or index.js)
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import { connectDB } from "./config/configdb.js";
import userRouter from "./routes/userRoute.js";
import projectRouter from "./routes/projectRoute.js";

dotenv.config();

const app = express();

/* ======================
   MIDDLEWARES
====================== */

// Request logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS configuration
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
connectDB();

/* ======================
   ROUTES
====================== */

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    mongoConnected: mongoose.connection.readyState === 1 ? "yes" : "no",
  });
});

/* ======================
   ERROR HANDLING
====================== */

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(colors.red("Global error:"), err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ❌ REMOVE app.listen()
// ✅ EXPORT app for Vercel
export default app;
