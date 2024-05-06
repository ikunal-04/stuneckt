const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;