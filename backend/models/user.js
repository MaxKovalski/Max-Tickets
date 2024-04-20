import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema;
const schema = new Schema({
  name: {
    first: { type: String },
    last: { type: String },
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  permission: { type: Number, default: 1 },
  phone: String,
  createTime: { type: String, default: () => moment().format("YYYY-MM-DD") },
});
export const User = mongoose.model("users", schema);
