// src/services/episodes.service.js
import api from "./api";

const uploadEpisode = async (formData) => {
  // formData is already a FormData object from CreatorEpisodes
  const res = await api.post("/episodes/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const getEpisodes = async () => {
  const res = await api.get("/episodes");
  return res.data;
};

const getMyEpisodes = async () => {
  const res = await api.get("/episodes/mine");
  return res.data;
}

const deleteEpisode = async (id) => {
  const res = await api.delete(`/episodes/${id}`);
  return res.data;
};

const getFeedEpisodes = async () => {
  const res = await api.get("/episodes/feed");
  return res.data;
};

export default { uploadEpisode, getEpisodes, getMyEpisodes, deleteEpisode,getFeedEpisodes };
