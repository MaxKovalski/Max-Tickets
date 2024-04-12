import { User } from "../models/user.js";
export const getAllTechs = async (req, res) => {
  const techs = await User.find({ permission: 2 });
  res.status(200).json(techs);
};
export const getAllUsers = async (req, res) => {
  const techs = await User.find();
  res.status(200).json(techs);
};
