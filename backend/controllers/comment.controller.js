import Comment from "../models/Comment.js";
import Episode from "../models/Episode.js";

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { episodeId, text } = req.body;
    const comment = new Comment({
      episode: episodeId,
      user: req.user.id,
      text,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};

// Get comments for an episode
export const getComments = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const comments = await Comment.find({ episode: episodeId })
      .populate("user", "name email")
      .populate("replies.user", "name");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// Get comments by logged-in user
export const getUserComments = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const comments = await Comment.find({ user: userId })
      .populate("episode", "title")
      .populate("replies.user", "name");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user comments", error: error.message });
  }
};

// Get all comments for episodes owned by the creator
export const getCreatorEpisodeComments = async (req, res) => {
  try {
    const creatorId = req.user.id;

    // Get episodes of this creator
    const episodes = await Episode.find({ creator: creatorId }).select("_id");
    const episodeIds = episodes.map(e => e._id);

    const comments = await Comment.find({ episode: { $in: episodeIds } })
      .populate("user", "name email")
      .populate("replies.user", "name")
      .populate("episode", "title");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};

// Reply to a comment
export const replyComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({ user: req.user.id, text });
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error replying to comment" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};

// Delete a reply
// Delete a reply (without changing schema)
export const deleteReply = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;

    if (!commentId || !replyId) {
      return res.status(400).json({ message: "Comment ID and Reply ID are required" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Find the reply
    const reply = comment.replies.find((r) => r._id.toString() === replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    // Only admin can delete any reply
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete replies" });
    }

    // Filter out the reply to delete
    comment.replies = comment.replies.filter((r) => r._id.toString() !== replyId);
    await comment.save();

    res.json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Delete Reply Error:", error);
    res.status(500).json({ message: "Error deleting reply", error: error.message });
  }
};




// Admin: get all comments
export const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "name email")
      .populate("replies.user", "name")
      .populate("episode", "title");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};
