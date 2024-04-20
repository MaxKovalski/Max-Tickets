import { User } from "../models/user.js";
import { editUserValidation } from "../middleware/validationMiddleware.js";
export const getAllTechs = async (req, res) => {
  try {
    const techs = await User.find({ permission: 2 });
    if (!techs) {
      return res.status(404).json({ message: "Techs not found" });
    }
    res.status(200).json(techs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
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
    const { _id } = req.params;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editUser = async (req, res) => {
  try {
    const userDetails = req.body;
    const userId = req.params._id;
    console.log(userId);
    console.log(userDetails);
    if (!userId) {
      return res.status(400).json({ message: "Missing id in request body" });
    }
    const validate = editUserValidation.validate(userDetails, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (validate.error) {
      const errors = validate.error.details.map((err) => err.message);
      return res.status(400).send(errors);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, userDetails, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User can't update" });
    }
    const userObject = updatedUser.toObject();
    res
      .status(200)
      .json({ message: "User Data Updated Successfully", user: userObject });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
