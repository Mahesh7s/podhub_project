import User from "../models/User.js";
import crypto from "crypto";

// Generate a new subscription link (creator only)
export const generateLink = async (req, res) => {
  try {
    if (req.user.role !== "creator")
      return res.status(403).json({ message: "Only creators can generate links" });

    const { discount, expiresInHours } = req.body;
    const code = crypto.randomBytes(6).toString("hex"); // unique code
    const expiresAt = expiresInHours
      ? new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
      : null;

    const user = await User.findById(req.user.id);
    user.subscriptionLinks.push({ code, discount, expiresAt });
    await user.save();

    res.json({ message: "Link generated", link: `/subscribe/${code}`, code, discount, expiresAt });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate link", error: error.message });
  }
};

// Redeem a link (user)
export const redeemLink = async (req, res) => {
  try {
    const { code } = req.params;

    // find creator with this code
    const creator = await User.findOne({ "subscriptionLinks.code": code });
    if (!creator) return res.status(404).json({ message: "Invalid link" });

    const link = creator.subscriptionLinks.find((l) => l.code === code);
    if (!link) return res.status(404).json({ message: "Invalid link" });
    if (link.redeemed) return res.status(400).json({ message: "Link already redeemed" });
    if (link.expiresAt && link.expiresAt < new Date())
      return res.status(400).json({ message: "Link expired" });

    // mark as redeemed
    link.redeemed = true;
    await creator.save();

    res.json({ message: "Link redeemed successfully", discount: link.discount });
  } catch (error) {
    res.status(500).json({ message: "Failed to redeem link", error: error.message });
  }
};
