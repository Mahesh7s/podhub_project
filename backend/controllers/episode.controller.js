// backend/controllers/episode.controller.js
import dotenv from "dotenv";
dotenv.config();
import Episode from "../models/Episode.js";

// ✅ Upload episode

export const uploadEpisode = async (req, res, next) => {
  try {
    console.log("File received:", req.file);
    console.log("Body received:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    const audioUrl = req.file.path;       // ✅ Cloudinary URL
    const audioPublicId = req.file.filename; // ✅ Cloudinary public_id

    if (!audioUrl) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    const episode = new Episode({
      title: req.body.title,
      description: req.body.description,
      audioUrl,
      audioPublicId,
      duration: 0,
      creator: req.user._id || req.user.id,
    });

    await episode.save();
    await episode.populate("creator", "name email");

    res.status(201).json({ message: "Episode uploaded successfully", episode });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};



// ✅ Fetch all episodes
export const getEpisodes = async (req, res, next) => {
  try {
    const episodes = await Episode.find()
      .populate("creator", "name email")
      .sort({ createdAt: -1 });

    res.json(episodes);
  } catch (error) {
    next(error);
  }
};

export const getMyEpisodes = async (req, res, next) => {
  try {
    const episodes = await Episode.find({ creator: req.user._id })
      .populate("creator", "name email")
      .sort({ createdAt: -1 });

    res.json(episodes);
  } catch (error) {
    next(error);
  }
};
// ✅ Delete episode
export const deleteEpisode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findById(id);

    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }

    if (episode.creator.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Episode.findByIdAndDelete(id);

    res.json({ message: "Episode deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// ✅ Fetch feed (episodes not created by me)
export const getFeedEpisodes = async (req, res, next) => {
  try {
    const episodes = await Episode.find({
      creator: { $ne: req.user._id }, // exclude my own
    })
      .populate("creator", "name email")
      .sort({ createdAt: -1 });

    res.json(episodes);
  } catch (error) {
    next(error);
  }
};

