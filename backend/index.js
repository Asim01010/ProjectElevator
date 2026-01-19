// backend/server.js (or index.js)
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/configdb.js";
import userRouter from "./routes/userRoute.js";
import projectRouter from "./routes/projectRoute.js"; // ← Updated import name to match file

dotenv.config();

const app = express();

/* ======================
   MIDDLEWARES
====================== */

// Request logger (very helpful during development & debugging with Postman/Frontend)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // logs: METHOD URL STATUS TIME
}

// CORS configuration - allow frontend origin only
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Body parsers - increased limit in case you add file uploads later (images, etc.)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
connectDB();

/* ======================
   ROUTES
====================== */

// User authentication & profile routes
app.use("/api/users", userRouter);

// Project & subproject routes (this is where all project CRUD lives)
app.use("/api/projects", projectRouter);

// Health check endpoint (useful for monitoring, deployment, Postman)
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

// 404 - Route not found
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
    // Only show stack trace in development mode
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    colors.rainbow(
      `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
    ),
  );
  console.log(colors.cyan(`Frontend allowed: ${FRONTEND_URL}`));
});
