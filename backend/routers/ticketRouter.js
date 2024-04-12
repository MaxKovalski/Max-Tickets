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
  managerMiddleware,
  techMiddleware,
} from "../middleware/authMiddleware.js";

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

ticketRouter.get("/tickets", managerMiddleware, getAllOpenTickets);
ticketRouter.get("/tickets/archived", managerMiddleware, getAllArchivedTickets);
ticketRouter.get("/tickets/:_id", managerMiddleware, getSingleTicket);
ticketRouter.get("/tickets/tech/:techName", techMiddleware, getTechTickets);
ticketRouter.post("/update-tech", managerMiddleware, updateTicketTech);
ticketRouter.patch("/archive-ticket", managerMiddleware, archiveTicket);
ticketRouter.post("/update-status", techMiddleware, updateTicketStatus);
