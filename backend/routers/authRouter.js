import express from "express";
export const authRouter = express.Router();
import { signUp } from "../controllers/authController.js";
authRouter.post("/signup", signUp);
