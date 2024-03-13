import express from "express";
export const authRouter = express.Router();
import { login, signUp } from "../controllers/authController.js";
import { createTicket } from "../controllers/ticketController.js";
import { authUser } from "../middleware/authMiddleware.js";
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/create-ticket", authUser, createTicket);
