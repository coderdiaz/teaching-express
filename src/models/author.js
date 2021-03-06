const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
});

// Model
const Author = mongoose.model('Author', AuthorSchema);
module.exports = { Author, AuthorSchema }