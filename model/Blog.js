const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const blogSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     }
// })

// module.exports = mongoose.model('Blog', blogSchema)


const blogSchema = new Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});


module.exports = mongoose.model('Blog', blogSchema);

