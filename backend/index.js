import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";
import morgan from "morgan";
import moment from "moment";

import { authRouter } from "./routers/authRouter.js";
import { ticketRouter } from "./routers/ticketRouter.js";
const env = dotenv.config();
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(chalk.green("Connected to MongoDB!"));
  } catch (error) {
    console.log(chalk.red("Error connecting to MongoDB: ", error.message));
    process.exit();
  }
}
connectDB().catch((err) => console.log(err));
const app = express();
morgan.token("time", () => moment().format("YYYY-MM-DD HH:mm:ss"));
const morganFormat = ":time :method :url :status :response-time ms";
app.use(morgan(morganFormat));
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH",
    allowedHeaders: "Content-Type, Accept, Authorization",
  })
);
app.listen(process.env.PORT, () => {
  console.log(chalk.green(`Server is running on port ${process.env.PORT}`));
});
app.use("/ticketImages", express.static("ticketImages"));
app.use(authRouter);
app.use(ticketRouter);
app.use("/", (req, res) => {
  res.send("Hello World!");
});
