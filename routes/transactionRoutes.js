import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

const transactionRoutes = express.Router();

transactionRoutes.get("/", authenticateToken, (req, res) => {
  console.log(req.headers);
  res.json({ message: "Authenticated user" });
});

export default transactionRoutes;
