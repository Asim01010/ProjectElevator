import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import basicRoute from "./routes/basicRoute.js";
import { connectDB } from "./config/configdb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ======================
   MIDDLEWARES
====================== */
app.use(express.json());
// Connect MongoDB
connectDB();
app.use(express.urlencoded({ extended: false }));

/* ======================
   ROUTES
====================== */
app.use("/", basicRoute);

/* ======================
   SERVER START
====================== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.white);
});
