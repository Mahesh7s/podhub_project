// src/services/subscription.service.js
import api from "./api";

// Creator subscriptions
const subscribeToCreator = async (creatorId) => {
  try {
    const res = await api.post("/subscriptions", { creatorId });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Subscription failed");
  }
};

const getCreatorSubscriptions = async () => {
  const res = await api.get("/subscriptions");
  return res.data;
};

// Plan subscriptions
const getPlans = async () => {
  const res = await api.get("/subscription/plans");
  return res.data;
};

const getMySubscription = async () => {
  const res = await api.get("/subscription/me");
  return res.data;
};

const subscribeToPlan = async (planId) => {
  const res = await api.post("/subscription/subscribe", { planId });
  return res.data;
};

const unsubscribePlan = async () => {
  const res = await api.post("/subscription/unsubscribe");
  return res.data;
};

// Subscription links
const generateLink = async (discount, expiresInHours) => {
  const res = await api.post("/subscription-links/generate", { discount, expiresInHours });
  return res.data;
};
const unsubscribeFromCreator = async (creatorId) => {
  const res = await api.post("/subscriptions/unsubscribe", { creatorId });
  return res.data;
};
const redeemLink = async (code) => {
  const res = await api.get(`/subscription-links/redeem/${code}`);
  return res.data;
};
const getCreatorSubscribers = async () => {
  const res = await api.get("/subscriptions/creator-subscribers");
  return res.data;
};
export default {
  subscribeToCreator,
  getCreatorSubscriptions,
  getPlans,
  getMySubscription,
  subscribeToPlan,
  unsubscribePlan,
  generateLink,
  redeemLink,
  getCreatorSubscribers,
  unsubscribeFromCreator
};
