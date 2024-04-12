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

export const managerMiddleware = (req, res, next) => {
  if (!jwtVerify(req, res).permission === 3) {
    res
      .status(403)
      .json({ message: "Access Denied: Requires Business User Access" });
  } else {
    next();
  }
};
export const techMiddleware = (req, res, next) => {
  if (!jwtVerify(req, res).permission === 3) {
    res
      .status(403)
      .json({ message: "Access Denied: Requires Tech User Access" });
  } else {
    next();
  }
};
export const adminMiddleware = (req, res, next) => {
  if (!jwtVerify(req, res).permission === 4) {
    res
      .status(403)
      .json({ message: "Access Denied: Requires Tech User Access" });
  } else {
    next();
  }
};
