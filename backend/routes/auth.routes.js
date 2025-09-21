import express from "express";
import { register, login, getAllUsers, updateUser, deleteUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// Admin
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
