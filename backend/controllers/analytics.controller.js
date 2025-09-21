import Episode from "../models/Episode.js";
import Comment from "../models/Comment.js";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";

// Increment play count
export const incrementPlay = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const episode = await Episode.findById(episodeId);
    if (!episode) return res.status(404).json({ message: "Episode not found" });

    episode.plays += 1;
    await episode.save();

    res.json({ message: "Play count incremented", plays: episode.plays });
  } catch (error) {
    res.status(500).json({ message: "Error incrementing play", error: error.message });
  }
};

// Increment download count
export const incrementDownload = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const episode = await Episode.findById(episodeId);
    if (!episode) return res.status(404).json({ message: "Episode not found" });

    episode.downloads += 1;
    await episode.save();

    res.json({ message: "Download count incremented", downloads: episode.downloads });
  } catch (error) {
    res.status(500).json({ message: "Error incrementing download", error: error.message });
  }
};

// Get detailed creator analytics
export const getCreatorAnalytics = async (req, res, next) => {
  try {
    const creatorId = req.user.id;

    const episodes = await Episode.find({ creator: creatorId });

    const totalPlays = episodes.reduce((sum, ep) => sum + ep.plays, 0);
    const totalDownloads = episodes.reduce((sum, ep) => sum + ep.downloads, 0);
    const totalEpisodes = episodes.length;

    const commentsCount = await Comment.countDocuments({
      episode: { $in: episodes.map(ep => ep._id) }
    });
    const subscriptionsCount = await Subscription.countDocuments({ creator: creatorId });

    // ✅ Per-episode breakdown
    const perEpisode = episodes.map(ep => ({
      id: ep._id,
      title: ep.title,
      plays: ep.plays,
      downloads: ep.downloads,
      comments: ep.commentsCount,
    }));

    // ✅ Trending episodes (top 5 by plays)
    const trending = [...episodes]
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 5)
      .map(ep => ({
        id: ep._id,
        title: ep.title,
        plays: ep.plays,
      }));

    res.json({
      totalEpisodes,
      totalPlays,
      totalDownloads,
      commentsCount,
      subscriptionsCount,
      perEpisode,
      trending,
    });
  } catch (error) {
    next(error);
  }
};

// controllers/analytics.controller.js

// Admin: Get analytics for all users
export const getAllUsersAnalytics = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["creator", "user"] } });

    const analytics = await Promise.all(
      users.map(async (user) => {
        const episodes = await Episode.find({ creator: user._id });

        const totalPlays = episodes.reduce((sum, ep) => sum + ep.plays, 0);
        const totalDownloads = episodes.reduce((sum, ep) => sum + ep.downloads, 0);
        const totalEpisodes = episodes.length;

        const commentsCount = await Comment.countDocuments({
          episode: { $in: episodes.map((ep) => ep._id) },
        });

        const subscriptionsCount = await Subscription.countDocuments({
          creator: user._id,
        });

        return {
          userId: user._id,
          name: user.name,
          email: user.email,
          totalEpisodes,
          totalPlays,
          totalDownloads,
          commentsCount,
          subscriptionsCount,
        };
      })
    );

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all users analytics", error: error.message });
  }
};