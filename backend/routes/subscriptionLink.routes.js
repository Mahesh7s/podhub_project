import express from "express";
import { generateLink, redeemLink } from "../controllers/subscriptionLink.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Creator generates a subscription link
router.post("/generate", protect, generateLink);

// User redeems a subscription link
router.get("/redeem/:code", protect, redeemLink);

export default router;
