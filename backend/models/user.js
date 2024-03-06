import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;
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
  permission: { type: String, default: "client" },
  phone: String,
  createTime: { type: Date, default: Date.now() },
});

//   image: {
//     url: { type: String },
//     alt: { type: String },
//     _id: { type: ObjectId, default: () => new mongoose.Types.ObjectId() },
//   },
export const User = mongoose.model("users", schema);
// permission = none,client,tech,manager,admin
