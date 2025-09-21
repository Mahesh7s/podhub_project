// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Attach token automatically to every request
api.interceptors.request.use((config) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log("URL:", import.meta.env.VITE_API_URL)
  return config;
});

export default api;
