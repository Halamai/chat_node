const mongoose = require("./db");
const Schema = mongoose.Schema;

const chat = new Schema(
  {
    name: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("chat", chat);

module.exports = Chat;
