import express from "express";
import {
  getDesignImages,
  getImagesByPrefix,
  getPresignedUrl,
} from "../controllers/s3Service.js";

const router = express.Router();

// ✅ NEW - Get images for ONE specific design only
router.get("/design-images", async (req, res) => {
  const { designNum } = req.query;

  if (!designNum) {
    return res.status(400).json({ message: "designNum is required" });
  }

  try {
    const images = await getDesignImages(designNum);
    res.json(images);
  } catch (error) {
    console.error("S3 design error:", error);
    res.status(500).json({ message: "Failed to fetch design images" });
  }
});

// Old route - keep it for wall panels
router.get("/model-images", async (req, res) => {
  try {
    const images = await getModelImages();
    res.json(images);
  } catch (error) {
    console.error("S3 error:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

// NEW ROUTE: Get images from any folder/prefix
router.get("/images-by-prefix", async (req, res) => {
  const { prefix } = req.query;

  if (!prefix) {
    return res.status(400).json({
      success: false,
      message:
        "prefix query parameter is required (e.g. SubMaterial/handrails)",
    });
  }

  try {
    const images = await getImagesByPrefix(prefix);
    res.json(images);
  } catch (error) {
    console.error("S3 prefix error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch images from prefix",
    });
  }
});

// Presign one specific key (unchanged)
router.get("/presign-single", async (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ message: "key is required" });
  }

  try {
    const result = await getPresignedUrl(key);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate presigned URL" });
  }
});

export default router;
