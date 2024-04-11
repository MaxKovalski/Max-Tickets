import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const schema = new Schema({
  name: {
    first: { type: String },
    last: { type: String },
  },
  email: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  priority: { type: String, default: "Low" },
  image: { type: String },
  status: { type: String, default: "Open" },
  user_id: { type: ObjectId },
  techName: { type: String, default: "not assigned" },
  archive: { type: Boolean, default: false },
});
export const Ticket = mongoose.model("tickets", schema);
