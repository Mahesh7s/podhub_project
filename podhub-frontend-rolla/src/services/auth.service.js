import axios from "axios";
const API_URL = "http://localhost:3000/api/auth";

export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  console.log("In login", res);
  if (res.data.token) {
    const dataToSave = {
      // Explicitly pull each piece of data to ensure it's included
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
