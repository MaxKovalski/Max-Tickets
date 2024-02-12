import express from "express";
export const authRouter = express.Router();
import { login, signUp } from "../controllers/authController.js";
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
