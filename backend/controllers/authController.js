import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { secret } from "../config/jwtConfig.js";

export const signUp = async (req, res) => {
  try {
    const userDetails = req.body;
    const encryptPassword = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = encryptPassword;
    const user = new User(userDetails);
    const saveUser = await user.save();
    res
      .status(201)
      .json({ message: "User successfully registered.", user: saveUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {};
