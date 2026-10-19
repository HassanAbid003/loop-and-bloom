import express from "express";
import multer from "multer";
import { strictLimiter } from "../middleware/rateLimiter.js";
import { requireAdmin } from "../middleware/auth.js";
import { login, me } from "../controllers/adminAuthController.js";
import { uploadImage } from "../controllers/uploadController.js";
import {
  listAllOrders,
  updateOrderStatus,
  listAllProducts,
  createProduct,
  updateProduct,
  archiveProduct,
  getSettings,      // Added
  updateSettings,   // Added
  deleteProductPermanently,
  toggleProductStatus,
} from "../controllers/adminController.js";

const router = express.Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } 
});

router.post("/login", strictLimiter, login);

router.use(requireAdmin);

router.get("/me", me);

// Orders
router.get("/orders", listAllOrders);
router.patch("/orders/:id", updateOrderStatus);

// Products
router.get("/products", listAllProducts);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", archiveProduct);
router.delete("/products/:id/permanent", deleteProductPermanently); // Hard delete (Add this)
router.patch("/products/:id/toggle", toggleProductStatus);

// Settings (Added these two routes)
router.get("/settings", getSettings);
router.patch("/settings", updateSettings);

// Image Upload
router.post("/upload", upload.single("image"), uploadImage);

export default router;