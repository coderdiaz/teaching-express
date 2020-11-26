const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
    },
    publishedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

// Model
const Post = mongoose.model('Post', PostSchema);

module.exports = { Post, PostSchema };