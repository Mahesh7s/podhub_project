// src/services/user.service.js
import api from "./api";

// Admin: users
const getAllUsers = async () => {
  const res = await api.get("/auth/users");
  return res.data;
};

const deleteUser = async (id) => {
  const res = await api.delete(`/auth/users/${id}`);
  return res.data;
};

const updateUser = async (id, payload) => {
  const res = await api.put(`/auth/users/${id}`, payload);
  return res.data;
};

// Loyalty
const getLoyalty = async () => {
  const res = await api.get("/loyalty");
  return res.data.loyalty;
};

const updatePoints = async (userId, points) => {
  const res = await api.post("/loyalty/update", { userId, points });
  return res.data.loyalty;
};

export default { getAllUsers, deleteUser, updateUser, getLoyalty, updatePoints };
