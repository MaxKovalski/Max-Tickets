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
export const login = async (req, res) => {
  try {
    const userDetails = req.body;
    const findUser = await User.findOne({ email: userDetails.email });
    if (!findUser) {
      return res.status(404).json({ message: "Email or Password incorrect" });
    }
    const passwordCheck = await bcrypt.compare(
      userDetails.password,
      findUser.password
    );
    if (!passwordCheck) {
      return res.status(401).json({ message: "Email or Password incorrect" });
    }
    const loggedUser = findUser.toObject();
    delete loggedUser.password;
    delete loggedUser.email;
    const token = jwt.sign(
      {
        name: {
          first: loggedUser.name.first,
          last: loggedUser.name.last,
        },
        userId: loggedUser._id,
        permission: loggedUser.permission,
      },
      secret,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: loggedUser._id,
        name: loggedUser.name,
        permission: loggedUser.permission,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
