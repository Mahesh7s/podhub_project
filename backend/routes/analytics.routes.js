import express from "express";
import { incrementPlay, incrementDownload, getCreatorAnalytics, getAllUsersAnalytics } from "../controllers/analytics.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/play/:episodeId", incrementPlay);
router.post("/download/:episodeId", incrementDownload);
router.get("/creator", protect, getCreatorAnalytics);
router.get("/admin/all", protect,getAllUsersAnalytics);
export default router;
