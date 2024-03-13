import jwt from "jsonwebtoken";
import { secret, jwtVerify } from "../config/jwtConfig.js";
export const authUser = (req, res, next) => {
  jwt.verify(req.headers.authorization, secret, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "User Not Authorized" });
    } else {
      next();
    }
  });
};
