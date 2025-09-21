// routes/subscription.routes.js
import express from "express";
import {
  subscribe,
  getSubscriptions,
  getCreatorSubscribers,
  unsubscribeFromCreator,
} from "../controllers/subscription.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Now all routes align with frontend
router.post("/", protect, subscribe); // POST /api/subscriptions
router.get("/", protect, getSubscriptions); // GET /api/subscriptions
router.get("/creator-subscribers", protect, getCreatorSubscribers); // GET /api/subscriptions/creator-subscribers
router.post("/unsubscribe", protect, unsubscribeFromCreator); // POST /api/subscriptions/unsubscribe

export default router;
