import Subscription from "../models/Subscription.js";

export const subscribe = async (req, res) => {
  try {
    const { creatorId } = req.body;
    if (!creatorId) {
      return res.status(400).json({ message: "creatorId is required" });
    }

    const existing = await Subscription.findOne({
      listener: req.user._id,
      creator: creatorId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const sub = new Subscription({
      listener: req.user._id,
      creator: creatorId,
    });

    await sub.save();
    res.json({ message: "Subscribed successfully", sub });
  } catch (error) {
    console.error("🔥 Subscribe error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({ listener: req.user._id })
      .populate("creator", "name email");
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscriptions" });
  }
};

export const getCreatorSubscribers = async (req, res) => {
  try {
    const creatorId = req.user._id; // logged-in creator
    const subs = await Subscription.find({ creator: creatorId })
      .populate("listener", "name email");
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscribers" });
  }
};

export const unsubscribeFromCreator = async (req, res) => {
  try {
    const { creatorId } = req.body;
    const existing = await Subscription.findOneAndDelete({
      listener: req.user._id,
      creator: creatorId,
    });

    if (!existing) {
      return res.status(400).json({ message: "Not subscribed to this creator" });
    }

    res.json({ message: "Unsubscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unsubscribing", error: error.message });
  }
};

