import express from "express";
import multer from "multer";
import moment from "moment";
import {
  archiveTicket,
  createTicket,
  getAllArchivedTickets,
  getAllOpenTickets,
  getSingleTicket,
  updateTicketTech,
  getTechTickets,
  updateTicketStatus,
} from "../controllers/ticketController.js";
import {
  authUser,
  mangerMiddleware,
  techMiddleware,
} from "../middleware/authMiddleware.js";
import { getAllTechs } from "../controllers/userController.js";

export const ticketRouter = express.Router();

const storageEngine = multer.diskStorage({
  destination: "./ticketImages",
  filename: (req, file, cb) => {
    const formattedDate = moment()
      .format("YYYY-MM-DD HH:mm:ss")
      .replace(/:/g, "-");
    cb(null, `${formattedDate}--${file.originalname}`);
  },
});
const upload = multer({ storage: storageEngine });
ticketRouter.post(
  "/create-ticket",
  authUser,
  upload.single("image"),
  createTicket
);

ticketRouter.get("/tickets", mangerMiddleware, getAllOpenTickets);
ticketRouter.get("/techs", mangerMiddleware, getAllTechs);
ticketRouter.get("/tickets/archived", mangerMiddleware, getAllArchivedTickets);
ticketRouter.get("/tickets/:_id", mangerMiddleware, getSingleTicket);
ticketRouter.get("/tickets/tech/:techName", techMiddleware, getTechTickets);
ticketRouter.post("/update-tech", mangerMiddleware, updateTicketTech);
ticketRouter.patch("/archive-ticket", mangerMiddleware, archiveTicket);
ticketRouter.post("/update-status", techMiddleware, updateTicketStatus);
