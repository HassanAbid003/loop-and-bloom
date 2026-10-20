import express from "express";
import { strictLimiter } from "../middleware/rateLimiter.js";
import { requireUser } from "../middleware/userAuth.js";
import { signup, login, getMe, getMyOrders } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", strictLimiter, signup);
router.post("/login", strictLimiter, login);
router.get("/me", requireUser, getMe);
router.get("/my-orders", requireUser, getMyOrders);

export default router;