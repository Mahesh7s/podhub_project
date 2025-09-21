// src/services/auth.service.js
import api from "./api"; // import your axios instance

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData); // no need for full URL
  return res.data;
};

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  console.log("In login", res);
  if (res.data.token) {
    const dataToSave = {
      name: res.data.user.name,
      email: res.data.user.email,
      role: res.data.user.role,
      token: res.data.token,
    };
    localStorage.setItem("userData", JSON.stringify(dataToSave));
  }
  return res.data;
};

export const logout = () => localStorage.removeItem("userData");

export const getCurrentUser = () => JSON.parse(localStorage.getItem("userData"));

export default { register, login, logout, getCurrentUser };
