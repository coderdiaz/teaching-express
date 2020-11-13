const mongoose, { Schema } = require('mongoose');

const CommentSchema = new Schema({
    body: {
        type: String,
    },
    // TODO: Add attribute for user
}, {
    timestamps: true,
});

// Model
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = { Comment, CommentSchema }