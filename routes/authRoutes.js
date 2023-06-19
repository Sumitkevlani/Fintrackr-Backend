import express from "express";
import { createUser } from "../controllers/signup.js";
import { signInUser } from "../controllers/login.js";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { resetPasswordPage } from "../controllers/getResetPassword.js";
import { updatePassword } from "../controllers/postResetPassword.js";
import upload from "../middleware/multer.js";

const authRoutes = express.Router();

authRoutes.post("/register", upload.single("image"), (req, res) => {
  createUser(req, res);
});

authRoutes.post("/login", (req, res) => {
  signInUser(req, res);
});

authRoutes.post("/forgot-password", (req, res) => {
  forgotPassword(req, res);
});

authRoutes.get("/reset-password", (req, res) => {
  resetPasswordPage(req, res);
});

authRoutes.post("/reset-password", (req, res) => {
  updatePassword(req, res);
});

export default authRoutes;