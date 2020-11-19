const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
});

// Model
const Category = mongoose.model('Category', CategorySchema);
module.exports = { Category, CategorySchema }