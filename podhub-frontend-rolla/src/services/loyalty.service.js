// src/services/loyalty.service.js
import api from "./api";

// Get current user's loyalty info
const getLoyalty = async () => {
  const res = await api.get("/loyalty");
  return res.data.loyalty;
};

// Update points for a user (admin or engagement logic)
const updatePoints = async (userId, points) => {
  const res = await api.post("/loyalty/update", { userId, points });
  return res.data.loyalty;
};

export default { getLoyalty, updatePoints };
