const mongoose = require('mongoose');

const NewInstructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  years: {type: Number, required: true},
  resume: {
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
  },
  video: {
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
    duration: Number,
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewInstructorSchema', NewInstructorSchema);