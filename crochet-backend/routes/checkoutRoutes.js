import express from "express";
import { strictLimiter } from "../middleware/rateLimiter.js";
import {
  createCheckoutSession,
  getOrderBySession,
} from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/session", strictLimiter, createCheckoutSession);
router.get("/order/:sessionId", getOrderBySession);

export default router;