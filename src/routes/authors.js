const express = require('express');
const router = express.Router();
const { Author } = require('../models/author');
const mongoose = require('mongoose');

// Authors Methods
// GET /
router.get('/', async (req, res) => {
    const authors = await Author.find().exec();
    return res.status(200).json({
        status: 200,
        data: authors,
    });
});

// POST /
router.post('/', async (req, res) => {
    const { name, lastname, avatar } = req.body;
    // TODO: Add fields validations
    const newAuthor = new Author({
        name,
        lastname,
        avatar,
    });
    await newAuthor.save();

    return res.status(201).json({
        status: 201,
        data: newAuthor,
    });
});

// PUT /:id/
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, lastname, avatar } = req.body;
    // TODO: Add fields validations

    // Validate if `id` is an ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(401).json({
          status: 401,
          message: 'This id is not valid',
        });
    }

    const author = await Author.findById(id).exec();
    if (!author) {
        return res.status(404).json({
            status: 404,
            message: 'Author not found',
        });
    }

    // Updating data
    author.name = name;
    author.lastname = lastname;
    author.avatar = avatar;
    await author.save();

    return res.status(200).json({
        status: 200,
        data: author,
    });
});

// DELETE /:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    // Validate if `id` is an ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(401).json({
        status: 401,
        message: 'This id is not valid',
      });
    }
  
    await Author.findByIdAndDelete(id).exec();
    return res.status(200).json();
});

module.exports = router;