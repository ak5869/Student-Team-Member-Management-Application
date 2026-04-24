const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  year: { type: String, required: true },
  degree: { type: String, required: true },
  batch: { type: String, required: true },
  aim: { type: String, default: "" },
  phone: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  skills: { type: String, default: "" },
  image: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);