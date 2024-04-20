import env from "dotenv";
env.config();
import jwt from "jsonwebtoken";
export const secret = process.env.JWT_SECRET;
export const jwtVerify = (req, res) => {
  if (!req.headers.authorization) {
    return null;
  }
  try {
    const userJwtData = jwt.verify(req.headers.authorization, secret);
    return userJwtData;
  } catch (error) {
    res.status(401).send("User Not Authorized");
    return null;
  }
};
