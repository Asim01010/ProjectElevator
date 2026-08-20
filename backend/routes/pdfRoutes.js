import express from "express";
import { generateModelPDF } from "../controllers/pdfController.js";


const router = express.Router();

router.post("/generate", generateModelPDF);

export default router;
