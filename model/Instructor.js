const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    title: {
        type: String, 
    }, 
    description: {
        type: String
    },
    videos: [{
        type: String
      }]
})

module.exports = mongoose.model('Instructor', instructorSchema)