import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import pdfRoutes from "./routes/pdfRoutes.js";
import { connectDB } from "./config/configdb.js";
import userRouter from "./routes/userRoute.js";
import projectRouter from "./routes/projectRoute.js";
import { Paymentrouter } from "./controllers/paymentMethod.js";
import fabricatorRoutes from "./routes/fabricatorRoutes.js";
import s3Routes from "./routes/s3Routes.js";

dotenv.config();

const app = express();

// ─── MIDDLEWARES ────────────────────────────────────────────────

// Logger (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS configuration – clean, debug-friendly, local-first
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://13.60.247.206",        // ✅ your AWS frontend origin
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin header (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      // Very helpful during development – you can remove these logs later
      console.log("[CORS] Origin:", origin);

      if (allowedOrigins.includes(origin)) {
        console.log("[CORS] → Allowed");
        return callback(null, true);
      }

      console.log("[CORS] → Rejected");
      return callback(null, false);
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200, // legacy browsers need this for OPTIONS preflight
  }),
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Database
connectDB();

// ─── ROUTES ─────────────────────────────────────────────────────

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/pdf", pdfRoutes);
app.use("/api/payment", Paymentrouter);
app.use("/api/fabricator", fabricatorRoutes);
app.use("/api", s3Routes);
// Health check endpoint (very useful)
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    mongoConnected: mongoose.connection.readyState === 1 ? "yes" : "no",
  });
});

// ─── ERROR HANDLING ─────────────────────────────────────────────

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(colors.red("Global error:"), err.stack || err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ─── START SERVER ───────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(
      colors.cyan(
        `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
      ),
    );
  });
}

// For Vercel / serverless
export default app;
