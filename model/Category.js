const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
  });

  module.exports = mongoose.model('Category', categorySchema);