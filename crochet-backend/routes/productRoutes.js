import express from "express";
import {
  listProducts,
  getProductBySlug,
  getProductById,
  getPublicSettings,
} from "../controllers/productController.js";

const router = express.Router();

// Public Settings (for Announcement Bar)
router.get("/settings", getPublicSettings);

// Products
router.get("/", listProducts);
router.get("/id/:id", getProductById);
router.get("/:slug", getProductBySlug);

export default router;