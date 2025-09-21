import express from "express";
import { getLoyalty, updatePoints } from "../controllers/loyalty.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get current user's loyalty info
router.get("/", protect, getLoyalty);

// Update points (admin or engagement logic calls this)
router.post("/update", protect, updatePoints);

export default router;
