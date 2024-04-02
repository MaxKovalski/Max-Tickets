import express from "express";
import multer from "multer";
import {
  archiveTicket,
  createTicket,
  getAllOpenTickets,
  updateTicketTech,
} from "../controllers/ticketController.js";
import { authUser, managerOnly } from "../middleware/authMiddleware.js";
import { getAllTechs } from "../controllers/userController.js";
export const ticketRouter = express.Router();
const storageEngine = multer.diskStorage({
  destination: "./ticketImages",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const upload = multer({ storage: storageEngine });
ticketRouter.post(
  "/create-ticket",
  authUser,
  upload.single("image"),
  createTicket
);

ticketRouter.get("/tickets", managerOnly, getAllOpenTickets);
ticketRouter.get("/techs", managerOnly, getAllTechs);
ticketRouter.post("/update-tech", managerOnly, updateTicketTech);
ticketRouter.patch("/archive-ticket", managerOnly, archiveTicket);
