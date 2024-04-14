import { User } from "../models/user.js";
export const getAllTechs = async (req, res) => {
  try {
    const techs = await User.find({ permission: 2 });
    if (!techs) {
      return res.status(404).json({ message: "Techs not found" });
    }
  } catch {
    error;
  }
  {
    res.status(500).json({ message: "Internal server error" });
  }

  res.status(200).json(techs);
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    console.log(req.body._id);
    const user = await User.findByIdAndDelete(req.body._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
