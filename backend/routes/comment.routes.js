import express from "express";
import {
  addComment,
  getComments,
  replyComment,
  deleteComment,
  getUserComments,
  getCreatorEpisodeComments,
  deleteReply,
  getAllCommentsAdmin
} from "../controllers/comment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addComment);
router.get("/:episodeId", getComments);
router.get("/user/me", protect, getUserComments);
router.get("/user/:userId", getUserComments);
router.get("/creator/all", protect, getCreatorEpisodeComments);
router.post("/reply/:commentId", protect, replyComment);
router.delete("/:commentId", protect, deleteComment);
router.delete("/:commentId/reply/:replyId", protect, deleteReply);
router.get("/admin/all", protect, getAllCommentsAdmin);

export default router;
