const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  videos: [
    {
      videoId: String,
      status: { type: String, default: "Pending" }, // New status field for videos
    },
  ],
});

module.exports = mongoose.model("Instructor", instructorSchema);
