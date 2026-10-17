import express from "express";
import {
  listProducts,
  getProductBySlug,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// Public
router.get("/", listProducts);
router.get("/id/:id", getProductById);
router.get("/:slug", getProductBySlug);

export default router;