// src/services/analytics.service.js
import api from "./api";

const incrementPlay = async (episodeId) => {
  const res = await api.post(`/analytics/play/${episodeId}`);
  return res.data;
};

const incrementDownload = async (episodeId) => {
  const res = await api.post(`/analytics/download/${episodeId}`);
  return res.data;
};

const getCreatorAnalytics = async () => {
  const res = await api.get("/analytics/creator");
  return res.data;
};
const getAllUsersAnalytics = async () => {
  const res = await api.get("/analytics/admin/all");
  return res.data;
}

export default { incrementPlay, incrementDownload, getCreatorAnalytics,getAllUsersAnalytics };
