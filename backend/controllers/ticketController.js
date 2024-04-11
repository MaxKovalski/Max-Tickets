import { Ticket } from "../models/ticket.js";
import { User } from "../models/user.js";
import { jwtVerify } from "../config/jwtConfig.js";
import { createTicketValidation } from "../middleware/validationMiddleware.js";

export const createTicket = async (req, res) => {
  try {
    const userId = jwtVerify(req, res).userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const ticketDetails = req.body;
    const validate = createTicketValidation.validate(ticketDetails, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (validate.error) {
      const error = validate.error.details[0].message;
      return res.status(406).json({ error: error });
    }
    ticketDetails.user_id = userId;
    if (req.file) {
      ticketDetails.image = req.file.path;
    }

    const ticket = new Ticket({
      name: {
        first: user.name.first,
        last: user.name.last,
      },
      email: user.email,
      image: ticketDetails.image,
      ...ticketDetails,
    });

    const savedTicket = await ticket.save();
    res.status(201).json({
      message: "Ticket created successfully",
      ticket: savedTicket._id,
      title: savedTicket.title,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOpenTickets = async (req, res) => {
  try {
    const openTickets = await Ticket.find({
      archive: false,
    });
    res.status(200).json(openTickets);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllArchivedTickets = async (req, res) => {
  try {
    const archivedTicket = await Ticket.find({
      archive: true,
    });
    res.status(200).json(archivedTicket);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateTicketTech = async (req, res) => {
  try {
    const { _id, techName } = req.body;
    if (!_id || !techName) {
      return res
        .status(400)
        .json({ message: "Missing _id or techName in request body" });
    }

    await Ticket.findByIdAndUpdate(_id, { techName });
    res.status(200).json({ message: "Tech name updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const archiveTicket = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ message: "Missing _id in request body" });
    }

    const ticket = await Ticket.findById(_id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    ticket.archive = !ticket.archive;
    await ticket.save();
    res.status(200).json({
      message: `Ticket ${
        ticket.archive ? "archived" : "unarchived"
      } successfully`,
    });
  } catch (error) {
    console.error("Error toggling archive status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getSingleTicket = async (req, res) => {
  try {
    const { _id } = req.params;
    const ticket = await Ticket.findById(_id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).send(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getTechTickets = async (req, res) => {
  try {
    const { techName } = req.params;
    const techTickets = await Ticket.find({ techName: techName });

    if (!techTickets) {
      return res.status(404).json({ message: "Tech not found" });
    }
    res.status(200).send(techTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateTicketStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if (!_id || !status) {
      return res
        .status(400)
        .json({ message: "Missing _id or status in request body" });
    }

    await Ticket.findByIdAndUpdate(_id, { status });
    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
