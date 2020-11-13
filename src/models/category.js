const mongoose, { Schema } = require('mongoose');

const CategorySchema = new Schema({
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