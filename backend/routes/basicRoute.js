import express from "express"
import { registerController } from "../controllers/basicController.js";

const router = express.Router();

router.get("/", registerController);

export default router;