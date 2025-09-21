// backend/routes/episode.routes.js
import express from "express";
import { uploadEpisode, getEpisodes, deleteEpisode, getMyEpisodes, getFeedEpisodes } from "../controllers/episode.controller.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/auth.middleware.js";
import multer from "multer";
//const upload = multer({ storage: multer.memoryStorage() });

// router.post("/upload", upload.single("audio"), uploadEpisode);

const router = express.Router();

router.post("/upload", protect, upload.single("audio"), uploadEpisode);
router.get("/", getEpisodes);
router.delete("/:id", protect, deleteEpisode);
router.get("/mine", protect, getMyEpisodes);  // ✅ new route
router.get("/feed", protect, getFeedEpisodes);
export default router;
