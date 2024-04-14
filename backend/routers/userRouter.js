import express from "express";
import {
  getAllTechs,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";
import {
  managerMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";
export const userRouter = express.Router();
userRouter.get("/techs", managerMiddleware, getAllTechs);
userRouter.get("/users", adminMiddleware, getAllUsers);
userRouter.delete("/delete-user", adminMiddleware, deleteUser);
