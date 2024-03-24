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
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
