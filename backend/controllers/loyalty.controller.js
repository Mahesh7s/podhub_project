import User from "../models/User.js";

// Helper: compute tier based on points
const computeTier = (points) => {
  if (points >= 100) return "Gold";
  if (points >= 50) return "Silver";
  return "Bronze";
};

// Get current user's loyalty info
export const getLoyalty = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ loyalty: user.loyalty });
  } catch (error) {
    res.status(500).json({ message: "Error fetching loyalty info", error: error.message });
  }
};

// Update user's points (increment engagement points)
export const updatePoints = async (req, res) => {
  try {
    const { userId, points } = req.body; // points to add
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.loyalty.points += points;
    user.loyalty.tier = computeTier(user.loyalty.points);

    await user.save();
    res.json({ message: "Points updated", loyalty: user.loyalty });
  } catch (error) {
    res.status(500).json({ message: "Error updating points", error: error.message });
  }
};
