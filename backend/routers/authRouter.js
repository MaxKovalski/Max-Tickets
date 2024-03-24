import express from "express";
import multer from "multer";
export const authRouter = express.Router();
const storageEngine = multer.diskStorage({
  destination: "./ticketImages",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage: storageEngine });
import { login, signUp } from "../controllers/authController.js";
import { createTicket } from "../controllers/ticketController.js";
import { authUser } from "../middleware/authMiddleware.js";
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post(
  "/create-ticket",
  authUser,
  upload.single("image"),
  createTicket
);
