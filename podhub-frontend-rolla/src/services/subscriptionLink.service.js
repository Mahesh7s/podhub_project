// src/services/subscriptionLinks.service.js
import api from "./api";

// Creator generates a new subscription link
const generateLink = async (discount, expiresInHours) => {
  const res = await api.post("/subscription-links/generate", { discount, expiresInHours });
  return res.data;
};

// User redeems a subscription link
const redeemLink = async (code) => {
  const res = await api.get(`/subscription-links/redeem/${code}`);
  return res.data;
};

export default { generateLink, redeemLink };
