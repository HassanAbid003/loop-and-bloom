import express from "express";
import { strictLimiter } from "../middleware/rateLimiter.js";
import { requireUser } from "../middleware/userAuth.js";
import { signup, login, getMe } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", strictLimiter, signup);
router.post("/login", strictLimiter, login);
router.get("/me", requireUser, getMe);

export default router;